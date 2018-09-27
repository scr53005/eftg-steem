/** Resizing image proxy. */

import {AbstractBlobStore} from 'abstract-blob-store'
import * as config from 'config'
import {createHash} from 'crypto'
import * as http from 'http'
import * as Koa from 'koa'
import * as multihash from 'multihashes'
import * as needle from 'needle'
import * as Sharp from 'sharp'
import streamHead from 'stream-head/dist-es6'
import {URL} from 'url'

import {imageBlacklist} from './blacklist'
import {proxyStore, uploadStore} from './common'
import {APIError} from './error'
import {mimeMagic, readStream, storeExists, storeWrite} from './utils'

const MAX_IMAGE_SIZE = Number.parseInt(config.get('max_image_size'))
if (!Number.isFinite(MAX_IMAGE_SIZE)) {
    throw new Error('Invalid max image size')
}
const SERVICE_URL = new URL(config.get('service_url'))

/** Image types allowed to be proxied and resized. */
const AcceptedContentTypes = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/webp',
]

interface NeedleResponse extends http.IncomingMessage {
    body: any
    raw: Buffer
    bytes: number
    cookies?: {[name: string]: any}
}

function fetchUrl(url: string, options: needle.NeedleOptions) {
    return new Promise<NeedleResponse>((resolve, reject) => {
        needle.get(url, options, (error, response) => {
            if (error) {
                reject(error)
            } else {
                resolve(response)
            }
        })
    })
}

export async function proxyHandler(ctx: Koa.Context) {
    ctx.tag({handler: 'proxy'})

    APIError.assert(ctx.method === 'GET', APIError.Code.InvalidMethod)
    APIError.assertParams(ctx.params, ['width', 'height', 'url'])

    const width = Number.parseInt(ctx.params['width'])
    const height = Number.parseInt(ctx.params['height'])

    APIError.assert(Number.isFinite(width), 'Invalid width')
    APIError.assert(Number.isFinite(height), 'Invalid height')

    let url: URL
    try {
        let urlStr = ctx.request.originalUrl
        urlStr = urlStr.slice(urlStr.indexOf('http'))
        urlStr = urlStr.replace('steemit.com/ipfs/', 'ipfs.io/ipfs/')
        url = new URL(urlStr)
    } catch (cause) {
        throw new APIError({cause, code: APIError.Code.InvalidProxyUrl})
    }

    // cache all proxy requests for minimum 10 minutes, including failures
    ctx.set('Cache-Control', 'public,max-age=600')

    // refuse to proxy images on blacklist
    APIError.assert(imageBlacklist.includes(url.toString()) === false, APIError.Code.Blacklisted)

    // where the original image is/will be stored
    let origStore: AbstractBlobStore
    let origKey: string

    const origIsUpload = SERVICE_URL.origin === url.origin && url.pathname[1] === 'D'
    ctx.tag({is_upload: origIsUpload})
    if (origIsUpload) {
        // if we are proxying or own image use the uploadStore directly
        // to avoid storing two copies of the same data
        origStore = uploadStore
        origKey = url.pathname.slice(1).split('/')[0]
    } else {
        const urlHash = createHash('sha1')
            .update(url.toString())
            .digest()
        origStore = proxyStore
        origKey = 'U' + multihash.toB58String(
            multihash.encode(urlHash, 'sha1')
        )
    }

    const imageKey = `${ origKey }_${ width }x${ height }`

    // check if we already have a converted image for requested key
    if (await storeExists(proxyStore, imageKey)) {
        ctx.tag({store: 'resized'})
        ctx.log.debug('streaming %s from store', imageKey)
        const file = proxyStore.createReadStream(imageKey)
        file.on('error', (error) => {
            ctx.log.error(error, 'unable to read %s', imageKey)
            ctx.res.writeHead(500, 'Internal Error')
            ctx.res.end()
            file.destroy()
        })
        const {head, stream} = await streamHead(file, {bytes: 16384})
        const mimeType = await mimeMagic(head)
        ctx.set('Content-Type', mimeType)
        ctx.set('Cache-Control', 'public,max-age=29030400,immutable')
        ctx.body = stream
        return
    }

    // check if we have the original
    let origData: Buffer
    let contentType: string
    if (await storeExists(origStore, origKey)) {
        ctx.tag({store: 'original'})
        origData = await readStream(origStore.createReadStream(origKey))
        contentType = await mimeMagic(origData)
    } else {
        APIError.assert(origIsUpload === false, 'Upload not found')
        ctx.tag({store: 'fetch'})
        ctx.log.debug({url: url.toString()}, 'fetching image')

        let res: NeedleResponse
        try {
            res = await fetchUrl(url.toString(), {
                open_timeout: 5 * 1000,
                response_timeout: 5 * 1000,
                read_timeout: 60 * 1000,
                compressed: true,
                parse_response: false,
                follow_max: 5,
                user_agent: 'SteemitProxy/1.0 (+https://github.com/steemit/imagehoster)',
            } as any)
        } catch (cause) {
            throw new APIError({cause, code: APIError.Code.UpstreamError})
        }

        APIError.assert(res.bytes <= MAX_IMAGE_SIZE, APIError.Code.PayloadTooLarge)
        APIError.assert(Buffer.isBuffer(res.body), APIError.Code.InvalidImage)

        if (Math.floor((res.statusCode || 404) / 100) !== 2) {
            throw new APIError({code: APIError.Code.InvalidImage})
        }

        contentType = await mimeMagic(res.body)
        APIError.assert(AcceptedContentTypes.includes(contentType), APIError.Code.InvalidImage)

        origData = res.body

        ctx.log.debug('storing original %s', origKey)
        await storeWrite(origStore, origKey, origData)
    }

    let rv: Buffer
    if (contentType === 'image/gif' && width === 0 && height === 0) {
        // pass trough gif if requested with original size (0x0)
        // this is needed since resizing gifs creates still images
        rv = origData
    } else {
        const image = Sharp(origData).jpeg({
            quality: 85,
            force: false,
        }).png({
            compressionLevel: 9,
            force: false,
        })

        let metadata: Sharp.Metadata
        try {
            metadata = await image.metadata()
        } catch (cause) {
            throw new APIError({cause, code: APIError.Code.InvalidImage})
        }

        APIError.assert(metadata.width && metadata.height, APIError.Code.InvalidImage)

        const newSize = calculateGeo(
            metadata.width as number,
            metadata.height as number,
            width,
            height
        )

        if (newSize.width !== metadata.width || newSize.height !== metadata.height) {
            image.resize(newSize.width, newSize.height)
        }

        rv = await image.toBuffer()
        ctx.log.debug('storing converted %s', imageKey)
        await storeWrite(proxyStore, imageKey, rv)
    }

    ctx.set('Content-Type', contentType)
    ctx.set('Cache-Control', 'public,max-age=29030400,immutable')
    ctx.body = rv
}

// from old codebase
function calculateGeo(origWidth: number, origHeight: number, targetWidth: number, targetHeight: number) {
    // Default ratio. Default crop.
    const origRatio  = (origHeight !== 0 ? (origWidth / origHeight) : 1)

    // Fill in missing target dims.
    if (targetWidth === 0 && targetHeight === 0) {
        targetWidth  = origWidth
        targetHeight = origHeight
    } else if (targetWidth === 0) {
        targetWidth  = Math.round(targetHeight * origRatio)
    } else if (targetHeight === 0) {
        targetHeight = Math.round(targetWidth / origRatio)
    }

    // Constrain target dims.
    if (targetWidth > origWidth) {   targetWidth  = origWidth }
    if (targetHeight > origHeight) { targetHeight = origHeight }

    const targetRatio = targetWidth / targetHeight
    if (targetRatio > origRatio) {
        // max out height, and calc a smaller width
        targetWidth = Math.round(targetHeight * origRatio)
    } else if (targetRatio < origRatio) {
        // max out width, calc a smaller height
        targetHeight = Math.round(targetWidth / origRatio)
    }

    return {
        width:  targetWidth,
        height: targetHeight,
    }
}

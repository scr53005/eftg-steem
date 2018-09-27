/** Serve files from upload store. */

import * as Koa from 'koa'
import streamHead from 'stream-head/dist-es6'

import {uploadStore} from './common'
import {APIError} from './error'
import {mimeMagic} from './utils'

export async function serveHandler(ctx: Koa.Context) {
    ctx.tag({handler: 'serve'})

    APIError.assert(ctx.method === 'GET', APIError.Code.InvalidMethod)
    APIError.assertParams(ctx.params, ['hash'])

    const file = uploadStore.createReadStream(ctx.params['hash'])
    file.on('error', (error) => {
        if (error.notFound || error.code === 'NoSuchKey') {
            ctx.res.writeHead(404, 'Not Found')
        } else {
            ctx.log.error(error, 'unable to read %s', ctx.params['hash'])
            ctx.res.writeHead(500, 'Internal Error')
        }
        ctx.res.end()
        file.destroy()
    })

    const {head, stream} = await streamHead(file, {bytes: 16384})
    const mimeType = await mimeMagic(head)

    ctx.response.set('Content-Type', mimeType)
    ctx.response.set('Cache-Control', 'public,max-age=29030400,immutable')
    ctx.body = stream
}

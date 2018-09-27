/** Misc shared instances. */

import {AbstractBlobStore} from 'abstract-blob-store'
import * as config from 'config'
import {Client} from 'dsteem'
import * as Redis from 'redis'

import {logger} from './logger'

/** Steemd (jussi) RPC client. */
export const rpcClient = new Client(config.get('rpc_node'))

/** Redis client. */
export let redisClient: Redis.RedisClient | undefined
if (config.has('redis_url')) {
    redisClient = Redis.createClient({
        url: config.get('redis_url') as string
    })
} else {
    logger.warn('redis not configured, will not rate-limit uploads')
}

/** Blob storage. */

let S3Client: any
function loadStore(key: string): AbstractBlobStore {
    const conf = config.get(key) as any
    if (conf.type === 'memory') {
        logger.warn('using memory store for %s', key)
        return require('abstract-blob-store')()
    } else if (conf.type === 's3') {
        if (!S3Client) {
            const aws = require('aws-sdk')
            S3Client = new aws.S3()
        }
        return require('s3-blob-store')({
            client: S3Client,
            bucket: conf.get('s3_bucket'),
        })
    } else {
        throw new Error(`Invalid storage type: ${ conf.type }`)
    }
}

export const uploadStore = loadStore('upload_store')
export const proxyStore = loadStore('proxy_store')

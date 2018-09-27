/** Logging things */

import * as Bunyan from 'bunyan'
import * as config from 'config'
import * as Koa from 'koa'

import {APIError} from './error'

const level: Bunyan.LogLevel = config.get('log_level')
const output: string = config.get('log_output')

let stream: Bunyan.Stream
if (output === 'stdout') {
    stream = {level, stream: process.stdout}
} else if (output === 'stderr') {
    stream = {level, stream: process.stderr}
} else {
    stream = {level, path: output}
}

export const logger = Bunyan.createLogger({
    name: config.get('name'),
    serializers: Bunyan.stdSerializers,
    streams: [stream],
})

export function loggerMiddleware(ctx: Koa.Context, next: () => Promise<any>) {
    ctx['start_time'] = process.hrtime()
    const uuid = ctx.request.get('X-Amzn-Trace-Id') ||
                 ctx.request.get('X-Request-Id') ||
                 `dev-${ Math.round(Math.random() * Number.MAX_SAFE_INTEGER) }`
    ctx['req_id'] = uuid
    ctx.response.set('X-Request-Id', uuid)
    ctx['log'] = logger.child({
        req_id: uuid,
        req_ip: ctx.request.ip
    })
    ctx['tag'] = (obj: any) => {
        ctx['log'] = ctx['log'].child(obj)
    }
    ctx['log'].debug({req: ctx.req}, 'request')
    const done = () => {
        const delta = process.hrtime(ctx['start_time'])
        const info: any = {
            method: ctx.method,
            ms: delta[0] * 1e3 + delta[1] / 1e6,
            path: ctx.path,
            size: ctx.response.length,
            status: ctx.status,
        }
        if (ctx['api_error']) {
            info.err_code = ctx['api_error'].toJSON().name
        }
        ctx['log'].info(info, 'response')
    }
    ctx.res.once('close', done)
    ctx.res.once('finish', done)
    return next()
}

/** API routes. */

import * as Koa from 'koa'
import * as Router from 'koa-router'

import {avatarHandler} from './avatar'
import {proxyHandler} from './proxy'
import {serveHandler} from './serve'
import {uploadHandler} from './upload'

const version = require('./version')
const router = new Router()

async function healthcheck(ctx: Koa.Context) {
    const ok = true
    const date = new Date()
    ctx.body = {ok, version, date}
}

router.get('/', healthcheck)
router.get('/.well-known/healthcheck.json', healthcheck)
router.get('/u/:username/avatar/:size?', avatarHandler)
router.post('/:username/:signature', uploadHandler)
router.get('/:width(\\d+)x:height(\\d+)/:url(.*)', proxyHandler)
router.get('/:hash/:filename?', serveHandler)

export const routes = router.routes()

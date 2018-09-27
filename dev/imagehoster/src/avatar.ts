/** Serve user avatars. */

import * as config from 'config'
import * as Koa from 'koa'

import {rpcClient} from './common'
import {APIError} from './error'

const DefaultAvatar = config.get('default_avatar')
const AvatarSizes: {[size: string]: number} = {
    small: 64,
    medium: 128,
    large: 512,
}

export async function avatarHandler(ctx: Koa.Context) {
    ctx.tag({handler: 'avatar'})

    APIError.assert(ctx.method === 'GET', APIError.Code.InvalidMethod)
    APIError.assertParams(ctx.params, ['username'])

    const username = ctx.params['username']
    const size = AvatarSizes[ctx.params['size']] || AvatarSizes.medium

    const [account] = await rpcClient.database.getAccounts([username])

    APIError.assert(account, APIError.Code.NoSuchAccount)

    let metadata: any
    try {
        metadata = JSON.parse(account.json_metadata)
    } catch (error) {
        ctx.log.debug(error, 'unable to parse json_metadata for %s', account.name)
        metadata = {}
    }

    let avatarUrl = DefaultAvatar
    if (metadata.profile &&
        metadata.profile.profile_image &&
        metadata.profile.profile_image.match(/^https?:\/\//)) {
        avatarUrl = metadata.profile.profile_image
    }

    ctx.set('Cache-Control', 'public,max-age=600')
    ctx.redirect(`/${ size }x${ size }/${ avatarUrl }`)
}

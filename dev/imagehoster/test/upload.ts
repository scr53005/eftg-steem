import 'mocha'
import * as assert from 'assert'
import * as http from 'http'
import * as needle from 'needle'
import * as path from 'path'
import * as fs from 'fs'
import * as crypto from 'crypto'
import {PrivateKey} from 'dsteem'

import {app} from './../src/app'
import {rpcClient} from './../src/common'

import {testKeys} from './index'

export async function uploadImage(data: Buffer, port: number) {
    return new Promise<any>((resolve, reject) => {
        const hash = crypto.createHash('sha256')
            .update('ImageSigningChallenge')
            .update(data)
            .digest()
        const payload = {
            foo: 'bar',
            image_file: {
                filename: 'test.jpg',
                buffer: data,
                content_type: 'image/jpeg',
            },
        }
        const signature = testKeys.foo.sign(hash).toString()
        needle.post(`:${ port }/foo/${ signature }`, payload, {multipart: true}, function (error, response, body) {
            if (error) {
                reject(error)
            } else {
                resolve({response, body})
            }
        })
    })
}

describe('upload', function() {
    const port = 63205
    const server = http.createServer(app.callback())

    before((done) => { server.listen(port, 'localhost', done) })
    after((done) => { server.close(done) })

    it('should upload image', async function() {
        this.slow(500)
        const file = path.resolve(__dirname, 'test.jpg')
        const data = fs.readFileSync(file)
        const {response, body} = await uploadImage(data, port)
        assert.equal(response.statusCode, 200)
        const {url} = body
        const [key, fname] = url.split('/').slice(-2)
        assert.equal(key, 'DQmZi174Xz96UrRVBMNRHb6A2FfU3z1HRPwPPQCgSMgdiUT')
        assert.equal(fname, 'test.jpg')
        const res = await needle('get', `:${ port }/${ key }/bla.bla`)
        assert.equal(res.statusCode, 200)
        assert(crypto.timingSafeEqual(res.body, data), 'file same')
    })

})

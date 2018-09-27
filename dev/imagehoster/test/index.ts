import 'mocha'
import * as assert from 'assert'
import {PrivateKey} from 'dsteem'

import {rpcClient} from './../src/common'

export const testKeys = {
    foo: PrivateKey.fromSeed('foo'),
    bar: PrivateKey.fromSeed('bar'),
}

export const mockAccounts: any = {
    foo: {
        name: 'foo',
        reputation: '10525900772718',
        posting: {
            weight_threshold: 1,
            account_auths: [],
            key_auths: [[testKeys.foo.createPublic().toString(), 1]]
        }
    },
    bar: {
        name: 'bar',
        reputation: '10525900772718',
        posting: {
            weight_threshold: 1,
            account_auths: [],
            key_auths: [[testKeys.bar.createPublic().toString(), 1]]
        }
    }
}

before(() => {
    // mock out dsteem rpc calls
    const _client = rpcClient as any
    _client.call = async (api: string, method: string, params = []) => {
        const apiMethod = `${ api }-${ method }`
        switch (apiMethod) {
            case 'database_api-get_accounts':
                assert.equal(params.length, 1, 'can only mock single account lookups')
                return [mockAccounts[params[0]]]
            default:
                throw new Error(`No mock data for: ${ apiMethod }`)
        }
    }
})

after(() => {
    const _client = rpcClient as any
    _client.call = async () => {
        throw new Error('RPC CALL AFTER UNIT TESTS')
    }
})

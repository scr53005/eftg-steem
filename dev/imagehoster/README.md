
imagehoster
===========

Steem-powered image hosting and proxying service.


Developing
----------

With node.js installed, run:

```
make devserver
```

This will pull in all dependencies and spin up a hot-reloading development server.

Run `make lint` to run the autolinter, `make test` to run the unit tests.


Configuration
-------------

Defaults are in <./config/default.toml> and can be overridden by env vars as defined in <./config/custom-environment-variables.toml>

Load order is: env vars > `config/$NODE_ENV.toml` > `config/default.toml`

See the `config` module docs for more details.


API
---

Responses should be determined by the Content-Type header, errors will have a status of `>=400` and a Content-Type of `application/json` with the body in the format:

```json
{
    "error": {
        "name": "error_name",
        "info": {"optional": "metadata"}
    }
}
```

#### `POST /<username>/<signature>` - upload an image.

Multipart image upload, will only consider first file if there are multiple.

Returns a JSON object containing the url to the uploaded image, example:

```json
{
    "url": "https://images.example.com/DQmZi174Xz96UrRVBMNRHb6A2FfU3z1HRPwPPQCgSMgdiUT/test.jpg"
}
```

Requires a signature from a Steem account in good standing, see the "Signing uploads" section below for more information.


#### `GET /<image_hash>/[<filename>]` - fetch an uploaded image.

Download a previously uploaded image.

`filename` is optional but can be provided to help users and applications understand the content type (Content-Type header will still always reflect actual image type).


#### `GET /<width>x<height>/<image_url>` - proxy and resize an image.

Downloads and serves the provided `image_url`, note that a copy will be taken of the image and that will be served on subsequent requests so even if the upstream is removed or changes you will still get the original from the proxy endpoint.

`width` and `height` can be set to `0` to preserve the image dimensions, if they are `>0` the image will be aspect resized (down-sample only) to fit inside the rectangle.

#### `GET /u/<username>/avatar/[<size>]` - get user avatar image.

Serves the avatar for `username`, if no avatar is set a default image will be served (set in service config).

Sizes are:

  * `small` - 64x64
  * `medium` - 128x128
  * `large` - 512x512

Note that the avatars follow the same sizing rules as proxied images, so you are not guaranteed to get a square image, just an image fitting inside of the `size` square.


Signing uploads
---------------

Uploads require a signature made with by a Steem account's posting authority, further that account has to be above a (service configurable) reputation threshold.

Creating a signature (psuedocode):

```python
signature = secp256k1_sign(sha256('ImageSigningChallenge'+image_data), account_private_posting_key)
```

Creating a signature (node.js & [dsteem](https://github.com/jnordberg/dsteem))

```js
#!/usr/bin/env node

const dsteem = require('dsteem')
const crypto = require('crypto')
const fs = require('fs')

const [wif, file] = process.argv.slice(2)

if (!wif || !file) {
    process.stderr.write(`Usage: ./sign.js <posting_wif> <file>\n`)
    process.exit(1)
}

const data = fs.readFileSync(file)
const key = dsteem.PrivateKey.fromString(wif)
const imageHash = crypto.createHash('sha256')
    .update('ImageSigningChallenge')
    .update(data)
    .digest()

process.stdout.write(key.sign(imageHash).toString() + '\n')
```

```sh
$ ./sign.js 5J9jN691Gf3MKdwvqWVx54drx9qub6koyA3mjhenyN12CURua8W test.jpg
1f78d007a0b12cd17f2d349446c3f9b7cfa096ae53903a11608d6232781fb994a2086263f21e4da831d2a2b0b372f701b83042a629ba3d87791d05f393d5504db2
```

const { is } = require('@magic/test')
const fs = require('fs')
const zlib = require('zlib')
const util = require('util')

const zopfli = require('../lib/zopfli')

const inflate = util.promisify(zlib.inflate)

const fixture = fs.readFileSync('test/.fixtures/test.js')

module.exports = [
  { fn: zopfli.zlibSync(), expect: is.error, info: 'empty buffer returns error' },
  {
    info: 'buffer arg returns buffer',
    fn: zopfli.zlibSync(fixture),
    expect: is.buffer,
  },
  {
    info: 'string arg returns buffer',
    fn: zopfli.zlibSync(fixture.toString()),
    expect: is.buffer,
  },
  {
    info: 'result can be zlib.inflated',
    fn: async () => {
      const res = await inflate(zopfli.zlibSync(fixture))
      return res.toString()
    },
    expect: fixture.toString(),
  },
  {
    info: 'zopfli.zlibSync result is equal to zopfli.zlib',
    fn: async () => {
      const res = await inflate(zopfli.zlibSync(fixture))
      return res.toString()
    },
    expect: async t => {
      const fixed = await inflate(await zopfli.zlib(fixture))
      return t.toString() === fixed.toString()
    },
  },
]

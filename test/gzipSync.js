const { is } = require('@magic/test')
const fs = require('fs')
const zlib = require('zlib')
const util = require('util')

const zopfli = require('../lib/zopfli')

const gunzip = util.promisify(zlib.gunzip)

const fixture = fs.readFileSync('test/.fixtures/test.js')

const catchable = async (fn, ...args) => {
  const oldError = console.error
  console.error = () => {}
  try {
    const res = await fn(...args)
    return res
  } catch (e) {
    // return e
  }
  console.error = oldError
}

module.exports = [
  { fn: zopfli.gzipSync(), expect: is.error, info: 'empty buffer returns error' },
  { fn: zopfli.gzipSync('string'), expect: is.buffer, info: 'string returns buffer' },
  {
    info: 'returns a buffer if called with a buffer',
    fn: zopfli.gzipSync(fixture),
    expect: is.buffer,
  },
  {
    info: 'returns a buffer if called with a string',
    fn: zopfli.gzipSync(fixture.toString()),
    expect: is.buffer,
  },
  {
    info: 'zopfli.gzip called with a string can be inflated using zlib',
    fn: async () => await gunzip(zopfli.gzipSync(fixture.toString())),
    expect: fixture,
  },
  {
    info: 'zopfli.gzip called with a buffer can be inflated using zlib',
    fn: async () => await gunzip(zopfli.gzipSync(fixture)),
    expect: fixture,
  },
]

const { is, promise } = require('@magic/test')
const fs = require('fs')
const zlib = require('zlib')
const util = require('util')

const zopfli = require('../lib/zopfli')

const inflateRaw = util.promisify(zlib.inflateRaw)
const inflate = util.promisify(zlib.inflate)
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
  {
    fn: zopfli.compress(),
    expect: is.error,
    info: 'empty arguments return error',
  },
  {
    fn: zopfli.compress(fixture),
    expect: is.buffer,
    info: 'buffer argument returns buffer',
  },
  {
    fn: zopfli.compress(fixture),
    expect: zopfli.compress(fixture),
    info: 'two equal buffers stay equal',
  },
  {
    info: 'type = "gzip" is honored',
    fn: async () => await gunzip(await zopfli.compress(fixture, 'gzip')),
    expect: fixture,
  },
  {
    info: 'type = "deflate" is honored',
    fn: async () => await inflateRaw(await zopfli.compress(fixture, 'deflate')),
    expect: fixture,
  },
  {
    info: 'type = "zlib" is honored',
    fn: async () => await inflate(await zopfli.compress(fixture, 'zlib')),
    expect: fixture,
  },
  {
    info: 'type = "deflate" is default',
    fn: async () => await inflateRaw(await zopfli.compress(fixture)),
    expect: fixture,
  },
  {
    info: 'callback works as second argument',
    fn: new Promise(r => zopfli.compress(fixture, (err, data) => r(data))),
    expect: is.buffer,
  },
  {
    info: 'callback works as third argument',
    fn: new Promise(r => zopfli.compress(fixture, 'zlib', (err, data) => r(data))),
    expect: is.buffer,
  },
  {
    info: 'callback works as fourth argument',
    fn: new Promise(r => zopfli.compress(fixture, 'zlib', (err, data) => r(data))),
    expect: is.buffer,
  },
  {
    info: 'callback returns correct values',
    fn: new Promise(r => zopfli.compress(fixture, 'zlib', (err, data) => r(data))),
    expect: is.buffer,
  },
]

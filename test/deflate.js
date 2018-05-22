const { is } = require('@magic/test')
const fs = require('fs')
const zlib = require('zlib')
const util = require('util')

const zopfli = require('../lib/zopfli')

const inflateRaw = util.promisify(zlib.inflateRaw)

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
    fn: catchable(zopfli.deflate),
    expect: is.error,
    info: 'deflate empty arguments returns error',
  },
  {
    fn: catchable(zopfli.deflate, 'string'),
    expect: is.buffer,
    info: 'deflate string arg returns error',
  },
  {
    info: 'returns a buffer if called with a buffer',
    fn: zopfli.deflate(fixture),
    expect: is.buffer,
  },
  {
    info: 'returns a buffer if called with a string',
    fn: zopfli.deflate(fixture.toString()),
    expect: is.buffer,
  },
  {
    info: 'zopfli.deflate called with a string can be inflated using zlib',
    fn: async () => await inflateRaw(await zopfli.deflate(fixture.toString())),
    expect: t => fixture.toString() === t.toString(),
  },
  {
    info: 'zopfli.deflate called with a buffer can be inflated using zlib',
    fn: async () => await inflateRaw(await zopfli.deflate(fixture)),
    expect: t => fixture.toString() === t.toString(),
  },
]

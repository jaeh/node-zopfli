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
    return fn(...args)
  } catch (e) {
    // return e
  }
  console.error = oldError
}

module.exports = [
  // {
  //   fn: zopfli.deflateSync(),
  //   expect: t => console.log(t),
  //   info: 'deflate empty arguments returns error',
  // },
  // {
  //   fn: zopfli.deflateSync('string'),
  //   expect: is.buffer,
  //   info: 'deflate string arg returns error',
  // },
  {
    info: 'returns a buffer if called with a buffer',
    fn: zopfli.deflateSync(fixture),
    expect: is.buffer,
  },
  {
    info: 'returns a buffer if called with a string',
    fn: zopfli.deflateSync(fixture.toString()),
    expect: is.buffer,
  },
  {
    info: 'zopfli.deflate called with a string can be inflated using zlib',
    fn: async () => await inflateRaw(zopfli.deflateSync(fixture.toString())),
    expect: t => fixture.toString() === t.toString(),
  },
  {
    info: 'zopfli.deflate called with a buffer can be inflated using zlib',
    fn: async () => await inflateRaw(zopfli.deflateSync(fixture)),
    expect: t => fixture.toString() === t.toString(),
  },
]

const { is } = require('@magic/test')
const fs = require('fs')
const util = require('util')
const zlib = require('zlib')
const readFile = util.promisify(fs.readFile)

const zopfli = require('../../lib/zopfli')

const fixture = fs.readFileSync('test/.fixtures/test.js')

module.exports = [
  {
    info: 'should return a promise if no callback is given',
    fn: zopfli.deflate(fixture),
    expect: is.buffer,
  },
]

// .then(function(result) {
// zlib.inflateRaw(result, function(err, result) {
//   if (!err) {
//     assert.equal(result.toString(), buffer.toString())
//   }
//   done(err)
// })
//   })
// },

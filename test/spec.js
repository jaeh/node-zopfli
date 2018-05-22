const { is } = require('@magic/test')
const zopfli = require('../lib/zopfli')

module.exports = [
  { fn: () => zopfli, expect: is.function },
  { fn: () => zopfli.deflate, expect: is.function },
  { fn: () => zopfli.compress, expect: is.function },
  { fn: () => zopfli.zlib, expect: is.function },
  { fn: () => zopfli.gzip, expect: is.function },
  { fn: () => zopfli.createGzip, expect: is.function },
  { fn: () => zopfli.createDeflate, expect: is.function },
  { fn: () => zopfli.createZlib, expect: is.function },
  { fn: () => zopfli.gzipSync, expect: is.function },
  { fn: () => zopfli.deflateSync, expect: is.function },
  { fn: () => zopfli.zlibSync, expect: is.function },
]

'use strict'

const path = require('path')
const binding_path = './binding/zopfli.node'
const zopfli = require(binding_path)

const util = require('util')
const stream = require('stream')
// const Transform = util.promisify(stream.Transform)

/* Streaming part */
const defaultOptions = {
  verbose: false,
  verbose_more: false,
  numiterations: 15,
  blocksplitting: true,
  blocksplittinglast: false,
  blocksplittingmax: 15,
}

class Zopfli extends stream.Transform {
  constructor(format = 'deflate', options) {
    super()
    this.first = true
    this.adler = 0x01
    this.crc = null
    this.format = format
    this.options = Object.assign({}, defaultOptions, options)
    this.in = new Buffer.alloc(0)
  }

  _transform(chunk, encoding, done) {
    this.in = Buffer.concat([this.in, chunk])
    done()
  }

  _flush(done) {
    zopfli.deflate(new Buffer.from(this.in), this.format, this.options, (err, outbuf) => {
      if (err) {
        done(err)
      } else {
        this.push(outbuf)
        done()
      }
    })
  }
}

/* Stream */
Zopfli.createGzip = (options = {}) => new Zopfli('gzip', options)

Zopfli.createZlib = (options = {}) => new Zopfli('zlib', options)

Zopfli.createDeflate = (options = {}) => new Zopfli('deflate', options)

/* Buffer */
Zopfli.compress = (buffer, type = 'deflate', options = {}, cb) => {
  if (!buffer) {
    return new Error('No bufferable argument provided')
  }

  if (typeof buffer === 'string') {
    buffer = Buffer.from(buffer, 'utf8')
  }

  if (typeof cb === 'undefined') {
    if (typeof options === 'function') {
      cb = options
      options = {}
    } else if (typeof type === 'function') {
      cb = type
      type = 'deflate'
    }
  }

  if (typeof cb === 'function') {
    zopfli.deflate(buffer, type, options, cb)
  } else {
    return new Promise((res, rej) => {
      zopfli.deflate(buffer, type, options, (err, data) => {
        if (err) {
          rej(err)
        } else {
          res(data)
        }
      })
    })
  }
}

Zopfli.gzip = (buffer, options = {}, cb) => Zopfli.compress(buffer, 'gzip', options, cb)

Zopfli.zlib = (buffer, options = {}, cb) => Zopfli.compress(buffer, 'zlib', options, cb)

Zopfli.deflate = (buffer, options = {}, cb) => Zopfli.compress(buffer, 'deflate', options, cb)

/* Sync buffer */
const deflateSync = (buffer, type, options) => {
  if (!buffer) {
    return new Error('No bufferable argument provided')
  }

  if (typeof buffer === 'string') {
    buffer = Buffer.from(buffer, 'utf8')
  }

  return zopfli.deflateSync(buffer, type, options)
}

Zopfli.gzipSync = (buffer, options = {}) => deflateSync(buffer, 'gzip', options)

Zopfli.zlibSync = (buffer, options = {}) => deflateSync(buffer, 'zlib', options)

Zopfli.deflateSync = (buffer, options = {}) => deflateSync(buffer, 'deflate', options)

module.exports = Zopfli

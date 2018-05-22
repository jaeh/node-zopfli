/* jshint mocha: true */

'use strict'

const { is } = require('@magic/test')

const util = require('util')
const path = require('path')
const fs = require('fs')
const cp = require('child_process')
const xc = util.promisify(cp.exec)
const exists = util.promisify(fs.exists)
const unlink = util.promisify(fs.unlink)

const binary = `node ${path.join(__dirname, '..', 'bin', 'zopfli')}`

const fixture = path.join(__dirname, '.fixtures', 'test.css')
const zipped = `${fixture}.gz`

const before = async () => {
  try {
    await unlink(zipped)
  } catch (e) {}
}

module.exports = [
  { fn: new Promise(r => cp.exec(binary, r)), expect: is.error, info: 'fail without arguments' },
  {
    fn: async () => await xc(`${binary} ${fixture}`),
    expect: async () => await exists(zipped),
    before,
    info: 'zipped file exists after zipping',
  },
]

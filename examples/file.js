'use strict';

const fs = require('fs');
const zopfli = require('node-zopfli-es');

fs.createReadStream('file.js')
  .pipe(new zopfli.createGzip())
  .pipe(fs.createWriteStream('file.js.gz'));

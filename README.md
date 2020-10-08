# node-zopfli-es

---------------------------------------------------------------------------

## DEPRECATED!

This library will only receive sporadic updates and new features are out of question.

## ALTERNATIVES

### NODEJS LEGACY (<12) (no module support)

This is a fork of [node-zopfli](https://github.com/pierreinglebert/node-zopfli),
created to fix some security issues which have since been resolved.

Since node-zopfli is maintained again, switching back to it is advised.

---------------------------------------------------------------------------

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]

Node.js bindings for [Zopfli](https://en.wikipedia.org/wiki/Zopfli) compression library.
Compress gzip files 5% better compared to gzip.

It is considerably slower than gzip (~100x) so you may want to use it only for static content and cached resources.


## Prerequisites for building

* Python 2.7
* GCC and Make (Unix) or Visual Studio Express (Windows), see [Node Building tools](https://github.com/TooTallNate/node-gyp#installation)

## Install

```shell
npm install node-zopfli-es
```

or if you want zopfli binary globally

```shell
npm install -g node-zopfli-es
```

## Usage examples
### Binary (from command line)
To gzip a file

```shell
zopfli file.txt
```

To compress a png file

```shell
zopflipng file.png out.png
```

#### Stream (async):

```js
const zopfli = require('node-zopfli-es')
fs
  .createReadStream('file.js')
  .pipe(zopfli.createGzip(options))
  .pipe(fs.createWriteStream('file.js.gz'))
```

Instead of `zopfli.createGzip`, you can also use

```js
new Zopfli('gzip', options)
```

#### Buffer (async):

```js
const zopfli = require('node-zopfli-es')
const input = new Buffer('I want to be compressed')
zopfli.deflate(input, options, function(err, deflated) {})
zopfli.zlib(input, options, function(err, zlibed) {})
zopfli.gzip(input, options, function(err, gziped) {})
```

#### Buffer (sync):

```js
const zopfli = require('node-zopfli-es')
const input = new Buffer('I want to be compressed')
const deflated = zopfli.deflateSync(input, options)
const zlibed = zopfli.zlibSync(input, options)
const gziped = zopfli.gzipSync(input, options)
```

### API

#### compress(input, [format = 'deflate', options = {}, callback])

`input` is the input buffer (or string)

`format` can be one of `deflate`, `zlib` and `gzip`, `deflate` is the default if omitted

`callback`, if present, gets two arguments
`(err, buffer)` where `err` is an error object, if any, and `buffer` is the compressed data.

If format is a function and callback is not, format is set to `deflate` and callback gets set
If options is a function and callback is not, options are set to `{}` and callback gets set

If no callback is provided, it returns an A+ Promise.

##### aliases

`deflate`, `zlib` and `gzip` methods are aliases on `compress` without `format` argument.

#### deflate(input, [options = {}, callback])

#### zlib(input, [options = {}, callback])

#### gzip(input, [options = {}, callback])


#### Options

Here are the options with defaults values you can pass to zopfli:

```js
{
  verbose: false,
  verbose_more: false,
  numiterations: 15,
  blocksplitting: true,
  blocksplittinglast: false,
  blocksplittingmax: 15,
}
```

##### numiterations
Maximum amount of times to rerun forward and backward pass to optimize LZ77 compression cost. Good values: 10, 15 for small files, 5 for files over several MB in size or it will be too slow.

##### blocksplitting
If true, splits the data in multiple deflate blocks with optimal choice for the block boundaries. Block splitting gives better compression.

##### blocksplittinglast
If true, chooses the optimal block split points only after doing the iterative LZ77 compression. If false, chooses the block split points first, then does iterative LZ77 on each individual block. Depending on the file, either first or last gives the best compression.

##### blocksplittingmax
Maximum amount of blocks to split into (0 for unlimited, but this can give extreme results that hurt compression on some files).


## Build from sources

```shell
git clone https://github.com/jaeh/node-zopfli-es --recursive
cd node-zopfli-es
npm install
```

## Tests
[@magic/test](https://github.com/magic/test) is used, you can run it with:

```shell
npm test
```
The npm test command also runs nyc to create coverage reports.

Fast testing without coverage:

```shell
npm start
```

## Formatting

[@magic/test](https://github.com/magic/test) also includes prettier:

```shell
# equal to: prettier --write
npm run format

# equal to: prettier --list-different
npm run format:check
```

## Typescript
Someone pushed the type definitions to DefinitelyTyped:
```bash
npm install @types/node-zopfli-es
```
[Typescript definitions](https://www.npmjs.com/package/@types/node-zopfli-es)

[npm-image]: https://img.shields.io/npm/v/node-zopfli-es.svg
[npm-url]: https://www.npmjs.com/package/node-zopfli-es
[travis-image]: https://img.shields.io/travis/jaeh/node-zopfli-es/master.svg?label=Linux%20build
[travis-url]: https://travis-ci.org/jaeh/node-zopfli-es
[appveyor-image]: https://img.shields.io/appveyor/ci/jaeh/node-zopfli-es/master.svg?label=Windows%20build
[appveyor-url]: https://ci.appveyor.com/project/jaeh/node-zopfli-es/branch/master
[coveralls-image]: https://coveralls.io/repos/github/jaeh/node-zopfli-es/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/jaeh/node-zopfli-es?branch=master

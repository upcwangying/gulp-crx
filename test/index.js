'use strict';

var assert = require('assert');
var gutil = require('gulp-util');
var path = require('path');
var crx = require('../');
var fs = require('fs');

it('should export function', function() {
  assert.equal(typeof crx, 'function')
})

it('should create crx file', function(done) {
  var stream = crx({
    privateKey: fs.readFileSync(path.join(__dirname, '/certs/key'), 'utf8'),
    filename: 'extension.crx'
  })

  stream.on('data', function(file) {
    assert.equal(path.normalize(file.path), 'extension.crx')
    assert.equal(file.relative, 'extension.crx')
    assert(file.contents.length > 0)
  })

  stream.on('end', function() {
    done()
  })

  stream.write(new gutil.File({
    cwd: __dirname,
    base: __dirname,
    path: __dirname + '/extension'
  }))

  stream.end()

})

it('should create xml file', function(done) {
  var stream = crx({
    privateKey: fs.readFileSync(path.join(__dirname, '/certs/key'), 'utf8'),
    filename: 'extension.crx',
    codebase: 'http://example.com/extension.crx',
    updateXmlFilename: 'update.xml'
  })

  stream.on('data', function(file) {
    if (/\.crx$/.test(file.relative)) {
      return
    }
    assert.equal(path.normalize(file.path), 'update.xml')
    assert.equal(file.relative, 'update.xml')
    assert(file.contents.length > 0)
    assert(/codebase='http:\/\/example.com\/extension.crx'/.test(file.contents), 'XML contains link to codebase')
    assert(/appid='\w{32}'/.test(file.contents), 'XML contains appid with length of 32 characters')
  })

  stream.on('end', function() {
    done()
  })

  stream.write(new gutil.File({
    cwd: __dirname,
    base: __dirname,
    path: __dirname + '/extension'
  }))

  stream.end()

})

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

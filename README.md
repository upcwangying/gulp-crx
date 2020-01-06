@crxs/gulp-crx
=============

Pack Chrome Extension in the pipeline.

![Travis (.org)](https://img.shields.io/travis/upcwangying/gulp-crx)
[![npm (scoped)](https://img.shields.io/npm/v/@crxs/gulp-crx)](https://www.npmjs.com/package/@crxs/gulp-crx)

Usage
-----

Pipe the folder with chrome extension source code into the plugin.

    var crx = require('@crxs/gulp-crx');
    var manifest = require('./extension-src/manifest.json');

    gulp.task('crx', function() {
      return gulp.src('./extension-src')
        .pipe(crx({
          privateKey: fs.readFileSync('./certs/key', 'utf8'),
          filename: manifest.name + '.crx'
        }))
        .pipe(gulp.dest('./build'));
    });

Install
-------

    npm install @crxs/gulp-crx --save-dev

Autoupdating
------------

See https://developer.chrome.com/extensions/autoupdate

You can use `@crxs/gulp-crx` to generate the `.xml` file too. Pass two more options:
- `codebase`: The URL to final `.crx` file
- `updateXmlFilename`: Name of the xml file.

Example:

    var crx = require('@crxs/gulp-crx');
    var manifest = require('./extension-src/manifest.json');

    gulp.task('crx', ['prepackage'], function() {

      // http://example.com/extension.crx
      var codebase = manifest.codebase

      var updateXmlFilename = 'update.xml'

      return gulp.src('./extension-src')
        .pipe(crx({
          privateKey: fs.readFileSync('./certs/key', 'utf8'),
          filename: manifest.name + '.crx',
          codebase: codebase,
          updateXmlFilename: updateXmlFilename
        }))
        .pipe(gulp.dest('./build'));
    });

gulp-crx
========

Pack Chrome Extension in the pipeline.

Usage
-----

Pipe the folder with chrome extension source code into the plugin.

    var crx = require('gulp-crx');

    gulp.task('crx', , function() {
      return gulp.src('.')
        .pipe(crx({
          privateKey: fs.readFileSync('./certs/key', 'utf8'),
          filename: manifest.name + '.crx'
        }))
        .pipe(gulp.dest('./build'));
    });

Install
-------

    npm install gulp-crx --save-dev

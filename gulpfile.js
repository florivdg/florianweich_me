var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglifyjs');

// Task to copy and minify bower components
gulp.task('copy_bower_components', function() {
  gulp.src(
    ['bower_components/normalize-css/normalize.css',
    'bower_components/devicons/css/devicons.css',
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/animate.css/animate.css'])
    .pipe(concat('vendor.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('./css/'));
  gulp.src(
    ['bower_components/devicons/fonts/*.*',
    'bower_components/font-awesome/fonts/*.*'])
    .pipe(gulp.dest('./fonts/'));
});

// Task to uglify and concat js
gulp.task('uglify', function() {
  gulp.src(['bower_components/jquery/dist/jquery.js',
            'bower_components/masonry/dist/masonry.pkgd.js',
            'bower_components/imagesloaded/imagesloaded.pkgd.js',
            '_javascript/scripts.js'])
    .pipe(uglify('app.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('js'))
});

// Task to watch changes in javascript
gulp.task('watch', function () {
   gulp.watch('_javascript/scripts.js', ['uglify']);
});

// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll build --watch']));
// Or if you don't use bundle:
// gulp.task('build', shell.task(['jekyll build --watch']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}, notify: false});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['copy_bower_components', 'uglify', 'build', 'watch', 'serve']);

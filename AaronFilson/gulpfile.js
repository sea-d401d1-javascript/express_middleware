var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('mocha', function() {
  return gulp.src(['test/**/*test.js'], { read: false })
    .pipe(mocha())
    .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
  gulp.watch(['lib/**', 'test/**'], ['mocha']);
});

gulp.task('lint', function() {
  return gulp.src(['**/*.js', '!**/node_modules/*'])
    .pipe(eslint({
      'rules': {
        'indent': [2, 2],
        'quotes': [2, 'single'],
        'semi': [2, 'always'],
        'no-console': 0
      },
      'env': {
        'es6': true,
        'node': true,
        'browser': true,
        'mocha': true
      },
      'extends': 'eslint:recommended'
    }))
    .pipe(eslint.format());
});

gulp.task('default', ['lint', 'mocha']);

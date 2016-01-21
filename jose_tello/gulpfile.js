var gulp   = require('gulp'),
  mocha    = require('gulp-mocha'),
  eslint   = require('gulp-eslint'),
  chai     = require('chai'),
  chaiHTTP = require('chai-http');

  gulp.task('lint', () => {
    return gulp.src(['./*.js', './test/*.js'])
      .pipe(eslint()) // uses .eslintrc file in root directory
      .pipe(eslint.format());
  });

  gulp.task('test', () => {
    return gulp.src(['./test/*.spec.js'])
      .pipe(mocha());
  });

  gulp.task('watch', () => {
    return gulp.watch(['./*.js', './test/*.js', '!node_modules/**', '!package.json'])
  });

  gulp.task('default', ['lint', 'test', 'watch']);

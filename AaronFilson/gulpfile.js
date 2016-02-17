var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
require('gulp-util');

gulp.task('mocha', () => {
  return gulp.src('test/*test*.js')
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('watch-mocha', () => {
  gulp.watch(['lib/**', 'test/**'], ['mocha']);
});

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!**/node_modules/*'])
    .pipe(eslint.format());
});

gulp.task('default', ['lint', 'mocha']);

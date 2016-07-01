const gulp = require('gulp');
const less = require('gulp-less');
const webpack = require('gulp-webpack');

gulp.task('less', function () {
    return gulp.src('./public/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('less:watch', function () {
    gulp.watch('./public/css/*.less', ['less']);
});

gulp.task('copy', function () {
    return gulp.src('./public/image/**')
        .pipe(gulp.dest('./build/image'));
});

gulp.task('copy-html', function () {
    return gulp.src('./public/index.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('webpack', function () {
    return gulp.src('./public/js/app.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./build'));
});

gulp.task('development', ['copy-html','copy', 'less', 'webpack', 'less:watch']);
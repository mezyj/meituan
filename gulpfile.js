var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var auto = require('gulp-autoprefixer');
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var listJson = require('./json/data.json');
gulp.task('dd', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(auto({
            browsers: ['last 2 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('dd'))
})

gulp.task('devserver', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                } else if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 0, data: listJson }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))
})

gulp.task('dev', gulp.parallel('dd', 'watch'));
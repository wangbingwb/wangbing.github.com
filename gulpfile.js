var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    //cache = require('gulp-cache'),
    del = require('del');

gulp.task("default",function(){
    gulp.run("clean");
    gulp.run("styles","scripts");
    gulp.watch('js/*.js', function(){
        gulp.run('styles', 'scripts');
    });
})
gulp.task("clean",function(){
    del(["webApp/dist/css/*","webApp/dist/js/*"]);
})

//css
gulp.task("styles",function(){
    gulp.src("css/*.css")
        .pipe(concat("common.min.css"))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifycss())
        .pipe(gulp.dest("webApp/dist/css"))
        .pipe(notify({ message:"styles task completed"}))
})
//js
gulp.task("scripts",function(){
    gulp.src("js/*.js")
        .pipe(concat("base.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("webApp/dist/js"))
        .pipe(notify({ message:"scripts task completed"}))
})
//gulp.task("htmls",function(){
//    gulp.src('html/*.html') // Ҫѹ����html�ļ�
//        .pipe(minifyHtml()) //ѹ��
//        .pipe(gulp.dest('dist/html'));
//})
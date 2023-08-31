/*
gulpfile.js
gulp task runner for angular BeersApp

Copyright (c) 2015

Patrick Crager

*/
'use strict';

// required modules
const gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace');

// build a string for cache busting
let dateCacheBuster;
let timeCacheBuster;
gulp.task('updateCacheBuster', function () {
    dateCacheBuster = new Date().toISOString().replace('-', '').split('T')[0].replace('-', '');
    timeCacheBuster = Date.now();
});

// clean previous builds
gulp.task('clean', function () {
    gulp.src('release/*/beersapp.min-*').
        pipe(clean({force: true}));
    gulp.src('partials/table-*.html').
        pipe(clean({force: true}));
});

// lint task
gulp.task('lint', function() {
    gulp.src([
        'js/controllers/**/*.js',
        'js/data/**/*.js',
        'js/directives/**/*.js',
        'js/shared/**/*.js',
        'js/*.js',
        ]).
        pipe(jshint()).
        pipe(jshint.reporter('default'));
});

// concat & minify js task
gulp.task('scripts', function() {
    gulp.src([
            'js/vendor/jquery-1.11.0.min.js',
            'js/vendor/bootstrap-3.2.0.min.js',
            'js/vendor/star-rating.min.js',
            'js/vendor/angular.min.js',
            'js/vendor/angular-route.min.js',
            'js/vendor/angular-touch.min.js',
            'js/vendor/angular-cookies.min.js',
            'js/vendor/ui-bootstrap-0.12.0.min.js',
            'js/app.js',
            'js/shared/**/*.js',
            'js/data/**/*.js',
            'js/controllers/**/*.js',
            'js/directives/**/*.js'
        ]).
        pipe(concat('beersapp.js')).
        pipe(replace(/{cacheBuster}/g, dateCacheBuster)).
        pipe(gulp.dest('release/js')).
        pipe(rename('beersapp.min-' + timeCacheBuster + '.js')).
        pipe(uglify()).
        pipe(gulp.dest('release/js'));
});

// concat & minify css task
gulp.task('css', function() {
    gulp.src([
            'css/vendor/**/*',
            'css/main.css'
        ]).
        pipe(concat('beersapp.css')).
        pipe(gulp.dest('release/css')).
        pipe(rename('beersapp.min-' + timeCacheBuster + '.css')).
        pipe(minifyCSS({
            keepSpecialComments: 0,
            processImport: false
        })).
        pipe(gulp.dest('release/css'));
});

// copy glyphicon font files
gulp.task('copyFonts', function() {
    gulp.src('css/fonts/*.*').
       pipe(gulp.dest('release/fonts'));
});

// replace old builds with new version
gulp.task('updateHtml', function () {
    gulp.src('*.html').
        pipe(replace(/beersapp\.min-[0-9]+/g, 'beersapp.min-' + timeCacheBuster)).
        pipe(gulp.dest(''));

    gulp.src('partials/table.html').
        pipe(rename('table-' + dateCacheBuster + '.html')).
        pipe(gulp.dest('partials/'));
});

// watch task
gulp.task('watch', function() {
    gulp.watch(['js/**/*.js', 'css/**/*.css', 'partials/table.html'], ['clean', 'updateCacheBuster', 'lint', 'scripts', 'css', 'updateHtml']);
});

// default task
gulp.task('default', ['clean', 'updateCacheBuster', 'lint', 'scripts', 'css', 'updateHtml', 'copyFonts', 'watch']);

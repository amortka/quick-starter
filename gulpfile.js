var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync'),
    _ = require('lodash');


var dir = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp',
    vendor: 'app/vendor'
};

var globs = {
    js: dir.app + '/{pages,components,styles}/**/*.js',
    css: dir.app + '/{pages,components,styles}/**/*.*(scss|css)',
    tmpCss: dir.tmp + '/{pages,components,styles}/**/*.*(scss|css)',
    html: dir.app + '/{pages,components,styles}/**/*.html',
    tmp: dir.tmp + '/**/*.*',
    vendor: '!' + dir.vendor + '/**'
};


gulp.task('index', function () {

    var files = [
        dir.app + '/app.js',
        globs.js,
        globs.css
    ];

    return gulp.src(dir.app + '/index.html')
        .pipe(plugins.inject(gulp.src(
            files,
            {
                read: false
            }
        ), {
            relative: true
        }))
        .pipe(gulp.dest(dir.tmp));
});

gulp.task('js', function () {

    return gulp.src([
        dir.app + '/app.js',
        globs.js,
        globs.vendor
    ])
        .pipe(plugins.debug())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        //.pipe(plugins.concat('app.js'))
        .pipe(gulp.dest(dir.tmp));
});

gulp.task('styles', function () {
    return gulp.src([
        globs.css,
        globs.vendor
    ])
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer('last 1 version'))
        .pipe(gulp.dest(dir.tmp));
});

gulp.task('serve', ['styles', 'js', 'index', 'watch'], function () {
    var files = [
        globs.tmp,
        globs.html,
        globs.css,
        globs.js,
        globs.vendor
    ];

    browserSync.init(files, {
        server: {
            baseDir: [
                dir.tmp,
                dir.app
            ],
            index: "index.html",
            routes: []
        },
        port: 3000,
        browser: 'chrome'
    });
});


/*
 watching files
 */
gulp.task('watch', function () {

    gulp.watch([dir.app + '/index.html'], ['index'], function () {
        console.log('changing index.html');
        console.log('Event type: ' + event.type); // added, changed, or deleted
        console.log('Event path: ' + event.path); // The path of the modified file
    });

    gulp.watch([
        globs.html,
        globs.css,
        globs.vendor
    ], ['styles', 'index'], function (event) {
        console.log('Event type: ' + event.type); // added, changed, or deleted
        console.log('Event path: ' + event.path); // The path of the modified file
    });

    gulp.watch([
        dir.app + '/app.js',
        globs.html,
        globs.js,
        globs.vendor
    ], ['js', 'index'], function (event) {
        console.log('Event type: ' + event.type); // added, changed, or deleted
        console.log('Event path: ' + event.path); // The path of the modified file
    });
});
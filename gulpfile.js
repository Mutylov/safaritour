/*jshint esversion: 6 */

const autoprefixer = require('gulp-autoprefixer');
const gulp = require('gulp');
const sync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const pathes = {
    scss: './public/scss',
    css: './public/css',
    js: './public/js'
};

const libs = {
    js: ['./node_modules/jquery/dist/jquery.js', './node_modules/slick-carousel/slick/slick.js'],
    scss: ['./node_modules/slick-carousel/slick/slick.scss']
};

gulp.task('sass', () =>
    gulp
        .src(['./public/scss/bace.scss'])
        .pipe(sass())
        .pipe(
            autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
                cascade: true
            })
        )
        .pipe(gulp.dest('./public/css'))
        .pipe(sync.stream())
);

gulp.task('libs', cleaning => {
    for (var type in libs) {
        gulp.src(libs[type])
            .pipe(concat('libs.' + type))
            .pipe(gulp.dest(pathes[type]));
    }
    cleaning();
});

function watch() {
    sync.init({
        server: {
            baseDir: './'
        },
        notify: false
    });
    gulp.watch('./public/scss/*.scss', gulp.parallel('sass'));
    gulp.watch(['./*.html', pathes.js + '/scripts.js']).on('change', sync.reload);
}

exports.watch = watch;

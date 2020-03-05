/*jshint esversion: 6 */

const autoprefixer = require('gulp-autoprefixer');
const gulp = require('gulp');
const sync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglifyjs');
const csso = require('gulp-csso');

const pathes = {
    scss: './public/scss',
    css: './public/css',
    js: './public/js',
    fnts: './public/fnts'
};

const libs = {
    js: ['./node_modules/jquery/dist/jquery.js', './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js'],
    css: ['./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css'],
    fnts: { fontawesome: './node_modules/@fortawesome/fontawesome-free/webfonts/**/*' }
};

gulp.task('libs_js', () => {
    return gulp
        .src(libs.js)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(pathes.js));
});

gulp.task('libs_css', () => {
    return gulp
        .src(libs.css)
        .pipe(concat('libs.css'))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(pathes.css));
});

gulp.task('libs_fnts', cleaning => {
    for (var font in libs.fnts) {
        gulp.src(libs.fnts[font]).pipe(gulp.dest(pathes.fnts + '/' + font));
    }
    cleaning();
});

gulp.task('libs', gulp.series('libs_js', 'libs_css', 'libs_fnts'));

gulp.task('sass', () =>
    gulp
        .src(['./public/scss/bace.scss'])
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('./public/css'))
        .pipe(sync.stream())
);

gulp.task('css-min', () =>
    gulp
        .src([pathes.css + '/*.css', '!' + pathes.css + '/*.min.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('libs.css'))
        .pipe(
            csso({
                restructure: false,
                comments: false
            })
        )
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/css'))
);

gulp.task('js-min', () =>
    gulp
        .src([pathes.js + '/*.js', '!' + pathes.js + '/*.min.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({ toplevel: true, outSourceMap: 'libs.min.js.map' }))
        .pipe(gulp.dest(pathes.js))
);

gulp.task('build', gulp.series('libs', 'sass', 'css-min', 'js-min'));

gulp.task('watch', () => {
    sync.init({
        server: {
            baseDir: './'
        },
        notify: false
    });
    gulp.watch('./public/scss/*.scss', gulp.parallel('sass'));
    gulp.watch(['./*.html', pathes.js + '/scripts.js']).on('change', sync.reload);
});

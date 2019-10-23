"use strict";

var syntax          = 'scss';//scss less

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    babel = require("gulp-babel"),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    svgSprite = require('gulp-svg-sprites'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    notify = require("gulp-notify"),
    del = require('del'),
    cache = require('gulp-cache');

gulp.task("htmlTemplate", function() {
    return gulp.src(['src/pages/*.html'])
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task("pugCompile", function() {
    return gulp.src(['src/pages/*.pug'])
        .pipe(plumber())
        .pipe(pug({ pretty: true }).on('error', notify.onError()))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task("pug", gulp.parallel('pugCompile', 'htmlTemplate'));

gulp.task("scripts", function () {
    return gulp.src([
        'src/scripts.js',
        'src/blocks/**/*.js'
    ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("scripts.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('styles', function () {
    return gulp.src([
        'src/styles.scss',
    ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('styles.scss'))
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8']))
        .pipe(cssnano({ zindex: false, colormin: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('libscss', function () {
    return gulp.src([
        'src/test/*.css',
        // "node_modules/swiper/dist/css/swiper.min.css",
        // "node_modules/flickity/dist/flickity.css",
        // "node_modules/flickity-fade/flickity-fade.css",
        // "node_modules/slick-carousel/slick/slick.css",

        // "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css",
        // "node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css",

        // "node_modules/daterangepicker/daterangepicker.css",
        // "node_modules/pickmeup/css/pickmeup.css",
        // "node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css",
        // "node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.min.css",
        // "src/libs/bootstrap-datepicker.standalone-theme-orange.css",
        // "node_modules/jquery-ui-dist/jquery-ui.min.css",
        // "node_modules/nouislider/distribute/nouislider.min.css",
        // "node_modules/rateyo/min/jquery.rateyo.min.css"
        //"node_modules/tippy.js/index.css",
        //"node_modules/tippy.js/themes/light.css",
    ])
        .pipe(concat('libs.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest("dist/css/"));
});

gulp.task("libsjs", function () {
    return gulp.src([
        // 'src/test/*.js',
        "node_modules/jquery/dist/jquery.min.js",//npm i --save jquery
        "node_modules/what-input/dist/what-input.js",//what-input
        // "node_modules/intersection-observer/intersection-observer.js",//npm install intersection-observer for IE

        // "node_modules/swiper/dist/js/swiper.min.js",//npm install swiper
        // "node_modules/slick-carousel/slick/slick.js",
        // "node_modules/flickity/dist/flickity.pkgd.min.js",//npm install flickity
        // "node_modules/flickity-fade/flickity-fade.js",//npm install flickity-fade

        // "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js",//npm i @fancyapps/fancybox
        // "node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js", // malihu-custom-scrollbar-plugin
        // "node_modules/nouislider/distribute/nouislider.min.js",
        // "node_modules/rateyo/min/jquery.rateyo.min.js",// rateyo
        // "node_modules/dotdotdot-js/dist/dotdotdot.js",
        // "node_modules/inputmask/dist/min/jquery.inputmask.bundle.min.js", // inputmask
        // "node_modules/jquery-validation/dist/jquery.validate.min.js", // npm i jquery-validation
        // "node_modules/jquery-validation/dist/localization/messages_ru.min.js",

        // "node_modules/pickmeup/dist/pickmeup.min.js",//календарь
        // "node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js", // bootstrap-datepicker
        // "node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min.js",
        // "node_modules/moment/min/moment.min.js",//npm install moment --save //если нужна локализация
        // "node_modules/moment/locale/ru.js",
        // "node_modules/daterangepicker/moment.min.js",//npm i daterangepicker
        // "node_modules/daterangepicker/daterangepicker.js",//npm i daterangepicker

        // "node_modules/popper.js/dist/umd/popper.js",//npm i popper.js
        // "node_modules/tippy.js/umd/index.js",//npm i tippy.js // зависим от popper.js

        // "node_modules/gsap/src/minified/TweenMax.min.js",//gsap
        // "node_modules/gsap/src/minified/TweenLite.min.js",
        // "node_modules/gsap/src/minified/TimelineMax.min.js",
        // "node_modules/gsap/src/minified/plugins/EndArrayPlugin.min.js",
        // "node_modules/gsap/src/minified/utils/Draggable.min.js",
        // "node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js", // scrollmagic
        // "node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js",
        // "node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js", //удалить перед релизом
        // "node_modules/pubsub-js/src/pubsub.js", // pubsub-js

        // "node_modules/three/build/three.min.js",//three
        // "node_modules/three-orbit-controls/index.js",//three-orbit-controls //let OrbitControls = require('three-orbit-controls')(THREE);
        // "node_modules/three-effectcomposer/index.js",//three-effectcomposer //let EffectComposer = require('three-effectcomposer')(THREE);
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'dist',
            index: "index.html",
        },
        // proxy: 'http://test.loc',
        notify: true, //false
        port: 8080,
        open: false,
        tunnel: false,
        // tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
    });
});

gulp.task('minjs', function() {
    return gulp.src([
        'src/test/*.js'
    ])
        // .pipe(babel())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({ stream: true }));
});
var srcNoMinJs = [
    'src/pages-switcher.js',
    'src/rs.js'
];
gulp.task('nominjs', function() {
    return gulp.src(srcNoMinJs)
        // .pipe(babel())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('svg', function () {
    return gulp.src('src/img/svg/*.svg')
    // remove all fill and style declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        // cheerio plugin create unnecessary string '>', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
                mode: "symbols",
                preview: false,
                selector: "icon-%f",
                svg: {
                    symbols: 'svg-sprite.html'
                }
            }
        ))
        .pipe(gulp.dest('src/img/svg'));
});
gulp.task('img', function() {
    return gulp.src('src/img/**')
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('fonts', function() {
    return gulp.src([
        'src/fonts/**'
    ])
        .pipe(gulp.dest('dist/fonts/'));
});
gulp.task('fav', function() {
    return gulp.src([
        'src/favicon/**'
    ])
        .pipe(gulp.dest('dist/favicon/'));
});
gulp.task('trans-files', function() {
    return gulp.src([
        'src/test/*.js',
        // 'src/mail.php',
        'src/toDist/**/*',
    ])
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
    cache.clearAll();
    return del(['dist'], { force:true });
});

gulp.task('watch', function () {
    //{usePolling: true}, перед gulp.parallel
    gulp.watch(['src/toDist/**/*'], {usePolling: true}, gulp.parallel('trans-files'));
    gulp.watch(['src/styles.scss', 'src/blocks/**/*.scss'], {usePolling: true}, gulp.parallel('styles'));
    gulp.watch(['src/blocks/**/*.js', 'src/scripts.js'], {usePolling: true}, gulp.parallel('scripts'));
    gulp.watch('src/img/**/*.{png,jpg,jpeg,webp,raw,svg}', {usePolling: true}, gulp.parallel('svg', 'img'));
    gulp.watch(srcNoMinJs, gulp.parallel('nominjs'));
    gulp.watch(['src/blocks/**/*.pug','src/blocks/**/*.html', 'src/pages/**/*.pug', 'src/pages/**/*.html', 'src/img/svg/svg-sprite.html'], {usePolling: true}, gulp.parallel('pug'));
});

gulp.task('trans', gulp.parallel('nominjs', 'minjs', 'fonts', 'img', 'fav', 'trans-files'));
gulp.task('dev', gulp.series('clean', gulp.parallel('pug', 'styles', 'scripts', 'libscss','libsjs', 'trans')));
gulp.task('default', gulp.parallel('browser-sync', 'watch'));
"use strict";

//require
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync");
const notify = require('gulp-notify');
const watch = require('gulp-watch');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const fs = require('fs');
const data = require('gulp-data');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
// const frontnote = require("gulp-frontnote");
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const del = require('del');
const replace = require('gulp-replace');
const connectSSI = require('connect-ssi');
const aigis = require('gulp-aigis');
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');

//path
const SRC = './src';
const HTDOCS = './public';
const BASE_PATH = '/';
const DEST = `${HTDOCS}${BASE_PATH}`;






// css
gulp.task("sass", () => {
  return gulp.src(`${SRC}/assets/scss/**/*.scss`, `!${SRC}/_**/**`)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer({
      grid: true
    }))
    // styleguideのコメントをcssに残したい場合はコメントアウトする
    .pipe(cleanCSS({
      format: 'beautify'
    }))
    .pipe(sourcemaps.write(`./`))
    .pipe(gulp.dest(`${DEST}assets/css/`))
    .pipe(browserSync.stream());

});

gulp.task('css', gulp.series('sass'));


//styleguide
gulp.task('styleguide', () => {
  return gulp.src('./aigis/aigis_config.yml')
    .pipe(aigis());
});
gulp.task('sg', gulp.parallel('styleguide'));




//js
gulp.task('browserify', () => {
  return browserify(`${SRC}/assets/js/main.js`)
    .transform(babelify, {
      presets: ['es2015']
    })
    .bundle()
    .on('error', function (err) {
      console.log(err.message);
      console.log(err.stack);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(`${DEST}assets/js/`))
    .pipe(browserSync.stream());
});

gulp.task('js', gulp.parallel('browserify'));


//html
gulp.task("ejs", () => {
  return gulp.src(
      ['src/**/*.ejs', '!src/**/_*.ejs', '!src/_**/**']
    )
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(data(function (file) {
      const conf = require(`./src/${BASE_PATH}/json/config.json`);
      const pages = require(`./src/${BASE_PATH}/json/pages.json`);
      const filePath = {};

      if (file.path.length !== 0) {
        let path = file.path.split('¥').join('/');
        path = path.split('\\').join('/');
        const filename = path.match(/^.+\/src\/(.+)\.ejs$/)[1];
        filePath.dir = path.match(/^.+\/src\//)[0];

        var meta = {};
        if (pages[filename]) {
          meta = pages[filename];
        } else {
          meta = pages.default;
        }
      }
      return {
        filePath: filePath,
        meta: meta,
        conf: conf
      };
    }))
    .pipe(ejs())
    .pipe(rename({
      extname: '.html'
    }))
    // 2行以上の空行は削除(win用にCR+LFを再変換する)
    .pipe(replace("\n", "\r\n"))
    .pipe(replace("\r\r", "\r"))
    .pipe(replace(/(\r\n){2,}/g, '\n\n'))
    .pipe(gulp.dest(`${HTDOCS}`))
    .pipe(browserSync.stream());
});

gulp.task('html', gulp.series('ejs'));


// server
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      proxy: "localhost:3000",
      baseDir: HTDOCS,
      middleware: [
        connectSSI({
          baseDir: HTDOCS,
          ext: '.html'
        })
      ]
    },
    startPath: `${BASE_PATH}`,
    ghostMode: false
  });
  watch([`${SRC}/assets/scss/**/*.scss`], gulp.series('sass'));
  watch([`${SRC}/assets/js/**/*.js`], gulp.series('browserify'));
  // watch('./src/**/*.+(jpg|jpeg|png|gif|svg)', gulp.series('image'));
  watch([`${SRC}/**/*.ejs`], gulp.series('ejs'));

});

gulp.task('server', gulp.series('browser-sync'));


//js min
gulp.task('compress', () => {
  return pump([
    gulp.src(`${DEST}assets/js/bundle.js`),
    uglify(),
    gulp.dest(`${DEST}assets/js/`)
  ], );
});


//image min
gulp.task('imagemin', () => {
  return gulp
    .src('./src/**/*.+(jpg|jpeg|png|gif|svg)', {
      base: './src/'
    })
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.svgo({
          optimizationLevel: 5
        }),
        pngquant({
          speed: 1
        })
      ])
    )
    .pipe(gulp.dest(`${DEST}`))
})

//image
gulp.task('image', () => {
  return gulp
    .src('./src/**/*.+(jpg|jpeg|png|gif|svg)', {
      base: './src/'
    })
    .pipe(plumber())
    .pipe(gulp.dest(`${DEST}`))
    .pipe(browserSync.stream());
})


//clean
gulp.task('clean', () => del([`${DEST}**/*.+(jpg|jpeg|png|gif|svg)`, `${DEST}**/*.html`]))


// default
gulp.task('dev', gulp.parallel('css', 'js', 'html'));
gulp.task('build', gulp.series('clean', 'dev', 'compress', 'imagemin'));
gulp.task('default', gulp.series('dev', 'server'));

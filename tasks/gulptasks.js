const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const minifycss = require('gulp-uglifycss');

// CONF ---------------------------------
const OUT_DIR = './prod';
const srcSCSS = './src/scss/style.scss';
const srcCriticalSCSS = './src/scss/critical.scss';
// end CONF -----------------------------

function clean(done) {
  // Clean the dist folder
  del.sync([OUT_DIR]);
  // Signal completion
  return done();
}
// TODO: add plumber

// TODO: create prod functions to minify and combine media queries
function compileSCSS(done) {
  gulp
    .src(srcSCSS)
    .pipe(
      sass({
        errLogToConsole: false,
        outputStyle: 'compact',
        precision: 10,
      })
    )
    .pipe(autoprefixer())
    // .pipe(gcmq())
    // .pipe(
    //   minifycss({
    //     maxLineLen: 1000,
    //     uglyComments: true
    //   })
    // )
    .pipe(gulp.dest(OUT_DIR))
    .pipe(browserSync.stream());
  done();
}

// function compileCriticalSCSS(done) {
//   gulp
//     .src(srcCriticalSCSS)
//     .pipe(
//       sass({
//         errLogToConsole: false,
//         outputStyle: 'compact',
//         precision: 10
//       })
//     )
//     .pipe(autoprefixer())
//     // .pipe(gcmq())
//     // .pipe(
//     //   minifycss({
//     //     maxLineLen: 1000,
//     //     uglyComments: true
//     //   })
//     // )
//     .pipe(gulp.dest(OUT_DIR));
//   done();
// }

exports.clean = clean;
exports.compileSCSS = compileSCSS;
// exports.compileCriticalSCSS = compileCriticalSCSS;

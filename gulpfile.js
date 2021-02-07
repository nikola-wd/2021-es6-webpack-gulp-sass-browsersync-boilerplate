const gulp = require('gulp');
const webpack = require('webpack');

const tasks = require('./tasks/gulptasks.js');
const { argv } = require('yargs');
const browserSync = require('browser-sync').create();

// var SITE_URL = 'quanterix';
// var projectURL = 'localhost/' + SITE_URL;

process.env.NODE_ENV = argv.production || 'development';

const webpackConfig =
  process.env.NODE_ENV === 'production'
    ? './webpack.config.prod.js'
    : './webpack.config.js';

// run webpack to compile the script into a bundle
function compile(done) {
  return new Promise((resolve, reject) => {
    webpack(require(webpackConfig), (err, stats) => {
      if (err) {
        return reject(err);
      }

      if (stats.hasErrors()) {
        return reject(new Error(stats));
      }
      resolve();
      done();
    });
  });
}

function serve(done) {
  browserSync.init(
    {
      server: {
        baseDir: './',
      },
      // proxy: projectURL,
      open: true,
    },
    done
  );
}

// TODO: optimize this task
// function watchCSS(done) {
//   return gulp.watch(
//     './src/scss/**/*.scss',
//     gulp.series(tasks.compileCriticalSCSS, tasks.compileSCSS, reload)
//   );
// }

function watchFiles(done) {
  gulp.watch(
    './src/scss/**/*',
    gulp.series(
      tasks.compileSCSS,
      // tasks.compileCriticalSCSS,
      reload
    )
  );
  gulp.watch('./src/js/**/*', gulp.series(compile, reload));
}

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('compile:scss', tasks.compileSCSS);
gulp.task(
  'server',
  gulp.series(
    tasks.clean,
    // tasks.compileCriticalSCSS,
    tasks.compileSCSS,
    compile,
    serve,
    watchFiles
  )
);

// default includes all
gulp.task(
  'default',
  gulp.series(
    tasks.clean,
    // tasks.compileCriticalSCSS,
    tasks.compileSCSS,
    compile
  )
);

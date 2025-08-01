"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const {deleteAsync} = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const terser = require("gulp-terser");

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',

].join('');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return deleteAsync(["./vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./vendor/bootstrap'));
  // Font Awesome CSS
  var fontAwesomeCSS = gulp.src('./node_modules/@fortawesome/fontawesome-free/css/**/*')
    .pipe(gulp.dest('./vendor/fontawesome-free/css'));
  // Font Awesome Webfontsn
  var fontAwesomeWebfonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
    .pipe(gulp.dest('./vendor/fontawesome-free/webfonts'));
  // jQuery Easing
  var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
    .pipe(gulp.dest('./vendor/jquery-easing'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'));
  // Simple Line Icons
  var simpleLineIconsFonts = gulp.src('./node_modules/simple-line-icons/fonts/**')
    .pipe(gulp.dest('./vendor/simple-line-icons/fonts'));
  var simpleLineIconsCSS = gulp.src('./node_modules/simple-line-icons/css/**')
    .pipe(gulp.dest('./vendor/simple-line-icons/css'));
  return merge(bootstrap, fontAwesomeCSS, fontAwesomeWebfonts, jquery, jqueryEasing, simpleLineIconsFonts, simpleLineIconsCSS);
}

// CSS task
function css() {
  return gulp
    .src(["./css/*.css", "!./css/*.min.css"]) 
    .pipe(plumber())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest("./css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./css"));
}

// JS task
function js() {
  return gulp
    .src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(terser())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'));
}

// Watch files
function watchFiles() {
  gulp.watch(["./css/*.css", "!./css/*.min.css"], css);
  gulp.watch("./js/**/*", js);
  gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const build = gulp.series(css, js);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;

const { src, dest, watch } = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

exports.buildCss = () => (
  src('./css/*.css')
    .pipe(postcss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('./css'))
);

const buildSass = () => (
  src('./css/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('./css'))
);

exports.watchSass = () => {
  watch('./web/css/sass/**/*.scss', buildSass);
};

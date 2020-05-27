import { src, dest, watch } from 'gulp';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'autoprefixer';

function buildSass() {
  return src('./css/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./css'));
}

function concatCss() {
  return src(['./css/reset.css', './css/main.css'])
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('./css/dist/'));
}

export function buildCss() {
  return src('./css/dist/style.css')
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('./css/dist/'));
}

export function watchCss() {
  watch('./css/scss/**/*.scss', function runSassTask(cb) {
    buildSass();
    cb();
  });

  watch('./css/*.css', function runCssTask(cb) {
    concatCss();
    cb();
  });
}

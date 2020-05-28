import { src, dest, watch } from 'gulp';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';

browserSync.create();

function buildSass() {
  return src('./styles/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./styles'));
}

function concatCss() {
  return src(['./styles/reset.css', './styles/main.css'])
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('./assets/css/'))
    .pipe(browserSync.stream());
}

export function buildCss() {
  return src('./assets/css/style.css')
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('./assets/css/'));
}

export function server() {
  browserSync.init({
    server: {
      baseDir: './',
    }
  });

  watch('./index.html', function reloadBrowser(cb) {
    browserSync.reload();
    cb();
  });

  watch('./styles/scss/**/*.scss', function runSassTask(cb) {
    buildSass();
    cb();
  });

  watch('./styles/*.css', function runCssTask(cb) {
    concatCss();
    cb();
  });
}

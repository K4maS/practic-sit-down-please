const { src, dest, series, watch } = require('gulp');

const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');

const cleanCss = require('gulp-clean-css');

const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify-es').default;

const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

const browserSync = require("browser-sync").create();

//common
const clean = () => {
  return del(['dist'])
}


const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/img/svg'))
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.jpeg',
    'src/img/**/*.png',
    'src/img/*.svg',
  ])
    .pipe(image())
    .pipe(dest('dist/img'))
}

const fonts = () => {
  return src([
    'src/fonts/**/*.woff',
    'src/fonts/**/*.woff2'
  ])
    .pipe(dest('dist/fonts'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
}


watch('src/img/svg/**/*.svg', svgSprites)
watch([
  'src/img/**/*.jpg',
  'src/img/**/*.jpeg',
  'src/img/**/*.png',
  'src/img/*.svg',
])
watch([
  'src/fonts/**/*.woff',
  'src/fonts/**/*.woff2'
])
//dev

const styles = () => {
  return src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCss({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())


}
const html = () => {
  return src('src/**/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const scripts = () => {
  return src([
    'src/js/main.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

watch('src/**/*.html', html)
watch('src/css/**/*.css', styles)
watch('src/js/**/*.js', scripts)

//prod

const stylesProd = () => {
  return src('src/css/**/*.css')
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCss({
      level: 2,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())



}
const htmlProd = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({ collapesWhitespace: true, }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const scriptsProd = () => {
  return src([
    'src/js/main.js'
  ])

    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pape(concat('app.js'))
    .pipe(uglify({
      toplevel: true,
    })
      .on('error', notify.onError)
    )
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

watch('src/**/*.html', htmlProd)
watch('src/css/**/*.css', stylesProd)
watch('src/js/**/*.js', scriptsProd)



// actions

exports.styles = styles;
exports.scripts = scripts;
exports.html = html;

exports.default = series(clean, fonts, html, scripts, styles, images, svgSprites, watchFiles)
exports.production = series(clean, fonts, htmlProd, scriptsProd, stylesProd, images, svgSprites, watchFiles)

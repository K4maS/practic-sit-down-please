npm install --save-dev @babel/core @babel/preset-env babel-loader browser-sync del@6.0.0 gulp gulp-autoprefixer gulp-babel gulp-clean-css gulp-cli gulp-concat gulp-htmlmin gulp-image@6.2.1 gulp-notify gulp-sourcemaps gulp-svg-sprite gulp-uglify-es htmlmin pug
#!/usr/bin/env sh

# Остановить публикацию при ошибках
set -e

# Переход в котолог сборки
cd dist

# Инициация репозитория и загрузка кода в gitHub
git init
git add -A
git commit -m 'deploy'

# f - forse!!!!!!!!!
git push -f git@github.com:K4maS/practic-high-pass.git master:gh-pages

cd -

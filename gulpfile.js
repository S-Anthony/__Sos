const gulp = require('gulp');
const webpack = require("webpack-stream");
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dist = "./dist/";
// const dist = 'D:/Programs/OpenServer/domains/Sos/';
// Static server
gulp.task('server', function() {
  browserSync.init({
      server: {
          baseDir: dist
      },
      browser: 'chrome',
      port: 4000,
  notify: true
  });
  gulp.watch(`./src/*.html`).on('change', browserSync.reload);
});

// gulp.task('styles', function() {
//   return gulp.src('src/assets/sass/*.+(scss|sass)')
//       .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//       .pipe(rename({
//           prefix: "",
//           suffix: ".min",
//       }))
//       .pipe(autoprefixer())
//       .pipe(cleanCSS({compatibility: 'ie8'}))
//       .pipe(gulp.dest(`${dist}css`))
//       .pipe(browserSync.stream()); 
// });

gulp.task('styles', function() {
  return gulp.src('src/assets/sass/*.+(scss|sass)')
      .pipe(webpack({
        mode: 'development',
        // output: {
        //     filename: 'style.scss'
        // },
        // watch: false,
        // devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
              ],
            },
          ],
        },
        plugins: [
          new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
          }),
        ]
      }))
      // .pipe(autoprefixer())
      // .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('C:/Users/Anthony/Desktop/style_output/'));
      // .on("end", browserSync.reload);
});

gulp.task('fonts', function () {
  return gulp.src("src/assets/fonts/**/*")
      .pipe(gulp.dest(`${dist}/fonts`));
});

gulp.task('assets', function () {
  return gulp.src("src/assets/*")
      .pipe(gulp.dest(dist));
});

gulp.task('watch', function() {
  gulp.watch('src/assets/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
  gulp.watch('src/*.html').on('change', gulp.parallel('html'));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series('img', 'convert-to-webp'));
  gulp.watch('src/assets/fonts/**/*').on('all', gulp.parallel('fonts'));
  gulp.watch('src/js/**/*').on('all', gulp.parallel('build-js'));
  gulp.watch('src/assets/*').on('all', gulp.parallel('assets'));
});

gulp.task('html', function () {
  return gulp.src("src/*.html")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest(dist))
      .pipe(browserSync.stream()); 
});

gulp.task("build-js", () => {
  return gulp.src("./src/js/main.js")
              .pipe(webpack({
                  mode: 'development',
                  output: {
                      filename: 'script.js'
                  },
                  watch: false,
                  devtool: "source-map",
                  module: {
                      rules: [
                        {
                          test: /\.m?js$/,
                          exclude: /(node_modules|bower_components)/,
                          use: {
                            loader: 'babel-loader',
                            options: {
                              presets: [['@babel/preset-env', {
                                  debug: true,
                                  corejs: 3,
                                  useBuiltIns: "usage"
                              }]]
                            }
                          }
                        }
                      ]
                    }
              }))
              .pipe(gulp.dest(dist))
              .on("end", browserSync.reload);
});

gulp.task("js-import-styles", () => {
  return gulp.src("./src/js/style.js")
              .pipe(webpack({

              }))
              .pipe(gulp.dest('src/assets/sass/main/'))
              .on("end", browserSync.reload);
});

gulp.task('img', function () {
  return gulp.src("src/assets/img/**/*")
      .pipe(imagemin(
        {
          verbose: true
        }
      ))
      .pipe(gulp.dest(`${dist}img`))
      .pipe(browserSync.stream()); 
});

gulp.task("build-prod-js", () => {
  return gulp.src("./src/js/main.js")
              .pipe(webpack({
                  mode: 'production',
                  output: {
                      filename: 'script.js'
                  },
                  module: {
                      rules: [
                        {
                          test: /\.m?js$/,
                          exclude: /(node_modules|bower_components)/,
                          use: {
                            loader: 'babel-loader',
                            options: {
                              presets: [['@babel/preset-env', {
                                  corejs: 3,
                                  useBuiltIns: "usage"
                              }]]
                            }
                          }
                        }
                      ]
                    }
              }))
              .pipe(gulp.dest(dist));
});

gulp.task('convert-to-webp', () => 
  gulp.src("./src/assets/img/**/*")
    .pipe(webp())
    .pipe(gulp.dest(`${dist}img`))
);

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'build-js', gulp.series('img', 'convert-to-webp'), 'fonts', 'assets'));
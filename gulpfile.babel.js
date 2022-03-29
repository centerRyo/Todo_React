import gulp from 'gulp';
import webpackConfig from './webpack.config';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';

// gulpタスクの作成
gulp.task('build', function() {
  gulp.src('src/js/app.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/js/'))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

// gulpを使ったファイルの監視
gulp.task('default', gulp.parallel('build', 'browser-sync'), function() {
  gulp.watch('./*.html', ['bs-reload']);
  gulp.watch('./src/*/*.js', ['build']);
  gulp.watch('./src/*/*/*.js', ['build']);
  gulp.watch('./dist/*/*.+(js|css)', ['bs-reload']);
  gulp.watch('./dist/*/*/*.+(js|css)', ['bs-reload']);
});

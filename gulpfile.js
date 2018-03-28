const gulp = require('gulp');

const concat = require('gulp-concat');

const browserSync = require('browser-sync').create();



const errorHandler = function (name) {
  return function (err) {
    console.error('########### ERROR ' + name.toUpperCase() + ' ############');
    // err.showStack = true;
    err.showProperties = true;
    console.error(err.toString());
    console.error('########### ERROR ' + name.toUpperCase() + ' ############');
    this.emit('end')
  };
};

gulp.task('css', function () {
  return gulp.src('css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('web/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp.src('html/**/*.html')
    .pipe(gulp.dest('web'));
});

gulp.task('build', ['css', 'html']);

gulp.task('watch', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: './web',
    },
  });

  gulp.watch('css/**/*.css', ['css']);
  gulp.watch('html/**/*.html', ['html']);
  gulp.watch('web/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);

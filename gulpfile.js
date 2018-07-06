const gulp = require('gulp');

const concat = require('gulp-concat');
const twig = require('gulp-twig');
const sass = require('gulp-sass');

const browserSync = require('browser-sync').create();



const errorHandler = function(name) {
  return function(err) {
    console.error('########### ERROR ' + name.toUpperCase() + ' ############');
    // err.showStack = true;
    err.showProperties = true;
    console.error(err.toString());
    console.error('########### ERROR ' + name.toUpperCase() + ' ############');
    this.emit('end');
  };
};

gulp.task('sass', function() {
  return gulp.src('components/**/*.sass')
    .pipe(sass().on('error', errorHandler('sass')))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('web/css'))
    .pipe(browserSync.stream());
});

gulp.task('twig', function() {
  return gulp.src(['dummy/**/*.twig', '!dummy/**/_*.twig'])
    .pipe(twig({
      namespaces: {
        'components': 'components',
      },
    }).on('error', errorHandler('twig')))
    .pipe(gulp.dest('web'));
});

gulp.task('build', ['sass', 'twig']);

gulp.task('watch', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: './web',
    },
  });

  gulp.watch('components/**/*.sass', ['sass']);
  gulp.watch(['components/**/*.twig', 'dummy/**/*.twig'], ['twig']);
  gulp.watch('web/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);

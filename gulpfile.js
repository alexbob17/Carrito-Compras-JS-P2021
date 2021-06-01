const gulp = require( 'gulp' ),
      sass = require( 'gulp-sass' ),
      autoprefixer = require( 'gulp-autoprefixer' );

/* Task: sass */
gulp .task( 'sass', () => {
   gulp .src( './scss/app.scss' )
      .pipe(
         autoprefixer({
            browsers: [ 'last 2 versions' ],
            cascade: false
         })
      )
      .pipe(
         sass({
            includePaths: [ 'scss' ]
         })
      )
      .pipe(
         gulp .dest( 'css' )
      );
});

/* Task: watch */
gulp .task( 'watch', [ 'sass' ], () => {
   gulp .watch( [ './scss/*.scss' ], [ 'sass' ] );
});

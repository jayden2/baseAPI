var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee');

//convert coffee to js
//put coffee files from /src to /dist
gulp.task('coffee', function() {
	gulp.src('./src/*.coffee')
	.pipe(coffee({bare: true}).on('error', gutil.log))
	.pipe(gulp.dest('./dist/'));
});

//convert model from coffee to js
gulp.task('c-model', function() {
	gutil.log('Gulp compiling models coffee..')
	gulp.src('./src/models/*.coffee')
	.pipe(coffee({bare: true}).on('error', gutil.log))
	.pipe(gulp.dest('./dist/models/'));
	gutil.log('Gulp completed models coffee compile')
});

//convert routes from coffee to js
gulp.task('c-routes', function() {
	gutil.log('Gulp compiling routes coffee..')
	gulp.src('./src/routes.coffee')
	.pipe(coffee({bare: true}).on('error', gutil.log))
	.pipe(gulp.dest('./dist/'));
	gutil.log('Gulp completed routes coffee compile!')
});

//convert routes from coffee to js
gulp.task('c-app', function() {
	gutil.log('Gulp compiling app coffee..')
	gulp.src('./src/app.coffee')
	.pipe(coffee({bare: true}).on('error', gutil.log))
	.pipe(gulp.dest('./dist/'));
	gutil.log('Gulp completed app coffee compile!')
});

//see if gulp is running and then do coffee task as well
gulp.task('default', function() {
	return gutil.log('Gulp up and running!')
});
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

//convert models from coffee to js
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

//convert app from coffee to js
gulp.task('c-app', function() {
	gutil.log('Gulp compiling app coffee..')
	gulp.src('./src/app.coffee')
	.pipe(coffee({bare: true}).on('error', gutil.log))
	.pipe(gulp.dest('./dist/'));
	gutil.log('Gulp completed app coffee compile!')
});

//convert user model from coffee to js
gulp.task('c-usermodel', function() {
	gutil.log('Gulp compiling user model coffee..')
	gulp.src('./src/models/user.coffee')
	.pipe(coffee({bare: true}).on('error', gutil.log))
	.pipe(gulp.dest('./dist/models/'));
	gutil.log('Gulp completed user model coffee compile!')
});

//convert connection from coffee to js
gulp.task('c-connection', function() {
	gutil.log('Gulp compiling connection coffee..')
	gulp.src('./src/connection.coffee')
	.pipe(coffee({bare: true}).on('error', gutil.log))
	.pipe(gulp.dest('./dist/'));
	gutil.log('Gulp completed connection coffee compile!')
});

//see if gulp is running and then do all coffee tasks as well
gulp.task('default', ['coffee', 'c-routes'], function() {
	return gutil.log('Gulp up and running!')
});
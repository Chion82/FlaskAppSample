var gulp = require('gulp'),
	uglify  = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	less = require('gulp-less'),
	rev = require('gulp-rev'),
	revReplace = require('gulp-rev-replace'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	flatten = require('gulp-flatten'),
	minifyHTML = require('gulp-minify-html');

var fs = require('fs'),
    path = require('path');

var app_name = 'MyWebApp';

function get_directories(srcpath) {
	return fs.readdirSync(srcpath).filter(function(file) {
		return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

gulp.task('update_dependencies', function(){
	gulp.src('bower_components/**/*.min.js')
		.pipe(gulp.dest(app_name + '/' + app_name + '/public/lib'));
});

gulp.task('update_assets', function(){
	module_list = get_directories('assets');
	for (i in module_list) {
		module_name = module_list[i];
		gulp.src('assets/' + module_name + '/**/*.*')
			.pipe(gulp.dest(app_name + '/' + app_name + '/' + module_name + '/static'));
	}
});

gulp.task('update_scripts', function(){
	module_list = get_directories('src/scripts');
	for (i in module_list) {
		module_name = module_list[i];
		gulp.src('src/scripts/' + module_name + '/**/*.js')
			.pipe(gulp.dest(app_name + '/' + app_name + '/' + module_name + '/static/js/'));
	}
});

gulp.task('compile_less', function(){
	module_list = get_directories('src/less');
	for (i in module_list) {
		module_name = module_list[i];
		gulp.src('src/less/' + module_name + '/**/*.less')
			.pipe(less({
      			paths: [ 'src/less/' + module_name + '/includes' ,'src/less/includes']
    		}))
			.pipe(gulp.dest(app_name + '/' + app_name + '/' + module_name + '/static/css'));
	}
});

gulp.task('update_templates', function(){
	module_list = get_directories('src/templates');
	for (i in module_list) {
		module_name = module_list[i];
		gulp.src('src/templates/' + module_name + '/**/*.html')
			.pipe(gulp.dest(app_name + '/' + app_name + '/' + module_name + '/templates'));
	}
});

gulp.task('bundle', function(){
	module_list = get_directories(app_name + '/' + app_name);
	for (i in module_list) {
		module_name = module_list[i];
		if (!fs.existsSync(app_name + '/' + app_name + '/' + module_name + '/templates'))
			continue;

		var assets = useref.assets({searchPath : app_name + '/' + app_name})
		gulp.src(app_name + '/' + app_name + '/' + module_name + '/templates/*.html')
			.pipe(assets)
			.pipe(gulpif('*.js',uglify()))
			.pipe(gulpif('*.css', minifyCss()))
			.pipe(rev())
			.pipe(assets.restore())
			.pipe(useref())
			.pipe(revReplace())
			.pipe(flatten())
			.pipe(gulpif('*.html', minifyHTML({conditionals: true,spare:true})))
			.pipe(gulpif('*.html',gulp.dest(app_name + '/' + app_name + '/' + module_name + '/templates/dist')))
			.pipe(gulpif('*.js',gulp.dest(app_name + '/' + app_name + '/' + module_name + '/static/js/dist')))
			.pipe(gulpif('*.css',gulp.dest(app_name + '/' + app_name + '/' + module_name + '/static/css/dist')));
	}
});

gulp.task('update_all_debug', function(){
	gulp.start('update_dependencies','update_templates', 'update_scripts', 'compile_less', 'update_assets');
	/*setTimeout(function(){
		gulp.start('bundle');
	},1000);*/
});

gulp.task('dist', function(){
	gulp.start('update_all_debug');
	setTimeout(function(){
		gulp.start('bundle');
	},3000);
})

gulp.task('watch',function(){
	gulp.watch(['**/*.*','!'+ app_name +'/**/*.*'],['update_all_debug']);
});

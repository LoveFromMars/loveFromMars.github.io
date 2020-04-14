var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglifyjs'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	del = require('del');
	
gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade : true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function() {
	return gulp.src(['app/libs/vue/dist/vue.js'])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('css-libs', function() {
	return gulp.src(['app/libs/bootstrap/dist/css/bootstrap.min.css', 'app/css/main.css'])
	.pipe(concat('main.min.css'))
	.pipe(cssnano())
	/*.pipe(rename({suffix: '.min'}))*/
	.pipe(gulp.dest('app/css/'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel ('sass'))
	gulp.watch('app/*.html', browserSync.reload)
	gulp.watch('app/js/**/*.js', browserSync.reload)
});

gulp.task('clean', function() {
	return del.sync('dist');
})

gulp.task('clear', function() {
	return cache.clearAll();
})

gulp.task('build', function() {
	del.sync('dist');
	
	var buildCss = gulp.src(['app/css/main.css', 'app/css/main.min.css'])
	.pipe(gulp.dest('dist/css'));
	
	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
	
	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));
	
	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
})

gulp.task('default', gulp.parallel('watch', 'sass', 'browser-sync', 'scripts', 'css-libs'));
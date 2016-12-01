
var gulp=require("gulp");
var connect=require("gulp-connect");
var concat = require('gulp-concat');

gulp.task("scripts",function(){
    return gulp.src('js/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
})

gulp.task("server",function(){
    connect.server({
        root: './',
        port: 4000,
        livereload: true
    });
})
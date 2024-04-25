
"use strict";

var gulp = require('gulp');

gulp.task('default', function() {
	return gulp.src("./src/images/**", { removeBOM: false, buffer: false, encoding: false })
		.pipe(gulp.dest("./dist/images/"))
});



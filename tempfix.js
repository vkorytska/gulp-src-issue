
"use strict";

var gulp = require('gulp');
var gs = require('glob-stream');
var File = require('vinyl');
var Transform = require('streamx').Transform;

// It is needed for logging files which not exist.
var fs = require('graceful-fs');
var Composer = require('stream-composer');

 function wrapVinyl() {
	 function wrapFile(globFile, callback) {
		 var file = new File(globFile);
		 callback(null, file);
	 }
	
	 return new Transform({
		 transform: wrapFile,
	 });
 }

 function streamFile(file, onRead) {
	 fs.readFile(file.path, onReadFile);

	 function onReadFile(readErr, contents) {
		 file.contents = contents;
		 onRead(readErr);
	 }
 }

 function readContents(optResolver) {
	 function readFile(file, callback) {
		 function onRead(readErr) {
			 if (readErr) {
				 return callback(readErr);
			 }
			 
			 callback(null, file);
		 }

		 return streamFile(file, onRead);
	 }

	 return new Transform({
		transform: readFile
	 });
 }
 
 var threadsafeCopy = function(sourceFiles, outputPath){
	return gs(sourceFiles)
		.pipe(wrapVinyl())
		.pipe(readContents())
		.pipe(gulp.dest(outputPath));
}

 gulp.task('default', function() {
	 return threadsafeCopy("./src/images/*.*", "./dist-fixed/images/");
 });
## Gulp 5.0 image copy issue demonstration

---

This repository has all files for the demonstration, and the results of the run.
To run it yourself, please use 'npm run gulp'. It will generate file in the 'dist/images' folder, which is visibly corrupted.
To run alternative code, which seems to work run 'npm run gulp-quickfix'. It will generate results in 'dist-fixed' folder.
Results of both runs are preserved, you can see them in the folders listed above.
The issue was reproduced on OS: Windows 10, NPM 10.5.2. 

---
Src options '{ removeBOM: false, buffer: false, encoding: false }' do not work, unlike issue [1933](https://github.com/gulpjs/gulp/issues/1933). 

---
The quick fix is inspired by: 
1. [current code](https://github.com/gulpjs/vinyl-fs/blob/master/lib/src/read-contents/read-stream.js) in vinyl-fs, which is used in gulp.src 
2. Probably [similar issue](https://github.com/aws/aws-sdk-js/issues/1628) 

---

Code words: Gulp 5.0, src(), image corruption, png, jpeg, bmp, createReadStream
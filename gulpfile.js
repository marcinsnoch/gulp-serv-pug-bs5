var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var sync = require("browser-sync").create();
var concat = require("gulp-concat");
var imagemin = require("gulp-imagemin");
var minify = require("gulp-minify");
var newer = require("gulp-newer");
var plumber = require("gulp-plumber");
var pug = require("gulp-pug");
var rename = require("gulp-rename");
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');

// BrowserSync
function browserSync(done) {
    sync.init({
        server: {
            baseDir: "./dist"
        }
    });
    done();
}

// BrowserSync Reload
function syncReload(done) {
    sync.reload();
    done();
}

// CSS task
function sassToCss() {
    return gulp.src("./src/sass/*.*")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(
            sass({ outputStyle: 'compressed' }).on('error', sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./dist/css/"))
        .pipe(sync.stream());
}

// JS Scripts
function concatJs() {
    return gulp.src("./src/js/**/*")
        .pipe(concat("application.js"))
        .pipe(gulp.dest("./dist/js/"))
        .pipe(sync.stream());
}

function compressJs() {
    return gulp.src("./dist/js/application.js")
        .pipe(
            minify({
                ext: {
                    min: ".min.js"
                },
                ignoreFiles: ["*min.js"]
            })
        )
        .pipe(gulp.dest("./dist/js/"))
        .pipe(sync.stream());
}

// Optimize Images
function images() {
    return gulp.src("./src/img/**/*")
        .pipe(newer("./dist/img"))
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/img"));
}

// Compile pug files
function pugToHtml() {
    return gulp.src("./src/views/*.pug")
        .pipe(pug({ "pretty": true }))
        .pipe(gulp.dest("./dist/"))
        .pipe(sync.stream());
}

function watchFiles() {
    gulp.watch("src/sass/**/*", sassToCss);
    gulp.watch("src/js/**/*", gulp.series(concatJs, compressJs));
    gulp.watch("src/img/**/*", images);
    gulp.watch("src/views/**/*", gulp.series(pugToHtml, syncReload));
}

gulp.task("browserSync", browserSync);
gulp.task("compressJs", compressJs);
gulp.task("concatJs", gulp.series(concatJs, compressJs));
gulp.task("css", sassToCss);
gulp.task("images", images);
gulp.task("pugToHtml", pugToHtml);
gulp.task("watch", gulp.parallel(watchFiles, browserSync));
gulp.task("default", gulp.parallel(sassToCss, images, concatJs, pugToHtml));

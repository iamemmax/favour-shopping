'use strict'

const {dest, src, series, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"))


function buildTask(){
    return src("./public/sass/**/*.scss")
        .pipe(sass())
        .pipe(dest("./public/css"))
}

function watchTask(){
    watch(["./public/sass/**/*.scss"], buildTask)
}

exports.default = series(buildTask, watchTask)

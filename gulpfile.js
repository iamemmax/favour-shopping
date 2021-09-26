'use strict'

const {dest, src, series, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"))


function buildTask(){
    return src("sass/**/*.scss")
        .pipe(sass())
        .pipe(dest("css"))
}

function watchTask(){
    watch(["sass/**/*.scss"], buildTask)
}

exports.default = series(buildTask, watchTask)

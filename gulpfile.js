'use strict'

const {dest, src, series, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"))
const purgecss = require("purgecss")


function buildTask(){
    return src("./public/sass/**/*.scss")
        .pipe(sass())
        // .pipe(purgecss({content:['*.'] }))
        .pipe(dest("./public/css"))
}

function watchTask(){
    watch(["./public/sass/**/*.scss"], buildTask)
}

exports.default = series(buildTask, watchTask)

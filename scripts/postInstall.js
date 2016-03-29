#!/usr/bin/env node

var Browserify = require("browserify");
var UglifyJS = require("uglify-js");
var fs = require("fs");
var Q = require("q");

var env = process.env.NODE_ENV;

if (typeof env === "undefined" || env === "development") {
    doDev();
}

if (env === "production") {
    doProd()
        .fin(exit)
        .done();
}

function doDev() {
    exit();
}

function doProd() {
    var deferred = Q.defer();

    var b = Browserify("./client/js/index.js", {
        debug: false,
        transform: [
            "browserify-shim"
        ]
    });

    var writeStream = fs.createWriteStream("./public/bundle.js");
    writeStream.on("finish", deferred.resolve);

    b.bundle(function(error, buf) {
        if (!error && buf) {
            var result = UglifyJS.minify(buf.toString(), {fromString: true});
            writeStream.write(result.code);
            writeStream.end();
        } else {
            deferred.reject();
        }
    });

    return deferred.promise;
}

function exit() {
    console.log("exit");
    process.exit(0);
}
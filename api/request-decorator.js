var request = require('request');
require("request-debug")(request);

var TokenProvider = require('./token-provider');
var tokenProvider = new TokenProvider();

function getHeaders(callback) {
    tokenProvider.getToken(function(token) {
        var headers = {
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.8,uk;q=0.6",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "GV-Ajax": "1",
            "GV-Referer": "http://booking.uz.gov.ua/",
            "GV-Screen": "1600x1200",
            "GV-Token": token,
            "GV-Unique-Host": "1",
            "Host": "booking.uz.gov.ua",
            "Origin": "http://booking.uz.gov.ua",
            "Referer": "http://booking.uz.gov.ua/",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"
        };

        callback(headers);
    });
}

function verbFunc(verb) {
    return function(options, callback) {
        options.jar = true;
        options.gzip = true;

        getHeaders(function(headers) {
            if (typeof options.headers === "undefined") {
                options.headers = headers;
            } else {
                for (var key in headers) {
                    if (typeof options.headers[key] === "undefined") {
                        options.headers[key] = headers[key];
                    }
                }
            }
            request[verb](options, callback);
        });
    }
}

exports.get = verbFunc('get');
exports.post = verbFunc('post');
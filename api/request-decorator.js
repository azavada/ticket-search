var request = require('request');
//require('request-debug')(request);

var TokenProvider = require('./token-provider');
var tokenProvider = new TokenProvider();

function getHeaders(callback) {
    tokenProvider.getToken(function(token) {
        var headers = {
            "GV-Token": token,
            "GV-Referer": "http://booking.uz.gov.ua/",
            "GV-Ajax": "1",
            "GV-Unique-Host": "1",
            "GV-Screen": "1600x1200",
            "GV-Referer-Src-Jump": "1",
            "GV-Referer-Src": "http://booking.uz.gov.ua/",

            "Accept-Language": "en-US,en;q=0.8,uk;q=0.6",
            "Accept": "*/*",

            "Origin": "http://booking.uz.gov.ua",
            "Referer": "http://booking.uz.gov.ua/",

            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
//        "Content-Type": "application/x-www-form-urlencoded"
        };

        callback(headers);
    });
}

function verbFunc(verb) {
    return function(options, callback) {
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
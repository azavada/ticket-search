function context() {
    var $$_;
    var $v = {
        rot13: function(){},
        domReady: function() {}
    };
    var $$v = function() {
        return {
            attach: function(){}
        }
    };

    var GV = {
        site: {
            email_support: {}
        }
    };

    var document = {
        createElement: function(){
            return {};
        },

        location: {},

        getElementsByTagName: function(){
            return [{
                parentNode: {
                    insertBefore: function(){}
                }
            }];
        }
    };

    localStorage.setItem = function(keyName, keyValue) {
        if (keyName === 'gv-token') {
            exit(keyValue);
        }
    }
}

function TokenLoader() {
    var request = require('request');
    require("request-debug")(request);

    var htmlParser = require('./html-parser');
    var SandCastle = require('sandcastle').SandCastle;
    var contextString = context.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];

    function loadToken(script, callback) {
        var sandcastle = new SandCastle();

        var code = "exports.main = function() {"  + contextString + script + "}";
        var worker = sandcastle.createScript(code);

        worker.on('exit', function(err, output) {
            if (!err) {
                callback(output);
            } else {
                callback("");
            }
        });

        worker.run({localStorage: {}});
    }

    function handleResponse(error, response, body, callback) {
        if (!error && response.statusCode === 200) {

            htmlParser.getScripts(body, function(scripts) {
                if (scripts.length > 0) {
                    var script = scripts[scripts.length - 1];
                    loadToken(script, callback);
                }
            });

        }
    }

    this.load = function(callback) {
        var options = {
            url: "http://booking.uz.gov.ua/",
            encoding: 'utf8',
            jar: true,
            gzip: true,

            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.8,uk;q=0.6",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Host": "booking.uz.gov.ua",
                "Pragma": "no-cache",
                "Referer": "http://booking.uz.gov.ua/en/",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)" +
                    "Chrome/47.0.2526.106 Safari/537.36"
            }
        };

        request.get(options, function(error, response, body) {
            handleResponse(error, response, body, callback)
        });
    }
}

module.exports = TokenLoader;

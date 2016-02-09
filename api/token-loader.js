function context() {
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

    this.localStorage = {
        setItem : function(keyName, keyValue) {
            var obj = {};
            obj[keyName] = keyValue;
            postMessage(obj);
        }
    };
}

function tokenLoader() {
    var cheerio = require('cheerio');
    var sandbox = require("sandbox");
    var request = require('request');
    require('request-debug')(request);

    var contextString = context.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];

    function handleResponse(error, response, body, callback) {
        var html = cheerio.load(body);
        console.log("error", error);
        console.log("body", body);
        var script = html('script').get()[7].children[0].data;
        var worker = new sandbox();

        worker.run(contextString + script);
        worker.on('message', function(message) {
            console.log(message);
            callback(message["gv-token"]);
        });
    }

    this.load = function(callback) {
        var options = {
            url: "http://booking.uz.gov.ua/",
//            url: "http://localhost:56789/",
            encoding: "utf8",
            followAllRedirects: true,
            followRedirects: true,

            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, sdch",
                "Accept-Language": "en-US,en;q=0.8,uk;q=0.6",
                "Cache-Control": "max-age=0",
                "Connection": "keep-alive",
                "Host": "booking.uz.gov.ua",
                "Upgrade-Insecure-Requests": 1,
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
            }
        };

        request.get(options, function(error, response, body) {
            handleResponse(error, response, body, callback)
        });
    }
}

module.exports = new tokenLoader();

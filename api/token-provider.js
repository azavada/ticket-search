var TokenLoader = require('./token-loader');
var TokenInterval = require('./token-interval');

function TokenProvider() {
    var loader = new TokenLoader();
    var interval = new TokenInterval();

    var token;
    var callback = function(){};

    interval.addRoutine(function () {
        loader.load(function (tkn) {
            token = tkn;
            callback(token);
            callback = function(){};
        });
    });

    this.getToken = function(func) {
        if (typeof token === "undefined") {
            callback = func;
        } else {
            func(token);
        }
    }
}

module.exports = TokenProvider;
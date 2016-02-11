var TokenLoader = require('./token-loader');
var TokenInterval = require('./token-interval');

function TokenProvider() {
    var loader = new TokenLoader();
    var interval = new TokenInterval();

    this.getToken = function(callback) {
        interval.addRoutine(function() {
            loader.load(function(token) {
                callback(token);
            });
        });
    }
}

module.exports = TokenProvider;
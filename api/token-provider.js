var loader = require('./token-loader');
var interval = require('./token-interval');

function tokenProvider() {
    this.getToken = function(callback) {
        interval.addRoutine(function() {
            loader.load(function(token) {
                console.log(token);
            });
        });
    }
}

module.exports = new tokenProvider().getToken();
var htmlparser = require("htmlparser2");

module.exports.getScripts = function (html, callback) {
    var scripts = [];

    var save = false;
    var parser = new htmlparser.Parser({
        onopentag: function (name, attribs) {
            if (name === "script") {
                save = true;
            }
        },
        ontext: function (text) {
            if (save === true) {
                scripts.push(text);
            }
        },
        onclosetag: function (tagname) {
            if (tagname === "script") {
                save = false;
            }
        },

        onend: function () {
            callback(scripts);
        }
    }, {decodeEntities: true});
    parser.write(html);
    parser.end();
};
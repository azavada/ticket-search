function jsonToQueryString(json) {
    var string = "";
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            string += key + "=" + encodeURIComponent(json[key]) + "&";
        }
    }

    return string.slice(0, -1);
}

exports.findTickets = function(params, callback) {
    var request = require("./request-decorator");

    var postData = {
        station_id_from: params.from_id,
        station_id_till: params.to_id,
        station_from: params.from_name,
        station_till: params.to_name,
        date_dep: params.when,
        time_dep: "00:00",
        time_dep_till: "",
        another_ec: "0",
        search: ""
    };

    var options = {
        url: "http://booking.uz.gov.ua/purchase/search/",
        json: true,
        encoding: "utf8",
        body: jsonToQueryString(postData)
    };

    request.post(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(body.value);
        } else {
            callback({});
        }
    });
};
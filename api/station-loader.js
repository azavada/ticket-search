var request = require("request");

module.exports.getStation = function(stationName, callback) {
    var encoded = encodeURIComponent(stationName);

    var options = {
        url: "http://booking.uz.gov.ua/purchase/station/" + encoded + "/",
        json: true,
        encoding: "utf8"
    };

    request.post(options, function(error, response, body) {
        var result = [];

        if (body && body.value && body.value.length > 0) {
            body.value.forEach(function(station){
                var obj = {
                    id: station.station_id ? station.station_id : "",
                    title: station.title ? station.title : ""
                };

                result.push(obj);
            });
        }

        callback(result);
    });
};
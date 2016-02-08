var express = require('express');
var router = express.Router();
var stationLoader = new StationLoader();

router.get('/:name', function(req, res, next) {
    stationLoader.getStation(req.params.name, function(obj) {
        res.send(obj);
    });
});

function StationLoader() {
    var request = require("request");

    this.getStation = function(stationName, callback) {
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
    }
}

module.exports = router;

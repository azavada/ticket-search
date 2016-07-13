var $ = require('jquery');
require("jquery-ui");
require('bootstrap');
require('bootstrap-datepicker');
require('bootstrap-datepicker-ua');

var AutoComplete = require('./auto-complete');

$(function () {
    var autoComplete = new AutoComplete();
    function enableDateTimePicker() {
        $.fn.bootstrapDP = $.fn.datepicker.noConflict();

        $('#when').bootstrapDP({
            format: "dd.mm.yyyy",
            startDate: new Date(),
            weekStart: 1,
            todayBtn: true,
            language: "uk",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });

    }

    function addSearchButtonHandler() {
        $("#search").on("click", function () {
            var $from = $("#from");
            var $to = $("#to");
            var $when = $('#when');
            var query = $.param({
                from_id: $from.attr("data-value"),
                from_name: $from.val(),
                to_id: $to.attr("data-value"),
                to_name: $to.val(),
                when: $when.val()
            });

            $.ajax({
                url: 'api/tickets?' + query
            }).done(function (data) {

                var table = $("tbody");
                data.forEach(function(el) {
                    var tr = $("<tr>").appendTo(table);
                    $("<td>").append(el.num).appendTo(tr);
                    $("<td>").append(el.from.station).appendTo(tr);
                    $("<td>").append(el.till.station).appendTo(tr);
                    $("<td>").append(el.from.src_date).appendTo(tr);
                    $("<td>").append(el.till.src_date).appendTo(tr);
                    $("<td>").append(el.travel_time).appendTo(tr);
                });
            });
        });
    }

    function getTodayDate() {
        var today = new Date();
        var dd = today.getDate() + 1;
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        return dd + "." + mm + "." + yyyy;
    }

    autoComplete.add("#from");
    autoComplete.add("#to");

    addSearchButtonHandler();
    enableDateTimePicker();
});
$(function () {
    var autoComplete = new AutoComplete();

    function addSearchButtonHandler() {
        $("#search").on("click", function () {
            var $from = $("#from");
            var $to = $("#to");
            var query = $.param({
                from_id: $from.attr("data-value"),
                from_name: $from.val(),
                to_id: $to.attr("data-value"),
                to_name: $to.val(),
                when: getTodayDate()
            });

            $.ajax({
                url: 'api/tickets?' + query
            }).done(function (data) {
                console.log(data);
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
});
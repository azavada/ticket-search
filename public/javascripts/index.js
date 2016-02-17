$(function () {
    function addAutoComplete(selector) {
        var options = {
            source: function (request, response) {
                $.ajax({
                    url: 'api/station/' + request.term
                }).done(function (data) {
                    var result = [];
                    data.forEach(function (element) {
                        result.push(element.title);
                    });
                    response(result);
                });
            },

            appendTo: "body .container .form-group",
            minLength: 2,
            messages: {
                noResults: '',
                results: function () {
                }
            }
        };

        function renderItem(ul, item) {
            return $("<li>")
                .attr("data-value", item.value)
                .addClass("input-lg")
                .append(item.label)
                .appendTo(ul);
        }

        $(selector)
            .autocomplete(options)
            .data('ui-autocomplete')
            ._renderItem = renderItem
    }

    function addSearchButtonHandler() {
        $("#search").on("click", function () {
            var query = $.param({
                from: $("#from").val(),
                to: $("#to").val(),
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
        var dd = today.getDate();
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

    addAutoComplete("#from");
    addAutoComplete("#to");
    addSearchButtonHandler();
});
$(function() {
    function addAutoComplete(selector) {
        var options = {
            source: function (request, response) {
                $.ajax({
                    url: 'api/station/' + encodeURIComponent(request.term)
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

        function renderItem (ul, item) {
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

    addAutoComplete("#from");
    addAutoComplete("#to");
});
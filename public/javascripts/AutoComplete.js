function AutoComplete() {
    var options = {
        source: source,
        select: select,
        appendTo: "body .container .form-group",
        minLength: 2,
        messages: {
            noResults: '',
            results: function () {}
        }
    };

    function renderItem(ul, item) {
        return $("<li>")
            .attr("data-value", item.value)
            .addClass("input-lg")
            .append(item.label)
            .appendTo(ul);
    }

    function source(request, response) {
        $.ajax({
            url: 'api/station/' + request.term
        }).done(function (data) {
            var result = [];
            data.forEach(function (element) {
                result.push({label: element.title, value: element.id});
            });
            response(result);
        });
    }

    function select(event, ui) {
        $(this).attr("data-value", ui.item.value);
        $(this).val(ui.item.label);

        return false;
    }

    this.add = function(selector) {
        return $(selector)
            .autocomplete(options)
            .data('ui-autocomplete')
            ._renderItem = renderItem;
    }
}
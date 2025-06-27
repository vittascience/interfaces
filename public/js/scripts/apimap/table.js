function resetTable(resp) {
    let keys = Object.keys(resp.data);
    let tableHtml = "<table class=\"table ms-auto\" style=\"width:95%;\">\n" +
        "                            <thead>\n" +
        "                            <tr>\n" +
        "                                <th scope=\"col\">#</th>\n" +
        "                                <th scope=\"col\">Nom</th>\n" +
        "                                <th scope=\"col\">Valeur</th>\n" +
        "                            </tr>\n" +
        "                            </thead>\n" +
        "                            <tbody>\n";

    let i = 0;
    keys.forEach(function(key) {
        ++i;
        tableHtml += '<tr data-rowid="'+i+'">' +
            '<td scope="row">'+i+'</td>' +
            '<td class="table-name">'+key+'</td>' +
            '<td class="table-value">'+resp.data[key]+'</td>' +
            '</tr>'
    });

    tableHtml += "                            </tbody>\n" +
        "                        </table>";
    $('#apimap-graph-table').html(tableHtml);
}

function updateTable(resp) {
    let keys = Object.keys(resp.data);
    if (keys.length !== numberData)
        resetTable(resp);
    else {
        let rows = $('[data-rowid]');
        for (let i = 0; i < rows.length; i++) {
            $(rows[i]).find('.table-name').html(keys[i]);
            $(rows[i]).find('.table-value').html(resp.data[keys[i]]);
        }
    }
}
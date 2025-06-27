var cols_array = [];
var datas_array = [];
var view_array = [];
var size_array = 0;

google.charts.load('current', {
    callback: function () {
        var chart = new google.visualization.LineChart(document.getElementById('traceur'));
        var stop = 0;
        var options = {
            'title': 'Data from Arduino',
            hAxis: {
                title: 'Time (in s)'
            },
            vAxis: {
                title: 'datas'
            },
            width: 1200,
            height: 700
        };

        var data;
        var formatDate = new google.visualization.DateFormat({
            pattern: 'hh:mm:ss'
        });

        setInterval(updateChart, 500);

        function updateChart() {
            if (size_array == datas_array.length)
                return (0);
            data = {};
            data = new google.visualization.DataTable();
            data.addColumn('datetime', 'Time');
            for (var i = 1; i < cols_array.length; i++) {
                data.addColumn('number', cols_array[i]);
            }
            //all col added
            data.addRows(datas_array);
            formatDate.format(data, 0);
            chart.draw(data, options);
            ++size_array;
        }
    },
    packages: ['corechart'],
    language: getCookie('lng'),
});


function sendData(datas) {
    var datas_array_splitted = parsing(datas);
    var new_data = [];
    var i = 0;

    if (size_array == 0) {
        for (i = 0; i < datas_array_splitted.length; i++) {
            cols_array[i + 1] = datas_array_splitted[i][0];
            new_data[i + 1] = parseInt(datas_array_splitted[i][1]);
        }
        new_data[0] = new Date();
        datas_array.push(new_data);
        //cols and datas added to array
    } else {
        //sinon on met juste les nouvelles données
        if (datas_array_splitted.length + 1 != cols_array.length)
            return (-1);
        //check que ce soir les mêmes keys
        for (i = 1; i < cols_array.length; i++) {
            if (cols_array[i] != datas_array_splitted[i - 1][0])
                return (-1);
        }
        for (i = 0; i < datas_array_splitted.length; i++) {
            new_data[i + 1] = parseInt(datas_array_splitted[i][1]);
        }
        new_data[0] = new Date();
        datas_array.push(new_data);
    }
}

function parsing(datas) {
    var datas_array = datas.split(/\s+/g).join(':').split(':');
    var new_datas = [];
    var size = datas_array.length / 2;

    for (var i = 0; i < datas_array.length; i += 2) {
        new_datas[i / 2] = [datas_array[i], datas_array[i + 1]];
    }
    return (new_datas);
}
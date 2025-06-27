let update = 0;
let dataChartPie = [];
let optionsChartPie = {
    title: 'Pie graph',
    pieHole: 0.4
};
let chartPie;
let lastUpdateCheck = "";

function initPie(resp) {
    if (dataChartPie.length === 0) {
        //create dataArray
        let header = ['Nom', 'Valeur'];
        let keys = Object.keys(resp.data);
        dataChartPie.push(header);

        let dataPie = [];
        keys.forEach(function (key) {
            dataPie.push(key);
            dataPie.push(parseFloat(resp.data[key]));
            dataChartPie.push(dataPie);
            dataPie = [];
        });

        //create divToSVG
        $('#apimap-graph-pie').append('<div id="pieChart"></div>');

        chartPie = new google.visualization.PieChart(document.getElementById('pieChart'));
        chartPie.draw(google.visualization.arrayToDataTable(dataChartPie), optionsChartPie);
    } else {
        dataChartPie = [];
    }
}

function checkDataPie(resp) {
    let keys = Object.keys(resp.data);

    if (keys.lastUpdate !== lastUpdateCheck) {
        lastUpdateCheck = keys.lastUpdate;
        return false;
    }
    if (keys.length !== numberData)
        return false;
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== dataChartPie[i + 1][0])
            return false;
        if (parseFloat(resp.data[keys[i]]) !== dataChartPie[i + 1][1])
            return false;
    }
    return true;
}

function updatePie(resp) {
    let keys = Object.keys(resp.data);
    if (keys.length !== numberData) {
        dataChartPie = [];
        initPie(resp);
    } else {
        //update it
        if (!checkDataPie(resp)) {
            update = 1;
            for (let i = 1; i < keys.length + 1; i++) {
                dataChartPie[i][0] = keys[i - 1];
                dataChartPie[i][1] = parseFloat(resp.data[keys[i-1]]);
            }
            chartPie.draw(google.visualization.arrayToDataTable(dataChartPie), optionsChartPie);
        }
    }
}

let dataChartLine;
let optionsChartLine = {
    hAxis: {
        title: 'Temps'
    },
    vAxis: {
        title: 'Valeur'
    },
    width: 600,
    height:350,
};
let chartLine;
let chartLineView;

function initLine(resp) {
    let keys = Object.keys(resp.data);
    let data = [];

    dataChartLine = new google.visualization.DataTable();
    data.push(convertDate(resp.lastUpdate));
    dataChartLine.addColumn('date', 'time');
    keys.forEach(function(key) {
        data.push(parseFloat(resp.data[key]));
        dataChartLine.addColumn('number', key);
        console.log('col added : ' + key);
    });
    dataChartLine.addRow(data);

    $('#apimap-graph-line').append('<div id="lineChart"></div>');

    chartLineView = new google.visualization.DataView(dataChartLine);
    chartLine = new google.visualization.LineChart(document.getElementById('lineChart'));
    chartLine.draw(chartLineView, optionsChartLine);
}

function updateLine(resp) {
    let keys = Object.keys(resp.data);
    if (keys.length !== numberData) {
        dataChartLine = {};
        initLine(resp);
    } else {
        if (update === 1) {
            let data = [];
            data.push(new Date(resp.lastUpdate));
            keys.forEach(function(key) {
                data.push(parseFloat(resp.data[key]));
            });
            dataChartLine.addRow(data);
            let numberofRows = dataChartLine.getNumberOfRows();
            if (numberofRows >= 30) {
                let minRowToShow = numberofRows - 30;
                chartLineView.setRows(minRowToShow, numberofRows - 1);
                console.log('filtering');
            }
            console.log('drawing');
            chartLine.draw(chartLineView, optionsChartLine);
        }
    }
}

function convertDate(date) {
    return new Date(date);
}
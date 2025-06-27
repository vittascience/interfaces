var chart;
var option, originalOption;

let numberOfValuesSelect = document.getElementById("tracer-values");
const minY = document.getElementById("minY");
const maxY = document.getElementById("maxY");
const currentSeriesDisplay = document.getElementById("tracer-select");
const smoothChartSwitch = document.getElementById("tracer-smooth");
const colors = ["#22B573", "#FC7417", "#3FA9F5", "#F9D142", "#dc3545", "#1A6DA8"];

option = {
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'time',
        // style the timestamp to only display the time
        axisLabel: {
            formatter: function (value, index) {
                var date = new Date(value);
                var texts = [date.getHours(), date.getMinutes(), date.getSeconds()];
                return texts.join(':');
            }
        },
        data: []
    },
    legend: {
        show: false,
        layout: 'horizontal'
    },
    yAxis: {
        type: 'value'
    },
    series: [],
};

originalOption = option;

function updateChart(data) {
    if (chart != undefined) {
        option = chart.getOption();
    }
    
    if (typeof SerialAPI === 'undefined' || (SerialAPI && !SerialAPI.isDownloading) || (typeof InterfaceConnection !== 'undefined' && InterfaceConnection.serial && !InterfaceConnection.serial.isDownloading)) {
        if (InterfaceMonitor.tooltips) {
            if (InterfaceMonitor.tooltips.graphButton === false) {
                $("#monitor-graph-tooltip").localize().show();
                $("#monitor-graph-tooltip .interface-tooltip__header-close-btn").click(function () {
                    $('#monitor-graph-tooltip').hide();
                });
                InterfaceMonitor.tooltips.graphButton = true;
            }
            if (InterfaceMonitor.tooltips.monitorToggler === false && $('#monitor').hasClass('monitor-closed')) {
                $("#monitor-toggler-tooltip").localize().show();
                $("#monitor-toggler-tooltip .interface-tooltip__header-close-btn").click(function () {
                    $('#monitor-toggler-tooltip').hide();
                });
                InterfaceMonitor.tooltips.monitorToggler = true;
            }
        }
    }

    if (option.series.length + 1 < data.length) {
        // if we need to update the number of series because there is more data incoming
        addSeriesInChart(data);
    } else if (option.series.length + 1 > data.length) {
        // if we need to reset because there is less data incoming
        chart.setOption(originalOption, true);
    } else {
        addDataInSeries(data);
    }

    // resize the chart
    chart.resize()
};

function addSeriesInChart(data) {

    if (chart == undefined) {
        initChart();
        return;
    }

    currentSeriesDisplay.innerHTML = "";
    option = chart.getOption();

    // Creation of the "All Data" option
    let allDataOption = document.createElement("option");
    allDataOption.innerHTML = jsonPath("code.monitor.controls.text.menu.allData");
    allDataOption.value = 'allData';
    currentSeriesDisplay.appendChild(allDataOption);

    for (let i = 1; i < data.length; i++) {
        let dataOption = document.createElement("option");
        dataOption.innerHTML = data[i][0];
        dataOption.value = data[i][0];
        currentSeriesDisplay.appendChild(dataOption);

        // create a new series    
        let newSeries = {
            data: [],
            type: 'line',
            smooth: $('#tracer-smooth').prop('checked'),
            itemStyle: {
                // check if the color is defined in the data
                color: colors[i - 1] == undefined ? colors[i % colors.length] : colors[i - 1]
            },
            name: data[i][0],
            animationDuration: 0,
        };

        // set existing option.series in seriesData
        seriesData = Array.from(chart.getOption().series);
        seriesData.push(newSeries);

        // update series
        chart.setOption({
            series: seriesData
        });

        // add series to the #tracer-select
        let newOption = document.createElement("option");
        newOption.value = data[i][0];
        newOption.text = data[i][0];
    }
    addDataInSeries(data);

    // resize the chart
    chart.resize();
}

function addDataInSeries(data) {
    // add time in xAxis
    let time = new Date(data[0][1]);
    let timeData = Array.from(chart.getOption().xAxis[0].data);
    timeData.push(time);
    chart.setOption({
        xAxis: {
            data: timeData
        }
    });

    // add data in series
    for (let i = 1; i < data.length; i++) {

        let currentTimestamp = data[0][1];
        let currentData = {
            name: data[i][0],
            value: data[i][1]
        }

        // update series name
        let currentSeries = Array.from(chart.getOption().series);

        if (currentSeries[i - 1].name != currentData.name) {
            currentSeries[i - 1].name = currentData.name;
        }

        // x axis data is stored after the colum with index 0
        currentSeries[i - 1].data.push([currentTimestamp, currentData.value]);

        // if the number of data is greater than the number of values to display, we remove the first one
        while (currentSeries[i - 1].data.length > numberOfValuesSelect.value) {
            currentSeries[i - 1].data.shift();
        }

        // update series data
        chart.setOption({
            series: currentSeries
        });
    }
    updateCheckbox(data);
    // resize the chart
    chart.resize();
}

function updateCheckbox(data) {
    const checkboxesContainer = document.getElementById("data-name");
    checkboxesContainer.innerHTML = "";
    for (let i = 1; i < data.length; i++) {
        const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("form-check");

        const checkboxLabel = document.createElement("label");
        const checkboxInput = document.createElement("input");

        checkboxInput.type = "checkbox";
        checkboxInput.classList.add("form-check-input");
        checkboxInput.classList.add("regressi-data");
        checkboxInput.value = data[i][0];
        checkboxInput.checked = true;

        checkboxLabel.classList.add("form-check-label");
        checkboxLabel.appendChild(document.createTextNode(data[i][0]));

        checkboxContainer.appendChild(checkboxInput);
        checkboxContainer.appendChild(checkboxLabel);
        checkboxesContainer.appendChild(checkboxContainer);
    }
}

function initChart(isReset = false) {
    if (chart != undefined) {
        return;
    }

    chart = echarts.init(document.getElementById('traceur'), null, {
        renderer: 'canvas'
    });
    if (isReset) {
        chart.setOption(originalOption, true);
    } else {
        chart.setOption(option);
        const graphTab = document.getElementById("graph-tab");
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === graphTab) {
                    chart.resize();
                }
            }
        });
        resizeObserver.observe(graphTab);
    }

    // min max event listener
    minY.addEventListener("change", function () {
        chart.setOption({
            yAxis: {
                min: minY.value
            }
        });
    });

    maxY.addEventListener("change", function () {
        chart.setOption({
            yAxis: {
                max: maxY.value
            }
        });
    });

    currentSeriesDisplay.addEventListener("change", function () {
        if (currentSeriesDisplay.value == "allData") {
            chart.dispatchAction({
                type: 'legendAllSelect'
            });
            return
        }

        let currentSeries = Array.from(chart.getOption().series);
        for (let i = 0; i < currentSeries.length; i++) {
            if (currentSeries[i].name == currentSeriesDisplay.value) {
                chart.dispatchAction({
                    type: 'legendSelect',
                    name: currentSeries[i].name
                });
            } else {
                chart.dispatchAction({
                    type: 'legendUnSelect',
                    name: currentSeries[i].name
                });
            }
        }
    });

    if (smoothChartSwitch) {
        smoothChartSwitch.addEventListener("change", function () {
            let currentSeries = Array.from(chart.getOption().series);
            for (let i = 0; i < currentSeries.length; i++) {
                currentSeries[i].smooth = smoothChartSwitch.checked;
            }
            chart.setOption({
                series: currentSeries
            });
        });
    }

}

function reset_traceur() {
    option = originalOption;
    chart = undefined;

    // reset the chart
    initChart(true);
}

$("#init-traceur").on('click', function () {
    reset_traceur();
});

function exportInCSV() {
    if (chart == undefined) {
        console.error("Chart is undefined");
        document.querySelector("#csv > div.alert-warning").style.display = "block";
        setTimeout(function () {
            document.querySelector("#csv > div.alert-warning").style.display = "none";
        }, 5000);
        return;
    }

    // create a csv file based off all data present in the chart and add the name of the series + the time
    let csvContent = "time;";

    let series = chart.getOption().series;
    for (let i = 0; i < series.length; i++) {
        csvContent += series[i].name + ";";
    }

    for (let i = 0; i < series[0].data.length; i++) {
        // add date from timestamp
        let date = new Date(series[0].data[i][0]);
        // display date as dd/mm/yyyy hh:mm:ss with padded numbers
        csvContent += "\n" + date.getDate().toString().padStart(2, '0') + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getFullYear() + " " + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0') + ";";
        // add data
        for (let j = 0; j < series.length; j++) {
            csvContent += series[j].data[i][1] + ";";
        }
    }
    downloadFile(csvContent, "data:text/csv;charset=utf-8", "csv");
}

function exportInTXT() {
    if (chart == undefined) {
        console.error("Chart is undefined");
        document.querySelector("#txt > div.alert-warning").style.display = "block";
        setTimeout(function () {
            document.querySelector("#txt > div.alert-warning").style.display = "none";
        }, 5000);
        return;
    }

    // Crée un contenu TXT basé sur les données sélectionnées dans les cases à cocher
    let txtContent = "";
    txtContent += "time\t";

    const series = chart.getOption().series;
    const checkboxesSelector = document.querySelectorAll(".regressi-data");

    // Récupérez les valeurs des cases cochées
    const selectedValues = Array.from(checkboxesSelector)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Ajoute les noms de série correspondants aux cases cochées
    selectedValues.forEach(value => {
        const seriesName = series.find(s => s.name === value);
        if (seriesName) {
            txtContent += seriesName.name + "\t";
        }
    });

    txtContent = txtContent.trim() + "\n";

    for (let i = 0; i < series[0].data.length; i++) {
        // Ajoute les données
        let date = new Date(series[0].data[i][0]);
        txtContent += date.getDate().toString().padStart(2, '0') + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getFullYear() + " " + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0') + "\t";

        // Ajoute les valeurs correspondantes aux cases cochées
        selectedValues.forEach(value => {
            const seriesData = series.find(s => s.name === value);
            if (seriesData) {
                txtContent += seriesData.data[i][1] + "\t";
            }
        });

        if (i < series[0].data.length - 1) txtContent += "\n";
    }
    downloadFile(txtContent, "text/plain;charset=utf-8", "txt");
}

function downloadFile(fileContent, fileType, fileExtension) {
    // Crée un fichier Blob avec le contenu TXT
    const blob = new Blob([fileContent], { type: fileType });

    // Crée un URL pour le Blob
    const blobUrl = URL.createObjectURL(blob);

    // Crée un lien de téléchargement
    const date = new Date();
    const name = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '-' + date.getHours() + 'h-' + date.getMinutes() + 'm.' + fileExtension;
    const link = document.createElement("a");
    link.setAttribute("href", blobUrl);
    link.setAttribute("download", name);

    // Clique sur le lien pour déclencher le téléchargement
    document.body.appendChild(link); // Requis pour Firefox
    link.click();
    document.body.removeChild(link);

    // Libère l'URL du Blob
    URL.revokeObjectURL(blobUrl);
}
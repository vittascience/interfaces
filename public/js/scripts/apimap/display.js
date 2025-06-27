let numberData = 0;
let nbrErrors = 0;
let currentTab = "";

function initAllDisplay(resp) {
    google.charts.load('current', {'packages':['corechart', 'line']});

    let tableDisplay = document.createElement('div');
    let pieDisplay = document.createElement('div');
    let lineDisplay = document.createElement('div');

    tableDisplay.id = "apimap-graph-table";
    pieDisplay.id = "apimap-graph-pie";
    lineDisplay.id = "apimap-graph-line";
    tableDisplay.style.display = "none";
    pieDisplay.style.display = "none";
    lineDisplay.style.display = "none";

    $('.apimap-card-display').append(tableDisplay);
    $('.apimap-card-display').append(pieDisplay);
    $('.apimap-card-display').append(lineDisplay);

    resetTable(resp);
    google.charts.setOnLoadCallback(function(){
        initPie(resp);
        initLine(resp);
    });
    $('#apimap-graph-table').slideDown('slow');
    $('[data-graph="table"]').addClass('apimap-graph-icon-active');
    currentTab = "table";
}

function displayGraph(type) {
    $('.apimap-graph-icon-active').removeClass('apimap-graph-icon-active');
    $('[data-graph="'+type+'"]').addClass('apimap-graph-icon-active');
    $('#apimap-graph-' + currentTab).slideUp('fast', function(){
        $('#apimap-graph-' + type).slideDown('fast');
        currentTab = type;
    });
}

function initGraphMenu() {
    $('[data-graph]').on('click', function(){
        console.log($(this).data('graph'));
        let graphToShow = $(this).data('graph');
        if (graphToShow === currentTab)
            return ;
        displayGraph(graphToShow);
    });

    $('.apimap-graph-menu').slideDown('fast');
}


function displayData(resp) {
    if ($('.alert-api').length !== 0)
        $('.alert-api').slideUp('fast', function(){
            $(this).remove();
        });
    if ($('.apimap-graph-loader').length !== 0) {
        $('.apimap-graph-loader').slideUp('fast', function(){
            $(this).remove();
            numberData = Object.keys(resp.data).length;
            initAllDisplay(resp);
            initGraphMenu();
        });
    } else {
        updateTable(resp);
        updatePie(resp);
        updateLine(resp);
        numberData = Object.keys(resp.data).length;
        update = 0;
        //just update data for each
    }
}

function displayAPIError()
{
    nbrErrors++;
    let html = "<div class=\"alert alert-warning alert-api\" role=\"alert\" style=\"display: none;\">\n" +
        "Il semblerait que l'API ne reçoit pas de données pour cette clé." +
        "</div>";
    if ($('.alert-api').length !== 0 || nbrErrors < 3)
        return ;
    $('.apimap-card-display').append(html);
    $('.alert-api').slideDown('slow');
}

$(document).ready(function(){
    let key = $_GET('APIKey');

    setInterval(function(){
        callData(key);
    }, 2000);
});
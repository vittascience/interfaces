let full_datas_rows = document.getElementsByClassName('weather_full_datas');
let wasDisplay = false;

$('#toggle_tab').on('click', function () {
    $('#toggle_cross').toggleClass('rotate_anim');
    $('.instructions').slideToggle('fast');
    $('.alert').slideToggle('fast');
    if ($('.weather_full_datas').children().is(':visible')) {
        $(full_datas_rows).children().css('display', 'none');
        wasDisplay = false;
    } else {
        $(full_datas_rows).children().css('display', 'table-cell');
        wasDisplay = true;
    }
    resizeMaps();
});

$(window).resize(function () {
    resizeMaps();
});

function resizeMaps() {
    if ($('#weather_informations').css('position') !== 'static') {
        let hsize = ($('.weather_tab').height());
        document.getElementById('weather_map').style.marginTop = '-' + hsize + 'px';
    } else
        document.getElementById('weather_map').style.marginTop = '0px';
}

function getFirstDays(dates) {
    let lastDay = '';
    let firstDays = [];
    let i = 0;

    dates.forEach(element => {
        if (element.substring(3, 6) !== lastDay)
            firstDays.push(i);
        lastDay = element.substring(3, 6);
        ++i;
    });
    return (firstDays);
}

function updateTime(datas, firstDays) {
    let code;
    let tableTime = $('.tab_time');
    let i = 0;

    tableTime.empty();
    tableTime.append('<th>' + i18next.t('weather.tab.hours') + '</th>');
    datas.forEach(element => {
        if (firstDays.indexOf(i) !== -1)
            code = '<td class="first_day">';
        else
            code = '<td>';

        code += element + '</td>';
        tableTime.append(code);
        ++i;
    });
}

function updateWindSpeed(datas, firstDays) {
    let code;
    let windSpeedTable = $('.tab_windspeed');
    let i = 0;
    let hue;

    windSpeedTable.empty();
    windSpeedTable.append('<th>' + i18next.t('weather.tab.wind_speed') + '</th>');
    datas.forEach(element => {
        hue = Math.max(-80, 120 - (element * 5));
        if (firstDays.indexOf(i) !== -1)
            code = '<td class="first_day" style="background-color:hsl(' + hue + ', 100%, 70%)">';
        else
            code = '<td style="background-color:hsl(' + hue + ', 100%, 70%)">';
        code += element + '</td>';
        windSpeedTable.append(code);
        ++i;
    });
}

function updateWindDir(datas, firstDays) {
    let code;
    let windDirTable = $('.tab_winddir');
    let i = 0;

    windDirTable.empty();
    windDirTable.append('<th>' + i18next.t('weather.tab.wind_dir') + '</th>');
    datas.forEach(element => {
        if (firstDays.indexOf(i) !== -1)
            code = '<td class="first_day">';
        else
            code = '<td>';
        element += 40;
        code += '<i style="transform : rotate(' + element + 'deg); font-size: 18px; margin-top: 9px; margin-left:-5px;" class="fas fa-location-arrow"></i></td>';
        windDirTable.append(code);
        ++i;
    });
}

function updateTemp(datas, firstDays) {
    let code;
    let tempTable = $('.tab_temp');
    let i = 0;
    let backgroundColor = [];

    tempTable.empty();
    tempTable.append('<th>' + i18next.t('weather.tab.temp') + '</th>');
    datas.forEach(element => {
        if (element >= 0) {
            backgroundColor.push(255);
            backgroundColor.push(255 - Math.floor(element * 7));
            backgroundColor.push(0);
            backgroundColor.push(Math.min(0.5, element / 10));
        } else {
            backgroundColor.push(0);
            backgroundColor.push(255 + Math.floor(element * 14));
            backgroundColor.push(255);
            backgroundColor.push(Math.min(0.5, element / 10));
        }
        if (firstDays.indexOf(i) !== -1)
            code = '<td class="first_day" style="background-color:rgba(' + backgroundColor.join(',') + ');">';
        else
            code = '<td style="background-color:rgba(' + backgroundColor.join(',') + ');">';
        code += element + '</td>';
        tempTable.append(code);
        backgroundColor = [];
        ++i;
    });
}

function updateClouds(datas, firstDays) {
    let code;
    let cloudsTable = $('.tab_clouds');
    let i = 0;
    let backgroundAlpha;

    cloudsTable.empty();
    cloudsTable.append('<th>' + i18next.t('weather.tab.cloud_cover') + '</th>');
    datas.forEach(element => {
        backgroundAlpha = element / 100;
        if (firstDays.indexOf(i) !== -1)
            code = '<td class="first_day" style="background-color:rgba(136, 136, 136, ' + backgroundAlpha + ');">';
        else
            code = '<td style="background-color:rgba(136, 136, 136, ' + backgroundAlpha + ');">';
        code += element + '</td>';
        cloudsTable.append(code);
        ++i;
    });
}

function updateRain(datas, firstDays) {
    let code;
    let rainTable = $('.tab_rain');
    let i = 0;
    let backgroundAlpha;

    rainTable.empty();
    rainTable.append('<th>' + i18next.t('weather.tab.rain') + '</th>');
    datas.forEach(element => {
        backgroundAlpha = Math.min(1, element / 20);
        if (firstDays.indexOf(i) !== -1)
            code = '<td class="first_day" style="background-color:rgba(0, 0, 255, ' + backgroundAlpha + ');">';
        else
            code = '<td style="background-color:rgba(0, 0, 255, ' + backgroundAlpha + ');">';
        code += element + '</td>';
        rainTable.append(code);
        ++i;
    });
}

function updateSnow(datas, firstDays) {
    let code;
    let snowTable = $('.tab_snow');
    let i = 0;
    let backgroundAlpha;

    snowTable.empty();
    snowTable.append('<th>' + i18next.t('weather.tab.snow') + '</th>');
    datas.forEach(element => {
        backgroundAlpha = Math.min(1, element / 20);
        if (firstDays.indexOf(i) !== -1)
            code = '<td class="first_day" style="background-color:rgba(0, 0, 255, ' + backgroundAlpha + ');">';
        else
            code = '<td style="background-color:rgba(0, 0, 255, ' + backgroundAlpha + ');">';
        code += element + '</td>';
        snowTable.append(code);
        ++i;
    });
}

function updateFlightQuality(datas, firstDays) {
    let windStrings = [
        i18next.t('weather.tab.flight_quality.wind.0'),
        i18next.t('weather.tab.flight_quality.wind.1'),
        i18next.t('weather.tab.flight_quality.wind.2'),
        i18next.t('weather.tab.flight_quality.wind.3')
    ];
    let cloudsStrings = [
        i18next.t('weather.tab.flight_quality.clouds.0'),
        i18next.t('weather.tab.flight_quality.clouds.1'),
        i18next.t('weather.tab.flight_quality.clouds.2')
    ];
    let rainString = i18next.t('weather.tab.flight_quality.rain');
    let snowString = i18next.t('weather.tab.flight_quality.snow');


    let windQualities = [];
    let cloudsQualities = [];
    let rainQualities = [];
    let snowQualities = [];

    datas[1].forEach(element => {
        let windQuality = Math.ceil(3 - (element / 4));
        windQualities.push(windQuality);
    });

    datas[4].forEach(element => {
        if (element > 90)
            cloudsQualities.push(-1);
        else if (element > 50)
            cloudsQualities.push(-1);
        else
            cloudsQualities.push(0);
    });

    datas[5].forEach(element => {
        if (element > 0.1)
            rainQualities.push(-1000);
        else
            rainQualities.push(0);
    });

    datas[6].forEach(element => {
        if (element > 0.1)
            snowQualities.push(-1000);
        else
            snowQualities.push(0);
    });

    let stars = $('.tab_stars');
    stars.empty();
    stars.append('<th>' + i18next.t('weather.tab.flight_quality.title') + '</th>');

    for (let i = 0; i < datas[0].length; i++) {
        let commentsFlight = [];
        let flightQuality = windQualities[i] + cloudsQualities[i] + rainQualities[i] + snowQualities[i];
        let code;

        flightQuality = Math.max(0, flightQuality);
        if (windQualities[i] >= 1)
            commentsFlight.push(windStrings[windQualities[i]]);
        else
            commentsFlight.push(windStrings[0]);
        if (datas[4][i] > 90)
            commentsFlight.push(cloudsStrings[0])
        else if (datas[4][i] > 50)
            commentsFlight.push(cloudsStrings[1]);
        else
            commentsFlight.push(cloudsStrings[2]);
        if (rainQualities[i] == -1000) {
            commentsFlight.push(rainString);
            flightQuality = 0;
        }
        if (snowQualities[i] == -1000) {
            commentsFlight.push(snowString);
            flightQuality = 0;
        }


        if (firstDays.indexOf(i) !== -1)
            code = '<td class="first_day" data-html="true" data-toggle="tooltip" data-placement="top" title="' + commentsFlight.join('<br>') + '">';
        else
            code = '<td data-html="true" data-toggle="tooltip" data-placement="top" title="' + commentsFlight.join('<br>') + '">';
        code += '<img src="/public/content/img/assets/weather/' + flightQuality + '.png" class="tab_stars"/ alt="étoile"></td>';
        stars.append(code)
    }
    $('[data-toggle="tooltip"]').tooltip();
}


function updateTable(datas) {
    let firstDays = getFirstDays(datas[0]);

    updateTime(datas[0], firstDays);
    updateWindSpeed(datas[1], firstDays);
    updateWindDir(datas[2], firstDays);
    updateTemp(datas[3], firstDays);
    updateClouds(datas[4], firstDays);
    updateRain(datas[5], firstDays);
    updateSnow(datas[6], firstDays);
    updateFlightQuality(datas, firstDays);
    document.getElementById('toggle_tab').style.display = 'block';

    if (wasDisplay)
        $(full_datas_rows).children().css('display', 'table-cell');
    resizeMaps();
}
function formatDate(timestamp) {
    let dateTime = new Date(timestamp * 1000);
    let days = i18next.t('weather.days', { returnObjects: true });
    //let days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    let fullDate = '<b>' + days[dateTime.getDay()] + '</b>'
                + '<br>' + dateTime.getDate()
                + '<br>' + dateTime.getHours() + 'h';
    return (fullDate);
}

function setTimezoneAndUpdate(json, lat, lng) {
    //get timezone
    let timezone = -3600;

    let apiUrlTimezone = 'https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+lng+'&timestamp='+json.list[0].dt+'&key=AIzaSyDrcXtR96FyqXPlORbU5bNRfHTmDIWI7gg';
    let request = getAjaxRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let resTimezone = JSON.parse(request.responseText);
                if (resTimezone.status !== 'OK') {
                    alert(i18next.t('weather.errors.timezone'));    
                } else {
                    timezone += resTimezone.rawOffset;
                }
                updateTable(parseData(json, timezone));
            } else {
                console.error(i18next.t('weather.errors.api'));
            }
        }
    }
    request.open("GET", apiUrlTimezone);
    request.send();
}

function parseData(json, timezone) {
    let fullData = [];

    let dates = [];
    let windSpeed = [];
    let windDir = [];
    let temp = [];
    let clouds = [];
    let rain = [];
    let snow = [];

    json.list.forEach(element => {
        dates.push(formatDate(element.dt + timezone));
        windSpeed.push(Math.floor(element.wind.speed * 3.6));
        windDir.push(element.wind.deg + 90);
        temp.push(Math.floor(element.main.temp));
        clouds.push(element.clouds.all);
        if (element.hasOwnProperty('rain') && element.rain.hasOwnProperty('3h'))
            rain.push(Math.round(element.rain['3h'] * 10) / 10);
        else
            rain.push(0);
        if (element.hasOwnProperty('snow') && element.snow.hasOwnProperty('3h'))
            snow.push(Math.round(element.snow['3h'] * 10));
        else
            snow.push(0);
    });
    fullData.push(dates);
    fullData.push(windSpeed);
    fullData.push(windDir);
    fullData.push(temp);
    fullData.push(clouds);
    fullData.push(rain);
    fullData.push(snow);
    return (fullData);
}
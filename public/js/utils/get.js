function $_GET(param) {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const params = {};
    searchParams.forEach((value, key) => { params[key] = value });

    if (typeof ltiVariables13 != 'undefined') {
        switch (param) {
            case 'nocloud':
                return 1;

            case 'embed':
                return 1;

            case 'toolbox':
                // If the current request contains a parameter board in the queryString we prioritize its value over the one from the backend
                if (params[param]) {
                    return params[param];
                }
                if (ltiVariables13.toolbox === 'null') {
                    return null;
                }
                return ltiVariables13.toolbox;

            case 'mode':
                if (ltiVariables13.mode === 'null') {
                    return null;
                }
                return ltiVariables13.mode;
        
            case 'console':
                if (ltiVariables13.console === 'null') {
                    return null;
                }
                return ltiVariables13.console;

            case 'simu':
                if (ltiVariables13.simulator === 'null') {
                    return null;
                }
                return ltiVariables13.simulator;

            case 'board':
                // If the current request contains a parameter board in the queryString we prioritize its value over the one from the backend
                if (params[param]) {
                    return params[param];
                }
                if (ltiVariables13.board === 'null') {
                    return null;
                }
                return ltiVariables13.board;

            default:
                if (typeof ltiVariables13.customerSettings === 'undefined' || ltiVariables13.customerSettings === null || typeof ltiVariables13.customerSettings.interfaceParams === 'undefined') {
                    return null;
                }
                if (typeof ltiVariables13.customerSettings.interfaceParams[param] === 'undefined') {
                    return null;
                }
                return ltiVariables13.customerSettings.interfaceParams[param];
        }
    }
    
    if (typeof ltiVariables != 'undefined') {
        switch (param) {
            case 'nocloud':
                return 1;

            case 'embed':
                return 1;
        
            case 'toolbox':
                return typeof ltiVariables.toolbox != 'undefined' ? ltiVariables.toolbox : '';

            case 'mode':
                return typeof ltiVariables.mode != 'undefined' ? ltiVariables.mode : '';

            case 'console':
                return typeof ltiVariables.console != 'undefined' ? ltiVariables.console : '';
                
            default:
                break;
        }
    }

    if (param) return searchParams.get(param);
    return params;
}
$(document).ready(function () {
    $(".dropdown-toggle").dropdown();
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    let url = window.location.href,
        lng = "en";
    if (cname === "lng") {
        if (/fr\.vittascience/.test(url)) {
            lng = "fr";
        } else if (/en\.vittascience/.test(url)) {
            lng = "en";
        } else if (/it\.vittascience/.test(url)) {
            lng = "it";
        } else if (/ar\.vittascience/.test(url)) {
            lng = "ar";
        } else if (/es\.vittascience/.test(url)) {
            lng = "es";
        } else if (typeof IS_CAPYTALE_CONTEXT !== 'undefined') {
            lng = "fr";
        }
        return lng;
    }
    return "";
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}
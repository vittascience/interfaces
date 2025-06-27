/**
 * Récupère les arguments en get
 * @returns {JSON} list of get we have in url
 */
function getListParam() {
    let params = (new URL(document.location)).searchParams;
    let listParams = {};
    params.forEach(function (v, e) {
        listParams[v] = e;
    });
    // for (var key of params.keys()) {
    //     listParams[key] = params.get(key);
    // }
    return listParams;
}

/**
 * Return a new url based on parameter
 * @param {JSON} paramList JSON type with associative `param name` => `param value`
 * @param {URL} [url = new URL(window.location.href)] URL we want to update
 * @returns {URL}
 */
function setMultipleParam(paramList, url = new URL(window.location.href)) {

    for (let keyList of paramList.keys()) {
        url.searchParams.set(key, paramList.get(key));
    }
    return url;
}
/**
 * 
 * @param {Array} paramList List of parameters we want to keep
 */
function filterUrl(paramList = []) {
    var oldParam = getListParam();
    var newParam = {}
    //console.log(typeof {});
    paramList.forEach(function (e) {
        if (oldParam[e]) {
            newParam[e] = oldParam[e];
        }
    });

    setMultipleParam(newParam);
}

function getParamValue(param) {
    if (typeof ltiVariables13 != 'undefined') {
        switch (param) {
            case 'nocloud':
                return 1;

            case 'embed':
                return 1;

            case 'toolbox':
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

            default:
                break;
        }
    }
    if (typeof ltiVariables != 'undefined') {
        switch (param) {
            case 'nocloud':
                return 1;

            case 'embed':
                return 1;
        
            case 'toolbox':
                return typeof ltiVariables.toolbox != 'undefined' ? ltiVariables.toolbox : null;

            case 'mode':
                return typeof ltiVariables.mode != 'undefined' ? ltiVariables.mode : null;

            case 'console':
                return typeof ltiVariables.console != 'undefined' ? ltiVariables.console : null;
                
            default:
                break;
        }
    }
    
    var url = new URL(window.location.href);
    return (url.searchParams.get(param)) ? url.searchParams.get(param) : null;
}

function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

function replaceParam(paramName, paramValue) {
    var url = new URL(window.location.href);
    url.searchParams.set(paramName, paramValue);
    window.history.pushState(history.state, 'Title', url);
}
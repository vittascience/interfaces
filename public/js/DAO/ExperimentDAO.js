async function getExperiments (callback,argument) {
    const response = await fetch('/routing/Routing.php?controller=vittamap&action=get_experiment_from_lastest_received_data');
    let experiments = [];
    if (response.ok) {
        const data = await response.json();
        if (data) {
            data.forEach(element => {
                experiments.push(arrayToExperiment(element[0], element['receivedAt']));
            });
            callback(experiments,argument);
        }
    }
}

/* async function getExperiment(id, callback, argument) {
    const response = await fetch('/routing/Routing.php?controller=vittamap&action=get_experiment_with_received_data_by_id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    });
    let experiments = null;
    if (response.ok) {
        const data = await response.json();
        if (data) {
            data.forEach(element => {
                experiments = arrayToExperiment(element[0], element['receivedAt']);
            });
            callback(experiments,argument);
        }
    }
} */

function getExperiment (id,callback, argument) {
    var request = getAjaxRequest();
    request.onreadystatechange = function (){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200) {
                var experiment = arrayToExperiment(JSON.parse(request.responseText));
                if (argument !== undefined)
                    callback(experiment,argument);
                else
                    callback(experiment);
            }
            else {
                console.log("Request failed: " + request.status);
            }
        }
    };
    request.open("GET","/services/get/getExperiment.php?id=" + id,true);
    request.send();
}

function deleteExperiment(id,callback){
    if (confirm(i18next.t('addExperiment.confirmRemoveExp'))){
        var request = getAjaxRequest();
        request.onreadystatechange = function (){
            if (this.readyState === XMLHttpRequest.DONE){
                if (this.status === 200){
                    var response = JSON.parse(this.responseText);
                    if (response.success === true){
                        callback(id);
                    } else {
                        console.error("Request failed: " + this.status);
                    }
                } else {
                    console.error("Request failed: " + this.status);
                }
            }
        };
        request.open("DELETE","/services/delete/deleteExperiment.php?id=" + id);
        request.send();
    }
}
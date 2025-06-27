/**
 * get all the running task in aws
 */
function getFreeContainer() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=aws&action=getFreeContainer",
            data: {
                accessKey: localStorage.getItem("accessKey"),
                referer: document.URL
            },
            success: function (response) {
                resolve(JSON.parse(response));
            },
            error: function () {
                reject();
            }
        })
    })
}


function performTest() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=aws&action=performTest",
            success: function (response) {
                resolve(response);
            },
            error: function () {
                reject();
            }
        })
    })
}


function checkIfExerciceIsOnlyServerSide() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=aws&action=checkIfExerciceIsServerOnly",
            data: {
                urlData: document.URL,
            },
            success: function (response) {
                resolve(JSON.parse(response));
            },
            error: function () {
                reject();
            }
        })
    })
}


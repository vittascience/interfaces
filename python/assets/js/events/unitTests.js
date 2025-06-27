let unitTestsloaded = false;
$('body').on('click', '#closeButtonUnitTests', function () {
    closeUnitTests();
});
/**
 * Open units tests resolving modal.
 * @param {array} unitTests
 */
function openUnitTests(unitTests) {
    if (!unitTestsloaded) {
        loadUnitTests(unitTests);
    }
    if ($("#modal-unittests").is(':visible')) {
        closeUnitTests()
    }
    $("#modal-unittests").show();
    $("#modal-unittests").localize();

}

/**
 * Close units tests resolving modal.
 */
function closeUnitTests() {
    $("#modal-unittests").html('<div class="ide-modal-header"><h1 class="ide-modal-title" style="color:var(--text-2) !important;"><span class="fas fa-check"></span><span data-i18n="code.popups.unitTest.success" class="ms-3"></span></h1><button id="closeButtonUnitTests" class="btn vitta-button quit-button ide-modal-quit-button" type="button"><span class="fa fa-times-circle"></span></button></div><div style="text-align: center;"><div class="big-icon"><i class="fas fa-circle-notch unit-test-icon-spin"></i></div><p id="unittests-progress" data-i18n="code.popups.unitTest.load"></p><p> <span id="result1" style="display:none;"></span><span id="result2" style="display:none"></span></p><p id="unittests-log"></p><div id="unittests-content"></div><div id="unittests-secret"></div><div id="unittests-solution"></div><button type="button" style="flex: 1;" id="return-exercise" class="btn btn-secondary"> <span data-i18n="code.popups.unitTest.quit"></span></button></div>');
    $("#modal-unittests").hide();
    unitTestsloaded = false;
}

/**
 * Check if each test has succed of fail.
 * @param {array} unitTests
 * @param {array} exercise
 */
function checkSuccess(unitTests, exercise) {
    let fail = false;

    for (let i = 0; i < unitTests.length; i++) {
        if (unitTests[i]["pass"] == false)
            return;
        if (unitTests[i]["success"] != true) {
            fail = true;
        }
    }
    if (!fail) {
        return successAllTests(exercise);
    }
    return failedTest(unitTests);
}

/**
 * Convert each char of the secret word into asterisk.
 * @param {array} exercise
 */
function getHideSecretWord(exercise) {
    if (exercise.secretWord == null) {
        return '';
    }
    let secretWordHide = "";
    for (let i = 0; i < exercise.secretWord.length; i++)
        secretWordHide += "*";
    return secretWordHide;
}

/**
 * Display the success panel of the modal.
 * @param {array} exercise
 */
function successAllTests(exercise) {
    $('#unittests-progress').hide();
    let div = $("#unittests-content");
    let bigIcon = $(".big-icon > i");

    //update icon
    $(bigIcon).attr("class", "fa-check-circle");
    $(bigIcon).addClass("far");
    $(bigIcon).addClass("green-vitta");

    //update text
    $("#result2").attr("data-i18n", '[html]code.popups.unitTest.result2')
    $("#result2").localize();
    $("#result2").show();

    //add secret word
    if (getHideSecretWord(exercise).length > 0) {
        $("#unittests-solution").append("<p id='secret-word' ><span data-i18n='code.popups.unitTest.secret'>Mot secret débloqué : </span><span class='secret-word-content'>" + getHideSecretWord(exercise) + "</span></p><button type='button' style='margin:3px;' class='btn vitta-button' id='btn_secretword'  data-i18n='code.popups.unitTest.showSecret'>Montrer le mot secret</button>");
        $("#unittests-solution").localize();
    }

    //show button
    if (exercise.linkSolution != null && exercise.linkSolution.length > 0) {
        $("#unittests-solution").append("<button type='button' style='margin:3px;' class='btn vitta-button' id='btn_solution'  data-i18n='code.popups.unitTest.showSolution'>Montrer la solution</button>");
        $("#unittests-solution").localize();
    }
    UIManager.bindClick("btn_secretword", function () {
        $(".secret-word-content").html(exercise.secretWord);
    });

    //remove list
    $(div).empty();
    window.localStorage.classroomActivity = "success";
    if (typeof xapiAutocorrection != 'undefined') {
        xapiAutocorrection.sendSuccessTrace();
    }
    if (typeof lti13Controller != 'undefined' && lti13Controller.isSubmitting == true) {
        const gradeData = {
            launchId: ltiVariables13.launchId,
            gradingProgress: 'FullyGraded',
            scoreMaximum: 3,
            scoreGiven: 3,
            interface: projectManager.getInterface(),
            projectLink: projectManager._currentProject.link
        };
        lti13Controller.manager.submitGradeToLMS(gradeData)
            .then((responseFromApi) => {
                if (typeof responseFromApi.returnUrl === 'undefined') {
                    lti13Controller.isSubmitting = false;
                    return;
                }
                if (lti13Controller.getIsRpc()) {
                    if (typeof lti13Controller.studentSubmissionResolve === 'function') {
                        lti13Controller.studentSubmissionResolve(lti13Controller.studentSubmissionUpdatedProject);
                    } else if (lti13Controller.studentSubmissionReject === 'function') {
                        lti13Controller.studentSubmissionReject();
                    } else {
                        console.error('Error while using studentSubmissionResolve/Reject!');
                    }
                } else {
                    location.replace(responseFromApi.returnUrl);
                }
                lti13Controller.isSubmitting = false;
                lti13Controller.studentSubmissionResolve = false;
                lti13Controller.studentSubmissionReject = false;
                lti13Controller.studentSubmissionUpdatedProject = false;
            });
    }
    if (projectManager._rpc != null) {
        return "success";
    }
}
$('body').on('click', '#btn_solution', function () {
    if (getHideSecretWord(projectManager._currentExercise.exercise).length > 0) {
        let secretPass = prompt("Quel est le mot secret?");
        if (projectManager._currentExercise.exercise.secretWord == secretPass) {
            window.open(projectManager._currentExercise.exercise.linkSolution, '_blank');
        }
    } else {
        window.open(projectManager._currentExercise.exercise.linkSolution, '_blank');
    }
})

/**
 * Display the failure panel of the modal.
 * @param {array} unitTests
 */
function failedTest(unitTests) {
    let div = $("#unittests-content");
    let bigIcon = $(".big-icon > i");
    let nbrFailed = function () {
        let i = 0;
        unitTests.forEach(function (element) {
            if (element["success"] != true)
                ++i;
        });
        return i;
    };

    //update icon
    $(bigIcon).attr("class", "fa-times");
    $(bigIcon).addClass("fas");

    //update text
    $('#unittests-progress').hide();
    $("#result1").attr("data-i18n", 'code.popups.unitTest.result1');
    $("#result1").attr("data-i18n-options", '{"count": ' + nbrFailed() + '}');
    $("#result1").attr("data-i18n", '[html]code.popups.unitTest.result1');
    $("#result1").localize();
    $("#result1").show();
    window.localStorage.classroomActivity = "fail";
    if (typeof xapiAutocorrection != 'undefined') {
        xapiAutocorrection.sendFailTrace();
    }
    if (typeof lti13Controller != 'undefined' && lti13Controller.isSubmitting == true) {
        const gradeData = {
            launchId: ltiVariables13.launchId,
            gradingProgress: 'FullyGraded',
            scoreMaximum: 3,
            scoreGiven: 0.001,
            interface: projectManager.getInterface(),
            projectLink: projectManager._currentProject.link
        };
        lti13Controller.manager.submitGradeToLMS(gradeData)
            .then((responseFromApi) => {
                if (typeof responseFromApi.returnUrl === 'undefined') {
                    lti13Controller.isSubmitting = false;
                    return;
                }
                if (lti13Controller.getIsRpc()) {
                    if (typeof lti13Controller.studentSubmissionResolve === 'function') {
                        lti13Controller.studentSubmissionResolve(lti13Controller.studentSubmissionUpdatedProject);
                    } else if (lti13Controller.studentSubmissionReject === 'function') {
                        lti13Controller.studentSubmissionReject();
                    } else {
                        console.error('Error while using studentSubmissionResolve/Reject!');
                    }
                } else {
                    location.replace(responseFromApi.returnUrl);
                }
                lti13Controller.isSubmitting = false;
                lti13Controller.studentSubmissionResolve = false;
                lti13Controller.studentSubmissionReject = false;
                lti13Controller.studentSubmissionUpdatedProject = false;
            });
    }
    if (projectManager._rpc != null) {
        return "failed";
    }
}

/**
 * Manage display of succeding tests.
 * @param {array} unitTests
 * @param {array} exercise
 * @param {int} id
 */
function validUTest(unitTests, exercise, id) {
    let divTest = $(".unitTest[data-id='" + id + "']");
    let divIcon = $(".unitTest[data-id='" + id + "'] > .unit-test-title > i");
    unitTests[id - 1]["success"] = true;
    unitTests[id - 1]["pass"] = true;
    $(divTest).addClass("unitTestSuccess");
    $(divIcon).removeClass();
    $(divIcon).addClass("fa-check-circle");
    $(divIcon).addClass("far");
    $(divIcon).addClass("green-vitta");
    $(divIcon).addClass("ms-3");
}

/**
 * Manage display of failing tests.
 * @param {array} unitTests
 * @param {array} exercise
 * @param {int} id
 */
function failUTest(unitTests, id) {
    let divTest = $(".unitTest[data-id='" + id + "']");
    let divIcon = $(".unitTest[data-id='" + id + "'] > .unit-test-title > i");
    unitTests[id - 1]["pass"] = true;
    $(divTest).addClass("unitTestFail");
    $(divIcon).removeClass("unit-test-icon-spin");
    $(divIcon).removeClass("fa-circle-notch");
    $(divIcon).addClass("fa-times");
    $(divIcon).addClass("red-icon");
    $(divIcon).addClass("ms-3");
    if (unitTests[id - 1].hint != '') {
        $(divIcon).append('<strong style="color:var(--text-2)";font-family: \'Montserrat\';" class="ms-3" data-i18="code.popups.formTest.unit.hint"> Indice </strong>  : ' + unitTests[id - 1].hint);
        $("body").localize();
    }
}

/**
 * Loading screen at the initiation of the tests.
 * @param {array} unitTests
 * @param {array} exercise
 * @param {int} id
 */
function loadUnitTests(unitTests) {
    let div = $("#unittests-content");
    var index = 1;
    unitTests.forEach(function (unitTest) {
        $(div).append('<div class="unitTest flex-row d-flex justify-content-left" data-id="' + index + '"><div class="unit-test-title ms-3"><strong>Test n°</strong>' + index + '<i class="fas fa-circle-notch unit-test-icon-spin ms-3"></i></div></div>');
        index++;
    });
    unitTestsloaded = true;
}
window.addEventListener('storage', () => {
    if (window.localStorage.autocorrect == 'true') {
        autocorrectionPython();
    }
})

async function autocorrectionPython() {
    $("#console_fake").html("");
    $("#unittests-log").html("");
    $("#unittests-log").css("color", "var(--text-0)");
    let pythonUnitTests = projectManager._currentExercise;
    const unitTests = pythonUnitTests.unitTests;
    const exercise = pythonUnitTests.exercise;
    await PythonRun.startTest(CodeManager.getSharedInstance().getTextCode(), "console_fake", unitTests, exercise);
    const consolePython = document.getElementById('console');
    consolePython.scrollTop = consolePython.scrollHeight;
    if ($('#cursor').length) {
        $("#cursor").html("");
        $('#cursor').removeAttr('id');
    }

    openUnitTests(unitTests);
    if ($("#console_fake").css("color") == "rgb(255, 0, 0)") {
        $("#unittests-log").html($("#console_fake").html()).css("color", "var(--vitta-red)");
        $("#unittests-progress").remove();
        window.localStorage.classroomActivity = "fail";
        $('#modal-unittests i').each(function () {
            $(this).addClass("unitTestFail");
            $(this).removeClass("unit-test-icon-spin");
            $(this).removeClass("fa-circle-notch");
            $(this).addClass("fa-times");
            $(this).addClass("red-icon");
        })
        $("#console_fake").css("color", "rgb(0, 0, 0)");
        return false;
    } else {
        let result = $("#console_fake").html().split("\n");
        for (let i = 0; i < result.length; i++) {
            if (result[i].match(/@vittatest/, "")) {
                const nbspRemoved = result[i].replace(/&nbsp;/g, " ");
                const outputs = nbspRemoved.replace("@vittatest ", "");
                const tabResult = outputs.split("@unitest ");
                for (let j = 1; j < tabResult.length; j++) {
                    unitTests[j - 1].success = true;
                    const result = tabResult[j].substring(0, tabResult[j].length);
                    const regStart = /^\[/;
                    if (regStart.test(result)) {
                        result = result.replace(/^\[/, "");
                        result = result.replace(/\]$/, "");
                        result = result.replace(/\] $/, "");
                    }
                    outbis = unitTests[j - 1].outputs + ' ';
                    if (result == unitTests[j - 1].outputs || result == outbis) {
                        unitTests[j - 1].success = true;
                    } else {
                        unitTests[j - 1].success = false;
                    }
                    unitTests[j - 1].pass = true;
                    if (unitTests[j - 1].success === true) {
                        validUTest(unitTests, exercise, j);
                    } else {
                        failUTest(unitTests, j);
                    }
                }
                //check tests
                const testsResult = checkSuccess(unitTests, exercise);
                return testsResult;
            }
        }
    }
    //return false;
    /* @TOBEREMOVED sebastien 07/08/2023 old code
        setTimeout(() => {
            var consolePython = document.getElementById('console');
            consolePython.scrollTop = consolePython.scrollHeight;
            if ($('#cursor').length) {
                $("#cursor").html("");
                $('#cursor').removeAttr('id');
            }
        }, 50);
        setTimeout(function () {
            openUnitTests(unitTests)
            if ($("#console_fake").css("color") == "rgb(255, 0, 0)") {
                $("#unittests-log").html($("#console_fake").html()).css("color", "var(--vitta-red)")
                $("#unittests-progress").remove()
                window.localStorage.classroomActivity = "fail"
                $('#modal-unittests i').each(function () {
                    $(this).addClass("unitTestFail");
                    $(this).removeClass("unit-test-icon-spin");
                    $(this).removeClass("fa-circle-notch");
                    $(this).addClass("fa-times");
                    $(this).addClass("red-icon");
                })
            } else {
                var result = $("#console_fake").html().split("\n")
                for (var i = 0; i < result.length; i++) {
                    if (result[i].match(/@vittatest/, "")) {
                        const nbspRemoved = result[i].replace(/&nbsp;/g, " ");
                        const outputs = nbspRemoved.replace("@vittatest ", "");
                        let tabResult = outputs.split("@unitest ")
                        for (var j = 1; j < tabResult.length; j++) {
                            unitTests[j - 1].success = true
                            var result = tabResult[j].substring(0, tabResult[j].length)
                            let regStart = /^\[/
                            if (regStart.test(result)) {
                                result = result.replace(/^\[/, "")
                                result = result.replace(/\]$/, "")
                                result = result.replace(/\] $/, "")
                            }
                            outbis = unitTests[j - 1].outputs + ' '
                            if (result == unitTests[j - 1].outputs || result == outbis) {
                                unitTests[j - 1].success = true
                            } else {
                                unitTests[j - 1].success = false
                            }
    
                            unitTests[j - 1].pass = true
                            if (unitTests[j - 1].success === true)
                                validUTest(unitTests, exercise, j);
                            else
                                failUTest(unitTests, j);
    
                        }
                        //check tests
                        const testsResult = checkSuccess(unitTests, exercise);
                        resolve(testsResult);
                        
                    }
                }
            }
            // This is the time allowed for execution of Unit Tests on the Python program, to be tested and changed if need be
        }, 200)
     */

}
var UnitTests = (function () {

    let unitTestModels = false;

    /**
     * Load the tests linked to the project.
     * @param {ProjectPython} project
     */
    function init(project) {
        var p = new Promise(function (resolve, reject) {
            if (typeof IS_CAPYTALE_CONTEXT !== 'undefined') return resolve();
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=exercise&action=get_by_project",
                data: {
                    "project": project
                },
                success: function (response) {
                    if (response !== "null") {
                        getUnitTests(JSON.parse(response));
                    } else {
                        if (typeof xapiAutocorrection != 'undefined') {
                            xapiAutocorrection.alertNoUnitTest();
                        }
                    }
                    window.localStorage.PythonUnitTests = ""
                    $("#runButtonPython").css('border-radius', '15px');
                    $(".ide-btn-pythtest").hide()
                    resolve();
                }
            })
        });
    }

    /**
     * Load the unit tests linked to the exercise.
     * @param {ExercisePython} dataExercise
     */
    function getUnitTests(dataExercise) {
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=unitTests&action=get_by_exercise",
                data: {
                    "exercise": dataExercise
                },
                success: function (response) {
                    var response = JSON.parse(response);
                    if (response !== "false" && response != '[]' && response.length > 0) {
                        getUnitTestsIO(dataExercise, response, response.length);
                    } else
                        console.log("No unitTests loaded. 2");
                    window.localStorage.PythonUnitTests = ""
                    projectManager._currentExercise = ""
                    $("#runButtonPython").css('border-radius', '15px');
                    $(".ide-btn-valid").hide()
                }
            })
        });
    }

    /**
     * Load the inputs and outputs linked to the unit test.
     * @param {ExercisePython} dataExercise
     * @param {UnitTests} dataUnitTests
     */
    function getUnitTestsIO(dataExercise, dataUnitTests, index) {
        let allIO = [];

        function getNextUnitTestIO(index) {
            var index = index - 1;
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=unitTestsIO&action=get_by_unittest",
                data: {
                    "unitTest": dataUnitTests[index]
                },
                success: function (response) {

                    allIO.push(response);
                    if (index > 0) {

                        getNextUnitTestIO(index);
                    } else {
                        allIO.reverse();
                        window.localStorage.PythonUnitTests = JSON.stringify(renderUnitTestsModel(dataExercise, dataUnitTests, allIO));
                        projectManager._currentExercise = renderUnitTestsModel(dataExercise, dataUnitTests, allIO)
                        if (typeof ltiVariables13 !== 'undefined' && !ltiVariables13.isTeacher && ltiVariables13.customerSettings && ltiVariables13.customerSettings.validateButtonHidden) {
                            return;
                        }
                        
                        if(getParamValue('evidenceB') == null){
                            $("#runButtonPython").css({
                                'border-top-right-radius': '0',
                                'border-bottom-right-radius': '0'
                            });
                            $("#UTrunButtonPython").css({
                                'border-top-left-radius': '0',
                                'border-bottom-left-radius': '0'
                            });
                            $(".ide-btn-pythtest").show()
                        }
                    }
                }
            });
        }
        getNextUnitTestIO(index);
    }

    /**
     * Parse the inputs and outputs into arrays.
     * @param {ExercisePython} dataExercise
     * @param {UnitTests} dataUnitTests
     * @param {array} allIO
     */
    function renderUnitTestsModel(dataExercise, dataUnitTests, allIO) {

        function renderUnitTestIO(data) {
            if (data === false)
                return false;
            let content = [];
            let i = 0
            data.forEach(element => {
                if (i > 0)
                    content.push(" " + element.value);
                else
                    content.push(element.value);
                i++
            });
            return content;
        }

        function renderUnitTestIdIO(data) {
            if (data === false)
                return false;
            let content = [];
            data.forEach(element => {
                content.push(element.id);
            });
            return content;
        }
        let exercise = {
            id: dataExercise.id,
            linkSolution: dataExercise.linkSolution,
            project: dataExercise.project,
            secretWord: dataExercise.secretWord,
            functionName: dataExercise.functionName
        };
        let unitTests = [];
        for (let i = 0; i < dataUnitTests.length; i++) {
            let IOParse = JSON.parse(allIO[i]);
            let unitTestRender = {
                id: dataUnitTests[i].id,
                name: dataUnitTests[i].name,
                hint: dataUnitTests[i].hint,
                inputs: renderUnitTestIO(IOParse.inputs),
                outputs: renderUnitTestIO(IOParse.outputs),
                id_inputs: renderUnitTestIdIO(IOParse.inputs),
                id_outputs: renderUnitTestIdIO(IOParse.outputs)
            };
            unitTests.push(unitTestRender);
        }
        unitTestModels = {
            exercise: exercise,
            unitTests: unitTests
        };
        return unitTestModels;
    }



    return {
        init: function (id) {
            return init(id);
        }
    }
}());
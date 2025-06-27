$(document).ready(function () {
    if (UserManager.getUser() != null) {
        $("#new-button").show()
    }
})
window.onbeforeunload = function () {
    if (UserManager.getUser() != null) {
        $("#new-button").show()
    }
}

var confirms = {
    "fr": ['Etes vous sur de vouloir supprimer ce test unitaire?',
        'Etes vous sur de vouloir supprimer cette entrée?',
        'Etes vous sur de vouloir supprimer cette sortie?',
    ],
    "en": ['Are you sure you want to delete this unit test?',
        'Are you sure you want to delete this input?',
        'Are you sure you want to delete this output?',
    ]
}

/**
 * Add a new part to the form
 */
function addTest(content) {
    if (content === false) {
        var idTest = null
        var hint = ""
    } else {
        var idTest = content.id
        var inputsLength = content.inputs.length
        var outputsLength = content.outputs.length
        var hint = content.hint
    }
    var regEx = /^"/
    let html = '<div class="test-unit row mb-1">'
    html += '<input type="hidden" class="id-test" value=' + idTest + '>'
    html += '<div class="d-flex justify-content-start p-0"><p class="p-0 fs-5"><span data-i18n="code.popups.formTest.unit.title"></span><span class="number-test"></span></p><button class="btn btn-secondary btn-sm remove-link remove-test"><span data-i18n="code.popups.formTest.deleteExercise"></span></button></div>'
    html += '<div class="row m-0 p-0 m-auto">'
    html += '<div class="form-group col-md-7 m-0 p-0 row">'
    html += `<div class="form-group col-md-12 m-0 p-0">
    <label for="form-input" class="tutorial-label"><i class="fas fa-sign-in-alt me-1"></i><span data-i18n="code.popups.formTest.unit.input">Entrée</span>
    </label>
    <div class="row col-md-12 m-0"><input type="hidden" class="id-IO" value="null"><div class="col-6 col-md-8 p-0 m-0"><input type="text" class="form-control form-input  form-IO " placeholder="Un input " value=""></div><select name="type" class="col-2 col-md-2 ms-1 p-0"><option value="integer">Integer</option><option value="string">String</option></select>
    <button class="btn btn-secondary form-python mt-auto mb-auto remove-input col-md-1 ms-1">
    <i class="fas fa-times"></i>
    </button>
    </div></div>`
    for (let i = 0; i < inputsLength; i++) {
        if (i > 0) var trimIo = content.inputs[i].replace(/^ /, '')
        else var trimIo = content.inputs[i]
        if (regEx.test(trimIo)) var typeIo = "string"
        else var typeIo = "integer"
        trimIo = trimIo.replace(/^"/, '')
        trimIo = trimIo.replace(/"$/, '')
        trimIo = trimIo.replace(/"/gi, '&quot;')
        html += addItem(trimIo, content.id_inputs[i], 'input', null, typeIo)
    }
    html += '    <div class="form-button-input form-row m-0 my-2 p-0">'
    html += '        <button class="add-input btn btn-success btn-block">'
    html += '           <span data-i18n="code.popups.formTest.unit.addInput">Ajouter un input</span>'
    html += '       </button>'
    html += '     </div></div>'
    html += '<div class="form-group col-md-5 m-0 p-0 row">'
    html += `<div class="form-group col-md-12 m-0 p-0">
    <label for="form-output" class="tutorial-label"><i class="fas fa-sign-out-alt me-1"></i><span data-i18n="code.popups.formTest.unit.output">Sortie</span>
    </label>
    <div class="row col-md-12 m-0"><input type="hidden" class="id-IO" value="null"><div class="col-9 col-md-10 p-0 m-0"><input type="text" class="form-control form-output  form-IO " placeholder="Un output " value=""></div>
    <button class="btn btn-secondary form-python mt-auto mb-auto remove-output col-md-1 ms-1">
    <i class="fas fa-times"></i>
    </button>
    </div></div>`
    for (let i = 0; i < outputsLength; i++) {
        if (i > 0) var trimIo = content.outputs[i].replace(/^ /, '')
        else var trimIo = content.outputs[i]
        html += addItem(trimIo, content.id_outputs[i], 'output', null)
    }
    html += '    <div class="form-button-output form-row m-0 my-2 p-0">'
    html += '        <button class="add-output btn btn-success btn-block">'
    html += '           <span data-i18n="code.popups.formTest.unit.addOutput">Ajouter un output</span>'
    html += '       </button>'
    html += '    </div>'
    html += ' </div>'
    html += '</div>'
    html += '<div class="form-group col-md-12 ms-0 ps-0">'
    html += '<label class="tutorial-label">'
    html += '<i class="far fa-smile-wink"></i> <span data-i18n="code.popups.formTest.unit.hint"></span>'
    html += '</label>'
    html += '<input type="text" class="form-control form-title" value="' + hint + '" data-i18n="[placeholder]code.popups.formTest.unit.hintHolder" />'
    html += '</div>'
    html += ' </div>'
    $(html).insertBefore($("#form-button-unitest"));
    $('body').localize()
    countTest()
}
/**
 * Add a new part to the form
 * @param {*} content 
 * @param {*} id 
 * @param {*} type 
 */
function addItem(content, id, type, div, typeIo = null) {
    let contentValue = "";
    let colValue = type == 'input' ? 'col-6 col-md-8' : 'col-9 col-md-10';
    if (content !== false)
        contentValue = content;

    let html = `<div class="form-group col-md-12 m-0 p-0">
    <label for="form-` + type + `" class="tutorial-label">`
    if (type == 'input') html += `<i class="fas fa-sign-in-alt me-1"></i>`
    else html += `<i class="fas fa-sign-out-alt me-1"></i>`
    html += `<span data-i18n="code.popups.formTest.unit.` + type + `"></span>
    </label>
    <div class="row col-md-12 m-0">`
    html += '<input type="hidden" class="id-IO" value=' + id + ' />'
    html += '<div class="'+colValue+' p-0 m-0"><input type="text" class="form-control form-' + type + '  form-IO " placeholder="Un ' + type + ' " value="' + contentValue + '"/></div>'
    if (type == 'input') {
        html += '<select name=type class="col-2 col-md-2 ms-1 p-0"><option value="integer"'
        if (typeIo == "integer") html += 'selected'
        html += '>Integer</option><option value="string"'
        if (typeIo == "string") html += 'selected'
        html += '>String</option></select>'
    }
    html +=
        `
    <button class="btn btn-secondary form-python mt-auto mb-auto remove-` + type + ` col-md-1 ms-1">
    <i class="fas fa-times"></i>
    </button>
    </div></div>`
    if (div != null) {
        $(html).insertBefore(div.parent().parent().find($(".form-button-" + type)));
        $("body").localize()
    } else {
        return html
    }
}

$("body").on('click', '.add-output', function () {
    addItem(false, null, "output", $(this));
});
$("body").on('click', '.add-input', function () {
    addItem(false, null, "input", $(this));
});
$("body").on('click', '#add-unitest', function () {
    addTest(false);
});


/**
 * Remove a product from the form
 * @param {*} div DOM element 
 */
function removeItem(div) {
    var parent = $(div).parent().parent();
    $(parent).remove();
    countTest()
}

/**
 * Display a message of success 
 * @param {int} content determine the kind of message
 * @param {int} id 
 */
function showSuccess(content, id) {
    let html = '<div class="alert alert-success" role="alert" style="display:none;">' +
        '<h4 class="alert-heading" data-i18n="tutorial.add.form.success.summary">Succès !</h4>';
    if (content === 0) {
        html += '<p class="mb-0"><span data-i18n="tutorial.add.form.success.add"></span><br><a href="/tutorial/' + id + '" data-i18n="tutorial.add.form.success.seeTutorial"></a></p>';
    } else if (content === 1) {
        html += '<p class="mb-0"><span data-i18n="tutorial.add.form.success.modify"></span><br><a href="/tutorial/' + id + '" data-i18n="tutorial.add.form.success.seeTutorial"></a></p>';
    } else {
        html += '<p class="mb-0"><span data-i18n="[html]tutorial.add.form.success.remove"></span></p>';
    }
    html += '</div>';

    $(html).insertBefore('#add-tutorial-form');
    if ($.i18n)
        $('.alert-success').localize();
    $('.alert-success').fadeIn('fast');
    $('#add-tutorial-form').slideUp('slow', function () {
        $('#add-tutorial-form').remove();
    });
}

/**
 * Display a list of errors
 * @param {*} list 
 */
function showError(list) {
    let div = $('.errors-list');
    let content = "";

    for (let i = 0; i < list.length; i++) {
        content += "<li data-i18n='" + list[i] + "'>" + list[i] + "</li>"
    }

    $(div).html(content);
    if ($.i18n)
        $(div).localize();
    if ($(div).parent().is(':visible')) {
        $(div).parent().hide();
    }
    $(div).parent().fadeIn('fast');
}
/**
 * Count the tests in the exercise
 */
function countTest() {
    var j = 1
    $('.test-unit').each(function () {
        $(this).find('.number-test').html(j)
        j++
    })
}

function saveExercise(dataExercise, uniTests) {
    function updateTests() {
        setTimeout(function () {
            UIManager.showSuccessMessage("save-exercise-message", "<i class='fa fa-info-circle'></i> " + i18next.t('code.popups.formTest.cancel'));
            UnitTests.init(projectManager._currentProject)
            $('#modal-formunittests').hide();
            $('.overlay').hide();
            $("#UTrunButtonPython").show()
        }, 2000);
    }
    var index = 0
    var p = new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=exercise&action=update",
            data: {
                "exercise": dataExercise
            },
            success: function (response) {
                if (response !== false) {
                    var response = JSON.parse(response)
                    var logIdTest = []
                    uniTests.each(function () {
                        let id = parseInt($(this).find('.id-test').val())
                        id = (isNaN(id) ? null : id)
                        $('#id-exercise').val(response.id)
                        let testToSave = {
                            'id': id,
                            'hint': $(this).find(".form-title").val(),
                            'exercise': response
                        }
                        logIdTest.push(id)
                        saveTest($(this), testToSave, index)
                        index++
                    })
                    if (window.localStorage.PythonUnitTests && JSON.parse(window.localStorage.PythonUnitTests).exercise) {
                        var allTests = JSON.parse(window.localStorage.PythonUnitTests)
                        for (let i = 0; i < allTests.unitTests.length; i++) {
                            if (logIdTest.includes(allTests.unitTests[i].id) == false) {
                                removeTest(allTests.unitTests[i])
                            }
                        }
                    }
                    setTimeout(updateTests(), 2000);

                } else
                    console.log("Error while saving the exercise");
            }
        })
    })

}

function saveTest(formTest, uniTest, index) {
    var p = new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=unitTests&action=update",
            data: {
                "test": uniTest
            },
            success: function (response) {
                if (response !== false) {
                    formTest.find('.id-test').val(JSON.parse(response).id)
                    var logIdInput = []
                    var logIdOutput = []
                    let dataIoObject = {
                        'input': [],
                        'output': []
                    }

                    formTest.find(".form-IO").each(function () {
                        let id = parseInt($(this).parent().find('.id-IO').val())
                        id = (isNaN(id) ? null : id)
                        let valueIo = $(this).val()
                        let typeIo = $(this).parent().find("select").val()
                        if (typeIo == "string") {
                            valueIo = '"' + valueIo.replace(/"/gi, '&quot;') + '"'
                        }
                        let dataIO = {
                            'id': id,
                            'value': valueIo,
                            'unitTest': response
                        }

                        if ($(this).hasClass('form-output')) {
                            //var input = false
                            logIdOutput.push(id)
                            dataIoObject.output.push({data:dataIO, dom:$(this)})
                        } else {
                            //var input = true
                            logIdInput.push(id)
                            dataIoObject.input.push({data:dataIO, dom:$(this)})
                        }
                        //saveIO(dataIO, $(this), input)
                    })
                    saveIO(dataIoObject)
                    var allTests = []
                    if (typeof window.localStorage.PythonUnitTests != 'undefined' && JSON.parse(window.localStorage.PythonUnitTests).exercise && JSON.parse(window.localStorage.PythonUnitTests) != '') {
                        allTests = JSON.parse(window.localStorage.PythonUnitTests)
                        if (allTests.unitTests[index].id_inputs.length > 0) {
                            let inputsToRemove = []
                            for (let j = 0; j < allTests.unitTests[index].id_inputs.length; j++) {
                                if (logIdInput.includes(allTests.unitTests[index].id_inputs[j]) == false) {
                                    inputsToRemove.push(allTests.unitTests[index].id_inputs[j])
                                }
                            }
                            removeIO(inputsToRemove, true)
                        }
                        if (allTests.unitTests[index].id_outputs.length > 0) {
                            let outputsToRemove = []
                            for (let j = 0; j < allTests.unitTests[index].id_outputs.length; j++) {
                                if (logIdOutput.includes(allTests.unitTests[index].id_outputs[j]) == false) {
                                    outputsToRemove.push(allTests.unitTests[index].id_outputs[j])
                                }
                            }
                            removeIO(outputsToRemove, false)
                        }
                    }
                } else
                    console.log("Error while saving the unit test");
            }
        })
    });
}

function saveIO(dataIO/* , domIO, input = true */) {
    var p = new Promise(function (resolve, reject) {
        /* if (input) {
            var route = "input"
        } else {
            var route = "output"
        } */
        let domTabInput = []
        let dataTabInput = []
        for (let i = 0; i < dataIO.input.length; i++) {
            domTabInput.push(dataIO.input[i].dom)
            dataTabInput.push(dataIO.input[i].data)
        }
        let domTabOutput = []
        let dataTabOutput = []
        for (let i = 0; i < dataIO.output.length; i++) {
            domTabOutput.push(dataIO.output[i].dom)
            dataTabOutput.push(dataIO.output[i].data)
        }
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=input&action=update",
            data: {
                "iO": dataTabInput
            },
            success: function (response) {
                if (response !== false) {
                    var response = JSON.parse(response)
                    for (let i = 0; i < domTabInput.length; i++) {
                        domTabInput[i].find('.id-IO').val(response[i].id)
                    }
                    //$(dataIO.input.dom).find('.id-IO').val(response)
                } else {
                    console.log("Error while saving the input");
                }
            },
            error: function (response) {
                console.error(response)
            }
        })
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=output&action=update",
            data: {
                "iO": dataTabOutput
            },
            success: function (response) {
                if (response !== false) {
                    var response = JSON.parse(response)
                    for (let i = 0; i < domTabOutput.length; i++) {
                        domTabOutput[i].find('.id-IO').val(response[i].id)
                    }
                    //$(dataIO.output.dom).find('.id-IO').val(response)
                } else {
                    console.log("Error while saving the output");
                }
            }
        })
    });
}

function removeTest(test) {
    var p = new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=unitTests&action=delete",
            data: {
                "test": test.id
            },
            success: function (response) {
                if (response !== "false") {} else
                    console.log("Error while deleting the test");
            }
        })
    });
}

function removeIO(dataIO, input = true) {
    var p = new Promise(function (resolve, reject) {
        if (input) {
            var route = "input"
        } else {
            var route = "output"
        }
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=" + route + "&action=delete",
            data: {
                "iO": dataIO
            },
            success: function (response) {
                if (response !== "false") {} else
                    console.log("Error while deleting the I/O");
            }
        })
    });
}

$('body').on('click', '#save-test', function () {
    if (projectManager._currentProject.id) {
        var errors = []
        let secret = $('#form-secret');
        let fonction = $('#form-function');
        let uniTests = $('.test-unit');
        if ($(fonction).val().length > 30) {
            errors.push("code.add.form.errors.function");
        }

        if (errors.length === 0) {
            let id = parseInt($('#id-exercise').val())
            id = (isNaN(id) ? null : id)
            let exerciseToSave = {
                'id': id,
                'secretWord': secret.val(),
                'functionName': fonction.val(),
                'project': projectManager._currentProject.id,
                'linkSolution': $('#form-solution').val()
            }
            saveExercise(exerciseToSave, uniTests)
        } else {
            console.error(errors)
        }
    } else {
        UIManager.showErrorMessage("save-exercise-message", "<span  class='fa fa-times'>Vous devez d'abord sauver le projet en base de donnée</span>");
        $("#saveproject-btn").click();

    }
})
$('body').on('click', '.remove-test', function () {
    if (confirm(confirms[getCookie('lng')][0])) {
        removeItem($(this));
    }


});
$('body').on('click', '.remove-input', function () {
    if (confirm(confirms[getCookie('lng')][1])) {
        removeItem($(this));
    }
});
$('body').on('click', '.remove-output', function () {
    if (confirm(confirms[getCookie('lng')][2])) {
        removeItem($(this));
    }
});
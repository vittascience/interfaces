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
    const unitTestContent = content === false ? null : content;
    const idTest = unitTestContent ? unitTestContent.id : null;
    const hint = unitTestContent ? (unitTestContent.hint || "") : "";
    const inputs = unitTestContent && unitTestContent.inputs.length > 0
        ? unitTestContent.inputs
        : [false];
    const outputs = unitTestContent && unitTestContent.outputs.length > 0
        ? unitTestContent.outputs
        : [false];

    let html = '<div class="test-unit row mb-1">'
    html += '<input type="hidden" class="id-test" value=' + idTest + '>'
    html += '<div class="d-flex justify-content-start p-0"><p class="p-0 fs-5"><span data-i18n="code.popups.formTest.unit.title"></span><span class="number-test"></span></p><button class="btn btn-secondary btn-sm remove-link remove-test"><span data-i18n="code.popups.formTest.deleteExercise"></span></button></div>'
    html += '<div class="row m-0 p-0 m-auto">'
    html += '<div class="form-group col-md-7 m-0 p-0 row">'
    for (let i = 0; i < inputs.length; i++) {
        html += addItem(inputs[i], null, 'input', null)
    }
    html += '    <div class="form-button-input form-row m-0 my-2 p-0">'
    html += '        <button class="add-input btn btn-success btn-block">'
    html += '           <span data-i18n="code.popups.formTest.unit.addInput">Ajouter un input</span>'
    html += '       </button>'
    html += '     </div></div>'
    html += '<div class="form-group col-md-5 m-0 p-0 row">'
    for (let i = 0; i < outputs.length; i++) {
        html += addItem(outputs[i], null, 'output', null)
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
    html += '<input type="text" class="form-control form-title" value="' + escapeAttributeValue(hint) + '" data-i18n="[placeholder]code.popups.formTest.unit.hintHolder" />'
    html += '</div>'
    html += ' </div>'
    $(html).insertBefore($("#form-button-unitest"));
    refreshIOTypeControls($('.test-unit').last());
    $('body').localize()
    countTest()
}

function escapeAttributeValue(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function getUnitTestValueHelper() {
    return window.PythonUnitTestValues;
}

function getTypeSelectHtml(typeIo) {
    const valueHelper = getUnitTestValueHelper();
    const selectedType = typeIo || valueHelper.EXPRESSION_TYPE;
    const options = valueHelper.TYPE_OPTIONS.map((option) => {
        const isSelected = option.value === selectedType ? ' selected' : '';
        return `<option value="${option.value}"${isSelected}>${option.label}</option>`;
    }).join('');
    return `<select name="type" class="col-4 col-md-3 ms-1 p-0 form-io-type">${options}</select>`;
}

function getNormalizedItemContent(content, fallbackType) {
    if (content === false || !content) {
        return {
            id: null,
            type: fallbackType,
            value: ''
        };
    }

    const valueHelper = getUnitTestValueHelper();
    return {
        id: content.id ?? null,
        type: content.type || fallbackType,
        value: valueHelper.formatValueForForm(content)
    };
}

function updateIOTypeControl(control) {
    const row = $(control).closest('.form-io-row');
    const input = row.find('.form-IO');
    const type = $(control).val();
    let placeholder = row.data('ioKind') === 'input' ? 'Un input' : 'Un output';

    if (type === 'boolean') {
        placeholder = 'True / False';
    } else if (type === 'list') {
        placeholder = '[1, 2, 3]';
    } else if (type === 'none') {
        placeholder = 'None';
    } else if (type === 'string') {
        placeholder = 'Un texte';
    }

    input.attr('placeholder', placeholder);
    input.prop('disabled', type === 'none');
    if (type === 'none') {
        input.val('');
    }
}

function refreshIOTypeControls(scope) {
    $(scope).find('.form-io-type').each(function () {
        updateIOTypeControl(this);
    });
}
/**
 * Add a new part to the form
 * @param {*} content 
 * @param {*} id 
 * @param {*} type 
 */
function addItem(content, id, type, div, typeIo = null) {
    const valueHelper = getUnitTestValueHelper();
    const normalizedContent = getNormalizedItemContent(content, typeIo || valueHelper.EXPRESSION_TYPE);
    const contentValue = escapeAttributeValue(normalizedContent.value);
    const colValue = 'col-6 col-md-7';

    let html = `<div class="form-group col-md-12 m-0 p-0">
    <label for="form-` + type + `" class="tutorial-label">`
    if (type == 'input') html += `<i class="fas fa-sign-in-alt me-1"></i>`
    else html += `<i class="fas fa-sign-out-alt me-1"></i>`
    html += `<span data-i18n="code.popups.formTest.unit.` + type + `"></span>
    </label>
    <div class="row col-md-12 m-0 form-io-row" data-io-kind="` + type + `">`
    html += '<input type="hidden" class="id-IO" value=' + (normalizedContent.id ?? id ?? 'null') + ' />'
    html += '<div class="' + colValue + ' p-0 m-0"><input type="text" class="form-control form-' + type + '  form-IO " placeholder="Un ' + type + ' " value="' + contentValue + '"/></div>'
    html += getTypeSelectHtml(normalizedContent.type)
    html +=
        `
    <button class="btn btn-secondary form-python mt-auto mb-auto remove-` + type + ` col-md-1 ms-1">
    <i class="fas fa-times"></i>
    </button>
    </div></div>`
    if (div != null) {
        $(html).insertBefore(div.closest(".form-button-" + type));
        refreshIOTypeControls(div.closest('.test-unit'));
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
$("body").on('change', '.form-io-type', function () {
    updateIOTypeControl(this);
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

function extractIOData(formTest, ioType) {
    const valueHelper = getUnitTestValueHelper();
    const items = [];
    const ids = [];
    const errors = [];
    const formRows = formTest.find(`.form-${ioType}`);
    const testNumber = formTest.find('.number-test').text().trim() || '?';

    formRows.each(function (index) {
        const field = $(this);
        const row = field.closest('.form-io-row');
        let id = parseInt(row.find('.id-IO').val());
        id = (isNaN(id) ? null : id);

        const type = row.find('.form-io-type').val() || valueHelper.EXPRESSION_TYPE;
        const serializedValue = valueHelper.serializeStoredValue(type, field.val());

        if (!serializedValue.ok) {
            if (!serializedValue.skip) {
                const label = ioType === 'input' ? 'input' : 'output';
                errors.push(`Test ${testNumber}, ${label} ${index + 1} : ${serializedValue.error}`);
            }
            return;
        }

        const deserializedValue = valueHelper.deserializeStoredValue(serializedValue.value);
        if (!valueHelper.isMeaningfulEntry(deserializedValue)) {
            return;
        }

        ids.push(id);
        items.push({
            id: id,
            value: serializedValue.value,
            dom: row
        });
    });

    return {
        items: items,
        ids: ids,
        errors: errors
    };
}

function validateUnitTestsForms(uniTests) {
    const errors = [];

    uniTests.each(function () {
        const formTest = $(this);
        const inputs = extractIOData(formTest, 'input');
        const outputs = extractIOData(formTest, 'output');
        errors.push(...inputs.errors, ...outputs.errors);

        if (outputs.items.length === 0) {
            const testNumber = formTest.find('.number-test').text().trim() || '?';
            errors.push(`Test ${testNumber} : au moins une sortie attendue est nécessaire.`);
        }
    });

    return errors;
}

function getStoredPythonUnitTests() {
    if (!window.localStorage.PythonUnitTests) {
        return null;
    }

    try {
        return JSON.parse(window.localStorage.PythonUnitTests);
    } catch (error) {
        return null;
    }
}

function getStoredUnitTest(index) {
    const allTests = getStoredPythonUnitTests();
    if (!allTests || !allTests.exercise || !Array.isArray(allTests.unitTests)) {
        return null;
    }
    return allTests.unitTests[index] || null;
}

function getStoredIOIds(unitTest, ioType) {
    const ioCollection = unitTest && Array.isArray(unitTest[`${ioType}s`]) ? unitTest[`${ioType}s`] : [];
    return ioCollection
        .map((item) => item && item.id)
        .filter((item) => item !== null && item !== undefined);
}

function getRemovedIds(existingIds, keptIds) {
    return existingIds.filter((id) => !keptIds.includes(id));
}

function buildIOPayload(items, unitTestResponse) {
    return items.map((item) => ({
        data: {
            id: item.id,
            value: item.value,
            unitTest: unitTestResponse
        },
        dom: item.dom
    }));
}

function saveIOCollection(route, entries) {
    const domRows = entries.map((entry) => entry.dom);
    const dataRows = entries.map((entry) => entry.data);

    $.ajax({
        type: "POST",
        url: "/routing/Routing.php?controller=" + route + "&action=update",
        data: {
            "iO": dataRows
        },
        success: function (response) {
            if (response !== false) {
                const parsedResponse = JSON.parse(response);
                for (let i = 0; i < domRows.length; i++) {
                    domRows[i].find('.id-IO').val(parsedResponse[i].id);
                }
            } else {
                console.log("Error while saving the " + route);
            }
        },
        error: function (response) {
            console.error(response);
        }
    });
}

function removeMissingStoredIO(unitTest, keptIds, ioType) {
    const removedIds = getRemovedIds(getStoredIOIds(unitTest, ioType), keptIds);
    if (removedIds.length > 0) {
        removeIO(removedIds, ioType === 'input');
    }
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
    $.ajax({
        type: "POST",
        url: "/routing/Routing.php?controller=exercise&action=update",
        data: {
            "exercise": dataExercise
        },
        success: function (response) {
            if (response !== false) {
                const parsedExercise = JSON.parse(response)
                const savedTestIds = []
                uniTests.each(function () {
                    let id = parseInt($(this).find('.id-test').val())
                    id = (isNaN(id) ? null : id)
                    $('#id-exercise').val(parsedExercise.id)
                    const testToSave = {
                        'id': id,
                        'hint': $(this).find(".form-title").val(),
                        'exercise': parsedExercise
                    }
                    savedTestIds.push(id)
                    saveTest($(this), testToSave, index)
                    index++
                })
                const allTests = getStoredPythonUnitTests();
                if (allTests && allTests.exercise) {
                    for (let i = 0; i < allTests.unitTests.length; i++) {
                        if (savedTestIds.includes(allTests.unitTests[i].id) == false) {
                            removeTest(allTests.unitTests[i])
                        }
                    }
                }
                updateTests();
            } else {
                console.log("Error while saving the exercise");
            }
        }
    })
}

function saveTest(formTest, uniTest, index) {
    $.ajax({
        type: "POST",
        url: "/routing/Routing.php?controller=unitTests&action=update",
        data: {
            "test": uniTest
        },
        success: function (response) {
            if (response !== false) {
                const parsedResponse = JSON.parse(response)
                formTest.find('.id-test').val(parsedResponse.id)

                const inputs = extractIOData(formTest, 'input');
                const outputs = extractIOData(formTest, 'output');
                const dataIoObject = {
                    input: buildIOPayload(inputs.items, response),
                    output: buildIOPayload(outputs.items, response)
                };

                saveIO(dataIoObject);

                const storedUnitTest = getStoredUnitTest(index);
                if (storedUnitTest) {
                    removeMissingStoredIO(storedUnitTest, inputs.ids, 'input');
                    removeMissingStoredIO(storedUnitTest, outputs.ids, 'output');
                }
            } else {
                console.log("Error while saving the unit test");
            }
        }
    })
}

function saveIO(dataIO/* , domIO, input = true */) {
    saveIOCollection('input', dataIO.input);
    saveIOCollection('output', dataIO.output);
}

function removeTest(test) {
    $.ajax({
        type: "POST",
        url: "/routing/Routing.php?controller=unitTests&action=delete",
        data: {
            "test": test.id
        },
        success: function (response) {
            if (response === "false") {
                console.log("Error while deleting the test");
            }
        }
    })
}

function removeIO(dataIO, input = true) {
    const route = input ? "input" : "output";
    $.ajax({
        type: "POST",
        url: "/routing/Routing.php?controller=" + route + "&action=delete",
        data: {
            "iO": dataIO
        },
        success: function (response) {
            if (response === "false") {
                console.log("Error while deleting the I/O");
            }
        }
    })
}

$('body').on('click', '#save-test', async function () {
    if (projectManager._currentProject.id) {
        var errors = []
        let secret = $('#form-secret');
        let fonction = $('#form-function');
        let uniTests = $('.test-unit');
        if ($(fonction).val().length > 30) {
            errors.push("code.add.form.errors.function");
        }

        errors.push(...validateUnitTestsForms(uniTests));

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
            await turtleAutocorrector.removeTurtleExercise();
            saveExercise(exerciseToSave, uniTests)
        } else {
            UIManager.showErrorMessage("save-exercise-message", "<span class='fa fa-times'></span> " + errors.join('<br>'));
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

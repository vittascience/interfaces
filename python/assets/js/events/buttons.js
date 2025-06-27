async function createPythonAutocorrector() {
    // If we are in LTI 1.3 context, we automatically save the project
    if (typeof ltiVariables13 != 'undefined' && projectManager._currentProject.link == null) {
        await lti13Controller.saveCurrentProjectForExercise();
    }
    document.querySelector('.ide-btn-group-settings').classList.add('hidden');
    pseudoModal.openModal('modal-formunittests');
    $('#save-exercise-message').html('');
    $('#save-exercise-message').attr("class", "");
    if ($('.test-unit')) {
        $('.test-unit').remove()
        $('#form-secret').val('')
        $('#form-function').val('')
        $('#form-solution').val('')
        $('#id-exercise').val('')
    }
    let myTests = ''

    if (projectManager._currentExercise) {
        myTests = projectManager._currentExercise
    }
    if (myTests !== '') {
        $('#form-secret').val(myTests.exercise.secretWord)
        $('#form-function').val(myTests.exercise.functionName)
        $('#form-solution').val(myTests.exercise.linkSolution)
        $('#id-exercise').val(myTests.exercise.id)
        for (let j = 0; j < myTests.unitTests.length; j++) {
            addTest(myTests.unitTests[j])
        }
        countTest()
    } else {
        addTest(false)
    }
}

$('body').on('click', "#return-exercise", function () {
    closeUnitTests();
});
$('body').on('click', ".remove-exercise, #cancel-test", function () {
    pseudoModal.closeModal('modal-formunittests');
});
$('#btn-login-duplicate').click(function () {
    pseudoModal.closeModal('modal-warningexercise');
    displayLogin();
});
$('#btn_tutorial_warning_duplicate_cancel').click(function () {
    pseudoModal.closeModal('modal-warningexercise');
});
$('#btn-signup-duplicate').click(function () {
    pseudoModal.closeModal('modal-warningexercise');
    displaySignup();
});
(function () {
    setTimeout(function () {
        Main.resizeWorkSpace();
        if (INTERFACE_NAME != "adacraft") {
            Main.resizeAceEditor();
        }
    }, 100);

}());

let autoScrollState = true;

$('#autoscrollCheckBox').on('change', function () {
    autoScrollState = !autoScrollState;
});

var intervals = [];

// Observer that execute Scroll when the console is modified
const consoleScrollElt = document.getElementById('console-wrapper');
const mutationElements = {
    childList: true
};
const scrollToAction = function (mutationList, observer) {
    if (autoScrollState) {
        consoleScrollElt.scrollTo(0, consoleScrollElt.scrollHeight);
    }
};
const observer = new MutationObserver(scrollToAction);
observer.observe(document.getElementById('console'), mutationElements);
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




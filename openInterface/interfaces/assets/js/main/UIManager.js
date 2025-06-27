var UIManager = (function () {
    /**
     * This object contains all the UI functionalities.
     * @private
     */
    var UI = {};

    UI.modalStack = [];

    // Modals
    UI.showModal = function (idModal) {
        $("#" + idModal).show();
        UI.modalStack.push(idModal);
    };
    UI.closeModal = function (idModal = null) {
        if (idModal === null) {
            var currentModal = UI.modalStack.pop();
            $("#" + currentModal).hide();
        } else {
            $("#" + idModal).hide();
            UI.modalStack.pop();
        }
    };

    // Switching buttons
    UI.switchingButtons = {
        "blocks": "#block_mode",
        "mixed": "#mixed_mode",
        "code": "#code_mode"
    };
    UI.switchingButtonsClasses = {
        "#block_mode": "ide-btn ide-btn-block ide-btn-left",
        "#mixed_mode": "ide-btn ide-btn-mixed",
        "#code_mode": "ide-btn ide-btn-console ide-btn-right"
    };
    UI.cssSwitchingButtons = function (codingMode) {
        for (let [mode, button] of Object.entries(UI.switchingButtons)) {
            $(button).attr('class', (codingMode == mode) ? "mode-selected " + UI.switchingButtonsClasses[button] : UI.switchingButtonsClasses[button]);
        }
    };
    UI.enableNeededSwitchingButtons = function (codingMode) {
        UI.cssSwitchingButtons(codingMode);
        for (let [button] of Object.entries(UI.switchingButtons)) {
            $(button).prop('disabled', false);
        }
    };
    UI.disableSwitchingButtons = function () {
        for (let button in UI.switchingButtons) {
            $(button).prop('disabled', true);
        }
    };

    // Binders
    UI.unbindAllEvent = function (elementId) {
        $("#" + elementId).unbind();
    };
    UI.bindClick = function (elementId, action) {
        UI.unbindAllEvent(elementId);
        $("#" + elementId).click(action);
    };

    // Messages
    UI.cleanMessage = function (messageDivId) {
        $("#" + messageDivId).attr("class", "");
        $("#" + messageDivId).html("");
    };
    UI.cleanMessages = function (messageDivIds) {
        messageDivIds.forEach(messageDivId => {
            $("#" + messageDivId).attr("class", "");
            $("#" + messageDivId).html("");
        });
    };
    UI.successMessage = function (messageDivId, message) {
        UI.cleanMessage(messageDivId);
        $("#" + messageDivId).attr("class", "alert alert-success");
        $("#" + messageDivId).html(message);
    };
    UI.errorMessage = function (messageDivId, message) {
        UI.cleanMessage(messageDivId);
        const $el = $("#" + messageDivId);
        $el.attr("class", "alert alert-warning alert-lite");
        $el.attr("role", "alert");
        $el.html(message);
    };
    UI.warningMessage = function (messageDivId, message) {
        UI.cleanMessage(messageDivId);
        $("#" + messageDivId).attr("class", "alert alert-warning alert-lite");
        $("#" + messageDivId).html(message);
    };

    UI.init = function () {
        return new Promise(function (resolve) {
            $(document).on('keydown', function (e) {
                if (e.keyCode === 27)
                    UI.closeModal();
            });
            resolve("loaded");
        });
    };
    return {
        /**
         * Init UIManager and return a resolved promise.
         *
         * @returns {Promise}
         */
        init: function () {
            return UI.init();
        },
        showModal: function (idModal) {
            UI.showModal(idModal);
        },
        closeModal: function (idModal) {
            UI.closeModal(idModal);
        },
        /**
         * Unbinds all the events and bind a click event with its action 
         * passed as parameter
         *
         * @param {string} elementId
         * @param {function} action
         */
        bindClick: function (elementId, action) {
            UI.bindClick(elementId, action);
        },
        resetMessage: function (elementId) {
            UI.cleanMessage(elementId);
        },
        resetMessages: function (elementsIds) {
            UI.cleanMessages(elementsIds);
        },
        showSuccessMessage: function (elementId, message) {
            UI.successMessage(elementId, message);
        },
        showErrorMessage: function (elementId, message) {
            UI.errorMessage(elementId, message);
        },
        showWarningMessage: function (elementId, message) {
            UI.warningMessage(elementId, message);
        },
        updateCssSwitchingButtons: function (currentMode) {
            UI.cssSwitchingButtons(currentMode);
        },
        enableSwitchingButtons: function (currentMode) {
            UI.enableNeededSwitchingButtons(currentMode);
        },
        disableSwitchingButtons: function () {
            UI.disableSwitchingButtons();
        }
    };

}());
'use strict';

function goToDisconnect() {
    history.pushState({}, '', removeParam("link", window.location.href));
    if (typeof(projectManager) !== 'undefined') {
        if (projectManager.getInterface() === 'ai') {
            projectManager._createNewAiProject();
        } else {
            projectManager._createNewProject();
        }
    }
    const url = window.location.toString();
    window.location = "/services/delete/deleteToken.php?redirect=" + url;
}
const navbarButtons = {
    projectManagement: {
        'newproject-btn': {
            id: 'newproject-btn',
            classes: 'ide-btn-new ide-btn-left ide-btn-large-left no-radius-sm',
            fontAwesome: 'fas fa-plus',
            title: 'code.topbar.tooltips.newProject',
            label: {
                value: 'code.topbar.label.new',
            },
            tooltipPlacement: 'top',
            onclick: 'newProject()',
            customAttributes: [
                { name: 'data-testid', value: "interfaceOpenModalToCreatNewProjectBtn" }
            ]
        },
        'openproject-btn': {
            classes: 'ide-btn-open no-radius-sm',
            id: 'openproject-btn',
            fontAwesome: 'fas fa-folder-open',
            title: 'code.topbar.tooltips.openProject',
            tooltipPlacement: 'top',
            onclick: 'openProjectBtn()',
            label: {
                value: 'code.topbar.label.open',
                hide: true
            },
        }
    },
    exerciceCreation: {
        'create-exercise': {
            classes: 'ide-btn-exercise',
            fontAwesome: 'fas fa-tasks',
            title: 'code.topbar.tooltips.exerciseSettings',
            tooltipPlacement: "top",
            onclick: "createExercise()",
            label: {
                value: "code.topbar.label.exercise"
            }
        }
    },
    exerciceRun: {
        'UTrunButtonPython': {
            classes: 'ide-btn-pythtest ide-btn-right',
            fontAwesome: 'fas fa-check',
            title: 'code.topbar.tooltips.checkTestTitle',
            tooltipPlacement: "top",
            onclick: "autocorrectionPython()",
            label: {
                value: "code.topbar.label.valid"
            }
        }
    }
};
if (typeof rtcInterfaces != 'undefined' && rtcInterfaces.includes(INTERFACE_NAME)) {
    navbarButtons.projectManagement['shareproject-btn'] = {
        id: 'shareproject-btn',
        classes: 'ide-btn ide-btn-share ide-btn-right ide-btn-large-right no-radius-sm',
        fontAwesome: 'fas fa-share-alt',
        title: 'code.topbar.tooltips.shareProject',
        tooltipPlacement: 'top',
        onclick: 'shareProjectButton()',
        label: {
            value: 'code.topbar.label.share',
        }
    };
} else {
    navbarButtons.projectManagement['saveproject-btn'] = {
        id: 'saveproject-btn',
        classes: 'ide-btn ide-btn-save ide-btn-right ide-btn-large-right no-radius-sm',
        fontAwesome: 'fas fa-save',
        title: 'code.topbar.tooltips.saveProject',
        tooltipPlacement: 'top',
        onclick: 'saveProjectbtn()',
        label: {
            value: 'code.topbar.label.save',
        },
        customAttributes: [
            { name: 'data-testid', value: "interfaceOpenModalToSaveOrShareProjectBtn" }
        ]
    };
}
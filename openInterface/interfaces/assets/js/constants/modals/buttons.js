const fullscreenButtons = {
    'fullscreen': {
        classes: 'ide-btn-alone btn-fullscreen',
        fontAwesome: 'fa fa-expand',
        title: 'code.topbar.tooltips.fullscreen',
        onclick: 'fullscreen()'
    }
}

const codeModeButtons = {
    'blocks': {
        id: "block_mode",
        classes: 'ide-btn-block ide-btn-left',
        fontAwesome: 'fas fa-th-large',
        title: 'code.topbar.tooltips.blockMode',
        onclick: "switchBlockMode();",
        label: {
            value: "code.topbar.label.blockMode"
        }
    },
    'mixed': {
        id: "mixed_mode",
        classes: 'ide-btn-mixed',
        fontAwesome: 'far fa-object-ungroup',
        onclick: "switchMixedMode();",
        title: 'code.topbar.tooltips.mixedMode',
        label: {
            value: "code.topbar.label.mixedMode"
        }
    },
    'code': {
        id: "code_mode",
        classes: 'ide-btn-console ide-btn-right',
        fontAwesome: 'fas fa-code',
        onclick: "switchCodeMode();",
        title: 'code.topbar.tooltips.codeMode',
        label: {
            value: "code.topbar.label.codeMode"
        },
        customAttributes: [
            { name: 'data-testid', value: "interfaceModeCodeBtn" }
        ]
    },
    'codeOnly': {
        id: "codeOnly_mode",
        classes: 'btn codeOnly',
        hasIdeBtnClass: false,
        fontAwesome: 'fa-solid fa-lock-open',
        onclick: "pseudoModal.openModal('modal-codeOnly')",
        title: 'code.topbar.tooltips.codeOnly'
    }
};

const simulatorButtons = {
    'simulator': {
        id: "run_simulator",
        classes: 'ide-btn-alone',
        fontAwesome: 'fas fa-play',
        title: 'code.topbar.tooltips.runSimulator',
        tooltipPlacement: "left",
        onclick: 'toggleSimulator()'
    }
};

const emptyButtons = {
    'emptyTrash': {
        id: "empty-trash-btn",
        classes: 'ide-btn-alone',
        fontAwesome: '',
        title: 'code.blockly.tooltips.trash',
        tooltipPlacement: "left",
        onclick: 'Blockly.getMainWorkspace().trashcan.emptyContents()',
        label: {
            hidden: true,
            value: 'code.blockly.label.trash'
        }
    },
    'emptyBackpack': {
        id: "empty-backpack-btn",
        classes: 'ide-btn-alone',
        fontAwesome: '',
        title: 'code.blockly.tooltips.backpack',
        tooltipPlacement: "left",
        onclick: 'Main.getBackpack().empty()',
        label: {
            hidden: true,
            value: 'code.blockly.label.backpack'
        }
    }
}
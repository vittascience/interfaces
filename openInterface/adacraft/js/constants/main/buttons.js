const cardCommunicationButtons = {
  'execute': {
    id: "execute",
    classes: 'ide-btn-check ide-btn-alone',
    fontAwesome: 'fas fa-flag',
    title: 'code.topbar.tooltips.checkCode',
    onclick: 'adacraft.greenFlag()',
    label: {
      value: "code.topbar.label.execute",
      hidden: true
    }
  }
};

const settingsOptions = {
  'accessibility': {
    id: "blockly-setting",
    classes: 'ide-btn-blockly-themes',
    fontAwesome: 'fas fa-low-vision',
    title: 'code.topbar.tooltips.accessibility',
    tooltipPlacement: "left",
    onclick: "openSettings()",
    label: {
      value: "code.topbar.label.themes"
    }
  },
  'addblock': {
    id: "addblock-setting",
    classes: 'ide-btn-add-block',
    fontAwesome: 'fas fa-link',
    onclick: "pseudoModal.openModal('modal-addblock')",
    title: 'code.topbar.tooltips.addBlockSettings',
    tooltipPlacement: "left",
    label: {
      value: "code.topbar.label.add"
    }
  },
  'help': {
    id: "help-setting",
    classes: 'ide-btn-right-dropdown ide-btn-help',
    fontAwesome: 'fas fa-question-circle',
    title: 'code.topbar.tooltips.help',
    tooltipPlacement: "left",
    label: {
      value: "code.topbar.label.help"
    }
  },
  'create-exercise-auto-corrector': {
    id: 'create-exercise-auto-corrector',
    classes: ' ide-btn-exercise',
    fontAwesome: 'fas fa-tasks',
    title: 'code.topbar.tooltips.exerciseSettings',
    tooltipPlacement: "left",
    onclick: "createExercise()",
    label: {
      value: "code.topbar.label.exercise"
    }
  },
};

const uiButtons = {
  'undo': {
    id: 'undo',
    i18: true,
    classes: 'ide-btn ide-btn-undo ide-btn-left undo blocks_button_sm hide-vsm',
    fontAwesome: 'fa fa-undo',
    title: 'code.topbar.tooltips.undo',
    tooltipPlacement: 'top',
    onclick: 'undoAdacraft()'
  },
  'redo': {
    id: 'redo',
    i18: true,
    classes: 'ide-btn ide-btn-redo ide-btn-right redo blocks_button_sm hide-vsm',
    fontAwesome: 'fa fa-redo',
    title: 'code.topbar.tooltips.redo',
    tooltipPlacement: 'top',
    onclick: 'redoAdacraft()'
  }
};

const adacraftModeButtons = {
  'code': {
    id: "adacraft-code",
    classes: 'ide-btn-blockly-themes ide-btn-left ide-btn-large-left no-radius-sm',
    fontAwesome: 'fas fa-code',
    title: 'code.topbar.tooltips.codeMode',
    tooltipPlacement: "top",
    onclick: "adacraft.tabs.switchToTab(adacraft.tabs.BLOCKS_TAB_INDEX)",
    label: {
      value: "code.topbar.label.codeMode"
    }
  },
  'costumes': {
    id: "adacraft-costume",
    classes: 'ide-btn-board-settings no-radius-sm',
    fontAwesome: 'fas fa-paint-brush',
    title: 'code.topbar.tooltips.costumesMode',
    tooltipPlacement: "top",
    onclick: "adacraft.tabs.switchToTab(adacraft.tabs.COSTUMES_TAB_INDEX)",
    label: {
      value: "code.topbar.label.costumesMode"
    }
  },
  'sons': {
    id: "adacraft-sons",
    classes: 'ide-btn-blockly-themes ide-btn-right ide-btn-large-right no-radius-sm',
    fontAwesome: 'fas fa-music',
    title: 'code.topbar.tooltips.soundsMode',
    tooltipPlacement: "top",
    onclick: "adacraft.tabs.switchToTab(adacraft.tabs.SOUNDS_TAB_INDEX)",
    label: {
      value: "code.topbar.label.soundsMode"
    }
  }
};
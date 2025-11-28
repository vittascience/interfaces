export function initBlocklyAccessibility() {
  // console.log("Initializing Blockly accessibility");
  const workspaceObserver = new MutationObserver(() => {
    const workspace = document.querySelector('.blocklyWorkspace');
    if (workspace) {
      // console.log("Workspace detected, initialization.");
      addAriaLabels();
      removeToolboxFocusable();
    }
  });

  workspaceObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function removeToolboxFocusable() {
  const focusableElements = document.querySelectorAll('.blocklyToolboxContents, .blocklyTreeSearch, .blocklySvg');
  focusableElements.forEach(element => {
    if (element) {
      element.setAttribute("tabindex", "-1");
    }
  })
}

function addAriaLabels(){
  const blocklyBackpack = document.querySelector('.blocklyBackpack');
  if (blocklyBackpack) {
    blocklyBackpack.setAttribute('aria-label', i18next.t('code.tooltip.backpack') + " – " + i18next.t('code.tooltip.blocklyBackpack') );
    blocklyBackpack.setAttribute('role', 'button');
    blocklyBackpack.setAttribute('tabindex', '0');
  }
}


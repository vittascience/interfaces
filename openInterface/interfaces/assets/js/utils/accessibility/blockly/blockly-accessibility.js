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
  // Not the workspace <svg>: a tabindex, even -1, lets it take the focus, and so the selection,
  // from the clicked block since Blockly 12, which prevents dragging blocks.
  const focusableElements = document.querySelectorAll('.blocklyToolboxCategoryGroup, .blocklyTreeSearch');
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
    blocklyBackpack.setAttribute('role', 'img');
    // tabindex is handled by setBlocklyControlsA11y() via a <button> in <foreignObject>
  }
}


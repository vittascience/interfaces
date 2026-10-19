/**
 * Fix scrollable region focusability for Blockly toolbox
 * WCAG 2.1.1 compliance - scrollable regions must be focusable
 */

export function fixBlocklyToolboxFocus() {
  const toolboxDiv = document.querySelector('.blocklyToolbox');
  
  if (toolboxDiv && needsFocusFix(toolboxDiv)) {
    toolboxDiv.setAttribute('tabindex', '0');
    toolboxDiv.setAttribute('aria-label', 'Boîte à outils Blockly - Utilisez les flèches pour naviguer');
    toolboxDiv.setAttribute('role', 'region');
  }
}

/**
 * Check if toolbox needs focus fix
 */
function needsFocusFix(toolbox) {
  const isScrollable = toolbox.scrollHeight > toolbox.clientHeight || 
                      toolbox.scrollWidth > toolbox.clientWidth;
  const isNotFocusable = toolbox.getAttribute('tabindex') === '-1' || 
                        !toolbox.getAttribute('tabindex');
  
  return isScrollable && isNotFocusable;
}

const observer = new MutationObserver((mutations) => {
  let needsFix = false;
  
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches?.('.blocklyToolbox') ||
              node.querySelector?.('.blocklyToolbox')) {
            needsFix = true;
          }
        }
      });
    } else if (mutation.type === 'attributes' && 
               mutation.attributeName === 'tabindex' &&
               mutation.target.classList.contains('blocklyToolbox')) {
      needsFix = true;
    }
  });
  
  if (needsFix) {
    setTimeout(fixBlocklyToolboxFocus, 100);
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['tabindex']
    });
    fixBlocklyToolboxFocus();
  });
} else {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['tabindex']
  });
  fixBlocklyToolboxFocus();
} 
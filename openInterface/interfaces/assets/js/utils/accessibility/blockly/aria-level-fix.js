/**
 * Fix invalid aria-level="0" values in Blockly toolbox categories
 * WCAG 4.1.2 compliance - aria-level must start at 1, not 0
 */

export function fixBlocklyAriaLevels() {
  const invalidElements = document.querySelectorAll('.blocklyToolboxCategory[aria-level="0"]');
  
  if (invalidElements.length > 0) {
    invalidElements.forEach(element => {
      element.setAttribute('aria-level', '1');
    });
  }
}

const observer = new MutationObserver((mutations) => {
  let needsFix = false;
  
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches?.('.blocklyToolboxCategory[aria-level="0"]') ||
              node.querySelector?.('.blocklyToolboxCategory[aria-level="0"]')) {
            needsFix = true;
          }
        }
      });
    } else if (mutation.type === 'attributes' && 
               mutation.attributeName === 'aria-level' &&
               mutation.target.getAttribute('aria-level') === '0' &&
               mutation.target.classList.contains('blocklyToolboxCategory')) {
      needsFix = true;
    }
  });
  
  if (needsFix) {
    fixBlocklyAriaLevels();
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-level']
    });
    fixBlocklyAriaLevels();
  });
} else {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['aria-level']
  });
  fixBlocklyAriaLevels();
}
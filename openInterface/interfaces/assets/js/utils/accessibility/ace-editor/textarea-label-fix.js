/**
 * Fix missing label for Ace editor textarea
 * WCAG 4.1.2 compliance - form controls must have accessible names
 */

export function fixAceTextareaLabel() {
  const aceTextarea = document.querySelector('.ace_text-input');

  if (aceTextarea && !hasAccessibleLabel(aceTextarea)) {
    aceTextarea.setAttribute('aria-label', 'Éditeur de code Python - Zone de saisie');
  }
}

/**
 * Check if element has any form of accessible label
 */
function hasAccessibleLabel(element) {
  return element.getAttribute('aria-label') ||
         element.getAttribute('aria-labelledby') ||
         element.getAttribute('title') ||
         element.getAttribute('placeholder') ||
         element.closest('label') ||
         document.querySelector(`label[for="${element.id}"]`);
}

const observer = new MutationObserver((mutations) => {
  let needsFix = false;
  
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches?.('.ace_text-input') ||
              node.querySelector?.('.ace_text-input')) {
            needsFix = true;
          }
        }
      });
    }
  });
  
  if (needsFix) {
    setTimeout(fixAceTextareaLabel, 100);
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    fixAceTextareaLabel();
  });
} else {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  fixAceTextareaLabel();
} 
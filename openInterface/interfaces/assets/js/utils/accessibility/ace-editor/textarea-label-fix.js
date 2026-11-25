/**
 * Fix missing label for Ace editor textarea
 * WCAG 4.1.2 compliance - form controls must have accessible names
 */

const codeEditorName = () => typeof jsonPath === 'function' ? jsonPath('modals.standard.shortcuts.sections.code') : 'Éditeur de code';
const ACE_MODE_LANGUAGES = { c_cpp: 'C++', python: 'Python', javascript: 'JavaScript', html: 'HTML', css: 'CSS' };

/**
 * Name of the code editor with the language of the interface ("Éditeur de code C++" on Arduino): Ace puts it before
 * its own "Cursor at row n". The mode can be loaded after the editor: the name is updated each time it gets the focus.
 */
function nameCodeEditor(editor) {
  const mode = (editor.session.getMode().$id || '').split('/').pop();
  const name = codeEditorName();
  editor.setOption('textInputAriaLabel', ACE_MODE_LANGUAGES[mode] ? `${name} ${ACE_MODE_LANGUAGES[mode]}` : name);
  // Ace only computes its label when the cursor moves
  if (editor.textInput && editor.textInput.setAriaLabel) editor.textInput.setAriaLabel();
  // Ace adds "Cursor at row n" in English whatever the language (internal function): translated each time it is set
  const textarea = editor.textInput && editor.textInput.getElement();
  if (textarea && !textarea.vittaLabel) {
    textarea.vittaLabel = true;
    const translate = () => {
      const label = textarea.getAttribute('aria-label') || '';
      const match = label.match(/Cursor at row (\d+)/);
      if (!match || typeof i18next === 'undefined') return;
      textarea.setAttribute('aria-label', label.replace(match[0], i18next.t('code.a11yBlocks.codeLine', { line: match[1] })));
    };
    new MutationObserver(translate).observe(textarea, { attributes: true, attributeFilter: ['aria-label'] });
    translate();
  }
}

/**
 * Read line by line, the code was cut in the middle of the words: Ace draws each line in pieces of colours and keeps only
 * the visible lines. Its drawing is hidden from the screen readers and a full text copy of the code is given instead
 * (the text box of Ace stays the way to edit it).
 */
function mirrorCodeForScreenReaders(editor) {
  editor.container.querySelector('.ace_scroller')?.setAttribute('aria-hidden', 'true');
  const mirror = document.createElement('pre');
  mirror.className = 'visually-hidden';
  mirror.setAttribute('role', 'region');
  mirror.setAttribute('aria-label', typeof jsonPath === 'function' ? jsonPath('code.a11yBlocks.generatedCode') : 'Code');
  editor.container.after(mirror);
  let timer = null;
  const update = () => {
    timer = null;
    mirror.textContent = editor.getValue();
  };
  editor.on('change', () => {
    if (!timer) timer = setTimeout(update, 300);
  });
  update();
}

export function fixAceTextareaLabel() {
  // Main.getCodeEditor() is the Code.editor object, the Ace editor is its container
  const editor = typeof Main !== 'undefined' && Main.getCodeEditor && Main.getCodeEditor()?.container;
  if (editor && editor.setOption && editor.session) {
    if (!editor.vittaNamed) {
      editor.vittaNamed = true;
      editor.on('focus', () => nameCodeEditor(editor));
      mirrorCodeForScreenReaders(editor);
    }
    nameCodeEditor(editor);
    return;
  }
  const aceTextarea = document.querySelector('.ace_text-input');
  if (aceTextarea && !hasAccessibleLabel(aceTextarea)) {
    aceTextarea.setAttribute('aria-label', codeEditorName());
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
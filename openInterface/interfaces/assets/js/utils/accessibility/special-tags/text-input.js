import { updateAriaLiveRegion } from "../utils/live-region.js";

export function setupTextInputAccessibility() {
  function setupInputText(input) {
    input.addEventListener('input', (event) => {
      const newChar = event.data;
      if (newChar) {
        updateAriaLiveRegion(newChar);
      }
    });
  }

  const textInputs = document.querySelectorAll('input[type="text"]');
  textInputs.forEach(setupInputText);

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeName === 'INPUT' && node.type === 'text') {
            setupInputText(node);
          }
        });
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
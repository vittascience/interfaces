export function setupCheckboxAccessibility() {
  function toggleCheckbox(checkbox) {
    checkbox.checked = !checkbox.checked;
  }

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        toggleCheckbox(checkbox);
      }
    });
  });

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeName === 'INPUT' && node.type === 'checkbox') {
            node.addEventListener('keydown', (event) => {
              if (event.key === 'Enter') {
                  toggleCheckbox(node);
              }
            });
          }
        });
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
export function observeNewTooltips() {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.classList.contains('tooltip-inner'))
            node.setAttribute('aria-hidden', 'true');
          
          const tooltip = node.querySelector('.tooltip-inner');
          if (tooltip)
            tooltip.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
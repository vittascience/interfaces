import { setupConsoleSimulationAccessibility } from './simulation.js';
import { updateAriaLiveRegion } from "../utils/live-region.js";

function bindMonitorToolsAccessibility() {
  const monitorTools = document.getElementById('monitor-tools');
  if (!monitorTools) {
      console.error('Monitor tools container not found');
      return;
  }

  const buttons = monitorTools.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        button.focus();
    });

    button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            button.click();
            button.focus();
        }
    });
  });
}

function observeConsole() {
  const consoleElement = document.getElementById('console');
  const callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE
            && node.textContent
            && !node.outerHTML.includes("<span>&gt;&gt;&gt;&nbsp;</span>")
          ) {
            updateAriaLiveRegion(`Retour console: ${node.textContent}`, {priority:true});
          }
        });
      }
    }
  };

  const observer = new MutationObserver(callback);
  const config = { childList: true };
  observer.observe(consoleElement, config);
}

export function handleSetupConsoleAccessibility(){
  bindMonitorToolsAccessibility();
  observeConsole();

  setupConsoleSimulationAccessibility();
}
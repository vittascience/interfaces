import { setupConsoleSimulationAccessibility } from './simulation.js';
import { updateAriaLiveRegion } from "../utils/live-region.js";

function bindMonitorToolsAccessibility() {
  const monitorTools = document.getElementById('monitor-tools');
  // Interfaces without a console (e.g. web) have no monitor tools.
  if (!monitorTools) return;

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

const CONSOLE_ANNOUNCE_INTERVAL_MS = 1000;
const CONSOLE_ANNOUNCE_MAX_CHARS = 300;

/**
 * Returns the text added to the console between two snapshots.
 * Some writers rebuild the whole console (`innerHTML +=`), which re-creates every
 * old line: comparing text snapshots avoids announcing those lines again.
 * @param {string} previous - Console text at the last announcement.
 * @param {string} current - Console text now.
 * @returns {string} The new text, or '' if the console was cleared or rewritten.
 */
export function getNewConsoleText(previous, current) {
  if (current.startsWith(previous)) return current.slice(previous.length);
  // Old lines trimmed from the top (MAX_CONSOLE_LINES): drop them until the rest matches.
  let start = previous.indexOf('\n');
  while (start !== -1) {
    const kept = previous.slice(start + 1);
    if (kept && current.startsWith(kept)) return current.slice(kept.length);
    start = previous.indexOf('\n', start + 1);
  }
  return '';
}

function observeConsole() {
  const consoleElement = document.getElementById('console');
  if (!consoleElement) return;
  let announcedText = consoleElement.innerText;
  let timer = null;

  // Throttled: a program printing in a loop must not flood the screen reader queue.
  const flush = () => {
    timer = null;
    const currentText = consoleElement.innerText;
    const newText = getNewConsoleText(announcedText, currentText)
      .split('\n')
      .map(line => line.trim())
      // Skip the echo of commands typed in the REPL (">>> ..."): the user just typed them.
      .filter(line => line && !line.startsWith('>>>'))
      .join('\n');
    announcedText = currentText;
    if (newText) {
      updateAriaLiveRegion(i18next.t('code.a11yBlocks.consolePrefix', { text: newText.slice(-CONSOLE_ANNOUNCE_MAX_CHARS), interpolation: { escapeValue: false } }));
    }
  };

  const observer = new MutationObserver(() => {
    if (!timer) timer = setTimeout(flush, CONSOLE_ANNOUNCE_INTERVAL_MS);
  });
  observer.observe(consoleElement, { childList: true, characterData: true, subtree: true });
}

export function handleSetupConsoleAccessibility(){
  bindMonitorToolsAccessibility();
  observeConsole();

  setupConsoleSimulationAccessibility();
}
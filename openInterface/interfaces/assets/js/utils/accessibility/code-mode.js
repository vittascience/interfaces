const codeSelectors = ".ace_editor, .ace_scrollbar, .btn-zoom-editor, .ace_text-input";
const blockSelectors = ".injectionDiv, .blocklyToolboxDiv, .blocklyToolboxContents, .blocklyTreeSearch, .blocklySvg, .blocklyBackpack";
const allSelectors = `${codeSelectors}, ${blockSelectors}`;

export function initCodeModeAccessibility() {
  document.addEventListener("modeChangeEvent", (event) => {
    // console.log("Fetch "modeChangeEvent" Event:", event.detail);
    switch (event.detail.mode) {
      case 'blocks':
        handleBlocksMode();
        break;
      case 'code':
        handleCodeMode();
        break;
      case 'mixed':
      default:
        resetAllTabIndexes();
        break;
    }
  });
}

function setTabIndexForElements(selectors, tabIndexValue) {
  const elements = document.querySelectorAll(selectors);
  elements.forEach((el) => el.setAttribute("tabindex", tabIndexValue));
}

function resetAllTabIndexes() {
  setTabIndexForElements(allSelectors, "0");
}

function handleBlocksMode() {
  setTabIndexForElements(codeSelectors, "-1");
  setTabIndexForElements(blockSelectors, "0");
}

function handleCodeMode() {
  setTabIndexForElements(blockSelectors, "-1");
  setTabIndexForElements(codeSelectors, "0");
}
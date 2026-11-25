/**
 * Name of the toolbox: the tree of the categories made by Blockly has no name, it was read "clickable, tree,
 * collapsed" line by line. (Blockly makes the toolbox focusable itself.)
 */

export function fixBlocklyToolboxFocus() {
  const tree = document.querySelector('.blocklyToolbox [role="tree"]');
  if (tree && !tree.hasAttribute('aria-label')) {
    tree.setAttribute('aria-label', typeof jsonPath === 'function' ? jsonPath('code.a11yBlocks.toolbox') : 'Boîte à outils');
  }
}

// The toolbox is built again when the interface changes its content (board, search): name it again.
const observer = new MutationObserver(fixBlocklyToolboxFocus);
const observe = () => {
  observer.observe(document.body, { childList: true, subtree: true });
  fixBlocklyToolboxFocus();
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observe);
} else {
  observe();
}

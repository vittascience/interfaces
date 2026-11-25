/**
 * The text box opened to edit a number or a text of a block has no name in Blockly: give it the one of the field
 * ("Modifier nombre"), otherwise the screen readers only say "edit".
 */
function nameFieldEditors() {
  // FieldInput (parent of FieldNumber and FieldTextInput) is not exported by the Blockly build
  const proto = Blockly.FieldNumber && Object.getPrototypeOf(Blockly.FieldNumber.prototype);
  if (!proto || !proto.widgetCreate_ || proto.widgetCreate_.vittaNamed) return;
  const widgetCreate = proto.widgetCreate_;
  proto.widgetCreate_ = function (...args) {
    const input = widgetCreate.apply(this, args);
    const type = this.getAriaTypeName ? this.getAriaTypeName() : '';
    if (input && type) input.setAttribute('aria-label', Blockly.Msg.FIELD_LABEL_EDIT_PREFIX.replace('%1', type));
    return input;
  };
  proto.widgetCreate_.vittaNamed = true;
}

/**
 * Switching to another window (Alt+Tab, e.g. to read the exercise) fires blur/focusout with no related target on the
 * focused element: Blockly took it as the focus leaving the blocks, closed the flyout or the grid of choices and
 * cancelled the keyboard move, the focus being on the page when coming back. Those events are stopped while the
 * document has lost the focus (window switch, not a focus change in the page): the browser gives the focus back to the
 * same element.
 */
function keepBlocklyFocusOnWindowSwitch() {
  if (window.vittaBlocklyWindowSwitch) return;
  window.vittaBlocklyWindowSwitch = true;
  const BLOCKLY_AREAS = '.injectionDiv, .blocklyWidgetDiv, .blocklyDropDownDiv';
  for (const type of ['blur', 'focusout']) {
    window.addEventListener(type, (event) => {
      if (event.target === window || document.hasFocus()) return;
      if (event.target instanceof Element && event.target.closest(BLOCKLY_AREAS)) event.stopImmediatePropagation();
    }, true);
  }
}

/**
 * Short text of a block for the announcements ("Répéter indéfiniment", "si alors"): its own fields until its first
 * statement input, without its child blocks nor the images (the "+" / "-" buttons).
 */
function blockText(block) {
  const words = [];
  for (const input of block.inputList) {
    if (!input.isVisible()) continue;
    for (const field of input.fieldRow) {
      if (field instanceof Blockly.FieldImage || !field.isVisible()) continue;
      const text = field.getText();
      if (text && text.trim()) words.push(text.trim());
    }
    if (input.type === Blockly.inputs.inputTypes.STATEMENT) break;
  }
  const text = words.join(' ') || block.type;
  return text.length > 60 ? text.slice(0, 57) + '...' : text;
}

function announce(message) {
  if (typeof window.updateAriaLiveRegion === 'function') window.updateAriaLiveRegion(message);
}

/**
 * Default place of a block inserted from the flyout when the cursor was on no block (the workspace itself): the end of
 * the main loop ("forever"), or of the last stack of the program, instead of the workspace where it is disabled.
 * @param {object} strategy - The BlockDragStrategy of the moved block
 * @returns {object|null} A connection candidate
 */
function programCandidate(strategy) {
  const pairs = strategy.allConnectionPairs || [];
  const stacks = strategy.workspace.getTopBlocks(true)
    .filter((block) => block !== strategy.block && !block.previousConnection && !block.outputConnection);
  const loop = stacks.find((block) => block.type === 'forever') || stacks[stacks.length - 1];
  const input = loop && loop.inputList.find((i) => i.type === Blockly.inputs.inputTypes.STATEMENT && i.connection);
  if (!input) return null;
  let last = input.connection.targetBlock();
  while (last && last.getNextBlock()) last = last.getNextBlock();
  const neighbour = last ? last.nextConnection : input.connection;
  const pair = pairs.find((p) => p.neighbour === neighbour);
  return pair ? strategy.pairToCandidate(pair) : null;
}

/**
 * Keyboard moves of blocks (inserting from the flyout, M): the block was placed outside the program without the user
 * knowing it (no cursor on a block, one arrow too many) and nothing was said when it was dropped.
 */
function improveKeyboardMoves() {
  const proto = Blockly.dragging && Blockly.dragging.BlockDragStrategy && Blockly.dragging.BlockDragStrategy.prototype;
  if (!proto || proto.vittaKeyboardMoves) return;
  proto.vittaKeyboardMoves = true;

  const getInitialCandidate = proto.getInitialCandidate;
  proto.getInitialCandidate = function (...args) {
    return getInitialCandidate.apply(this, args) || programCandidate(this);
  };

  // At the end of the places, stay on the last one (Ctrl + arrows still move the block freely)
  const findTraversalCandidate = proto.findTraversalCandidate;
  proto.findTraversalCandidate = function (delta, ...args) {
    const candidate = findTraversalCandidate.call(this, delta, ...args);
    if (candidate || !this.connectionCandidate) return candidate;
    const direction = this.getDirectionToNewLocation(Blockly.utils.Coordinate.sum(this.startLoc, delta));
    // Blockly's internal Direction enum: NONE 0, UP 1, DOWN 2, LEFT 3, RIGHT 4
    const forward = direction === 2 || direction === 4;
    announce(jsonPath(forward ? 'code.a11yBlocks.lastPlace' : 'code.a11yBlocks.firstPlace'));
    return this.connectionCandidate;
  };

  const startDrag = proto.startDrag;
  proto.startDrag = function (event, ...args) {
    this.vittaKeyboardDrag = event instanceof KeyboardEvent;
    return startDrag.call(this, event, ...args);
  };

  // Where the block has been dropped
  const endDrag = proto.endDrag;
  proto.endDrag = function (event, disposition, ...args) {
    const result = endDrag.call(this, event, disposition, ...args);
    const block = this.block;
    if (this.vittaKeyboardDrag && block && !block.isDeadOrDying() && disposition !== Blockly.DragDisposition.DELETE) {
      setTimeout(() => {
        const previous = block.getPreviousBlock();
        const params = { block: blockText(block) };
        if (previous && previous.getNextBlock() === block) {
          announce(i18next.t('code.a11yBlocks.dropAfter', { ...params, target: blockText(previous), interpolation: { escapeValue: false } }));
        } else if (block.getParent()) {
          announce(i18next.t('code.a11yBlocks.dropInside', { ...params, target: blockText(block.getSurroundParent() || block.getParent()), interpolation: { escapeValue: false } }));
        } else {
          announce(i18next.t('code.a11yBlocks.dropOutside', { ...params, interpolation: { escapeValue: false } }));
        }
      }, 0);
    }
    this.vittaKeyboardDrag = false;
    return result;
  };
}

/**
 * Context menus of Blockly: the shortcut was glued to the name of the items ("Dupliquer D", "Ajouter un commentaire ")
 * and the menu had no name. The shortcut becomes aria-keyshortcuts, announced apart by the screen readers.
 */
function fixContextMenus() {
  const fix = (menu) => {
    menu.setAttribute('aria-label', jsonPath('code.a11yBlocks.contextMenu'));
    menu.querySelectorAll('[role="menuitem"]').forEach((item) => {
      const container = item.querySelector('.blocklyShortcutContainer');
      if (!container) return;
      const shortcut = container.querySelector('.blocklyShortcut')?.textContent.trim();
      item.setAttribute('aria-label', container.firstElementChild?.textContent.trim() || item.textContent.trim());
      if (shortcut) item.setAttribute('aria-keyshortcuts', shortcut);
    });
  };
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        const menu = node.matches('.blocklyContextMenu') ? node : node.querySelector('.blocklyContextMenu');
        if (menu) fix(menu);
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
}

/**
 * Wrap the callback of a keyboard shortcut of Blockly.
 * @param {string} name - Name of the shortcut in the registry ("undo", "delete"...)
 * @param {function} wrapper - (callback, ...args) => result, calls the original callback
 */
function wrapShortcut(name, wrapper) {
  // getRegistry() returns copies: the registered object is in the internal map (registering it again would add its key
  // mapping a second time, and call it twice)
  const shortcut = Blockly.ShortcutRegistry.registry.shortcuts?.get?.(name);
  if (!shortcut || shortcut.vittaWrapped) return;
  const callback = shortcut.callback;
  shortcut.callback = (...args) => wrapper(callback, ...args);
  shortcut.vittaWrapped = true;
}

/**
 * Keyboard shortcuts that were silent: undo and redo (the whole program had to be read again to check), delete (only
 * the block above was read), T with no category selected in the toolbox.
 */
function announceShortcuts() {
  for (const [name, redo] of [['undo', false], ['redo', true]]) {
    wrapShortcut(name, (callback, workspace, ...args) => {
      const stack = redo ? workspace.getRedoStack() : workspace.getUndoStack();
      const empty = !stack.length;
      const result = callback(workspace, ...args);
      announce(jsonPath(`code.a11yBlocks.${empty ? (redo ? 'nothingToRedo' : 'nothingToUndo') : (redo ? 'redone' : 'undone')}`));
      return result;
    });
  }
  wrapShortcut('delete', (callback, workspace, event, shortcut, scope, ...args) => {
    const node = scope && scope.focusedNode;
    const text = node instanceof Blockly.BlockSvg ? blockText(node) : null;
    const result = callback(workspace, event, shortcut, scope, ...args);
    if (text && node.isDeadOrDying()) {
      announce(i18next.t('code.a11yBlocks.deleted', { block: text, interpolation: { escapeValue: false } }));
    }
    return result;
  });
  // T: Blockly gives the focus back to the last item of the toolbox, often the search field, hidden when the window is not
  // maximized (display: none): the browser can't focus it, nothing happened and nothing was announced
  wrapShortcut('focus_toolbox', (callback, workspace, ...args) => {
    const result = callback(workspace, ...args);
    const toolbox = workspace.getToolbox && workspace.getToolbox();
    const element = Blockly.getFocusManager().getFocusedNode()?.getFocusableElement?.();
    if (toolbox && (!element || document.activeElement !== element || !element.getClientRects().length)) {
      // first named category (not the search field, first item of the toolbox in a wide window)
      const first = toolbox.getToolboxItems().find((item) => item.isSelectable && item.isSelectable() && item.getName && item.getName());
      if (first) Blockly.getFocusManager().focusNode(first);
    }
    return result;
  });
}

/**
 * The workspace says how many stacks of blocks it has ("2 piles de blocs"), but the label was computed before the
 * project was loaded (events disabled): "0 piles de blocs" was read at the opening of the page.
 */
function keepWorkspaceLabelUpToDate() {
  const workspace = Blockly.getMainWorkspace();
  if (!workspace || !workspace.updateAriaLabel || workspace.vittaLabel) return;
  workspace.vittaLabel = true;
  const update = () => workspace.updateAriaLabel();
  workspace.addChangeListener((event) => {
    if ([Blockly.Events.BLOCK_CREATE, Blockly.Events.BLOCK_DELETE, Blockly.Events.FINISHED_LOADING].includes(event.type)) update();
  });
  for (const [owner, name] of [[Blockly.Xml, 'domToWorkspace'], [Blockly.serialization && Blockly.serialization.workspaces, 'load']]) {
    if (!owner || typeof owner[name] !== 'function') continue;
    const load = owner[name];
    owner[name] = function (...args) {
      const result = load.apply(this, args);
      setTimeout(update, 0);
      return result;
    };
  }
  update();
}

// Role of a dropdown from its field name: the pin and the operator of the "if" block were both "grid dropdown"
const FIELD_ROLES = [
  [/^PIN(_[A-Z])?$/, 'pin'], [/^(RX|TX|CIN|DIN|DI|DIO|DCKI|CLK|CS|CE|CSN)$/, 'pin'], [/^OP\d*$/, 'operator'],
  [/^UNIT$/, 'unit'], [/^(PLAY_)?MODE$/, 'mode'], [/^STATE$/, 'state'], [/^NOTE$/, 'note'], [/^COLOU?R$/, 'colour'],
  [/^DIR(ECTION)?$/, 'direction'], [/^MOTOR$/, 'motor'], [/^TYPE$/, 'type'], [/^DATA$/, 'data'], [/^AXIS$/, 'axis'],
  [/^CHANNEL$/, 'channel'], [/^SENSOR$/, 'sensor'], [/^ADDR(ESS)?$/, 'address'], [/^VERSION$/, 'version'],
  [/^COMMAND\d*$/, 'command']
];
// Operators in words: their symbols are not read by NVDA with its default punctuation level
const OPERATOR_WORDS = { '=': 'eq', '==': 'eq', '≠': 'neq', '!=': 'neq', '<': 'lt', '≤': 'lte', '<=': 'lte', '>': 'gt',
  '≥': 'gte', '>=': 'gte', '+': 'add', '-': 'minus', '−': 'minus', '×': 'multiply', '*': 'multiply', '÷': 'divide', '/': 'divide', '^': 'power' };

/** "inférieur à" for "<" (the U+200F right-to-left mark some option texts start with removed), null otherwise. */
function operatorWords(text) {
  const key = OPERATOR_WORDS[String(text).replace(/[‎‏]/g, '').trim()];
  return key ? jsonPath(`code.a11yBlocks.operators.${key}`) : null;
}

function nameDropdowns() {
  const proto = Blockly.FieldDropdown && Blockly.FieldDropdown.prototype;
  if (!proto || proto.vittaRoles) return;
  proto.vittaRoles = true;
  const getAriaTypeName = proto.getAriaTypeName;
  proto.getAriaTypeName = function (...args) {
    const name = String(this.name || '');
    // a type given by the block is kept, not the generic ones ("grid dropdown" is set by the grid field itself)
    const generic = !this.ariaTypeName || [Blockly.Msg.ARIA_TYPE_FIELD_GRID, Blockly.Msg.ARIA_TYPE_FIELD_DROPDOWN].includes(this.ariaTypeName);
    const role = generic && FIELD_ROLES.find(([pattern]) => pattern.test(name));
    if (!role) return getAriaTypeName.apply(this, args);
    const text = jsonPath(`code.a11yBlocks.fieldRoles.${role[1]}`);
    // "broche RX": several pins in one block
    return role[1] === 'pin' && !name.startsWith('PIN') ? `${text} ${name}` : text;
  };
  const computeOptionAriaLabel = proto.computeOptionAriaLabel;
  proto.computeOptionAriaLabel = function (option, ...args) {
    const label = computeOptionAriaLabel.call(this, option, ...args);
    return (typeof label === 'string' && operatorWords(label)) || (typeof label === 'string' ? label.replace(/[‎‏]/g, '') : label);
  };
  // Cells of the grids of choices: the symbol alone was read, and the current value was not told (aria-selected follows
  // the cell having the focus): it gets aria-current, read "current"
  new MutationObserver(() => {
    const cells = document.querySelectorAll('.blocklyFieldGridItem:not([data-vitta-named])');
    if (!cells.length) return;
    const owner = Blockly.DropDownDiv.getOwner && Blockly.DropDownDiv.getOwner();
    const current = owner && owner.getText ? owner.getText().trim() : null;
    cells.forEach((item) => {
      item.dataset.vittaNamed = '1';
      const words = operatorWords(item.textContent);
      if (words) item.setAttribute('aria-label', words);
      if (current !== null && item.textContent.trim() === current) item.setAttribute('aria-current', 'true');
    });
  }).observe(document.body, { childList: true, subtree: true });

  // At the edge of a row or a column, the arrows went to the next row or column without any signal: stop with a beep
  document.addEventListener('keydown', (event) => {
    const cell = event.target instanceof Element && event.target.closest('.blocklyFieldGridItem');
    if (!cell || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    const row = cell.closest('[role="row"]');
    const rows = [...cell.closest('[role="grid"]').querySelectorAll('[role="row"]')];
    const cellsOfRow = [...row.querySelectorAll('.blocklyFieldGridItem')];
    const column = cellsOfRow.indexOf(cell);
    const rowIndex = rows.indexOf(row);
    const next = rows[rowIndex + 1] && rows[rowIndex + 1].querySelectorAll('.blocklyFieldGridItem')[column];
    const edge = (event.key === 'ArrowLeft' && column === 0)
      || (event.key === 'ArrowRight' && column === cellsOfRow.length - 1)
      || (event.key === 'ArrowUp' && rowIndex === 0)
      || (event.key === 'ArrowDown' && !next);
    if (!edge) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    Blockly.getMainWorkspace().getAudioManager().playErrorBeep();
  }, true);
}

/**
 * In the toolbox, a letter goes to the next visible category starting with it (C: Communication, then Capteurs), as in
 * any tree view: the 14 categories had to be gone through with the arrows. T and W keep their Blockly shortcut.
 */
function toolboxFirstLetterNavigation() {
  if (window.vittaToolboxLetters) return;
  window.vittaToolboxLetters = true;
  const normalize = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.key?.length !== 1 || !/\p{L}/u.test(event.key)) return;
    const letter = normalize(event.key);
    if (letter === 't' || letter === 'w') return;
    const workspace = Blockly.getMainWorkspace();
    const toolbox = workspace && workspace.getToolbox && workspace.getToolbox();
    const focusManager = Blockly.getFocusManager();
    if (!toolbox || focusManager.getFocusedTree() !== toolbox) return;
    const items = toolbox.getToolboxItems()
      .filter((item) => item.getName && item.getName() && item.getFocusableElement().getClientRects().length);
    const start = items.indexOf(focusManager.getFocusedNode());
    event.preventDefault();
    event.stopImmediatePropagation();
    for (let k = 1; k <= items.length; k++) {
      const item = items[(start + k) % items.length];
      if (normalize(item.getName()).startsWith(letter)) {
        focusManager.focusNode(item);
        return;
      }
    }
    workspace.getAudioManager().playErrorBeep();
  }, true);
}

/**
 * The block search is hidden (display: none) when the toolbox is reduced to its icons (window not maximized): the arrows
 * still stopped on it, an empty place read "not selected" between the last and the first category.
 */
function skipHiddenToolboxSearch() {
  const toolbox = Blockly.getMainWorkspace()?.getToolbox?.();
  const search = toolbox && toolbox.getToolboxItems().find((item) => item.getDiv && item.getDiv()?.id === 'search');
  if (!search) return;
  const isHiddenSearch = (item) => item.getDiv && item.getDiv()?.id === 'search' && !item.getDiv().getClientRects().length;
  for (const method of ['isSelectable', 'canBeFocused']) {
    // own prototype or inherited one, wrapped once
    let proto = Object.getPrototypeOf(search);
    while (proto && !Object.prototype.hasOwnProperty.call(proto, method)) proto = Object.getPrototypeOf(proto);
    if (!proto || proto[method].vittaHiddenSearch) continue;
    const original = proto[method];
    proto[method] = function (...args) {
      return !isHiddenSearch(this) && original.apply(this, args);
    };
    proto[method].vittaHiddenSearch = true;
  }
}

/**
 * The headings of the lists of blocks ("LED", "Neopixel") are options of the list like the blocks: they were taken for
 * blocks and the user tried to choose them. They are marked unavailable ("indisponible"), still reached with the arrows.
 */
function markFlyoutHeadings() {
  const mark = () => document.querySelectorAll('.blocklyFlyoutLabel[role="option"]:not([aria-disabled])')
    .forEach((label) => label.setAttribute('aria-disabled', 'true'));
  new MutationObserver(mark).observe(document.body, { childList: true, subtree: true });
  mark();
}

/**
 * Keys that did nothing and said nothing: Enter on a block holding others or on an empty place, the arrows going from
 * the first block to the last one, Home / End.
 */
function keyboardFeedback() {
  // Enter / Space: when nothing happened (no field editor, no move, same node), say what to do
  wrapShortcut('perform_action', (callback, workspace, ...args) => {
    const focusManager = Blockly.getFocusManager();
    const node = focusManager.getFocusedNode();
    const result = callback(workspace, ...args);
    setTimeout(() => {
      const moving = Blockly.KeyboardMover && Blockly.KeyboardMover.mover && Blockly.KeyboardMover.mover.isMoving();
      if (focusManager.getFocusedNode() !== node || moving || Blockly.DropDownDiv.isVisible() || Blockly.WidgetDiv.isVisible()) return;
      if (node instanceof Blockly.RenderedConnection) {
        announce(jsonPath('code.a11yBlocks.emptyInputHint'));
      } else if (node instanceof Blockly.BlockSvg && !node.workspace.isFlyout) {
        if (node.workspace.getNavigator().getInNode(node)) {
          announce(jsonPath('code.a11yBlocks.enterBlockHint'));
        } else if (node.inputList.some((input) => input.type === Blockly.inputs.inputTypes.STATEMENT)) {
          // a block holding others (Répéter indéfiniment): its inside is reached with Down
          announce(jsonPath('code.a11yBlocks.insideBlockHint'));
        }
      }
    }, 100);
    return result;
  });

  // From the first block, Up went to the last one without any signal: Blockly beeps at the ends instead
  const workspace = Blockly.getMainWorkspace();
  workspace?.getNavigator?.()?.setNavigationLoops?.(false);

  // Home / End: first or last block of the program, first or last category of the toolbox
  document.addEventListener('keydown', (event) => {
    if ((event.key !== 'Home' && event.key !== 'End') || event.altKey || event.shiftKey) return;
    const focusManager = Blockly.getFocusManager();
    const tree = focusManager.getFocusedTree();
    const toolbox = workspace.getToolbox && workspace.getToolbox();
    let nodes = null;
    if (tree === workspace) {
      nodes = workspace.getTopBlocks(true);
    } else if (toolbox && tree === toolbox) {
      nodes = toolbox.getToolboxItems().filter((item) => item.getName && item.getName() && item.getFocusableElement().getClientRects().length);
    }
    if (!nodes || !nodes.length) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    focusManager.focusNode(event.key === 'Home' ? nodes[0] : nodes[nodes.length - 1]);
  }, true);
}

const SCREENREADER_MODE_KEY = 'vittaBlocklyScreenreaderMode';

/**
 * Screen reader mode of Blockly (Alt+Shift+A: a sound at each change of zone): off at each reload, and the shortcut
 * opened the "View" menu of the browser out of the blocks. The choice is kept and the shortcut works in the whole page.
 */
function screenreaderMode() {
  let enabled = false;
  wrapShortcut('toggle_screenreader', (callback, workspace, ...args) => {
    const result = callback(workspace, ...args);
    enabled = !enabled;
    try { localStorage.setItem(SCREENREADER_MODE_KEY, enabled ? 'on' : 'off'); } catch (e) { /* private browsing */ }
    // the navigation of the program never loops (see keyboardFeedback), the mode on or off
    workspace.getNavigator().setNavigationLoops(false);
    return result;
  });
  const toggle = (event) => {
    const workspace = Blockly.getMainWorkspace();
    Blockly.ShortcutRegistry.registry.shortcuts.get('toggle_screenreader').callback(workspace, event);
  };
  let saved = null;
  try { saved = localStorage.getItem(SCREENREADER_MODE_KEY); } catch (e) { /* private browsing */ }
  if (saved === 'on') toggle(new KeyboardEvent('keydown'));
  // Out of the blocks (code editor, console, buttons...), Blockly does not get the keys
  document.addEventListener('keydown', (event) => {
    if (!event.altKey || !event.shiftKey || event.ctrlKey || event.metaKey || event.code !== 'KeyA') return;
    if (event.target instanceof Element && event.target.closest('.injectionDiv, .blocklyWidgetDiv, .blocklyDropDownDiv')) return;
    event.preventDefault();
    toggle(event);
  }, true);
}

/**
 * The quotes drawn around the texts of the blocks were read as items: "créer le texte, “, Donnée1, ”".
 */
function silenceQuoteLabels() {
  // labels, and the images of the quotes of the text block (their alt text is the quote)
  for (const field of [Blockly.FieldLabel, Blockly.FieldImage]) {
    const proto = field && field.prototype;
    if (!proto || proto.computeAriaLabel.vittaQuotes) continue;
    const computeAriaLabel = proto.computeAriaLabel;
    proto.computeAriaLabel = function (...args) {
      const text = this.altText ?? (this.getText ? this.getText() : '');
      return /^[\s“”"«»‘’']+$/.test(text || '') ? '' : computeAriaLabel.apply(this, args);
    };
    proto.computeAriaLabel.vittaQuotes = true;
  }
}

export function initBlocklyAccessibility() {
  if (typeof Blockly !== 'undefined') {
    silenceQuoteLabels();
    keyboardFeedback();
    screenreaderMode();
    markFlyoutHeadings();
    skipHiddenToolboxSearch();
    toolboxFirstLetterNavigation();
    nameDropdowns();
    announceShortcuts();
    keepWorkspaceLabelUpToDate();
    fixContextMenus();
    nameFieldEditors();
    improveKeyboardMoves();
  }
  keepBlocklyFocusOnWindowSwitch();
  // console.log("Initializing Blockly accessibility");
  const workspaceObserver = new MutationObserver(() => {
    const workspace = document.querySelector('.blocklyWorkspace');
    if (workspace) {
      // console.log("Workspace detected, initialization.");
      addAriaLabels();
      removeToolboxFocusable();
    }
  });

  workspaceObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function removeToolboxFocusable() {
  // Not the workspace <svg>: a tabindex, even -1, lets it take the focus, and so the selection,
  // from the clicked block since Blockly 12, which prevents dragging blocks.
  const focusableElements = document.querySelectorAll('.blocklyToolboxCategoryGroup, .blocklyTreeSearch');
  focusableElements.forEach(element => {
    if (element) {
      element.setAttribute("tabindex", "-1");
    }
  })
}

function addAriaLabels(){
  const blocklyBackpack = document.querySelector('.blocklyBackpack');
  if (blocklyBackpack) {
    // Blockly moves the focus from the <button> added by setBlocklyControlsA11y() to this image (focus node of the
    // backpack): it has the same name, and the help text as a description
    blocklyBackpack.removeAttribute('aria-hidden');
    blocklyBackpack.setAttribute('role', 'button');
    blocklyBackpack.setAttribute('aria-label', i18next.t('code.tooltip.backpack'));
    blocklyBackpack.setAttribute('aria-description', i18next.t('code.tooltip.blocklyBackpack'));
  }
}


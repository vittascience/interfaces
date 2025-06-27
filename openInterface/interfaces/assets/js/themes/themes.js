/**
 * @fileoverview Definition of themes of interfaces.
 */

/**
 * Get block styles from toolbox.
 * @return {Object} blockStyles
 */
function get_defaultBlockStyles() {
  const toolboxMode = Blockly.Constants.getToolboxStyle();
  let theme;
  const toolbox = ToolboxManager.toolboxDefined(toolboxMode);
  if (!toolbox) {
    theme = THEME_VITTASCIENCE;
  } else {
    theme = toolbox.theme;
  }
  Object.assign(theme, {
    search_blocks: "#707070"
  });
  return theme;
};

/**
 * Get category styles from toolbox.
 * @param {Object} blockStyles
 * @return {Object} categoryStyles
 */
function get_categoryStyles(blockStyles) {
  let categoryStyles = Object.create(null);
  for (i in blockStyles) {
    if (i != 'colour_blocks' && i != 'comment_block') {
      categoryStyles[i.replace('_blocks', '_category')] = {
        "colour": blockStyles[i].colourPrimary
      }
    }
  }
  return categoryStyles;
};

/**
 * @definition Vittascience Classic Base theme.
 */

// Define block styles, category styles and component styles.
Blockly.Themes.ClassicBase = Blockly.Theme.defineTheme('vittascience_classic', {
  'blockStyles': get_defaultBlockStyles(),
  'categoryStyles': get_categoryStyles(get_defaultBlockStyles())
});

// Set font style (here is default)
Blockly.Themes.ClassicBase.setFontStyle({
  'family': 'Atkinson Hyperlegible, sans-serif', // Use default font-family
  'weight': null, // Use default font-weight
  'size': 12
});

/**
 * @definition Vittascience Classic Accessibility theme.
 */

Blockly.Themes.ClassicBaseA11y = Blockly.Theme.defineTheme('classic_a11y', {
  'base': Blockly.Themes.ClassicBase
});

Blockly.Themes.ClassicBaseA11y.setFontStyle({
  'family': "OpenDyslexic, sans-serif",
  'weight': null,
  'size': 12
});

/**
 * @definition Vittascience Classic Luciole theme.
 */

Blockly.Themes.ClassicBaseLuciole = Blockly.Theme.defineTheme('classic_luciole', {
  'base': Blockly.Themes.ClassicBase
});

Blockly.Themes.ClassicBaseLuciole.setFontStyle({
  'family': "Luciole, sans-serif",
  'weight': null,
  'size': 12
});

/**
 * @definition Vittascience Dark theme.
 */

Blockly.Themes.VittascienceDark = Blockly.Theme.defineTheme('dark', {
  'base': Blockly.Themes.ClassicBase,
  'componentStyles': {
    'workspaceBackgroundColour': '#1e1e1e',
    'toolboxBackgroundColour': '#333',
    'toolboxForegroundColour': '#fff',
    'flyoutBackgroundColour': '#252526',
    'flyoutForegroundColour': '#ccc',
    'flyoutOpacity': 1,
    'scrollbarColour': '#797979',
    'insertionMarkerColour': '#fff',
    'insertionMarkerOpacity': 0.3,
    'scrollbarOpacity': 0.4,
    'cursorColour': '#d0d0d0'
  }
});

/**
 * @definition Vittascience Dark Accessibility
 */

Blockly.Themes.VittascienceDarkA11y = Blockly.Theme.defineTheme('dark_a11y', {
  'base': Blockly.Themes.VittascienceDark
});

Blockly.Themes.VittascienceDarkA11y.setFontStyle({
  'family': "OpenDyslexic, sans-serif",
  'weight': null,
  'size': 12
});

/**
 * @definition Vittascience Dark Luciole theme.
 */

Blockly.Themes.VittascienceDarkLuciole = Blockly.Theme.defineTheme('dark_luciole', {
  'base': Blockly.Themes.VittascienceDark
});

Blockly.Themes.VittascienceDarkLuciole.setFontStyle({
  'family': "Luciole, sans-serif",
  'weight': null,
  'size': 12
});


/**
 * @definition Vittascience Dark High Contrast theme.
 */

Blockly.Themes.VittascienceDarkHc = Blockly.Theme.defineTheme('dark-hc', {
  'base': Blockly.Themes.ClassicBase,
  'componentStyles': {
    'workspaceBackgroundColour': '#1e1e1e',
    'toolboxBackgroundColour': '#333',
    'toolboxForegroundColour': '#fff',
    'flyoutBackgroundColour': '#252526',
    'flyoutForegroundColour': '#ccc',
    'flyoutOpacity': 1,
    'scrollbarColour': '#797979',
    'insertionMarkerColour': '#fff',
    'insertionMarkerOpacity': 0.3,
    'scrollbarOpacity': 0.4,
    'cursorColour': '#d0d0d0'
  }
});
/**
 * @definition Vittascience Dark High Contrast Accessibility theme.
*/

Blockly.Themes.VittascienceDarkHcA11y = Blockly.Theme.defineTheme('dark-hc_a11y', {
  'base': Blockly.Themes.VittascienceDarkHc
});

Blockly.Themes.VittascienceDarkHcA11y.setFontStyle({
  'family': "OpenDyslexic, sans-serif",
  'weight': null,
  'size': 12
});

/**
 * @definition Vittascience Dark High Contrast Luciole theme.
*/

Blockly.Themes.VittascienceDarkHcLuciole = Blockly.Theme.defineTheme('dark-hc_luciole', {
  'base': Blockly.Themes.VittascienceDarkHc
});

Blockly.Themes.VittascienceDarkHcLuciole.setFontStyle({
  'family': "Luciole, sans-serif",
  'weight': null,
  'size': 12
});


/**
 * @definition Vittascience Light High Contrast theme.
 */

Blockly.Themes.VittascienceLightHc = Blockly.Theme.defineTheme('light-hc', {
  'base': Blockly.Themes.ClassicBase,
  'componentStyles': {
    'workspaceBackgroundColour': '#fff',
    'toolboxBackgroundColour': '#fff',
    'toolboxForegroundColour': '#000',
    'flyoutBackgroundColour': '#fff',
    'flyoutForegroundColour': '#000',
    'flyoutOpacity': 1,
    'scrollbarColour': '#ccc',
    'insertionMarkerColour': '#000',
    'insertionMarkerOpacity': 0.3,
    'scrollbarOpacity': 0.4,
    'cursorColour': '#000'
  }
});

Blockly.Themes.VittascienceLightHc.setFontStyle({
  'family': null,
  'weight': null,
  'size': 12
});

/**
 * @definition Vittascience Light High Contrast Accessibility theme.
*/

Blockly.Themes.VittascienceLightHcA11y = Blockly.Theme.defineTheme('light-hc_a11y', {
  'base': Blockly.Themes.VittascienceLightHc
});

Blockly.Themes.VittascienceLightHcA11y.setFontStyle({
  'family': "OpenDyslexic, sans-serif",
  'weight': null,
  'size': 12
});

/**
 * @definition Vittascience Light High Contrast Luciole theme.
*/

Blockly.Themes.VittascienceLightHcLuciole = Blockly.Theme.defineTheme('light-hc_luciole', {
  'base': Blockly.Themes.VittascienceLightHc
});

Blockly.Themes.VittascienceLightHcLuciole.setFontStyle({
  'family': "Luciole, sans-serif",
  'weight': null,
  'size': 12
});

if (INTERFACE_NAME != "web") {
  /**
   * @definition Vittascience High Contrast theme.
   * Contains multi-coloured border to create shadow effect.
   */

  Blockly.Themes.VittascienceHighContrast = Blockly.Theme.defineTheme('high_contrast', {
    'blockStyles': THEME_VITTASCIENCE_HIGH_CONTRAST,
    'categoryStyles': get_categoryStyles(THEME_VITTASCIENCE_HIGH_CONTRAST),
    'componentStyles': {
      'selectedGlowColour': '#000000', // black selector
      'selectedGlowSize': 0.5, // width selector
      'replacementGlowColour': '#000000'
    }
  });

  Blockly.Themes.VittascienceHighContrast.setFontStyle({
    'family': null,
    'weight': null,
    'size': 12
  });
}
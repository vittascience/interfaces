/*
	Ffau - A Blockly-based editor for teaching HTML, CSS and Javascript.

		Developed by Pal Kerecsenyi and Geza Kerecsenyi.
		Full details are available at the Github repo: https://github.com/codeddraig/ffau
		Ffau editor will not work without its libraries. The best way to get all
			off this data at once is to grab the latest release version from the
			Github repo or to install via NPM.
		Ffau is open source software. This means you can re-mix, share and use
			it however you want, including for commercial purposes. However, you
			MUST provide attribution to the original authors if you do this.
		However, Ffau is provided with NO WARRANTY whatsoever, and by using this
			software, you agree to the terms of the MIT License.

		Copyright (c) 2017-20 The CodeDdraig Organisation

		THIS IS VERSION 2.1.5
*/

/**
 * Creates a Font Awesome icon from the name of the icon.
 *
 * @param {string} icon - the name of the icon
 * @returns {HTMLElement} - the newly-created <i> FA node
 */
function fontAwesome(icon) {
	let elem = document.createElement('i');
	elem.className = 'fas fa-' + icon;
	return elem;
}

(function () {
	'use strict';
	Blockly.HSV_SATURATION = 1;
	Blockly.HSV_VALUE = 0.7;
})();

const colorNames = [
	'AliceBlue',
	'AntiqueWhite',
	'Aqua',
	'Aquamarine',
	'Azure',
	'Beige',
	'Bisque',
	'Black',
	'BlanchedAlmond',
	'Blue',
	'BlueViolet',
	'Brown',
	'BurlyWood',
	'CadetBlue',
	'Chartreuse',
	'Chocolate',
	'Coral',
	'CornflowerBlue',
	'Cornsilk',
	'Crimson',
	'Cyan',
	'DarkBlue',
	'DarkCyan',
	'DarkGoldenRod',
	'DarkGray',
	'DarkGrey',
	'DarkGreen',
	'DarkKhaki',
	'DarkMagenta',
	'DarkOliveGreen',
	'DarkOrange',
	'DarkOrchid',
	'DarkRed',
	'DarkSalmon',
	'DarkSeaGreen',
	'DarkSlateBlue',
	'DarkSlateGray',
	'DarkSlateGrey',
	'DarkTurquoise',
	'DarkViolet',
	'DeepPink',
	'DeepSkyBlue',
	'DimGray',
	'DimGrey',
	'DodgerBlue',
	'FireBrick',
	'FloralWhite',
	'ForestGreen',
	'Fuchsia',
	'Gainsboro',
	'GhostWhite',
	'Gold',
	'GoldenRod',
	'Gray',
	'Grey',
	'Green',
	'GreenYellow',
	'HoneyDew',
	'HotPink',
	'IndianRed',
	'Indigo',
	'Ivory',
	'Khaki',
	'Lavender',
	'LavenderBlush',
	'LawnGreen',
	'LemonChiffon',
	'LightBlue',
	'LightCoral',
	'LightCyan',
	'LightGoldenRodYellow',
	'LightGray',
	'LightGrey',
	'LightGreen',
	'LightPink',
	'LightSalmon',
	'LightSeaGreen',
	'LightSkyBlue',
	'LightSlateGray',
	'LightSlateGrey',
	'LightSteelBlue',
	'LightYellow',
	'Lime',
	'LimeGreen',
	'Linen',
	'Magenta',
	'Maroon',
	'MediumAquaMarine',
	'MediumBlue',
	'MediumOrchid',
	'MediumPurple',
	'MediumSeaGreen',
	'MediumSlateBlue',
	'MediumSpringGreen',
	'MediumTurquoise',
	'MediumVioletRed',
	'MidnightBlue',
	'MintCream',
	'MistyRose',
	'Moccasin',
	'NavajoWhite',
	'Navy',
	'OldLace',
	'Olive',
	'OliveDrab',
	'Orange',
	'OrangeRed',
	'Orchid',
	'PaleGoldenRod',
	'PaleGreen',
	'PaleTurquoise',
	'PaleVioletRed',
	'PapayaWhip',
	'PeachPuff',
	'Peru',
	'Pink',
	'Plum',
	'PowderBlue',
	'Purple',
	'RebeccaPurple',
	'Red',
	'RosyBrown',
	'RoyalBlue',
	'SaddleBrown',
	'Salmon',
	'SandyBrown',
	'SeaGreen',
	'SeaShell',
	'Sienna',
	'Silver',
	'SkyBlue',
	'SlateBlue',
	'SlateGray',
	'SlateGrey',
	'Snow',
	'SpringGreen',
	'SteelBlue',
	'Tan',
	'Teal',
	'Thistle',
	'Tomato',
	'Turquoise',
	'Violet',
	'Wheat',
	'White',
	'WhiteSmoke',
	'Yellow',
	'YellowGreen',
].map((e) => e.toLowerCase());
const colorValues = [
	'f0f8ff',
	'faebd7',
	'00ffff',
	'7fffd4',
	'f0ffff',
	'f5f5dc',
	'ffe4c4',
	'000000',
	'ffebcd',
	'0000ff',
	'8a2be2',
	'a52a2a',
	'deb887',
	'5f9ea0',
	'7fff00',
	'd2691e',
	'ff7f50',
	'6495ed',
	'fff8dc',
	'dc143c',
	'00ffff',
	'00008b',
	'008b8b',
	'b8860b',
	'a9a9a9',
	'a9a9a9',
	'006400',
	'bdb76b',
	'8b008b',
	'556b2f',
	'ff8c00',
	'9932cc',
	'8b0000',
	'e9967a',
	'8fbc8f',
	'483d8b',
	'2f4f4f',
	'2f4f4f',
	'00ced1',
	'9400d3',
	'ff1493',
	'00bfff',
	'696969',
	'696969',
	'1e90ff',
	'b22222',
	'fffaf0',
	'228b22',
	'ff00ff',
	'dcdcdc',
	'f8f8ff',
	'ffd700',
	'daa520',
	'808080',
	'808080',
	'008000',
	'adff2f',
	'f0fff0',
	'ff69b4',
	'cd5c5c',
	'4b0082',
	'fffff0',
	'f0e68c',
	'e6e6fa',
	'fff0f5',
	'7cfc00',
	'fffacd',
	'add8e6',
	'f08080',
	'e0ffff',
	'fafad2',
	'd3d3d3',
	'd3d3d3',
	'90ee90',
	'ffb6c1',
	'ffa07a',
	'20b2aa',
	'87cefa',
	'778899',
	'778899',
	'b0c4de',
	'ffffe0',
	'00ff00',
	'32cd32',
	'faf0e6',
	'ff00ff',
	'800000',
	'66cdaa',
	'0000cd',
	'ba55d3',
	'9370db',
	'3cb371',
	'7b68ee',
	'00fa9a',
	'48d1cc',
	'c71585',
	'191970',
	'f5fffa',
	'ffe4e1',
	'ffe4b5',
	'ffdead',
	'000080',
	'fdf5e6',
	'808000',
	'6b8e23',
	'ffa500',
	'ff4500',
	'da70d6',
	'eee8aa',
	'98fb98',
	'afeeee',
	'db7093',
	'ffefd5',
	'ffdab9',
	'cd853f',
	'ffc0cb',
	'dda0dd',
	'b0e0e6',
	'800080',
	'663399',
	'ff0000',
	'bc8f8f',
	'4169e1',
	'8b4513',
	'fa8072',
	'f4a460',
	'2e8b57',
	'fff5ee',
	'a0522d',
	'c0c0c0',
	'87ceeb',
	'6a5acd',
	'708090',
	'708090',
	'fffafa',
	'00ff7f',
	'4682b4',
	'd2b48c',
	'008080',
	'd8bfd8',
	'ff6347',
	'40e0d0',
	'ee82ee',
	'f5deb3',
	'ffffff',
	'f5f5f5',
	'ffff00',
	'9acd32',
];

const cssUnits = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', '%', 'cm', 'mm', 'in', 'px', 'pt', 'pc'];

class CodeToBlocks {
	static instance = null;
	constructor(workSpaceHtml, editorHtml) {
		this.workSpaceHtml = workSpaceHtml;
		// this.workSpaceCss = workSpaceCss;
		this.codeHtml = '';
		this.editorHtml = editorHtml;
		// this.codeCss = '';

		if (CodeToBlocks.instance) {
			return CodeToBlocks.instance;
		}
		CodeToBlocks.instance = this;
	}

	codeToXML(code) {
		let idList = [];
		let replacerIds = [];

		// Regexp to identify CSS comments
		let cssCommentRegExp = /(?<=^[^"]*?("[^"]*?")*[^"]*?)((?<!\\)\/\*[^*]*?[^\\]\*\/)/g;

		// Generate a unique 5 digit ID that is not present in the code that we can use as markers in the string
		const getReplacerId = () => {
			let replacerId = (Math.floor(Math.random() * 90000) + 10000).toString();
			while (code.includes(replacerId) || replacerIds.includes(replacerId)) {
				// Keep generating ID until not in string and unique
				replacerId = (Math.floor(Math.random() * 90000) + 10000).toString();
			}

			replacerIds.push(replacerId); // Save ID to DB to avoid reusage
			return replacerId;
		};

		// Generate an ID for a Blockly block
		const getBlockId = () => {
			// Helper function to generate 20 character ID
			function idGen() {
				return Array(20)
					.fill(0)
					.map(() => [...'`0123456789{}!$./,()*[]ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'][Math.floor(Math.random() * 81)])
					.join('');
			}

			let id = idGen();
			while (idList.includes(id)) {
				// Keep generating IDs until one is unique
				id = idGen();
			}

			idList.push(id); // Save to DB to avoid future reusage
			return id;
		};

		// Helper function to avoid repeating logic for parsing boolean attributes, which could have values of either
		// "true", "false", "", or null.
		const evalBooleanAttr = (attrVal) => {
			return attrVal === null
				? 'false' // If it's not declared, it's false
				: attrVal.toLowerCase() === 'false'
				? 'false'
				: 'true'; // If it's any value other than 'false' it's true
		};

		// Helper function to generate a JSON-ified selector list and/or a `property: value` format
		const extractStyleSheet = (styleSheetString, hasSelectors) => {
			// Function to extract style keys in a `property: value` format
			const extractStyles = (styleString) => {
				let uniqueId = getReplacerId(); // Store an ID to use to mark where the colons are

				let stringSplit = (' ' + styleString) // Add a space to make the RegExp work
					.split(/(?<=[^\\]|^)(("((\\")|[^"])*[^\\]")|('((\\')|[^'])*[^\\]'))/g) // Find all of the points where there are strings
					.filter((_, z) => z % 8 === 0 || z % 8 === 1);
				stringSplit[0] = stringSplit[0].substr(1); // Ignore the first character (the space we just added)

				// Split by all of the colons _not_ in strings
				stringSplit = stringSplit.map((e, _) => (_ % 2 ? e : e.replace(/:/g, uniqueId).split(/[;\n]/g))).flat();

				// Map to [property, value] pairs
				let stylePairs = [];
				let thisStylePair = '';
				stringSplit.forEach((string) => {
					if (string.includes(uniqueId)) {
						// If this is the property bit
						stylePairs.push(thisStylePair.split(uniqueId).map((e) => e.trim())); // Trim up to colon
						thisStylePair = string;
					} else thisStylePair += string; // Otherwise, continue to the semicolon
				});
				stylePairs.push(thisStylePair.split(uniqueId).map((e) => e.trim())); // Split by colon

				// Filter out empty arrays, to get [[property, value], [property, value]...] format
				return stylePairs.filter((e) => e.length - 1);
			};

			// If there are no selectors to be handled, we just use the helper function to split it up into property-value pairs
			if (!hasSelectors) {
				return extractStyles(styleSheetString);
			} else {
				// If there are selectors:
				let uniqueId = getReplacerId(); // Get ID to mark string points

				// Get string points
				let selectors = (' ' + styleSheetString).split(/(?<=[^\\]|^)(("((\\")|[^"])*[^\\]")|('((\\')|[^'])*[^\\]'))/g).filter((_, z) => z % 8 === 0 || z % 8 === 1);
				selectors[0] = selectors[0].substr(1);

				// Find all selector openings not in strings
				selectors = selectors
					.map((e, _) => (_ % 2 ? e : e.replace(/[}{]/g, uniqueId)))
					.flat()
					.join('')
					.split(uniqueId)
					.reduce((r, e, i) => (i % 2 ? r[r.length - 1].push(e) : r.push([e])) && r, [])
					.filter((e) => e.filter((e) => e.length).length)
					.map((e) => [e[0].trim(), extractStyles(e[1])]); // Extract property/value pairs for each given selector

				return selectors;
			}
		};

		// Helper function to convert list of selectors to XML elements appended to a given parent (style attribute or selector block)
		const constructStyleTree = (properties, initialParent) => {
			// Set a parent which we will always append the next block to - this starts as the given elem, but changes
			// to be nested <next> tags in the Blockly XML
			let parent = initialParent;
			let forceParent = false;

			// Go through each `property: value` pair
			properties.forEach((commentedPropPair, m) => {
				// This variable will be used to reference the current block, and can be varied in two ways, either
				// through calling a function or manually. This is declared with a specific name so that every function
				// knows what to adjust (hence the weird function scoping)
				let styleBlock = document.createElement('block');

				// Helper function to add color selector to given field in current block
				const mapColorLikeBlock = (colorStr, valueName) => {
					// Create the field to put the color block in
					let colorValue = document.createElement('value');
					colorValue.setAttribute('name', valueName);

					// Create the color block
					let colorBlock = document.createElement('block');
					colorBlock.setAttribute('id', getBlockId());

					// Handle HEX code with hex picker block
					if (/#(?:[0-9a-fA-F]{3}){1,2}/g.test(colorStr.trim())) {
						valueField.parentNode.removeChild(valueField);
						valueField.setAttribute('name', 'color');
						valueField.innerText = colorStr.trim().replace(/^#/g, '');
						colorBlock.setAttribute('type', 'hex_picker');

						colorBlock.appendChild(valueField);
						colorValue.appendChild(colorBlock);
					}
					// Handle RGB(A) with RGB picker
					else if (/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/g.test(colorStr.trim())) {
						valueField.parentNode.removeChild(valueField);
						valueField.setAttribute('name', 'a');
						valueField.innerText = colorStr.trim().replace(/^#/g, '');

						colorBlock.setAttribute('type', 'rgba_picker');

						let r = document.createElement('field');
						r.setAttribute('name', 'r');

						let g = document.createElement('field');
						g.setAttribute('name', 'g');

						let b = document.createElement('field');
						b.setAttribute('name', 'b');

						r.innerText = colorStr
							.split(',')[0]
							.trim()
							.replace(/^rgba?\(/g, '')
							.trim();
						g.innerText = colorStr.split(',')[1].trim();
						b.innerText = colorStr.split(',')[2].trim();

						colorBlock.appendChild(r);
						colorBlock.appendChild(g);
						colorBlock.appendChild(b);

						if (colorStr.split(',').length === 4) {
							valueField.innerText = colorStr.split(',')[3].trim().replace(/\)$/g, '');
						} else {
							b.innerText = b.innerText.trim().replace(/\)$/g, '');
							valueField.innerText = '1';
						}

						colorBlock.appendChild(valueField);
						colorValue.appendChild(colorBlock);
					}
					// Handle colour names
					else {
						// If this colour name happens to be one of the visual color picker colors, use that
						if (Blockly.FieldColour.TITLES.includes(colorStr.trim())) {
							valueField.parentNode.removeChild(valueField);
							colorBlock.setAttribute('type', 'color_picker');

							valueField.setAttribute('name', 'color');
							valueField.innerHTML = Blockly.FieldColour.COLOURS[Blockly.FieldColour.TITLES.indexOf(colorStr.trim())];

							colorBlock.appendChild(valueField);
							colorValue.appendChild(colorBlock);
						}
						// Otherwise, just map it to the corresponding HEX code of the colour name
						else if (colorNames.indexOf(colorStr.toLowerCase()) > -1) {
							mapColorLikeBlock('#' + colorValues[colorNames.indexOf(colorStr.toLowerCase())]);
						}
					}

					styleBlock.appendChild(colorValue);
				};

				// Helper function to automatically create `-left` `-right` etc. block (to which other fields can be added)
				const directionVariant = (blockType, tagBase) => {
					// If the property name has the direction on the end, use a single block with that direction selected
					if (propPair[0] === tagBase + '-left' || propPair[0] === tagBase + '-top' || propPair[0] === tagBase + '-right' || propPair[0] === tagBase + '-bottom') {
						valueField.setAttribute('name', 'value');
						styleBlock.setAttribute('type', blockType);

						let marginDirectionField = document.createElement('field');
						marginDirectionField.setAttribute('name', 'direction');
						marginDirectionField.innerText = propPair[0].split('-')[1];

						styleBlock.appendChild(marginDirectionField);
					} else {
						// If not, add in multiple blocks (one for -left, -right, etc.) to simulate behaviour of e.g `padding:`
						// as opposed to `padding-left:`
						let tags = propPair[1].split(/ +/g);

						// If there's three, just repeat the `right` on the `left`
						if (tags.length === 3) tags.push(tags[1]);
						// If there's two, repeat `top` on `bottom` and `right` on `left`
						if (tags.length === 2) tags = tags.map((e) => [e, e]).flat();
						// If there's only one, repeat it four times
						if (tags.length === 1) tags = tags.map((e) => [e, e, e, e]).flat();

						valueField.setAttribute('name', 'value');
						styleBlock.setAttribute('type', blockType);

						valueField.innerText = tags[0];

						let leftTagField = document.createElement('field');
						leftTagField.setAttribute('name', 'direction');
						leftTagField.innerText = 'top';

						styleBlock.appendChild(leftTagField);

						let tagParent = styleBlock;
						// Manually override block insertion system to add in multiple blocks at once
						tags.slice(1).forEach((tag, f) => {
							let tagNext1 = document.createElement('next');

							let tagBlock2 = document.createElement('block');
							tagBlock2.setAttribute('id', getBlockId());
							tagBlock2.setAttribute('type', blockType);

							let tagVal2 = document.createElement('field');
							tagVal2.setAttribute('name', 'value');
							tagVal2.innerText = tag;

							let nextTagField = document.createElement('field');
							nextTagField.setAttribute('name', 'direction');
							nextTagField.innerText = ['right', 'bottom', 'left'][f];

							tagBlock2.appendChild(tagVal2);
							tagBlock2.appendChild(nextTagField);
							tagNext1.appendChild(tagBlock2);
							tagParent.appendChild(tagNext1);

							tagParent = tagBlock2;
						});

						let newForceParent = document.createElement('next');
						tagParent.appendChild(newForceParent);

						parent = newForceParent;
						forceParent = true;
					}
				};
				// Extract CSS comments
				let comments = (commentedPropPair.join('').match(cssCommentRegExp) || [])
					.map((e) => e.trim().replace(/(?:^\/\*)|(?:\*\/$)/g, ''))
					.filter((e) => e)
					.join('    ')
					.trim();
				// Remove them from the resulting code
				let propPair = commentedPropPair.map((e) =>
					e
						.replace(cssCommentRegExp, '')
						.replace(/\\\/\*/g, '/*')
						.trim()
				);

				styleBlock.setAttribute('id', getBlockId());

				// Add comments in as Blockly comments
				if (comments) {
					let commentTag = document.createElement('comment');
					commentTag.setAttribute('pinned', 'false');
					commentTag.innerText = comments;

					styleBlock.appendChild(commentTag);
				}

				// Set the `value` of the block to be the text (for now). This can be overwritten by some blocks later,
				// e.g to use color blocks or to parse multiple values separately.
				let valueField = document.createElement('field');
				valueField.innerText = propPair[1].trim().replace(/^#/g, '');

				styleBlock.appendChild(valueField);
				parent.appendChild(styleBlock);

				// Go through each type of CSS property, and give the corresponding CDr block name and any other options
				// [styleBlock, valueField] = CSS_BLOCKS_DEFINITIONS[propPair[0]](styleBlock, valueField, propPair);
				switch (propPair[0]) {
					case 'cssComment':
						valueField.setAttribute('name', 'value');
						styleBlock.setAttribute('type', 'csscomment');
						break;
					case 'font-size':
						valueField.setAttribute('name', 'value');
						styleBlock.setAttribute('type', 'fontsize');
						break;
					case 'font-family':
						valueField.setAttribute('name', 'value');
						styleBlock.setAttribute('type', 'fontfamily');
						break;
					case 'font-weight':
						valueField.setAttribute('name', 'weight');
						styleBlock.setAttribute('type', 'fontweight');
						break;
					case 'color':
						if (['initial', 'inherit'].includes(propPair[1])) {
							valueField.setAttribute('name', 'color');
							styleBlock.setAttribute('type', 'colordropdown');
						} else {
							valueField.setAttribute('name', 'content');
							styleBlock.setAttribute('type', 'colornew');
							mapColorLikeBlock(propPair[1], 'value');
						}
						break;
					case 'text-shadow':
					case 'box-shadow':
						if (propPair[0] === 'box-shadow') {
							valueField.setAttribute('name', 'color');
							styleBlock.setAttribute('type', 'boxshadownew');
						} else {
							valueField.setAttribute('name', 'color');
							styleBlock.setAttribute('type', 'textshadownew');
						}

						let splitStr = propPair[1]
							.split(/ +/g)
							.map((e) => e.trim())
							.filter((e) => e);

						if (splitStr.length === 2) {
							splitStr.push('0px');
							splitStr.push('white');
						} else {
							if (splitStr[2] === '0' || cssUnits.some((e) => splitStr[2].endsWith(e))) {
								splitStr.push('white');
							} else {
								splitStr.splice(2, 0, '0');
							}
						}

						let xOffsetField = document.createElement('field');
						xOffsetField.setAttribute('name', 'xoffset');
						xOffsetField.innerText = splitStr[0];

						let yOffsetField = document.createElement('field');
						yOffsetField.setAttribute('name', 'yoffset');
						yOffsetField.innerText = splitStr[1];

						let blurField = document.createElement('field');
						blurField.setAttribute('name', 'blur');
						blurField.innerText = splitStr[2];

						styleBlock.appendChild(xOffsetField);
						styleBlock.appendChild(yOffsetField);
						styleBlock.appendChild(blurField);

						mapColorLikeBlock(splitStr[3], 'color');
						break;
					case 'text-transform':
						valueField.setAttribute('name', 'value');
						styleBlock.setAttribute('type', 'texttransform');
						break;
					case 'text-align':
						valueField.setAttribute('name', 'value');
						styleBlock.setAttribute('type', 'textalign');
						break;
					case 'letter-spacing':
						valueField.setAttribute('name', 'value');
						styleBlock.setAttribute('type', 'letterspacing');
						break;
					case 'margin-top':
					case 'margin-bottom':
					case 'margin-left':
					case 'margin-right':
					case 'margin':
						directionVariant('margin', 'margin');
						break;
					case 'padding-top':
					case 'padding-bottom':
					case 'padding-left':
					case 'padding-right':
					case 'padding':
						directionVariant('padding', 'padding');
						break;
					case 'display':
						valueField.setAttribute('name', 'content');
						styleBlock.setAttribute('type', 'display');
						break;
					case 'overflow':
					case 'overflow-x':
					case 'overflow-y':
						valueField.setAttribute('name', 'content');
						styleBlock.setAttribute('type', 'overflow');

						let directionField = document.createElement('field');
						directionField.setAttribute('name', 'direction');
						directionField.innerText = (propPair[0] + '-x').split('-')[1];

						styleBlock.appendChild(directionField);

						if (propPair[0] === 'overflow') {
							let overflowYBlock = document.createElement('block');
							overflowYBlock.setAttribute('id', getBlockId());
							overflowYBlock.setAttribute('type', 'overflow');

							let overflowYField = document.createElement('field');
							overflowYField.innerText = propPair[1].trim().replace(/^#/g, '');
							overflowYField.setAttribute('name', 'content');

							let directionYField = document.createElement('field');
							directionYField.setAttribute('name', 'direction');
							directionYField.innerText = 'y';

							overflowYBlock.appendChild(overflowYField);
							overflowYBlock.appendChild(directionYField);

							let next = document.createElement('next');
							next.appendChild(overflowYBlock);
							styleBlock.appendChild(next);
						}
						break;
					case 'float':
						valueField.setAttribute('name', 'content');
						styleBlock.setAttribute('type', 'float');
						break;
					case 'vertical-align':
						valueField.setAttribute('name', 'align');
						styleBlock.setAttribute('type', 'verticalalign');
						break;
					case 'width':
						valueField.setAttribute('name', 'size');
						styleBlock.setAttribute('type', 'width');
						break;
					case 'height':
						valueField.setAttribute('name', 'size');
						styleBlock.setAttribute('type', 'height');
						break;
					case 'background-color':
						valueField.setAttribute('name', 'value');
						styleBlock.setAttribute('type', 'bgcolornew');
						mapColorLikeBlock(propPair[1], 'value');
						break;
					case 'background-image':
						valueField.setAttribute('name', 'content');
						styleBlock.setAttribute('type', 'bgimage');

						// Overwrite default text of input
						valueField.innerText = // Remove the initial `url(`
							(
								(propPair[1].split(/(url\(['"])/g)[2] || '')
									// Remove the end bracket
									.split(/(['"]\))/g)
									.reverse()[2] ||
								// Fall back to `url` if no URL is present
								'url'
							)
								// Remove the speech marks around the URL
								.replace(/^['"]|['"]$/g, '');
						break;
					case 'background-position':
					case 'background-repeat':
					case 'background-size':
						valueField.setAttribute('name', 'content');
						styleBlock.setAttribute('type', `bg${propPair[0].split('-')[1]}`);
						break;
					case 'cursor':
						valueField.setAttribute('name', 'content');
						styleBlock.setAttribute('type', 'cursor');
						break;
					case 'border-left':
					case 'border-bottom':
					case 'border-top':
					case 'border-right':
					case 'border':
						valueField.setAttribute('name', 'color');
						styleBlock.setAttribute('type', 'bordernew');

						valueField.innerText = propPair[1].trim().split(/ +/g)[2] || '';

						let widthField = document.createElement('field');
						widthField.setAttribute('name', 'width');
						widthField.innerText = propPair[1].trim().split(/ +/g)[0] || '10px';

						let styleField = document.createElement('field');
						styleField.setAttribute('name', 'type');
						styleField.innerText = propPair[1].trim().split(/ +/g)[1] || 'none';

						styleBlock.appendChild(widthField);
						styleBlock.appendChild(styleField);

						if (propPair[0] !== 'border') {
							styleBlock.setAttribute('type', 'borderedge-new');

							let sideField = document.createElement('field');
							sideField.setAttribute('name', 'edge');
							sideField.innerText = propPair[0].split('-')[1];

							styleBlock.appendChild(sideField);
						}

						mapColorLikeBlock(valueField.innerHTML, 'color');
						break;
					case 'border-collapse':
						valueField.setAttribute('name', 'value');
						styleBlock.setAttribute('type', 'bordercol');

						if (propPair[1] === 'collapse') {
							valueField.innerText = 'TRUE';
						} else if (propPair[1] === 'separate') {
							valueField.innerText = 'FALSE';
						}
						break;
					case 'border-radius':
						valueField.setAttribute('name', 'content');
						styleBlock.setAttribute('type', 'borderrad');
						break;
					case 'transition':
						valueField.parentNode.removeChild(valueField);
						styleBlock.setAttribute('type', 'transition');

						// Get all of the transition properties
						let allSections = propPair[1].split(/(?<!\(),(?![^(]*[)])/g).map((e) => e.trim());

						let transitionParent = styleBlock;
						// Go through each transition property
						allSections.forEach((transitionElem, c) => {
							// Get the sections for each transition property
							let property = transitionElem.split(/ +/g)[0];
							let duration = transitionElem.split(/ +/g)[1].replace(/([s ])*/g, '');
							let delay = transitionElem.split(/ +/g)[2].replace(/([s ])*/g, '') || '0';
							let timing = transitionElem.split(/ +/g).slice(3).join('') || 'linear';

							// Create a field to store their values in the Blockly block
							let transitionPropertyField = document.createElement('field');
							let transitionDurationField = document.createElement('field');
							let transitionDelayField = document.createElement('field');
							let transitionTimingField = document.createElement('value');

							transitionPropertyField.setAttribute('name', 'transition-property');
							transitionDurationField.setAttribute('name', 'duration');
							transitionDelayField.setAttribute('name', 'delay');
							transitionTimingField.setAttribute('name', 'timing-function');

							// Populate the blocks, except transition-timing-function (see below)
							transitionPropertyField.innerText = property.trim();
							transitionDurationField.innerText = duration.trim();
							transitionDelayField.innerText = delay.trim();

							let timingBlock = document.createElement('block');
							timingBlock.setAttribute('id', getBlockId());

							// If we're using a custom bezier, parse that first
							if (timing.startsWith('cubic-bezier(')) {
								// Create the cubic bezier blocks
								timingBlock.setAttribute('type', 'transitiontimingbezier');

								// Create the fields for them
								let bez1 = document.createElement('field');
								let bez2 = document.createElement('field');
								let bez3 = document.createElement('field');
								let bez4 = document.createElement('field');

								bez1.setAttribute('name', 'bez1');
								bez2.setAttribute('name', 'bez2');
								bez3.setAttribute('name', 'bez3');
								bez4.setAttribute('name', 'bez4');

								// Split up the bezier string into each coordinate
								let bezPointList = timing.trim().split('cubic-bezier(').slice(1).join('').replace(/\)/g, '').split(',');
								// Put the coordinates into respective fields
								bez1.innerText = bezPointList[0].trim();
								bez2.innerText = bezPointList[1].trim();
								bez3.innerText = bezPointList[2].trim();
								bez4.innerText = bezPointList[3].trim();

								timingBlock.appendChild(bez1);
								timingBlock.appendChild(bez2);
								timingBlock.appendChild(bez3);
								timingBlock.appendChild(bez4);
							} else {
								// If we're using a preset function name
								// Use the dropdown block
								timingBlock.setAttribute('type', 'transitiontimingdropdown');

								// Set the text in the dropdown block to the name of the function
								let functionNameField = document.createElement('field');
								functionNameField.setAttribute('name', 'function');
								functionNameField.innerText = timing.trim();

								timingBlock.appendChild(functionNameField);
							}

							transitionTimingField.appendChild(timingBlock);

							// Add all of the fields to the transition block
							transitionParent.appendChild(transitionPropertyField);
							transitionParent.appendChild(transitionDurationField);
							transitionParent.appendChild(transitionDelayField);
							transitionParent.appendChild(transitionTimingField);

							let newTransitionParent = document.createElement('next');
							transitionParent.appendChild(newTransitionParent);

							// Manually insert the new blocks (if there are multiple transition properties)
							if (c < allSections.length - 1) {
								let newTransitionBlock = document.createElement('block');
								newTransitionBlock.setAttribute('id', getBlockId());
								newTransitionBlock.setAttribute('type', 'transition');
								newTransitionParent.appendChild(newTransitionBlock);

								transitionParent = newTransitionBlock;
							} else {
								transitionParent = newTransitionParent;
							}
						});

						parent = transitionParent;
						forceParent = true;

						break;
					default:
						// If it is not recognised, fall back to the default blank `property: value` block
						styleBlock.setAttribute('type', 'othercss');
						valueField.setAttribute('name', 'value');

						let propertyField = document.createElement('field');
						propertyField.setAttribute('name', 'property');
						propertyField.innerText = propPair[0];

						valueField.innerText = propPair[1].trim();

						styleBlock.appendChild(propertyField);
						break;
				}

				// Append each item to the previous item's <next> tag
				if (m < properties.length - 1) {
					if (!forceParent) {
						let t = document.createElement('next');
						styleBlock.appendChild(t);

						parent = t;
					} else forceParent = false;
				}
			});
		};

		/*
         Helper method to replace a given tag name without a closing tag to be self-closing, e.g:
                  "<div><img src='http'></div>".closeTag("img", "12345")
         becomes
                  "<div><img12345 src='http' /></div>"
    
         It is assigned to the string prototype to make code a little neater as opposed to using a function
        */
		String.prototype.closeTag = function (tagName, closeId) {
			let openTagRE = new RegExp(`((?<!${nonStringId}(?:'(?:\\.|[^'])*')|(?:"(?:\\.|[^"])*"))< *${tagName}(?:(?:${nonStringId}.*?${nonStringId})|[^>])*?[^/] *>(?!< *\/ *${tagName}))`, 'g');

			// Find all strings
			return (
				this.split(/((?:"(\\.|[^"])*")|(?:'(\\.|[^'])*'))/g)
					.filter((_, i) => i % 4 < 2)
					.map((_, i) => (i % 2 ? _ : nonStringId + _ + nonStringId))
					.join('')
					.split(openTagRE)
					// Mark where the strings are
					.map((e) => e.replace(new RegExp(nonStringId, 'g'), ''))
					.filter((e) => e)
					// Replace every instance of tag not in a string with the self-closing version + the marker ID
					.map((e) => (openTagRE.test(e) ? `${e.trim().slice(0, -1)}/>`.replace(/\/\/ *>$/g, '/>').replace(new RegExp(tagName, 'g'), tagName + closeId) : e))
					.join('')
				// this
			);
		};

		// Create a new DOM element, which we will use to reconstruct the HTML node-by-node, but as Blockly XML instead of
		// HTML-style XML.
		let parallelTree = document.createElement('xml');
		parallelTree.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

		// Generate unique IDs to be used as markers in a variety of places
		let tempId = getReplacerId();
		let tagId = getReplacerId();
		let nonStringId = getReplacerId();

		let closeId = getReplacerId();
		let slashedId = getReplacerId();

		// Save a list of tags (in order) to be replaced with a slightly altered name, to ensure they end up in the <body>
		// of DOMParser. This is because DOMParser automatically inserts a proper `<html><head></head><body></body></html>`
		// structure, from which we need to be able to read out what was actually typed by the user.
			let overrideTags = ['br', 'hr', 'tr', 'td', 'th', 'table', 'header', 'html', 'head', 'body', 'base', 'link', 'meta', 'script', 'title', 'noscript'];
			let overrideExp = '(' + overrideTags.join(')|(') + ')';
		let bodifiedCode = (' ' + code)
			// Find all of the strings
			.split(/((?<=[^\\]|^)(("((\\")|[^"])*[^\\]")|('((\\')|[^'])*[^\\]')))|((?<=([^\\]>)|^)((\\<)|([^<]))*[^\\](?=<))/g)
			.filter((_, z) => z % 14 === 0 || (_ && (z % 14 === 1 || z % 14 === 9)))
			.map((v, i) =>
				i % 2 === 0
					? // Replace tags with new name to ensure they end up in the `<body>`
					  (!i ? v.substr(1) : v).replace(new RegExp(`< *\\/? *(${overrideExp})(?=.*(>|(= *)))`, 'gi'), (z) => `${z.toLowerCase()}Tag${tempId}`).replace(/<!DOCTYPE html>/gi, '<doctypeTag></doctypeTag>')
					: v
			)
			.filter((_, z) => (z ? (z === 1 ? _ !== ' ' : true) : _))
			.join('')
			// Replace certain unclosed tags with self-closing versions
			.closeTag(`metaTag${tempId}`, closeId)
			.closeTag(`img`, closeId)
			.closeTag(`hr${tempId}`, closeId)
			.closeTag(`br${tempId}`, closeId)
			// Extract all of the tags...
			.split(/(?<=<\/?[!\-a-zA-Z0-9]+(?: *[a-zA-Z]+(?:=(?:(?:"(?:\\.|[^"])*")|(?:'(?:\\.|[^'])*')|(?:[0-9]|(?:true|false))))?)* *\/?>(?:\\.|[^<])*)/g)
			.reduce((v, e) => (e.length - 1 ? v.push(e) : typeof v[v.length - 1] === 'string' ? v.push([e]) : (v[v.length - 1][0] += e)) && v, [])
			.flat()
			.reduce((v, e) => (e[0] === '<' && e[1] !== '!' ? v.push(e) : (v[v.length - 1] += e)) && v, [''])
			// And for each of them...
			.map((t) =>
				// Replace self-closing tags with their expanded version (e.g `<div/>` becomes `<div></div>`, and incl.
				// previous code `<img>` becomes `<img/>` which here becomes `<img></img>`. Also, insert an ID to note
				// that the tag was originally slashed before it was expanded
				t
					// .replace(/^<([a-zA-Z0-9]+.*)\/ *>/g, `${tagId}$&${tagId}`)
					.split(tagId)
					.filter((e) => e)
					.map((m) =>
						/^<([a-zA-Z0-9]+.*)\/ *>/g.test(m)
							? [
									m
										.trim()
										.split(/(\/ *>)(?!.*\/ *>)/g)[0]
										.substr(1)
										.trim(),
							  ].map(
									(u) =>
										`<${(u.split(' ')[0] + slashedId + (u.split(' ').length - 1 ? ' ' : '') + u.split(' ').slice(1).join(' '))
											// If something was both changed to be self-closing, then expanded, we only need to
											// mark that is was changed to be self-closing: the fact it was then expanded is obvious
											.replace(new RegExp(closeId + slashedId, 'g'), closeId)}></${(u.split(' ')[0] + slashedId).replace(new RegExp(closeId + slashedId, 'g'), closeId)}>`
							  )
							: m
					)
					.join('')
			)
			.join('');

		// Use DOMParser to generate a DOM tree from our filtered/niceified string
		let domParser = new DOMParser();
		let parsedHTML = domParser.parseFromString('<body>' + bodifiedCode + '</body>', 'text/html').body;
		// Un-close any tags inside <style> tags, because there we're meant to be parsing them as strings, not as HTML
		Array.from(parsedHTML.getElementsByTagName('style')).forEach((e) => {
			e.innerText = e.innerText.replace(new RegExp(tempId, 'g'), '');

			e.innerText = e.innerText.replace(new RegExp(`< *([^ ]*?)${closeId}(.*?)>< *\\/(?:\\1)${closeId} *>`, 'g'), '<$1$2>');

			e.innerText = e.innerText.replace(new RegExp(`< *([^ ]*?)${slashedId}(.*?)>< *\\/(?:\\1)${slashedId} *>`, 'g'), '<$1$2/>');
		});

		// Get rid of the marker IDs left in the code
		parsedHTML.innerHTML = parsedHTML.innerHTML.replace(new RegExp(slashedId, 'g'), '').replace(new RegExp(closeId, 'g'), '');
		// Recursive function to map each DOM node to a node in the XML tree
		const reconstruct = (parent, parallelParent, isTopLevel) => {
			// List of children we need to append to the current parent in the XML
			let parallelChildren = [];

			// Store any comments we need to append to this parent
			let comment = false;

			// Go through each child of the DOM node
			for (let i = 0, child = parent.childNodes[0]; i < parent.childNodes.length; i++, child = parent.childNodes[i]) {
				// Trim the text inside the node
				child.innerHTML ? (child.innerHTML = child.innerHTML.trim()) : (child.textContent = child.textContent.trim());

				let newNode;
				let childrenContainer;
				let childrenPreHandled = false;

				// Function to quickly replace `newNode` with an empty statement block of a given type, which can
				// also be adjusted with extra fields manually.
				const template_EmptyStatement = (blockType, statementName) => {
					newNode = document.createElement('block');
					newNode.setAttribute('type', blockType);
					newNode.setAttribute('id', getBlockId());

					childrenContainer = document.createElement('statement');
					childrenContainer.setAttribute('name', statementName ? statementName : 'content');

					newNode.appendChild(childrenContainer);
				};

				// Go through each block, and apply its individual conditions
				switch (child.nodeName) {
					case `HEADTAG${tempId}`:
					case `HTMLTAG${tempId}`:
					case `BODYTAG${tempId}`:
						template_EmptyStatement(child.nodeName.slice(0, -8).toLowerCase());
						break;

					case `STYLE`:
						template_EmptyStatement('style');
						break;
					case `SCRIPTTAG${tempId}`:
						template_EmptyStatement('script_tag');
						break;

					case `METATAG${tempId}`:
						newNode = document.createElement('block');
						newNode.setAttribute('id', getBlockId());

						if (child.getAttribute('name') === 'viewport') {
							newNode.setAttribute('type', 'metaviewport');
							child.removeAttribute('name');
						} else if (child.hasAttribute('charset')) {
							newNode.setAttribute('type', 'metacharset');

							let charsetField = document.createElement('field');
							charsetField.setAttribute('name', 'value');
							charsetField.innerText = child.getAttribute('charset');

							newNode.appendChild(charsetField);

							child.removeAttribute('charset');
						} else {
							newNode.setAttribute('type', 'meta_unknown');
							newNode.setAttribute('name', 'METAUNKNOWN');
						}
						break;

					case `H1`:
					case `H2`:
					case `H3`:
					case `H4`:
					case `H5`:
					case `H6`:
						template_EmptyStatement('header');

						let size = document.createElement('field');
						size.setAttribute('name', 'size');
						size.innerText = child.nodeName.substr(1);

						newNode.appendChild(size);
						break;

					case `TITLETAG${tempId}`:
						newNode = document.createElement('block');
						newNode.setAttribute('type', 'title');
						newNode.setAttribute('id', getBlockId());

						let title = document.createElement('field');
						title.setAttribute('name', 'value');
						title.innerText = child.innerText;

						childrenPreHandled = true;

						newNode.appendChild(title);
						break;

					case `HEADERTAG${tempId}`:
						template_EmptyStatement('headertag');
						break;

					case `FOOTER`:
						template_EmptyStatement('footertag');
						break;

					case 'DIV':
						template_EmptyStatement('divider');
						break;

					case `HRTAG${tempId}`:
					case `BRTAG${tempId}`:
						newNode = document.createElement('block');
						newNode.setAttribute('type', child.nodeName.startsWith('BR') ? 'linebreak' : 'hline');
						newNode.setAttribute('id', getBlockId());
						break;

					case 'P':
						template_EmptyStatement('paragraph');
						break;

					case 'SPAN':
						template_EmptyStatement('span');
						break;

					case 'A':
						template_EmptyStatement('link');

						let href;
						if (child.hasAttribute('href')) {
							href = child.getAttribute('href');
							child.removeAttribute('href');
						} else href = '#!';

						let targetField = document.createElement('field');
						targetField.setAttribute('name', 'target');
						targetField.innerText = href;

						newNode.appendChild(targetField);
						break;

					case 'STRONG':
					case 'EM':
					case 'MARK':
					case 'SMALL':
					case 'BIG':
					case 'DEL':
					case 'INS':
					case 'SUB':
					case 'SUP':
					case 'CODE':
					case 'Q':
					case 'ASIDE':
					case 'BLOCKQUOTE':
					case 'LEGEND':
					case 'CITE':
						template_EmptyStatement('textmod');

						let modField = document.createElement('field');
						modField.setAttribute('name', 'type');
						modField.innerText = child.nodeName.toLowerCase();

						newNode.appendChild(modField);
						break;

					case `TABLETAG${tempId}`:
						template_EmptyStatement('table');
						break;

					case `TRTAG${tempId}`:
						template_EmptyStatement('tablerow');
						break;

					case `THTAG${tempId}`:
						template_EmptyStatement('tableheading');
						break;

					case `TDTAG${tempId}`:
						template_EmptyStatement('tabledata');
						break;

					case `OL`:
						template_EmptyStatement('orderedlist');
						break;

					case `UL`:
						template_EmptyStatement('unorderedlist');
						break;

					case `LI`:
						template_EmptyStatement('listitem');
						break;

					case `DETAILS`:
					case `SUMMARY`:
						template_EmptyStatement(child.nodeName.toLowerCase());
						break;

					case `FORM`:
						template_EmptyStatement('form');
						break;

					case `INPUT`:
						newNode = document.createElement('block');
						newNode.setAttribute('type', 'input');
						newNode.setAttribute('id', getBlockId());

						let inputType = document.createElement('field');
						inputType.setAttribute('name', 'type');
						inputType.innerText = child.getAttribute('type') || 'submit';

						let valueField = document.createElement('field');
						valueField.setAttribute('name', 'value');
						valueField.innerText = child.getAttribute('value') || '';

						let placeholderField = document.createElement('field');
						placeholderField.setAttribute('name', 'placeholder');
						placeholderField.innerText = child.getAttribute('placeholder') || '';

						let nameField = document.createElement('field');
						nameField.setAttribute('name', 'name');
						nameField.innerText = child.getAttribute('name') || '';

						newNode.appendChild(inputType);
						newNode.appendChild(valueField);
						newNode.appendChild(placeholderField);
						newNode.appendChild(nameField);

						child.removeAttribute('type');
						child.removeAttribute('value');
						child.removeAttribute('placeholder');
						child.removeAttribute('name');
						break;

					case `LABEL`:
						template_EmptyStatement('label');

						let forField = document.createElement('field');
						forField.setAttribute('name', 'for');
						forField.innerText = child.getAttribute('for') || 'for';

						newNode.appendChild(forField);

						child.removeAttribute('for');
						break;

					case `IMG`:
						template_EmptyStatement('image');

						let imgSrcField = document.createElement('field');
						imgSrcField.setAttribute('name', 'source');
						imgSrcField.innerText = child.getAttribute('src') || 'http://';

						newNode.appendChild(imgSrcField);

						child.removeAttribute('src');
						break;

					case `AUDIO`:
					case `VIDEO`:
						template_EmptyStatement(child.nodeName.toLowerCase());

						let audioSrcField = document.createElement('field');
						audioSrcField.setAttribute('name', 'source');

						if (child.nodeName === 'AUDIO') {
							audioSrcField.innerText = ['8bit.ogg', 'classical.mp3', 'happy.wav'].includes(child.getAttribute('src')) ? child.getAttribute('src') : '8bit.ogg';
						} else {
							let index = ['bigbuckbunny.mp4', 'llamadrama.mp4'].indexOf(child.getAttribute('src'));

							audioSrcField.innerText = index > -1 ? ['bbb', 'ld'][index] : 'bbb';
						}

						let loopField = document.createElement('field');
						loopField.setAttribute('name', 'loop');
						loopField.innerText = evalBooleanAttr(child.getAttribute('loop'));

						let autoplayField = document.createElement('field');
						autoplayField.setAttribute('name', 'autoplay');
						autoplayField.innerText = evalBooleanAttr(child.getAttribute('autoplay'));

						let controlsField = document.createElement('field');
						controlsField.setAttribute('name', 'controls');
						controlsField.innerText = evalBooleanAttr(child.getAttribute('controls'));

						newNode.appendChild(audioSrcField);
						newNode.appendChild(loopField);
						newNode.appendChild(autoplayField);
						newNode.appendChild(controlsField);

						child.removeAttribute('src');
						child.removeAttribute('loop');
						child.removeAttribute('autoplay');
						child.removeAttribute('controls');
						break;
					case '#text':
						// If it's a normal text node
						if (child.parentNode.nodeName !== `STYLE` && child.textContent.trim()) {
							if (child.textContent.includes('\n')) {
								child.splitText(child.textContent.indexOf('\n') + 1);
							}

							// Just insert the text block for each line in there
							newNode = document.createElement('block');
							newNode.setAttribute('type', 'emptytext');
							newNode.setAttribute('id', getBlockId());

							let textContent = document.createElement('field');
							textContent.setAttribute('name', 'content');
							textContent.innerText = child.textContent.replace(/\n*$/g, '');

							newNode.appendChild(textContent);
						} else if (child.parentNode.nodeName === `STYLE`) {
							// If the text node is the child of a style block
							// Get the selectors/prop-val pairs
							let selectors = extractStyleSheet(child.textContent, true).filter((e) => e[0]);

							// Map each selector
							selectors.forEach((selector) => {
								let selectorBlock = document.createElement('block');
								// if the selector is an outside comment (e.g `/* comment */`)
								if (selector[0].match(/cssCommentParsed/g)) {
									const innerComment = selector[0].split('°°°')[1];
									// selectorBlock.setAttribute('id', getBlockId());
									selectorBlock.setAttribute('type', 'csscomment');
									const fieldValue = document.createElement('field');
									fieldValue.innerText = innerComment;
									fieldValue.setAttribute('name', 'value');
									selectorBlock.appendChild(fieldValue);
									parallelChildren.push(selectorBlock);
									return;
								} else {
									selectorBlock.setAttribute('type', 'cssitem');
									selectorBlock.setAttribute('id', getBlockId());

									let openBracketId = getReplacerId();
									let closeBracketId = getReplacerId();

									// Get the comments on the selector blocks and handle them separately
									let comments = (selector[0].match(cssCommentRegExp) || [])
										.map((e) => e.trim().replace(/(?:^\/\*)|(?:\*\/$)/g, ''))
										.filter((e) => e)
										.join('    ')
										.trim();
									selector[0] = selector[0]
										.replace(cssCommentRegExp, '')
										.replace(/\\\/\*/g, '/*')
										.trim();

									if (comments) {
										let commentTag = document.createElement('comment');
										commentTag.setAttribute('pinned', 'false');
										commentTag.innerText = comments;

										selectorBlock.appendChild(commentTag);
									}

									// Extract the pseudoselectors and handle them with their respective blocks
									let selectorSections = selector[0]
										.toLowerCase()
										// Get the strings in the selector
										.split(/((?:(?<=')(?:\\.|[^'])*(?='))|(?:(?<=")(?:\\.|[^"])*(?="))|(?:(?<=\()[^'"]*(?=\))))/g)
										.map((e, i) =>
											i % 2
												? // Encode everything in a string, meaning that colons are escaped too (so will not be matched)
												  encodeURIComponent(e.replace(/\(/g, openBracketId).replace(/\)/g, closeBracketId))
												: e
										)
										.join('')
										// Get all of the visible selector sections (those in strings, e.g `input[type="::before"]`
										// are escaped, so not matched here
										.split(/(?<!:):(?=hover|focus|:before|:after|not\()(?![^(]*\))/g)
										// Unescape everything
										.map((e) => decodeURIComponent(e).replace(new RegExp(openBracketId, 'g'), '(').replace(new RegExp(closeBracketId, 'g'), ')'));

									let selectorField = document.createElement('field');
									selectorField.setAttribute('name', 'selector');
									selectorField.innerText = selectorSections[0];

									// If there are add-ons required to the selector
									if (selectorSections.length - 1) {
										// Add the value into the selector block into which we can append the pseudo-block
										let modifierValue = document.createElement('value');
										modifierValue.setAttribute('name', 'modifier');

										let selectorParent = modifierValue;
										selectorSections.slice(1).forEach((section, j) => {
											let newMod = document.createElement('block');
											newMod.setAttribute('id', getBlockId());

											// Add a universal field which we can fill with the contents, regardless of
											// what type of block (`not` or the dropdown) it will end up being
											let contentField = document.createElement('field');
											contentField.setAttribute('name', 'content');
											newMod.appendChild(contentField);

											// Determine the type of block we need
											if (section.slice(0, 4) === 'not(') {
												newMod.setAttribute('type', 'cssnot');
												// Add in the text we want in the not
												contentField.innerText = section.slice(4, -1);
											} else {
												newMod.setAttribute('type', 'cssevents');
												contentField.innerText = section;
											}

											selectorParent.appendChild(newMod);

											// Create a new block, which is a modifier of this block, hence 'chaining' them
											// to one another
											if (j < selectorSections.length - 2) {
												let nextMod = document.createElement('value');
												nextMod.setAttribute('name', 'modifier');
												newMod.appendChild(nextMod);

												selectorParent = nextMod;
											}
										});

										selectorBlock.appendChild(modifierValue);
									}

									let selectorContent = document.createElement('statement');
									selectorContent.setAttribute('name', 'content');

									// Build the property-value pairs with the CSS blocks into this selector block
									constructStyleTree(selector[1], selectorContent);

									selectorBlock.appendChild(selectorField);
									selectorBlock.appendChild(selectorContent);
									parallelChildren.push(selectorBlock);
								}
							});
						}
						break;
					case 'DOCTYPETAG':
						break;

					case '#comment':
						// Store the last comment above a given block
						if (child.nodeName.match(/<!DOCTYPE/gi)) {
							continue;
						} else {
							// comment = child.textContent;
							template_EmptyStatement('htmlcomment');
							let commentField = document.createElement('field');
							commentField.setAttribute('name', 'value');
							commentField.innerText = child.textContent.toString();
							newNode.appendChild(commentField);
							break;
						}

					default:
						// declare custom block
						if (parent.innerHTML.match(/ headtag/gi)) {
							template_EmptyStatement('meta_unknown');
							// handle custom opening tags
							let metaCustom = document.createElement('field');
							metaCustom.setAttribute('name', 'METAUNKNOWN');
							metaCustom.innerText = child.nodeName.toLowerCase();
							newNode.appendChild(metaCustom);
						} else {
							template_EmptyStatement('default_unnamed_div');
							// handle custom opening tags
							let tagNameCustom = document.createElement('field');
							tagNameCustom.setAttribute('name', 'CUSTOMTAG');
							tagNameCustom.innerText = child.nodeName.toLowerCase();

							// handle custom closing tags
							let tagNameCustomClose = document.createElement('field');
							tagNameCustomClose.setAttribute('name', 'CUSTOMTAGCLOSE');
							tagNameCustomClose.innerText = child.nodeName.toLowerCase();

							// append custom tags to the block
							newNode.appendChild(tagNameCustom);
							newNode.appendChild(tagNameCustomClose);
						}
				}

				// Add the comment as a direct child node to the block node (not a child block)
				if (comment && newNode) {
					let commentTag = document.createElement('comment');
					commentTag.setAttribute('pinned', 'false');

					commentTag.innerText = comment.toString();
					newNode.appendChild(commentTag);

					comment = false;
				}

				if (childrenPreHandled) {
					while (child.firstChild) {
						child.removeChild(child.firstChild);
					}
				}

				// Extract the attributes

				let attributes = Array.from(child.attributes || [])
					.map((e) => [e.name, e.value.trim()])
					.filter((e) => !e.some((v) => /[<>]/g.test(v) || new RegExp(`(${overrideExp})tag${tempId}`, 'g').test(v)));
				if (attributes.length) {
					// If there are attributes, add on the attribute modifier value block
					let attrInput = document.createElement('value');
					attrInput.setAttribute('name', 'modifier');

					let attrContainer = document.createElement('block');
					attrContainer.setAttribute('type', 'args');
					attrContainer.setAttribute('id', getBlockId());

					let attrStatement = document.createElement('statement');
					attrStatement.setAttribute('name', 'content');

					let attrParent = attrStatement;
					attributes.forEach((attr, z) => {
						let attrName = document.createElement('block');
						attrName.setAttribute('id', getBlockId());

						// Handle each attribute type individually
						if (attr[0] === 'class' || attr[0] === 'id' || attr[0] === 'align') {
							attrName.setAttribute('type', attr[0]);

							let attrValue = document.createElement('field');
							attrValue.setAttribute('name', 'content');
							attrValue.innerText = attr[1].trim() || 'true';

							attrName.appendChild(attrValue);
						} else if (attr[0] === 'style') {
							// For style attributes, just extract the style sheet and build it into the style arg block
							attrName.setAttribute('type', 'stylearg');
							let statement = document.createElement('statement');
							statement.setAttribute('name', 'content');

							let selectors = extractStyleSheet(attr[1], false);
							constructStyleTree(selectors, statement);

							attrName.appendChild(statement);
						} else {
							// If it is an unknown type, use the custom modifier block
							attrName.setAttribute('type', 'emptyarg');

							let attrProperty = document.createElement('field');
							attrProperty.setAttribute('name', 'property');
							attrProperty.innerText = attr[0];

							let attrValue = document.createElement('field');
							attrValue.setAttribute('name', 'value');
							attrValue.innerText = attr[1].trim() || 'true';

							attrName.appendChild(attrProperty);
							attrName.appendChild(attrValue);
						}

						attrParent.appendChild(attrName);

						// Append all of the attributes to the attribute value block
						if (z < attributes.length - 1) {
							let v = document.createElement('next');
							attrName.appendChild(v);

							attrParent = v;
						}
					});

					attrContainer.appendChild(attrStatement);
					attrInput.appendChild(attrContainer);
					newNode.appendChild(attrInput);
				}

				// Continue mapping with the child nodes of this node, until no remaining nodes are left, and pass on
				// that this child is the parent
				if (child.childNodes.length && childrenContainer) {
					reconstruct(child, childrenContainer);
				}

				if (newNode) {
					parallelChildren.push(newNode);
				} // Save this node to be appended to the parent
			}

			// Append everything we've mapped from the DOM parent to the XML parent, using the proper `<next>` tags
			let newParent = parallelParent;
			parallelChildren.forEach((child, i) => {
				if (child) {
					newParent.appendChild(child);
				} else {
					return false;
				}

				// Nest the <next> tag in the previous child
				if (i < parallelChildren.length - 1 && !isTopLevel) {
					let v = document.createElement('next');
					child.appendChild(v);
					newParent = v;
				}
			});
		};

		// Start the reconstruction at the top of the DOM tree
		reconstruct(parsedHTML, parallelTree, true);

		// Remove empty <statement>s to speed up processing/avoid possible Blockly errors
		parallelTree.querySelectorAll('*').forEach((e) => {
			if (e.nodeName === 'STATEMENT' && !e.childElementCount) e.parentNode.removeChild(e);
		});

		// Return the new XML tree as a string
		return parallelTree.outerHTML;
	}

	/**
	 * Return the XML block code in string format
	 *
	 * @returns {string}
	 */
	generateXML(workSpace) {
		// workspace -> XML
		const dom = Blockly.Xml.workspaceToDom(workSpace);

		// Filter out speech marks
		dom.querySelectorAll('*').forEach((node) => {
			if (node.nodeName.toLowerCase() === 'block') {
				node.setAttribute(
					'id',
					node.getAttribute('id').replace(/"/g, '£') // £ is not in Blockly's soup, so it won't affect uniqueness
				);
			}
		});

		// XML -> string
		return Blockly.Xml.domToText(dom);
	}

	/**
	 * Downloads a txt file containing the XML data of the project, which can be used to save it locally.
	 *
	 * @param {string} [fileName=ffau-export.txt] - The name of the txt file
	 * @returns {string} - The XML data as a string
	 */
	downloadXML(fileName) {
		/* get the xml data from blockly */
		const data = this.generateXML();

		/* js hack to create element with unsupported mime type and force a download */
		const element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
		// set the filename to fileName or the default
		element.setAttribute('download', fileName || 'ffau-export.txt');

		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);

		return data;
	}

	/**
	 * Set the Blockly workspace to a specified XML string
	 *
	 * @param {string} xmlString - The XML string to use
	 */
	setXML(xmlString, workSpaceTarget) {
		const xmlLoader = document.createElement('div');
		xmlLoader.innerHTML = xmlString;

		xmlLoader.querySelectorAll('*').forEach((thisNode) => {
			if (thisNode.nodeName === 'BLOCK' && thisNode.attributes.length > 2) {
				thisNode.setAttribute(
					'id',
					`${thisNode.getAttribute('id')}${[...thisNode.attributes]
						.map((attr) => attr.name)
						.filter((attr) => !['id', 'type'].includes(attr))
						.join('')
						.replace(/"/g, '£')}`
				);
				[...thisNode.attributes].forEach((attr) => {
					if (!['id', 'type'].includes(attr.name)) {
						thisNode.removeAttribute(attr.name);
					}
				});
			}
		});

		// change the text to dom
		const dom = Blockly.Xml.textToDom(xmlLoader.innerHTML);
		// clear the workspace to avoid adding code on top
		this.clearWorkspace(false, workSpaceTarget);

		// set the dom into the workspace
		Blockly.Xml.domToWorkspace(dom, workSpaceTarget);
		// Not very happy with this, but it works
		// workSpaceTarget.scrollCenter();
	}

	clearWorkspace(trashItems, workSpaceTarget) {
		if (trashItems === false) {
			Blockly.Events.disable();
		}
		workSpaceTarget.clear();

		if (trashItems === false) {
			Blockly.Events.enable();
		}
	}
	/**
	 * Move a block on top of another (to improve)
	 * @param {object} top - The top block XML
	 * @param {object} bottom - The bottom block XML
	 */

	blockPositionning(top, bottom) {
		const previousConnection = bottom.previousConnection;
		previousConnection.connect(top.nextConnection);

	}

	/**
	 * Organize the blocks in the workspace
	 * @param {object} workSpaceTarget - The workspace to organize
	 * @returns - The workspace with the blocks organized
	 */
	organizePrototypeBlocks(workSpaceTarget) {
		const allBlocks = workSpaceTarget.getAllBlocks();
		let headBlock = null;
		let bodyBlock = null;
		let styleBlock = null;
		let scriptBlock = null;
		let htmlBlock = null;

		// find the head, body and script blocks
		allBlocks.forEach((block) => {
			if (block.type === 'head') {
				headBlock = block;
			} else if (block.type === 'body') {
				bodyBlock = block;
			} else if (block.type === 'style') {
				styleBlock = block;
			} else if (block.type === 'script_tag') {
				scriptBlock = block;
			} else if (block.type === 'htmltag') {
				htmlBlock = block;
			}
		});

		// Check if wether the head and body, or head and style blocks coexist
		if ((headBlock && bodyBlock) || (headBlock && styleBlock) || (headBlock && scriptBlock) || (bodyBlock && scriptBlock) ||(headBlock && styleBlock && scriptBlock)) {
			
			if (scriptBlock && scriptBlock.parentBlock_ === null) {
				if (headBlock && styleBlock && !scriptBlock) {
					// Connect the style block inside the head block
					const headInputConnection = headBlock.getInput('content').connection;
					const stylePrevConnection = styleBlock.previousConnection;
					if (headInputConnection && stylePrevConnection) {
						headInputConnection.connect(stylePrevConnection);
					}
				}
				if (headBlock && scriptBlock && !styleBlock) {
					// Connect the script block inside the head block
					const headInputConnection = headBlock.getInput('content').connection;
					const scriptPrevConnection = scriptBlock.previousConnection;
					if (headInputConnection && scriptPrevConnection) {
						headInputConnection.connect(scriptPrevConnection);
					}
				} 
	
				if (headBlock && styleBlock && scriptBlock) {
					// Connect the style block inside the head block
					const headInputConnection = headBlock.getInput('content').connection;
					const stylePrevConnection = styleBlock.previousConnection;
					if (headInputConnection && stylePrevConnection) {
						headInputConnection.connect(stylePrevConnection);
					}
					// Connect the script block inside the head block
					const scriptPrevConnection = scriptBlock.previousConnection;
					if (headInputConnection && scriptPrevConnection) {
						headInputConnection.connect(scriptPrevConnection);
					}
				}
				if (!headBlock && scriptBlock && bodyBlock){
					// Connect the script block inside the body block
					const bodyInputConnection = bodyBlock.getInput('content').connection;
					const scriptPrevConnection = scriptBlock.previousConnection;
					if (bodyInputConnection && scriptPrevConnection) {
						bodyInputConnection.connect(scriptPrevConnection);
					}
				}
				
			} else {
				if (headBlock && styleBlock) {
					// Connect the style block inside the head block
					const headInputConnection = headBlock.getInput('content').connection;
					const stylePrevConnection = styleBlock.previousConnection;
					if (headInputConnection && stylePrevConnection) {
						headInputConnection.connect(stylePrevConnection);
					}
				}
			}
		}
	}

	/**
	 * @param {string} code - The code to check if it has a doctype
	 * @returns - The code with a doctype if it didn't have one
	 * @returns - The code if it already had a doctype
	 **/

	checkInitDoctype(code) {
		//need to update this part
		// const doctype = code.match(/DOCTYPE/g);
		// if (doctype === null) {
		// 	this.editorHtml.setValue(`<!DOCTYPE html>\n${code}`);
		// 	return (code = `<!DOCTYPE html>\n\n${code}`);
		// }
		return code;
	}

	/**
	 * @param {string} code - The code to check if it has css comments
	 * @returns - The code with css comments parsed correctly if it had any
	 **/

	checkCssComments(code) {
		const styleTagContent = code.match(/<style\b[^>]*>([\s\S]*?)<\/style>/i)?.[1];
		if (!styleTagContent) return code;
		let inSelector = false;
		let inComment = false;
		let commentStart = 0;
		let selectorStart = 0;
		const commentArray = [];
		let newCode = code;
		for (let i = 0; i < styleTagContent.length; i++) {
			if (styleTagContent[i] === '/' && styleTagContent[i + 1] === '*') {
				inComment = true;
				commentStart = i;
			} else if (styleTagContent[i] === '*' && styleTagContent[i + 1] === '/') {
				inComment = false;
				const comment = styleTagContent.slice(commentStart, i + 2);
				const position = inSelector ? 'inside' : 'outside';
				commentArray.push([comment, position]);

				i++; // Skip next character as it is part of the comment end
			} else if (styleTagContent[i] === '{') {
				inSelector = true;
				selectorStart = i;
			} else if (styleTagContent[i] === '}') {
				inSelector = false;
				const selector = styleTagContent.slice(selectorStart, i + 1);
			}
		}
		if (commentArray.length > 0) {
			for (let i = 0; i < commentArray.length; i++) {
				const innerComment = commentArray[i][0].replace(/(?:^\/\*)|(?:\*\/$)/g, '');
				if (commentArray[i][1] === 'inside') {
					newCode = newCode.replace(commentArray[i][0], `cssComment: ${innerComment};\n`);
				} else if (commentArray[i][1] === 'outside') {
					newCode = newCode.replace(commentArray[i][0], `cssCommentParsed°°°${innerComment}°°°{}`);
				}
			}
		}

		return newCode;
	}

	/**
	 * Add blocks to the workspace with traduction from the code to XML
	 * @param {string} code - The code to add
	 * @param {object} workSpaceTarget - The workspace to add the blocks to
	 * @returns - The workspace with the blocks added
	 **/
	addHtmlBlocks(code) {
		const workSpace = this.workSpaceHtml;
		if (code === '') {
			this.clearWorkspace(false, workSpace);
			this.codeHtml = '';
			return;
		}
		if (code !== this.codeHtml) {
			code = this.checkInitDoctype(code);
			code = this.checkCssComments(code);
			this.codeHtml = code;
			let xml = this.codeToXML(code);
			this.setXML(xml, workSpace);
		}
	}
}

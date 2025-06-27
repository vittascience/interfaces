import { editorState } from "../ace-accessibility.js";

/**
 * Updates the cursor position indicator in the top-right corner of the editor.
 *
 * @param {number} row - The current row of the cursor.
 * @param {number} column - The current column of the cursor.
 * @param {HTMLElement} positionIndicator - The element displaying the position.
 */
export function updateCursorPositionIndicator(row, column, positionIndicator) {
    positionIndicator.textContent = `Ligne: ${row}, Colonne: ${column}`;
}

/**
 * Handles cursor position change events.
 *
 * @param {object} aceSelection - The Ace selection instance.
 * @param {HTMLElement} positionIndicator - The element displaying the position.
 */
export function onChangeCursor(positionIndicator) {
    const cursor = editorState.aceSelection.getCursor();
    const row = cursor.row;
    const column = cursor.column;
    updateCursorPositionIndicator(row + 1, column, positionIndicator)
}
import { updateAriaLiveRegion } from "../../utils/live-region.js";

export function setupDuplicateLineCommand(aceEditor, aceSession){
    aceEditor.commands.addCommand({
        name: "duplicateLine",
        bindKey: {
            win: "Ctrl-D",
            mac: "Cmd-D"
        },
        exec: function (aceEditor) {
            const selectionRange = aceEditor.getSelectionRange();

            if (!selectionRange.isEmpty()) {
                // if the selection is not empty, duplicate the selected text
                const text = aceSession.getTextRange(selectionRange);
                aceSession.insert(selectionRange.end, `\n${text}`);
                updateAriaLiveRegion("Texte sélectionné dupliqué.");
            } else {
                // otherwise, duplicate the current line
                const cursor = aceEditor.getCursorPosition();
                const line = aceSession.getLine(cursor.row);
                aceSession.insert({ row: cursor.row + 1, column: 0 }, line + "\n");
                updateAriaLiveRegion("Ligne dupliquée.");
            }
        },
        readOnly: false
    });
}
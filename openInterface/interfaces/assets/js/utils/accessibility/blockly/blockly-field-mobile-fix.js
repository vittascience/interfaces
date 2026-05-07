/**
 * Fix: on Chrome ~107+ for Android tablets, the virtual keyboard opening causes
 * the Blockly field editor to immediately close, making text/number fields
 * unusable on touch-only devices (tablets, phones).
 *
 * Root cause: Chrome 107+ reports Android tablets as desktop UA, so Blockly
 * uses showInlineEditor_() instead of showPromptEditor_(). The inline <input>
 * is immediately killed by Blockly's own focus management (markFocused() →
 * setBrowserFocus() → document.activeElement.blur()).
 *
 * Fix: force showPromptEditor_() (blocking window.prompt()) on touch/Android
 * devices, with a delay to let Chrome's synthetic touch events finish first.
 */
export function fixBlocklyFieldMobileClose() {
    if (typeof Blockly === 'undefined' || !Blockly.FieldTextInput) {
        // console.warn('[mobile-fix] SKIP: Blockly or FieldTextInput not found');
        return;
    }

    const pointerCoarse = window.matchMedia('(pointer: coarse)').matches;
    const hasTouch = navigator.maxTouchPoints > 0;
    const isAndroidUA = /Android/i.test(navigator.userAgent);
    // Accept touch-only (pointer:coarse) OR Android with touch support
    // (emulators/tablets may report pointer:fine despite being touch devices)
    const isTouchDevice = hasTouch && (pointerCoarse || isAndroidUA);

    // console.log('[mobile-fix] maxTouchPoints:', navigator.maxTouchPoints,
    //     '| pointer:coarse:', pointerCoarse,
    //     '| isAndroidUA:', isAndroidUA,
    //     '| isTouchDevice:', isTouchDevice);

    if (!isTouchDevice) {
        // console.warn('[mobile-fix] SKIP: not a touch/Android device');
        return;
    }

    // console.log('[mobile-fix] Applying patches...');

    Blockly.FieldTextInput.prototype.showEditor_ = function (_a, b) {
        this.workspace_ = this.sourceBlock_.workspace;
        if (b) {
            this.showInlineEditor_(b);
            return;
        }
        var self = this;
        // Delay lets Chrome's synthetic events (mousedown/click) finish before the blocking prompt opens.
        setTimeout(function () {
            self.showPromptEditor_();
        }, 250);
    };
}

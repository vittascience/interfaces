/**
 * Call the blur method on all the button elements to avoid the tooltip persistence due to focus
 */
function blurButtons() {
    const bodyElt = document.querySelector('body');
    if (bodyElt === null) {
        return setTimeout(blurButtons, 50);
    }
    bodyElt.addEventListener('click', (e) => {
        const closestButton = e.target.closest('button');
        if (closestButton === null) {
            return;
        }
        // Not when the button is activated with the keyboard (Enter / Space: a click without mouse, detail 0): the
        // focus went back to the top of the page and the user had to find the button again with Tab
        if (e.detail === 0) {
            return;
        }
        closestButton.blur();
    });
}


blurButtons();
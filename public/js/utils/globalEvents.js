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
        closestButton.blur();
    });
}


blurButtons();
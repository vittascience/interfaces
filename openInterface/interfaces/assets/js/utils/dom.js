function enableButton(btn, title = false) {
    btn.removeAttribute("disabled");
    btn.style.cursor = "pointer";
    if (title != false) {
        btn.setAttribute('title', "")
    }
}

function disableButton(btn, title = false) {
    btn.setAttribute("disabled", "disabled");
    btn.style.cursor = "not-allowed";
    if (title != false) {
        btn.setAttribute('title', title)
    }
}
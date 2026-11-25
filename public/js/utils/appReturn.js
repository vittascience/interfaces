// Opened from the mobile app (?appReturn=<app origin>/index.html): floating "back to the app" button,
// kept on every page of the tab through sessionStorage. Everything leading to the rest of the website
// (navbar, footer, logout, login panels close button) is hidden, the app has its own. Only the app's own local origin is accepted,
// so the parameter can't be used as an open redirect.
(function () {
    let appReturn = new URLSearchParams(location.search).get('appReturn');
    try {
        if (appReturn) sessionStorage.setItem('vitta-app-return', appReturn);
        else appReturn = sessionStorage.getItem('vitta-app-return');
    } catch (e) { /* storage blocked: rely on the URL only */ }
    if (!appReturn) return;
    let url;
    try { url = new URL(appReturn); } catch (e) { return; }
    if (url.hostname !== 'localhost' || !['https:', 'http:', 'capacitor:'].includes(url.protocol)) return;

    // Also used by the sign-up form (login.js) to go back to the app once the account is created
    window.vittaAppReturnUrl = url.href;

    const style = document.createElement('style');
    style.textContent = '#main-navbar, #navbar-padding, #vitta-footer, .shop-footer, .close-login-classroom,'
        + ' [onclick^="goToDisconnect"] { display: none !important; }';
    document.head.append(style);

    function addButton() {
        if (document.getElementById('vitta-app-return')) return;
        const label = document.documentElement.lang.startsWith('fr') ? "Retour à l'application" : 'Back to the app';
        const button = document.createElement('a');
        button.id = 'vitta-app-return';
        button.href = url.href;
        button.className = 'btn btn-primary shadow';
        button.style.cssText = 'position:fixed;left:16px;bottom:16px;z-index:2000;';
        button.setAttribute('aria-label', label);
        button.innerHTML = '<i class="fas fa-arrow-left me-2" aria-hidden="true"></i>';
        button.append(label);
        document.body.append(button);
    }
    if (document.body) addButton();
    else document.addEventListener('DOMContentLoaded', addButton);
})();

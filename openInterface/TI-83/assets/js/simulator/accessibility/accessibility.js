document.addEventListener('DOMContentLoaded', () => {
    const tiScreen = document.getElementById('ti_screen');
    if (!tiScreen) {
        console.warn('Element #ti_screen not found');
        return;
    }

    tiScreen.setAttribute('tabindex', '0');
    tiScreen.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !PythonREPL.focusState) {
            if (typeof PythonREPL?.init === 'function') {
                PythonREPL.init();
            }
            e.preventDefault();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!PythonREPL.focusState) return;

        const isExitShortcut = e.key === 'Escape' || (e.ctrlKey && e.key.toLowerCase() === 'q');
        if (isExitShortcut) {
            PythonREPL.clearFocus();
        }
    });
});

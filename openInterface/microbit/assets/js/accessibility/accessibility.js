document.addEventListener("simulator-open", (e) => {
    setTimeout(() => {
        const simulatorFirstElement = document.querySelector('#simulator-board-toggler');
        simulatorFirstElement.focus();
    },500)
});
export function initializeResponsive() {
    const aceContent = document.querySelector(".ace_content");
    const searchBox = document.querySelector(".ace_search");

    if (!aceContent || !searchBox) return;

    const resizeObserver = new ResizeObserver(() => {
        const width = aceContent.offsetWidth;
        searchBox.classList.remove("left-5", "left-75", "left-150", "left-250", "left-auto");

        if (width < 480) {
            searchBox.classList.add("left-5");
        } else if (width < 560) {
            searchBox.classList.add("left-75");
        } else if (width < 660) {
            searchBox.classList.add("left-150");
        } else if (width < 770) {
            searchBox.classList.add("left-250");
        } else {
            searchBox.classList.add("left-auto");
        }
    });

    resizeObserver.observe(aceContent);
}
import { updateAriaLiveRegion } from "../../utils/live-region.js";

/**
 * Sets up an input listener on the search field to announce results 100ms after a change.
 * @param {HTMLElement} searchBox - The Ace Editor search box element.
 */
export function setupInputFieldListener(searchBox) {
    const searchField = searchBox.querySelector(".ace_search_field");
    const searchCounter = searchBox.querySelector(".ace_search_counter");

    if (!searchField || !searchCounter) {
        console.warn("Search field or counter not found.");
        return;
    }

    //console.log("Setting up listener on search field...");
    searchField.addEventListener("input", () => {
        setTimeout(() => {
            const counterText = searchCounter.textContent.trim();
            const searchTerm = searchField.value.trim();

            if (!counterText) return;

            const match = counterText.match(/^(\d+) of (\d+)$/);
            if (match) {
                const total = parseInt(match[2], 10);

                if (total === 0) {
                    updateAriaLiveRegion(`Aucun résultat trouvé pour : ${searchTerm}`);
                } else {
                    updateAriaLiveRegion(`${total} résultat${total > 1 ? "s" : ""} pour : ${searchTerm}`);
                }
            }
        }, 100);
    });
}
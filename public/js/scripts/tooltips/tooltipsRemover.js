const deletionObserver = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		mutation.removedNodes.forEach(function(removed_node) {
			browseRemovedNodes(removed_node);
		});
	});
});

/**
 * Runs the deletionObserver. If the body isn't already loaded, calls itself recursively after a timeout
 * @returns {boolean} false if the body isn't already loaded
 */
function runDeletionObserver() {
    if (!document.querySelector("body")) {
        setTimeout(runDeletionObserver, 200);
        return false;
    }
    deletionObserver.observe(document.querySelector("body"), { subtree: true, childList: true });
}

/**
 * Checks if the provided element and all its children has a displayed tooltip to remove
 * @param {DOM Element} removed_node - The DOM Element to browse
 */
function browseRemovedNodes(removed_node) {
    if (removed_node.getAttribute && (removed_node.getAttribute('data-toggle') == 'tooltip' || removed_node.getAttribute('data-bs-toggle') == 'tooltip')) {
        const toolTipId = removed_node.getAttribute('aria-describedby');
        document.getElementById(toolTipId) !== null ? document.getElementById(toolTipId).remove() : false;
    }
    if (removed_node.childNodes) {
        for (let child of removed_node.childNodes) {
            browseRemovedNodes(child);
        }
    }
}

runDeletionObserver();
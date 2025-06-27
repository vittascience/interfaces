function injectSVGFocusStyles(svgDoc) {
    if (!svgDoc) return;

    // style already injected
    if (svgDoc.querySelector("#focus-style"))
        return;

    const vittaBlue = getComputedStyle(document.documentElement)
        .getPropertyValue('--vitta-blue')
        .trim();

    const style = document.createElement("style");
    style.id = "focus-style";

    style.textContent = `
      [tabindex]:focus,
      rect:focus,
      circle:focus,
      ellipse:focus,
      path:focus,
      polygon:focus,
      line:focus,
      g:focus {
        outline: none;
        stroke: ${vittaBlue} !important;
        stroke-width: 5px !important;
        stroke-linecap: round;
        stroke-linejoin: round;
        filter: drop-shadow(0 0 5px ${vittaBlue}80);
        transition: stroke 0.2s, filter 0.2s;
      }
    `;

    const target = svgDoc.head || svgDoc.documentElement;
    if (target)
        target.appendChild(style);

    /*console.log("[SVG Style Injected]:");
    console.log(style.textContent);*/
}

export function observeAndInjectSVGFocusStyles() {
    const alreadyInjected = new WeakSet();

    const tryInject = (objectEl) => {
        if (alreadyInjected.has(objectEl)) return;

        const injectWhenReady = () => {
            const svgDoc = objectEl.contentDocument;
            if (!svgDoc) return;
            injectSVGFocusStyles(svgDoc);
            alreadyInjected.add(objectEl);
        };

        if (objectEl.contentDocument?.readyState === "complete") {
            injectWhenReady();
        } else {
            objectEl.addEventListener("load", injectWhenReady, { once: true });
        }
    };

    // Initial scan
    document.querySelectorAll("object[type='image/svg+xml']").forEach(tryInject);

    // Watch for future <object> insertions
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.tagName === "OBJECT" && node.type === "image/svg+xml") {
                    tryInject(node);
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

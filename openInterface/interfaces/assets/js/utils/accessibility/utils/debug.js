export function handleSetupAccessibilityDebug() {
    initCleanLog();
}

const ringExcludedSelectors = ['.ace_text-input'];

function initCleanLog() {
    document.addEventListener('focusin', (e) => {
        const el = e.target;
        currentFocusedEl = el;

        // console.log('[Accessibility Debug] Focused element:', el);
        el.style.outline = 'none';
        el.style.boxShadow = 'none';

        if (isExcludedElement(el)) {
            ring.style.display = 'none';
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            return;
        }

        updateFocusRing(true);
        ring.style.display = 'block';

        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(trackChanges);
        }
    });

    document.addEventListener('focusout', () => {
        currentFocusedEl = null;
        ring.style.display = 'none';
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    });

    window.addEventListener('scroll', updateFocusRing, true);
    window.addEventListener('resize', updateFocusRing);

    const ring = document.createElement('div');
    ring.id = 'focus-ring';
    document.body.appendChild(ring);

    Object.assign(ring.style, {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '999999',
        display: 'none',
        boxShadow: '0 0 10px 2px var(--vitta-blue)',
        transition: 'top 0.1s, left 0.1s, width 0.1s, height 0.1s',
    });

    let currentFocusedEl = null;
    let lastRect = {};
    let animationFrameId = null;

    function getRectProps(el) {
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);
        
        let visibleRect = {
            top: rect.top,
            left: rect.left,
            bottom: rect.bottom,
            right: rect.right
        };

        // Clipping
        let parent = el.parentElement;
        while (parent && parent !== document.body && parent !== document.documentElement) {
            const parentRect = parent.getBoundingClientRect();
            const parentStyle = window.getComputedStyle(parent);
            
            var overflow = ['hidden', 'auto', 'scroll'];
            if (overflow.includes(parentStyle.overflow) ||
                overflow.includes(parentStyle.overflowX) ||
                overflow.includes(parentStyle.overflowY)) {
                
                visibleRect.top = Math.max(visibleRect.top, parentRect.top);
                visibleRect.left = Math.max(visibleRect.left, parentRect.left);
                visibleRect.bottom = Math.min(visibleRect.bottom, parentRect.bottom);
                visibleRect.right = Math.min(visibleRect.right, parentRect.right);
            }
            
            parent = parent.parentElement;
        }

        visibleRect.top = Math.max(visibleRect.top, 0);
        visibleRect.left = Math.max(visibleRect.left, 0);
        visibleRect.bottom = Math.min(visibleRect.bottom, window.innerHeight);
        visibleRect.right = Math.min(visibleRect.right, window.innerWidth);

        const width = Math.max(0, visibleRect.right - visibleRect.left);
        const height = Math.max(0, visibleRect.bottom - visibleRect.top);

        return {
            top: visibleRect.top,
            left: visibleRect.left,
            width: width,
            height: height,
            borderTopLeftRadius: computed.borderTopLeftRadius,
            borderTopRightRadius: computed.borderTopRightRadius,
            borderBottomRightRadius: computed.borderBottomRightRadius,
            borderBottomLeftRadius: computed.borderBottomLeftRadius,
        };
    }

    function hasRectChanged(newRect, oldRect) {
        return Object.keys(newRect).some((key) => newRect[key] !== oldRect[key]);
    }

    function isExcludedElement(el) {
        return ringExcludedSelectors.some((selector) => el.matches(selector));
    }

    function updateFocusRing(force = false) {
        if (!currentFocusedEl) return;

        const newRect = getRectProps(currentFocusedEl);

        if (force || hasRectChanged(newRect, lastRect)) {
            ring.style.top = newRect.top + 'px';
            ring.style.left = newRect.left + 'px';
            ring.style.width = newRect.width + 'px';
            ring.style.height = newRect.height + 'px';

            ring.style.borderTopLeftRadius = newRect.borderTopLeftRadius;
            ring.style.borderTopRightRadius = newRect.borderTopRightRadius;
            ring.style.borderBottomRightRadius = newRect.borderBottomRightRadius;
            ring.style.borderBottomLeftRadius = newRect.borderBottomLeftRadius;

            lastRect = newRect;
        }
    }

    function trackChanges() {
        updateFocusRing();
        animationFrameId = requestAnimationFrame(trackChanges);
    }
}

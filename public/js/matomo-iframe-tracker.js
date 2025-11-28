/**
 * Script de tracking Matomo pour les iframes
 * Ce script peut être inclus directement dans les pages qui sont chargées dans des iframes
 * pour transmettre les événements utilisateur (clics, mouvements, scroll) à la page parent
 * qui ensuite les transmet à Matomo pour les heatmaps et l'analyse de comportement.
 * 
 * @author Vittascience
 * @version 1.0
 */

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        // Domaines autorisés pour recevoir les messages
        allowedOrigins: ['vittascience.com'],
        // Throttle pour les événements fréquents (en ms)
        mouseMoveThrottle: 100,
        scrollThrottle: 200,
        // Types d'événements à tracker
        trackClicks: true,
        trackMouseMove: true,
        trackScroll: true,
        // Debug mode
        debug: false
    };

    let isTrackingEnabled = true;
    let throttleTimeout = null;

    // Vérifier si on est dans une iframe
    if (window.parent === window) {
        if (CONFIG.debug) console.log('Matomo iframe tracker: pas dans une iframe, arrêt du script');
        return;
    }

    /**
     * Envoie un événement à la page parent
     * @param {string} action - Type d'action (click, mousemove, scroll)
     * @param {object} data - Données associées à l'événement
     */
    function sendToParent(action, data) {
        if (!isTrackingEnabled) return;

        try {
            const message = {
                type: 'matomo-iframe-event',
                data: {
                    action: action,
                    timestamp: Date.now(),
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    screenWidth: screen.width,
                    screenHeight: screen.height,
                    viewportWidth: window.innerWidth,
                    viewportHeight: window.innerHeight,
                    ...data
                }
            };

            // Envoyer le message au parent
            window.parent.postMessage(message, '*');

            if (CONFIG.debug) {
                console.log('Matomo iframe tracker - Événement envoyé:', message);
            }

        } catch (error) {
            console.error('Matomo iframe tracker - Erreur lors de l\'envoi:', error);
        }
    }

    /**
     * Obtient des informations sur l'élément cliqué
     * @param {Element} element - L'élément DOM
     * @returns {object} - Informations sur l'élément
     */
    function getElementInfo(element) {
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);

        return {
            tagName: element.tagName.toLowerCase(),
            id: element.id || '',
            className: element.className || '',
            textContent: element.textContent ? element.textContent.substring(0, 100) : '',
            selector: getElementSelector(element),
            position: {
                left: Math.round(rect.left),
                top: Math.round(rect.top),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            },
            styles: {
                backgroundColor: computedStyle.backgroundColor,
                color: computedStyle.color,
                fontSize: computedStyle.fontSize
            }
        };
    }

    /**
     * Génère un sélecteur CSS unique pour un élément
     * @param {Element} element - L'élément DOM
     * @returns {string} - Sélecteur CSS
     */
    function getElementSelector(element) {
        if (element.id) {
            return `#${element.id}`;
        }

        let selector = element.tagName.toLowerCase();

        if (element.className) {
            const classes = element.className.split(' ').filter(cls => cls.trim());
            if (classes.length > 0) {
                selector += '.' + classes.join('.');
            }
        }

        // Ajouter la position si nécessaire pour être plus spécifique
        const parent = element.parentElement;
        if (parent) {
            const siblings = Array.from(parent.children).filter(child =>
                child.tagName === element.tagName
            );
            if (siblings.length > 1) {
                const index = siblings.indexOf(element) + 1;
                selector += `:nth-of-type(${index})`;
            }
        }

        return selector;
    }

    // =================== EVENT LISTENERS ===================

    if (CONFIG.trackClicks) {
        // Tracker les clics
        document.addEventListener('click', function (e) {
            try {
                const elementInfo = getElementInfo(e.target);
                const data = {
                    target: elementInfo.selector,
                    targetInfo: elementInfo,
                    clickX: Math.round(e.clientX),
                    clickY: Math.round(e.clientY),
                    pageX: Math.round(e.pageX),
                    pageY: Math.round(e.pageY),
                    button: e.button, // 0: gauche, 1: milieu, 2: droite
                    altKey: e.altKey,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    metaKey: e.metaKey,
                    value: 1
                };

                sendToParent('click', data);

            } catch (error) {
                console.error('Matomo iframe tracker - Erreur lors du tracking du clic:', error);
            }
        }, true);
    }

    if (CONFIG.trackMouseMove) {
        // Tracker les mouvements de souris (avec throttling)
        document.addEventListener('mousemove', function (e) {
            if (throttleTimeout) return;

            throttleTimeout = setTimeout(() => {
                try {
                    const data = {
                        x: Math.round(e.clientX),
                        y: Math.round(e.clientY),
                        pageX: Math.round(e.pageX),
                        pageY: Math.round(e.pageY),
                        target: e.target ? getElementSelector(e.target) : '',
                        value: 1
                    };

                    sendToParent('mousemove', data);

                } catch (error) {
                    console.error('Matomo iframe tracker - Erreur lors du tracking du mouvement:', error);
                }

                throttleTimeout = null;
            }, CONFIG.mouseMoveThrottle);
        });
    }

    if (CONFIG.trackScroll) {
        // Tracker le scroll (avec throttling)
        window.addEventListener('scroll', function () {
            if (throttleTimeout) return;

            throttleTimeout = setTimeout(() => {
                try {
                    const data = {
                        scrollY: Math.round(window.pageYOffset || document.documentElement.scrollTop),
                        scrollX: Math.round(window.pageXOffset || document.documentElement.scrollLeft),
                        documentHeight: Math.round(document.documentElement.scrollHeight),
                        documentWidth: Math.round(document.documentElement.scrollWidth),
                        viewportHeight: Math.round(window.innerHeight),
                        viewportWidth: Math.round(window.innerWidth),
                        scrollPercentageY: Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100),
                        value: window.pageYOffset
                    };

                    sendToParent('scroll', data);

                } catch (error) {
                    console.error('Matomo iframe tracker - Erreur lors du tracking du scroll:', error);
                }

                throttleTimeout = null;
            }, CONFIG.scrollThrottle);
        });
    }

    // =================== CONTRÔLES ===================

    /**
     * Active/désactive le tracking
     * @param {boolean} enabled - true pour activer, false pour désactiver
     */
    window.matomoIframeTracker = {
        setEnabled: function (enabled) {
            isTrackingEnabled = !!enabled;
            if (CONFIG.debug) {
                console.log('Matomo iframe tracker - Tracking', isTrackingEnabled ? 'activé' : 'désactivé');
            }
        },

        isEnabled: function () {
            return isTrackingEnabled;
        },

        sendCustomEvent: function (action, data) {
            sendToParent(action, data);
        }
    };

    // Envoyer un événement d'initialisation
    sendToParent('init', {
        message: 'Matomo iframe tracker initialisé',
        config: CONFIG
    });

    if (CONFIG.debug) {
        console.log('Matomo iframe tracker initialisé avec succès');
    }

})();

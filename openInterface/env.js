// window.__vittaInterfaceSlug is set only by the Vittascience mobile app when
// running an interface downloaded on demand into a local cache instead of
// served from the real site root (see vitta-mobile/src/bridge/interface-downloader.ts) —
// unset everywhere else (the real site, and the mobile app's own bundled
// pages), where _PATH must stay absolute.
// On the site, _PATH includes the CDN (CDN_PATH, defined by public/header.php; empty in local/dev) so the assets
// loaded by JavaScript are served by the CDN like the ones of the html pages.
// Only for an interface's own assets (`${_PATH}/${INTERFACE_NAME}/...`): the shared ones must use
// `${CDN_PATH}/openInterface/interfaces/...`, a downloaded interface's cache doesn't contain them.
const _PATH = (typeof window !== 'undefined' && window.__vittaInterfaceSlug)
    ? './openInterface'
    : `${typeof CDN_PATH !== 'undefined' ? CDN_PATH : ''}/openInterface`;

// Same-origin _PATH (without the CDN): for the SVGs loaded in an <object> and read through contentDocument
// (the board of the simulator), which is null for a cross-origin document, even with CORS.
const _SAME_ORIGIN_PATH = (typeof window !== 'undefined' && window.__vittaInterfaceSlug) ? './openInterface' : '/openInterface';

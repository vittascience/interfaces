// window.__vittaInterfaceSlug is set only by the Vittascience mobile app when
// running an interface downloaded on demand into a local cache instead of
// served from the real site root (see vitta-mobile/src/bridge/interface-downloader.ts) —
// unset everywhere else (the real site, and the mobile app's own bundled
// pages), where _PATH must stay absolute.
const _PATH = (typeof window !== 'undefined' && window.__vittaInterfaceSlug) ? './openInterface' : '/openInterface';
/**
 * This file is responsible of updating localStorage by handling messages posted through iframes. The purpose is to synchronize the localStorage of all the vittascience subDomains by opening the /public/syncStorage/syncStorage.html file on all the subdomains (except the one that the user is currently on) in hidden iframes to communicate with the current file.
 * Only the messages coming from a subdomain of the same environment (production or preprod) are handled.
 */

// Group 1: "vittascience.com" on production, "preprod.vittascience.com" on preprod
const hostMatch = location.hostname.match(/^[a-z]+\.((?:preprod\.)?vittascience\.com)$/);
const allowedOriginRegex = hostMatch
	? new RegExp(`^https://[a-z]+\\.${hostMatch[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`)
	: null;

window.onmessage = (e) => {
	// We ignore the messages that don't come from the parent window or from an allowed origin
	if (!allowedOriginRegex || e.source !== window.parent || !allowedOriginRegex.test(e.origin)) {
		return;
	}
	let payload;
	try {
		payload = JSON.parse(e.data);
	} catch (error) {
		return;
	}
	switch(payload.method) {
		case 'set':
			localStorage.setItem(payload.key, payload.data);
			break;
		case 'remove':
			localStorage.removeItem(payload.key);
			break;
	}
};
/**
 * This file is responsible of updating localStorage by handling messages posted through iframes. The purpose is to synchronize the localStorage of all the vittascience subDomains by opening the /public/syncStorage/syncStorage.html file on all the subdomains (except the one that the user is currently on) in hidden iframes to communicate with the current file.
 */
window.onmessage = (e) => {
	const payload = JSON.parse(e.data);
	switch(payload.method) {
		case 'set':
			localStorage.setItem(payload.key, payload.data);
			break;
		case 'remove':
			localStorage.removeItem(payload.key);
			break;
	}
};
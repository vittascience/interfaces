const modalContent = {
	fr: {
		title: 'Incompatibilité de Navigateur',
		minimalVersion: "Version minimale requise",
		content: 'Certaines fonctionalités ne sont pas supportés par la version de votre navigateur. Veuillez mettre à jour votre navigateur pour profiter pleinement des fonctionnalités de ce site.',
		close: 'Fermer',
	},
	en: {
		title: 'Browser Incompatibility',
		minimalVersion: "Minimal required version",
		content: 'Some features are not supported by your browser version. Please update your browser to fully enjoy the features of this site.',
		close: 'Close',
	},
};

/**
 * Build a modal to inform the user that his browser is not compatible with the website
 * @param {Array} version - [browser, version]
 **/
const buildModalBrowser = (version, minimaleVersion) => {
	let lng = '';
	if (getCookie('lng').length > 0) {
		lng = getCookie('lng');
	}
	const content = modalContent[lng] ? modalContent[lng] : modalContent['en'];
	const versionSpan = `<span style="color:red; font-style:bold">(${version[0]} version ${version[1]})</span>`;
	return `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:10000;display:flex;justify-content:center;align-items:center;">
    <div style="width:80%; background-color:white;padding:20px;border-radius:20px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="margin-top:0;color:#333;">${content.title} ${versionSpan}</h2>
		<h3 style="color:#333; font-size:16px"><span style="color:green">${content.minimalVersion} (${version[0]}: ${minimaleVersion})</span></h3>
        <p>Certaines fonctionnalités ne sont pas supportées par la version de votre navigateur. Veuillez mettre à jour votre navigateur pour profiter pleinement des fonctionnalités de cette page.</p>
                <button onclick="this.parentElement.parentElement.style.display='none';" class="btn btn-green">Fermer</button>
            </div>
        </div>
    `;
};

/**
 * Check the navigator version for a specific purpose
 * @param {string} type - the type of the purpose (e.g. "interfaces", "classroom", "ressources")
 * @returns {object} - {compatibility: boolean, browser: string, version: number}
 **/

const checkNavigatorVersionForPurpose = (type) => {
	// object that defines the minimum version of each browser that supports the reason for the check
	const incompatibleBrowser = {
		interfaces: {
			//"IE": 11, // even the latest version of IE doesn't support interface loading 😅
			Edge: 80, // first version of edge that we can consider
			Chrome: 80,
			Firefox: 72,
			Safari: 14, // => safari 13 (catalina) doesn't support interface loading
			Opera: 67,
		},
	};
	var ua = navigator.userAgent;
	var tem;
	var M = ua.match(/(opera|CriOS|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

	let nav = [];

	if (M[1] === 'Chrome') {
		tem = ua.match(/\b(OPR|Edg)\/(\d+)/);
		if (tem != null && tem[1] == 'Edg') {
			nav = ['Edge', tem[2]];
		} else if (tem != null && tem[1] == 'OPR') {
			nav = ['Opera', tem[2]];
		} else {
			nav = [M[1], M[2]];
		}
	} else if (M[1] === 'Safari') {
		tem = ua.match(/\bVersion\/(\d+)/);
		nav = [M[1], tem[1]];
	} else {
		nav = [M[1], M[2]];
	}

	if (typeof incompatibleBrowser[type][nav[0]] === 'undefined') return; // avoid checking for compatibility if the browser is not in the list

	if (incompatibleBrowser[type][nav[0]] <= Number(nav[1])) {
		return { compatibility: true, browser: nav[0], version: Number(M[1]) };
	} else {
		console.log('incompatible Navigator');
		document.body.innerHTML += buildModalBrowser(nav, incompatibleBrowser[type][nav[0]]);
		navigator.navigatorIncompatible = true; // to avoid the failedToLoad() function to be called (footer.js)
		return { compatibility: false, browser: nav[0], version: Number(M[1]) };
	}
};

window.checkNavigatorVersionForPurpose = checkNavigatorVersionForPurpose;

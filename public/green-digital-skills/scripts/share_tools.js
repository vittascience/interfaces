	/**
	 * Downloads a file with the given filename and content
	 * @param {string} filenameWithExtension - The name of the file including extension
	 * @param {Blob|MediaSource} content - The content to download
	 */
	export function _download(filenameWithExtension, content) {
		if (!filenameWithExtension || !content) {
			console.error('Invalid download parameters');
			return;
		}

		const link = document.createElement('a');
		link.href = URL.createObjectURL(content);
		link.download = filenameWithExtension;
		link.style.display = 'none';
		document.body.appendChild(link);

		try {
			link.click();
		} catch (error) {
			console.error('Download failed:', error);
		} finally {
			setTimeout(() => {
				URL.revokeObjectURL(link.href);
				link.remove();
			}, 100);
		}
	}

	/**
	 * Captures an HTML element as an image using html2canvas
	 * @param {HTMLElement} target - The DOM element to capture
	 * @param {object} [options] - Optional html2canvas configuration
	 * @returns {Promise<HTMLImageElement>} A promise that resolves with the captured image
	 * @throws {Error} If capture or blob creation fails
	 */
	export async function captureImage(target, options = {}) {
		if (!target || !(target instanceof HTMLElement)) {
			throw new Error('Invalid target element');
		}

		try {
			// Capture the element with html2canvas
			const canvas = await html2canvas(target, {
				logging: false,
				useCORS: true,
				scale: window.devicePixelRatio || 1,
				...options
			});

			// Convert to blob with error handling
			const blob = await new Promise((resolve, reject) => {
				canvas.toBlob(blob => {
					blob ? resolve(blob) : reject(new Error('Blob creation failed'));
				}, 'image/jpeg', 0.92); // 0.92 = quality (92%)
			});

			// Create and return the image
			const image = new Image();
			image.src = URL.createObjectURL(blob);
			image.alt = 'Digital impact visualization';

			// Clean up object URL when image loads
			image.onload = () => URL.revokeObjectURL(image.src);

			return image;
		} catch (error) {
			console.error('Image capture failed:', error);
			throw error; // Re-throw for caller to handle
		}
	}

	/**
	 * Opens a print-friendly window with the target element's content
	 * @param {HTMLElement} target - The DOM element to print
	 * @param {string} [title='Print'] - Title for the print document
	 * @param {object} [styles={}] - Additional CSS styles to include
	 */
	export async function printTarget(target, title = 'Print', styles = {}) {
		if (!target || !(target instanceof HTMLElement)) {
			throw new Error('Invalid target element');
		}

		// Default styles with optional overrides
		const defaultStyles = {
			body: `
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        `,
			container: `
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            page-break-inside: avoid;
        `,
			img: `
            max-width: 100%;
            height: auto;
        `,
			...styles
		};

		const htmlToPrint = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${escapeHtml(title)}</title>
            <meta charset="UTF-8">
            <style>
                body { ${defaultStyles.body} }
                #print-container { ${defaultStyles.container} }
                img { ${defaultStyles.img} }
                @media print {
                    body { margin: 0; padding: 0; }
                    #print-container { border-radius: 0; }
                }
            </style>
        </head>
        <body>
            <div id="print-container">
                ${target.outerHTML}
            </div>
            <script>
                // Trigger print after content loads
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        window.print();
                        window.close();
                    }, 200);
                });
            </script>
        </body>
        </html>
    `;

		const printWindow = window.open('', '_blank', 'width=800,height=600');
		if (!printWindow) {
			throw new Error('Popup window was blocked. Please allow popups to print.');
		}

		printWindow.document.open();
		printWindow.document.write(htmlToPrint);
		printWindow.document.close();

		// Fallback in case load event doesn't fire
		printWindow.addEventListener('load', () => {
			setTimeout(() => {
				printWindow.print();
				// Don't close immediately to allow print dialog interaction
			}, 500);
		}, { once: true });
	}


	// Helper to prevent XSS
	function escapeHtml(unsafe) {
		return unsafe?.toString()
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;") || '';
	}
	

import * as unzipit from '/public/js/lib/unzipit/unzipit.module.js';


/**
 * This class is responsible of the import for web project from local file(s)
 */
class WebImportFileManager {
    constructor() {
        if (typeof WebImportFileManager._instance !== 'undefined') {
            WebImportFileManager._instance = this;
        }
        this.isInitialized = false;
        this._setupInitialEventListeners();
        this._inputId = 'importproject-fileinput';
        this._dragZoneId = 'file-drag-area';
        this._allowedFiles = ['application/x-zip-compressed', 'text/html', 'text/css', 'text/javascript'];
        this._files = [];
        this._projectDataRegex = /<!--([\s\S]*?)-->/;
        this._htmlMetadata = {name: 'Nom du projet: ', description: 'Description: ', code: 'Code: '};
        this._notif = new VittaNotif();
    }

    /**
     * Setup all the initial event listeners
     * @private
     */
    _setupInitialEventListeners() {
        document.addEventListener('change', (event) => {
            if (!event || !event.target) return;
            if (event.target.id !== this._inputId) return;
            event.preventDefault();
            this._manageInputFiles(event);
        });
        document.addEventListener('drop', (event) => {
            if (!event || !event.target) return;
            if (!this._checkDragZone(event)) return;
            event.preventDefault();
            this._manageDroppedFiles(event);
        });
        document.addEventListener('dragenter', (event) => {
            if (!event || !event.target) return;
            if (!this._checkDragZone(event)) return;
            event.preventDefault();
            if (!this._dragZoneElt) this._dragZoneElt = document.querySelector(`#${this._dragZoneId}`);
            this._dragZoneElt.classList.add('dragging');
        });
        document.addEventListener('dragover', (event) => {
            if (!event || !event.target) return;
            if (!this._checkDragZone(event)) return;
            event.preventDefault();
        });
        document.addEventListener('dragleave', (event) => {
            if (!event || !event.target) return;
            if (!this._dragZoneElt) this._dragZoneElt = document.querySelector(`#${this._dragZoneId}`);
            event.preventDefault();
            let rect = this._dragZoneElt.getBoundingClientRect();
            if (event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.top && event.clientY < rect.bottom) return;
            this._dragZoneElt.classList.remove('dragging');
        });
    }

    /**
     * Tell if the target of an event is in the drag zone
     * @private
     * @param {Event} event - The event that triggered the event listener
     * @returns {Boolean} - Whether the current event.target is in the drag zone
     */
    _checkDragZone(event) {
        let isOverDragZone = false,
            currentElt = event.target;
        while (currentElt) {
            if (currentElt.id === this._dragZoneId) {
                isOverDragZone = true;
                break;
            }
            currentElt = currentElt.parentElement;
        }
        return isOverDragZone;
    }

    /**
     * Initialize the main properties of the instance - Here add the future event listeners
     * @public
     */
    init() {
        this._inputElt = document.querySelector(`#${this._inputId}`);
        this._clearImportBtnElt = document.querySelector(`#clear-import-file-input`);
        this.isInitialized = true;
    }

    /**
     * Import the project from file(s)
     * @private
     * @returns {Boolean} Wether the project has been loaded
     */
    async _importWebProjectFromFile() {
        if (!this.isInitialized) {
            this.init();
        }
        if (!this._checkFiles(this._files)) {
            return false;
        }
        if (!(await this._handleZipFile())) {
            return false;
        }
        if (!this._checkFiles(this._processedFiles)) {
            return false;
        }
        if (!this._checkHtmlFile()) {
            return false;
        }
        pseudoModal.openModal('modal-warningimport');
        const acceptImport = await acceptImportProject();
        if (!acceptImport) {
            pseudoModal.closeLatestModal();
            return false;
        }
        await this._loadFilesContent();
        return true;
    }

    /**
     * Manage the dropped file(s) in the drop zone
     * @private
     * @param {Event} event - The drop event
     * @returns {undefined} In early return case(s)
     */
    _manageDroppedFiles(event) {
        const eventItems = event.dataTransfer.items;
        if (!eventItems.length) {
            console.error('No item found!');
            this._notif.displayNotification('#modal-openproject .modal-footer-div', i18next.t('notifications.noFileDropped'), 'bg-danger');
            return;
        }
        const fileItems = [...eventItems].filter((item) => {
            return item.kind === 'file';
        });
        if (!fileItems.length) {
            console.error('No file found!');
            this._notif.displayNotification('#modal-openproject .modal-footer-div', i18next.t('notifications.noFileDropped'), 'bg-danger');
            return;
        }
        this._files = fileItems.map((fileItem) => {
            return fileItem.getAsFile();
        });
        this._importWebProjectFromFile();
    }

    /**
     * Manage the file(s) that have been loaded with the file input
     * @private
     * @param {Event} event - The change event from the file input
     * @returns {undefined} In early return context
     */
    _manageInputFiles(event) {
        const eventFileItems = event.target.files;
        if(!eventFileItems || eventFileItems.length === 0) {
            console.error('No file found!');
            this._notif.displayNotification('#modal-openproject .modal-footer-div', i18next.t('notifications.noFileInInput'), 'bg-danger');
            return;
        }
        this._files = [...eventFileItems];
        this._importWebProjectFromFile();
    }

    /**
     * Check the file availability, types and unicity
     * @private
     * @param {Array} files - An array of Files
     * @returns {Boolean} Whether the check succeeded or not
     */
    _checkFiles(files) {
        if (!files.length) {
            return false;
        }
        let duplicateTypes = false;
        const alreadySeenTypes = [];
        let erroredFiles = files.filter((file) => {
            if (alreadySeenTypes.includes(file.type)) duplicateTypes = true;
            alreadySeenTypes.push(file.type);
            return !this._allowedFiles.includes(file.type);
        });
        if (erroredFiles.length) {
            const stringFiles = erroredFiles.map((file) => {
                return file.name;
            }).join(', ');
            console.error(`Bad format for the following files: [${stringFiles}]`);
            this._notif.displayNotification('#modal-openproject .modal-footer-div', i18next.t('notifications.badFileType', {files: stringFiles}), 'bg-danger');
            return false;
        }
        if (duplicateTypes) {
            console.error('Duplicate files detected!');
            this._notif.displayNotification('#modal-openproject .modal-footer-div', i18next.t('notifications.duplicateFileType'), 'bg-danger');
            return false;
        }
        return true;
    }

    /**
     * Check if a zip file has been provided and unzip it if
     * @private
     * @returns {Boolean} Whether a file has been unzipped
     */
    async _handleZipFile() {
        const zipFiles = this._files.filter((file) => {
            return file.type === 'application/x-zip-compressed';
        });
        if (!zipFiles.length) {
            this._processedFiles = this._files;
            return true;
        }
        if (this._files.length !== 1) {
            console.error('Cannot process multiple files at the same time as zip files');
            this._notif.displayNotification('#modal-openproject .modal-footer-div', i18next.t('notifications.multipleZipFiles'), 'bg-danger');
            return false;
        }
        if (!(await this._unzipFile(zipFiles[0]))) {
            console.error('An error has occured during file unzipping!');
            this._notif.displayNotification('#modal-openproject .modal-footer-div', i18next.t('notifications.unzippingError'), 'bg-danger');
            return false;
        }
        return true;
    }

    /**
     * Unzip the provided zip file
     * @private
     * @param {File} file - A zip file
     * @returns {Boolean} Whether the file has been successfully unzipped
     */
    async _unzipFile(file) {
        try {
            const { entries } = await unzipit.unzip(file);
            const unzipedFiles = [];
            for (const [name, entry] of Object.entries(entries)) {
                const fileExtension = name.split('.').pop();
                let fileType;
                switch (fileExtension) {
                    case 'html':
                        fileType = 'text/html';
                        break;
                    case 'css':
                        fileType = 'text/css';
                        break;
                    case 'js':
                        fileType = 'text/javascript';
                        break;
                }
                unzipedFiles.push(new File([await entry.blob()], name, {type: fileType}));
            }
            this._processedFiles = unzipedFiles;
            return true;
        } catch(error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Check if a html file has been provided
     * @private
     * @returns {Boolean} Whether a html file has been provided or not
     */
    _checkHtmlFile() {
        const htmlFiles = this._processedFiles.filter((file) => {
            return file.type === 'text/html';
        });
        if (htmlFiles.length){
            return true;
        }
        console.error('You need at least an html file!');
        this._notif.displayNotification('#modal-openproject .modal-footer-div', i18next.t('notifications.noHtmlFile'), 'bg-danger');
        return false;
    }


    /**
     * Load the file(s) content into the interface
     * @private
     * @returns {Boolean} Whether the files has been loaded
     */
    async _loadFilesContent() {
        if(await this._loadFromProjectData()) {
            pseudoModal.closeLatestModal();
            return true;
        }
        const htmlFileContent = await this._getProcessedFileContent('text/html');
        if (!htmlFileContent) {
            this._notif.displayNotification('#modal-openproject .modal-footer-div', i18next.t('notifications.noHtmlFile'), 'bg-danger');
            return false;
        }
        const cssFileContent = await this._getProcessedFileContent('text/css');
        const jsFileContent = await this._getProcessedFileContent('text/javascript');

        if ((cssFileContent || jsFileContent) && !this._checkHtmlHead(htmlFileContent)) {
            console.error('Missing head tags in html code!');
            this._notif.displayNotification('#modal-openproject .modal-footer-div', i18next.t('notifications.noHeadInHtml'), 'bg-danger');
            return false;
        }
        const cssString = cssFileContent ? `\n\t<style>\n${cssFileContent.replace(/^/gm, "\t\t")}\n\t</style>` : '';
        const jsString = jsFileContent ? `\n\t<script>${jsFileContent}</script>\n` : '';
        const completeHtmlString = this._addStyleJavascriptToHtml(htmlFileContent, cssString, jsString);

        const projectImport = {
            code: completeHtmlString,
            name: 'Projet importé',
            description: 'Projet importé depuis un fichier local'
        }
        projectManager.newProject(projectImport);

        pseudoModal.closeLatestModal();
        return true;
    }
    
    /**
     * Load the project from the project data if it's included in the header of the html file
     * @private
     * @returns {Boolean} WHether the project has been loaded from the projectData in the header of the html file
     */
    async _loadFromProjectData() {
        const htmlFileContent = await this._getProcessedFileContent('text/html');
        const projectDataString = htmlFileContent.match(this._projectDataRegex);
        if (!projectDataString) return false;
        const projectData = projectDataString[1].split('\n');
        if (!projectData.length) return false;
        const extractedProjectData = this._extractProjectData(projectData);
        if (!extractedProjectData) return false;
        extractedProjectData.code = extractedProjectData.code.replace(/\\r\\n/g, '\n').slice(1).slice(0, -1);
        projectManager.newProject(extractedProjectData);
        return true;
    }

    /**
     * Extract the name, description and code from the provided metadata
     * @private
     * @param {Array} projectData - Array containing the metadata from the header of the html file
     * @returns {Object} The extracted project data or false if an error occured
     */
    _extractProjectData(projectData) {
        const extractedData = {};
        for (let projectProperty in this._htmlMetadata) {
            const currentValue = projectData.filter((data) => {
                return data.match(this._htmlMetadata[projectProperty]);
            });
            if (!currentValue.length) {
                console.error(`Missing property in file for: ${projectProperty}`);
                return false;
            }
            extractedData[projectProperty] = currentValue[0].replace(this._htmlMetadata[projectProperty], '');
        }
        if (!extractedData.code) {
            console.error('Missing code in projectData from file!');
            return false;
        }
        return extractedData;
    }

    /**
     * Get the content of a file by providing it's type
     * @private
     * @param {String} fileType - The type of the requested file
     * @returns {String} The content of the file or false if an error occured
     */
    async _getProcessedFileContent(fileType) {
        const fileTypeResults = this._processedFiles.filter((file) => {
            return file.type == fileType;
        });
        if (fileTypeResults.length === 0) return false;
        const fileContent = await this._getFileContent(fileTypeResults[0]);
        return fileContent;
    }

    /**
     * Read the content of the provided file
     * @private
     * @param {File} file - The file to be read
     * @returns {String} The content of the file
     */
    _getFileContent(file) {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve(event.target.result);
                };
                reader.readAsText(file);
            } catch(error) {
                console.error(error);
                this._notif.displayNotification('#modal-openproject .modal-footer-div', i18next.t('notifications.readingFileError'), 'bg-danger', {fileName: file.name});
                reject();
            }
        });
    }

    /**
     * Check if the provided code has head tags
     * @private
     * @param {String} html - The html code
     * @returns {Boolean} Whether the html code has head tags
     */
    _checkHtmlHead(html) {
        return html.match(/<head>[\s\S]*?<\/head>/);
    }

    /**
     * Add style and javascript code into html code
     * @private
     * @param {String} html - HTML code
     * @param {String} style - CSS code
     * @param {String} javascript - Javascript code
     * @returns {String} The html code containing the style and script tags
     */
    _addStyleJavascriptToHtml(html, style, javascript) {
        const cleanedHtml = html.replace('<link rel="stylesheet" href="style.css">', '')
            .replace('<script src="script.js"></script>', '');
        const htmlStart = cleanedHtml.match(/([\s\S]*?<\/head>)/)[1].replace('</head>', '');
        const htmlEnd = cleanedHtml.match(/(<\/head>[\s\S]*)/)[1];
        return `${htmlStart}${style}${javascript}${htmlEnd}`;
    }
}

window.webImportFileManager = new WebImportFileManager();
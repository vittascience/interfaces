import Controller from './Controller.js';
import Model from './Model.js';
import Navigation from './Navigation.js';
import Observable from "./Observable.js";
import ProgressBar from './ProgressBar.js';

class View extends Observable {
    constructor() {
        // Singleton pattern check
        if (typeof View._instance !== 'undefined') {
            return View._instance;
        } // Observable Inheritance
        super();
        // Singleton pattern instanciation 
        View._instance = this;
        this._controller = new Controller();
        this._model = new Model();
        this._navigation = new Navigation();
        this._progressBar = new ProgressBar();

    }
    async init() {
        if (!Object.keys(i18next.store.data).length) await this.awaitI18next();

        this._controller.on('startQuestionnaire', 'dispalayFirstQuestion', () => {
            this.showLastImpactFromLocalStorage();
            this.displayFirstQuestion('device')
        })

        this._navigation.on('deviceQuestion', "dispalyDeviceQuertion", (index, currentValues) => {
            this.displayDeviceQuestion(index, currentValues);
        })
        this._navigation.on('serviceQuestion', "dispalyServiceQuertion", (index, currentValues) => {
            this.displayServiceQuestion(index, currentValues);
        })
        this._controller.on('deviceConsumChanged', 'viewUpdate', (newData, id) => {
            this.viewUpdate(newData, id)
        })
        this._controller.on('serviceConsumChanged', 'viewUpdate', (newData, id) => {
            this.viewUpdate(newData, id)
        })

        this._controller.on('arrowClicked', 'viewScrollToBottom', () => {
            this.scrollToBottom();
        })
        this._model.on('simulationEnabled', 'progressBarSimulatonUpdate', (impuctReduction, type) => {
            this._progressBar.updateProgressBarSimulation(impuctReduction, type)
        })
        this._model.on('sumAverageChanged', 'updateProgressBarAverage', () => {
            this._progressBar.updateProgressAverage()
        })


    }
    /**
 * constantes
 */

    getStringElts() {
        const stringEls = {
            co2: `${i18next.t("co2.units.co2")}`,
        }
        return stringEls
    }
    showLastImpactFromLocalStorage() {
        const data = this._model.getImpactFromLocalStorage();
        if (data) {
            this._progressBar.progressBarLastAverage(data.yearImpact.toFixed(1), data.date);
        }
    }

    /**
     * Displays the first question of the questionnaire
     * @param {'device'|'service'} type - The type of question to display
     */
    displayFirstQuestion(type) {
        const elementIds = type === 'device'
            ? this._model.getArrayDeviceIds()
            : this._model.getArrayServiceIds();
        const questionnaireDataMateriel = type === 'device'
            ? this._model.getQuestionnaireDataMaterial()
            : this._model.getQuestionnaireDataUtilization()
        this.clearContainer()
        // Create question title
        const question = questionnaireDataMateriel[0].questions;
        const questionTitle = document.createElement('h4');
        questionTitle.innerText = i18next.t(`co2.${type}.description`);
        questionTitle.setAttribute('id', `question-title-${type}`);
        // questionTitle.setAttribute('role', 'heading');
        // questionTitle.setAttribute('aria-level', '4');

        const container = document.getElementById('questionnaire-container');
        container.setAttribute('aria-labelledby', `question-title-${type}`);
        container.appendChild(questionTitle);
        questionTitle.focus();

        // Annoncer le début de la première question
        const questionText = i18next.t(`co2.${type}.description`);
        const instructionMessage = `${questionText}. Utilisez les cases à cocher pour sélectionner vos appareils.`;
        this.announceToScreenReader(instructionMessage);

        // Create options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        //optionsContainer.setAttribute('role', 'group');


        question.options.forEach(option => {
            const optionElement = this.createOptionElement(option, elementIds, type);
            optionsContainer.appendChild(optionElement);
        });
        if (question.options.length > 6) optionsContainer.classList.add('grid-four-columns')

        // Ajouter la gestion de la navigation au clavier pour le conteneur d'options
        optionsContainer.addEventListener('keydown', (e) => {
            const checkboxes = Array.from(optionsContainer.querySelectorAll('input[type="checkbox"]'));
            const currentIndex = checkboxes.findIndex(cb => cb === document.activeElement);

            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % checkboxes.length;
                    checkboxes[nextIndex].focus();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    const prevIndex = currentIndex === 0 ? checkboxes.length - 1 : currentIndex - 1;
                    checkboxes[prevIndex].focus();
                    break;
                case ' ':
                case 'Enter':
                    if (document.activeElement.type === 'checkbox') {
                        e.preventDefault();
                        document.activeElement.click();
                    }
                    break;
            }
        });

        container.appendChild(optionsContainer);


        // Update navigation buttons
        document.querySelector('.step').innerText = '';
        if (type != 'service') {
            document.querySelector('#prev').classList.add('d-none');
            document.querySelector('#prev').classList.remove('inline-block');
        }
        // this.focusToQuestioner();

    }
    /**
 * Creates an option element for the questionnaire
 * @private
 */
    createOptionElement(option, elementIds, type) {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = option.id;
        checkbox.name = option.id;
        // Supprimer les attributs de tooltip qui créent de la redondance pour les lecteurs d'écran
        // checkbox.setAttribute('data-toggle', 'tooltip');
        // checkbox.setAttribute('data-placement', 'top');
        // checkbox.setAttribute('title', i18next.t(`co2.${type}.${option.id}`));
        // tabindex='0' est par défaut pour les éléments de formulaire
        checkbox.setAttribute('aria-labelledby', `label-${option.id}`);
        // role='checkbox' est implicite pour input[type='checkbox']
        if (elementIds.includes(checkbox.id)) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }

        const label = document.createElement('label');
        label.setAttribute('for', option.id);
        label.id = `label-${option.id}`;
        // Supprimer le title redondant qui pourrait être lu par le lecteur d'écran
        // Le label ne doit pas avoir de role spécifique ni être focalisable
        // Il est automatiquement associé au checkbox via l'attribut 'for'

        // Simplification pour les lecteurs d'écran : seulement le titre visible
        const optionText = i18next.t(`co2.${type}.${option.id}`);

        // Créer un span caché pour les lecteurs d'écran
        const labelText = document.createElement('span');
        labelText.className = 'visually-hidden';
        labelText.textContent = optionText;

        const imageLight = `<div class="image-light"><img src="/public/green-digital-skills/assets/images/${option.image}" alt="" role="presentation"><p aria-hidden="true" data-i18n="co2.${type}.${option.id}">${optionText}</p></div>`
        const imageDark = option.image_darkmode !== undefined ?
            `<div class="image-dark"><img src="/public/green-digital-skills/assets/images/${option.image_darkmode}" alt="" role="presentation"><p aria-hidden="true" data-i18n="co2.${type}.${option.id}">${optionText}</p></div>`
            : `<div class="image-dark"><img src="/public/green-digital-skills/assets/images/${option.image}" alt="" role="presentation"><p aria-hidden="true" data-i18n="co2.${type}.${option.id}">${optionText}</p></div>`;

        // Structure finale : texte caché + images décoratives
        label.innerHTML = labelText.outerHTML + imageLight + imageDark;
        optionElement.appendChild(label);
        optionElement.appendChild(checkbox);

        // Ajouter un événement pour annoncer les changements d'état de manière simple
        checkbox.addEventListener('change', () => {
            const state = checkbox.checked ? 'sélectionné' : 'désélectionné';
            const message = `${optionText} ${state}`;
            this.announceToScreenReader(message);
        });

        this.trigger('firstQuestionDisplayed', checkbox, type);
        return optionElement;
    }
    clearContainer() {
        const container = document.getElementById('questionnaire-container');
        container.innerHTML = ''; // Clear previous content
    }
    displayAllTips() {
        const device = [];
        const service = [];
        const titles = [];
        this.clearContainer()
        const container = document.getElementById('questionnaire-container');
        container.innerHTML += `<div class="masonry-grid"></div>`
        const gridContainer = document.querySelector('.masonry-grid')
        this.initMasonry()
        // const titles = [...this._model.getQuestionnaireDataMaterial().titles, ...this._model.getQuestionnaireDataUtilization().titles]
        this._model.getQuestionnaireDataMaterial()[0].questions.options.forEach(el => {
            device.push({ title: i18next.t(`co2.device.questions.${el.id}.practical_tips`) })
            titles.push({ title: i18next.t(`co2.device.questions.${el.id}.title`) })
        })
        this._model.getQuestionnaireDataUtilization()[0].questions.options.forEach(el => {
            service.push({ title: i18next.t(`co2.service.questions.${el.id}.practical_tips`) })
            titles.push({ title: i18next.t(`co2.service.questions.${el.id}.title`) })
        })

        const allTips = [...device, ...service]
        allTips.forEach((tip, i) => {
            const item = document.createElement('div');
            item.className = 'masonry-item';
            const itemText = document.createElement('div');
            itemText.style.fontWeight = '500';
            itemText.innerHTML = `<em style="font-weight: 600;">${titles[i].title}</em><br/><span>${tip.title}</span>`;
            item.appendChild(itemText);
            gridContainer.appendChild(item);

        })
        document.getElementById('simul-container').classList.add('d-none');
        document.getElementById('next').classList.add('d-none');

    }

    initMasonry() {
        const grid = document.querySelector('.masonry-grid');
        if (!grid) return;

        let columnCount = 3;
        if (window.innerWidth < 1100) columnCount = 2;
        if (window.innerWidth < 700) columnCount = 1;

        grid.style.columnCount = columnCount;
        grid.style.columnGap = '16px';
    }

    displayDeviceQuestion(index, currentValues) {
        this.clearContainer()

        const section = this._model.getQuestionnaireDataMaterial();
        const question = section[index];
        const id = question.visible_if.device_selection
        const container = document.getElementById('questionnaire-container');
        container.innerHTML = this.templateQuestionLabel(question, id, "device")
        const sectionQuestion = container.querySelector('.question')
        question.questions.map(el => {
            if (el.type === 'select') {
                this.createElementInputSelect(sectionQuestion, el, currentValues, "device")
            } else {
                this.createElementInputNumber(el, "device", currentValues);
            }
        })
        // Update navigation buttons
        this._navigation.updateNavButtons();

        setTimeout(() => {
            const questionHeading = document.getElementById(`question-heading-${id}`);
            if (questionHeading) {
                questionHeading.setAttribute('tabindex', '-1');
                questionHeading.focus();
                // Announce the question context to screen readers
                questionHeading.setAttribute('aria-live', 'polite');
                questionHeading.setAttribute('aria-atomic', 'true');

                // Annoncer le changement de question pour les devices
                const deviceName = i18next.t(`co2.device.${id}`);
                const message = `Nouvelle question pour ${deviceName}`;
                //this.announceToScreenReader(message);
            }
        }, 100);

    }

    displayServiceQuestion(index, currentValues) {
        this.clearContainer()
        const section = this._model.getQuestionnaireDataUtilization()
        const question = section[index];
        const container = document.getElementById('questionnaire-container');
        const id = (question.id.includes('_')) ? question.id.split('_')[0] : question.id;
        container.innerHTML = this.templateQuestionLabel(question, id, "service")
        const sectionQuestion = container.querySelector('.question')
        question.questions.map(el => {
            if (el.type === 'select') {
                this.createElementInputSelect(sectionQuestion, el, currentValues, "service")
            } else {
                this.createElementInputNumber(el, "service", currentValues);
            }
        })

        // Update navigation buttons
        this._navigation.updateNavButtons()

        // Focus on the question heading for better screen reader experience
        setTimeout(() => {
            const questionHeading = document.getElementById(`question-heading-${id}`);
            if (questionHeading) {
                questionHeading.setAttribute('tabindex', '-1');
                questionHeading.focus();
                // Announce the question context to screen readers
                questionHeading.setAttribute('aria-live', 'polite');
                questionHeading.setAttribute('aria-atomic', 'true');

                // Annoncer le changement de question pour les services
                const serviceName = i18next.t(`co2.service.${id}`);
                const message = `Nouvelle question pour ${serviceName}`;
                //this.announceToScreenReader(message);
            }
        }, 100);
    }
    sharePrintCaptureGroupButtons() {
        // Ajout d'un label explicite pour chaque bouton et correction ARIA
        const shareElement = this._controller.getBrowserCapabilities().webShare ? `
            <button id="shareMyImpact" class="ide-btn" data-toggle="tooltip" data-placement="top" title="Partager le bilan">
                <i class="fa-solid fa-share" aria-hidden="true"></i>
            </button>
        ` : "";

        const buttonsMarkup = `
            ${shareElement}
            <button id="captureMyImpact" class="ide-btn" data-toggle="tooltip" data-placement="top" title="Capturer l'écran du bilan">
                <i class="fa-solid fa-camera" aria-hidden="true"></i>
            </button>
            <button id="printMyImpact" class="ide-btn" data-toggle="tooltip" data-placement="top" title="Imprimer le bilan">
                <i class="fa fa-print" aria-hidden="true"></i>
            </button>
        `;

        // Convertir le markup en éléments DOM pour ajouter les gestionnaires d'événements
        const container = document.createElement('div');
        container.innerHTML = buttonsMarkup;

        const buttons = container.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('focus', () => {
                button.setAttribute('aria-label', button.getAttribute('title'));
            });
            button.addEventListener('blur', () => {
                button.removeAttribute('aria-label');
            });
        });

        return container.innerHTML;
    }
    displayBalanceSheet() {
        this.clearContainer();
        const shareElement = document.querySelector(`#shareElement`);
        if (!shareElement) return; // Vérifie que l'élément existe avant de continuer

        shareElement.removeEventListener('click', () => {});
        const devicesSelected = this._model.getArrayDeviceIds();
        const servicesSelected = this._model.getArrayServiceIds();
        const impuctTotal = this._model.getSumAverage().toFixed(1);

        document.querySelector('.text-grow-bar').innerText = "";
        const growBar = document.querySelector('.grow-bar');
        growBar.style.width = '0px';

        const label = document.createElement('div');
        label.classList.add('titleWithButtons');

        // Correction Empty heading : ajout d'un titre non vide
        const questionTitle = document.createElement('h4');
        questionTitle.innerText = i18next.t("co2.dynamic.impactDetails");
        questionTitle.setAttribute('id', 'impact-title');
        label.appendChild(questionTitle);

        const buttons = document.createElement('div');
        buttons.setAttribute('class', 'ide-btn-group mt-2');

        // Suppression de l'attribut aria-labelledby pour éviter les annonces redondantes
        buttons.innerHTML = this.sharePrintCaptureGroupButtons();
        label.appendChild(buttons);

        const container = document.getElementById('questionnaire-container');
        container.appendChild(label);
        container.innerHTML += `<br>`;

        // Suppression des attributs title pour éviter les annonces multiples
        const allButtons = container.querySelectorAll('button');
        allButtons.forEach(button => {
            button.removeAttribute('title');
        });

        devicesSelected.forEach(device => {
            const labelDevice = this._model.getQuestionnaireDataMaterial()[0].questions.options.filter(el => el.id === device)[0].id;
            const icon = this._model.getQuestionnaireDataMaterial()[0].questions.options.filter(el => el.id === device)[0].image;
            const impact = Number(this._model.averageImpactByDevice(device)).toFixed(1);
            const tip = i18next.t(`co2.device.questions.${device}.practical_tips`, { returnObjects: true });
            let bg_color = 'green';
            if (impact >= 70) {
                bg_color = 'red';
            }
            if (impact >= 50 && impact < 70) {
                bg_color = 'orange';
            }
            // Correction : ajout d'un label explicite pour le bouton info
            container.innerHTML += `
            <div id="device-info-${device}">
                <div class="impact-container">
                    <div class="text-start">
                        <img src="/public/green-digital-skills/assets/images/${icon}" alt="" aria-hidden="true">
                        <span>${i18next.t(`co2.device.questions.${device}.title`)}</span>
                    </div>
                    <div class="grid-item">
                        <div class="progress-balance-sheet ${bg_color}" style="width: ${impact / 4}em;"></div>
                    </div>
                    <span>${impact} ${this.getStringElts().co2}</span>
                    <span  class="mx-2 clickable">
                        <button type="button" aria-label="Afficher les informations détaillées sur ${labelDevice}" aria-expanded="false" aria-controls="co2-tooltip-${device}" class="info-btn">
                            <i class="fa-regular fa-circle-question" aria-hidden="true"></i>
                        </button>
                    </span>
                    </div>
                    <div class="info-block d-none" id="co2-tooltip-${device}" role="region" aria-live="polite" tabindex="-1">
                        <button type="button" aria-label="Fermer les informations" class="btn btn-close close-button"></button>
                        <div aria-label="Conseils pratiques">${tip}</div>
                    </div>
            </div>
                `;

        });
        servicesSelected.forEach(service => {
            const labelService = this._model.getQuestionnaireDataUtilization()[0].questions.options.filter(el => el.id === service)[0].id;
            const icon = this._model.getQuestionnaireDataUtilization()[0].questions.options.filter(el => el.id === service)[0].image;
            const impact = Number(this._model.averageImpactByServiceId(service)).toFixed(1);
            const tip = i18next.t(`co2.service.questions.${service}.practical_tips`, { returnObjects: true });
            let bg_color = 'green';
            if (impact >= 70) {
                bg_color = 'red';
            }
            if (impact >= 50 && impact < 70) {
                bg_color = 'orange';
            }
            // Correction : ajout d'un label explicite pour le bouton info
            container.innerHTML += `
            <div id="service-info-${service}">
                    <div class="impact-container" >
                        <div class="text-start">
                            <img src="/public/green-digital-skills/assets/images/${icon}" alt="Icône ${labelService}">
                            <span>${i18next.t(`co2.service.questions.${labelService}.title`)}</span>
                        </div>
                        <div class="grid-item">
                            <div class="progress-balance-sheet ${bg_color}" style="width: ${impact / 4}em;"></div>
                        </div>
                        <span>${impact} ${this.getStringElts().co2}</span>
                        <span class="mx-2 clickable">
                            <button type="button" aria-label="Afficher les informations détaillées sur ${labelService}" aria-expanded="false" aria-controls="co2-tooltip-${service}" class="info-btn">
                                <i class="fa-regular fa-circle-question" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>
                    <div class="info-block d-none" id="co2-tooltip-${service}" role="region" aria-live="polite" tabindex="-1"><button type="button" aria-label="Fermer les informations" class="btn btn-close close-button"></button><div aria-label="Conseils pratiques">${tip}</div></div>
            </div>
            `;


        });
        const deviceLongLife = this.checkUserDevicesLongLife() ? `<div class="impact-container reduction">
        <div>
        <input type="checkbox" id="checkboxLongLife" name="checkboxLongLife" value="longLife">
        <label for="checkboxLongLife">${i18next.t("co2.dynamic.deviceLifespan")}</label>
        </div>
        <div class="smiley-container"></div>
        <span id="reductionLongLife">-0.0 ${this.getStringElts().co2}</span>
        </div>` : ''
        const deviceReconditionne = this.checkUserDevicesReconditione() ? `<div class="impact-container reduction">
        <div>
        <input type="checkbox" id="checkboxDevicesReconditione" name="checkboxDevicesReconditione" value="longLife">
        <label for="checkboxDevicesReconditione">${i18next.t("co2.dynamic.refurbishedDevices")}</label>
        </div>
        <div class="smiley-container"></div>
        <span id="reductionDevicesReconditioned">-0.0 ${this.getStringElts().co2}</span>
        </div>` : ''
        const redWifi = this.checkIsUserConnection4G() ? `<div class="impact-container reduction">
        <div>
        <input type="checkbox" id="checkboxWifi" name="checkboxWifi" value="wifi">
        <label for="checkboxWifi">${i18next.t("co2.dynamic.wifiUsage")}</label>
        
        </div>
        <div class="smiley-container"></div>
        <span id="reductionWifi">-0.0 ${this.getStringElts().co2}</span>
        </div>` : ''
        const redAudio = this.checkIsUserVideoQualityVideo() ? `<div class="impact-container reduction">
        <div>
        <input type="checkbox" id="checkboxLowQuality" name="checkboxLowQuality" value="low_quality">
        <label for="checkboxLowQuality">${i18next.t("co2.dynamic.videoCalls")}</label>
        </div>
        <div class="smiley-container"></div>
        <span id="reductionLowQuality">-0.0 ${this.getStringElts().co2}</span>
        </div>` : ''
        const total = i18next.t("co2.dynamic.total");
        container.innerHTML +=
            `<span>${total}: ${impuctTotal} ${this.getStringElts().co2}</span>
            <fieldset aria-labelledby="reduction-legend">
        <legend id="reduction-legend">${i18next.t("co2.dynamic.reduceImpact")}</legend>${deviceLongLife}${deviceReconditionne}${redWifi}${redAudio}</fieldset>`
        this.trigger('balanceSheetDisplayed')
        //this.focusToQuestioner();
         servicesSelected.forEach(service => {
             this.trigger('infoIconAdded', `service-info-${service}`);
         });
         devicesSelected.forEach(device => {
             this.trigger('infoIconAdded', `device-info-${device}`);
         });


    }


    templateQuestionLabel(question, idDevice, type) {
        let id = idDevice ? idDevice : question.id
        if (id.split('_').length > 1)
            id = id.split('_')[0]
        let impact = 0
        if (this._model.getArrayDeviceIds().includes(id)) {
            impact = this._model.averageImpactByDevice(id)
        } else {
            impact = this._model.averageImpactByServiceId(id).toFixed(1)
        }
        return `
        <div class="question">
              <div class="question-title">

              <h5 id="question-heading-${id}">${i18next.t(`co2.${type}.questions.${idDevice}.icon`)}${i18next.t(`co2.${type}.${idDevice}`)}</h5>
              <div id="year-impact-${id}" role="status" aria-live="polite" aria-label="Impact carbone actuel">${impact} ${this.getStringElts().co2}
              </div>
              </div>
   

                  <hr role="separator">
                  </div>
        <div class="d-none text-end" id="input-error-notif" role="alert" aria-live="assertive"></div>`
    }

    getUserData(el, data) {
        let value = 0, unit = "years", step = 0.5, min = "0", max = "20";

        if (el.name.includes('ai_image')) {
            value = data.inputUser.ai_image;
            step = 1;
            unit = value <= 1 ? i18next.t("co2.units.singular.image") : i18next.t("co2.units.plural.images");
        } else if (el.name.includes('ai_text')) {
            value = data.inputUser.ai_text;
            step = 1;
            unit = "";
        } else if (el.name.includes('email_')) {
            value = data.inputUser[el.name];
            unit = "";
        } else if (el.name.includes('_day_time')) {
            value = data.inputUser.day_time;
            unit = value <= 1 ? i18next.t("co2.units.singular.hour") : i18next.t("co2.units.plural.hours");
            min = 0.5;
            max = 20;
        } else if (el.name.includes('_years_usage')) {
            value = data.inputUser.yearsUsage;
            unit = value <= 1 ? i18next.t("co2.units.singular.year") : i18next.t("co2.units.plural.years");
        } else if (el.name.includes('_change')) {
            value = data.inputUser.change;
            unit = value <= 1 ? i18next.t("co2.units.singular.year") : i18next.t("co2.units.plural.years");
            min = "0.5";
        }
        return { value, unit, step, min, max };
    }
    extractDomain(urls) {
        const linkHtml = urls.map(url => `<a target="_blank" href="${url}">${this.getDomainFromUrl(url)}</a>`).join(', ');
        return linkHtml
    }
    getDomainFromUrl(url) {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname;
    }
    createInfoBlock(el, type, rule, id) {
        let domains = "", source = ""
        if (el.links) {
            domains = this.extractDomain(el.links);
            source = el.links ? `<p>Sources&nbsp;: ${domains}</p>` : "";
        }
        let rules = rule && (el.name.includes('years_usage') || (type === 'service' && el.name.includes('day_time')))
            ? `<span>${rule}<hr/></span>` : "";
        if (rule.includes(`co2.${type}.questions`)) rules = "";
        const advice = el.advice ? `<code>${i18next.t(`co2.dynamic.advice`)}</code>` : "";
        // Récupère un élément spécifique
        const infoText = i18next.t(`co2.${type}.questions.${id}.${el.ref}.info`);
        const info = el.info ? `<div class="d-none info-block" role="region" aria-labelledby="info-btn-${el.name}" aria-live="polite" tabindex="-1"><button type="button" aria-label="Fermer les informations" class="btn btn-close close-button"></button><div aria-label="Informations détaillées">${rules}${infoText}${source}</div></div>` : "";
        const icon = el.info ? `<button type="button" id="info-btn-${el.name}" aria-label="Afficher les informations détaillées sur ${el.name}" aria-expanded="false" aria-controls="info-block-${el.name}" class="info-btn" data-toggle="tooltip" data-placement="top" title="Cliquer pour plus d'informations">
        <i aria-hidden="true" class="fa-solid fa-circle-info m-2" style="color: #757575;"></i></button>` : "";

        return { info, icon, advice };
    }
    inputUpdateUnits(input, value) {
        let unit = "";
        if (input.id.includes('ai_image')) {
            unit = value <= 1 ? i18next.t("co2.units.singular.image") : i18next.t("co2.units.plural.images");
        } else if (input.id.includes('ai_text')) {

            unit = "";
        } else if (input.id.includes('email_')) {
            unit = "";
        } else if (input.id.includes('_day_time')) {

            unit = value <= 1 ? i18next.t("co2.units.singular.hour") : i18next.t("co2.units.plural.hours");

        } else if (input.id.includes('_years_usage')) {

            unit = value <= 1 ? i18next.t("co2.units.singular.year") : i18next.t("co2.units.plural.years");
        } else if (input.id.includes('_change')) {

            unit = value <= 1 ? i18next.t("co2.units.singular.year") : i18next.t("co2.units.plural.years");

        }
        const name = input.id.split('_').splice(1).join('_');
        const unitElement = document.getElementById(`unit-${name}`);

        if (unitElement) {
            const oldUnit = unitElement.textContent;
            unitElement.textContent = unit;

            // Annoncer le changement de valeur et d'unité
            if (input.value && parseFloat(input.value) > 0) {
                const message = `Nouvelle valeur : ${input.value} ${unit}`;
                this.announceToScreenReader(message);
            }
        }
    }
    createNumberInput(el, data) {
        const { value, unit, step, min, max } = this.getUserData(el, data);
        return `    <span id="label-${el.name}" class="visually-hidden">${el.label || el.name}</span>
    
    <button id="minus-${el.name}" class="minus" 
           type="button"
           title="Diminuer ${el.label || el.name}"
           aria-label="Diminuer ${el.label || el.name}" 
           aria-controls="input_${el.name}">-</button>
    
    <input type="number" id="input_${el.name}" min="${min}" max="${max}" 
           step="${step}" value="${value}" 
           aria-labelledby="label-${el.name}"
           aria-describedby="unit-${el.name} range-${el.name}">
           
    <span id="range-${el.name}" class="visually-hidden">Valeur entre ${min} et ${max}</span>
    
    <span id="unit-${el.name}" aria-hidden="true">${unit}</span>
    
    <button id="plus-${el.name}" class="plus" 
            type="button"
            title="Augmenter ${el.label || el.name}" 
            aria-label="Augmenter ${el.label || el.name}" 
            aria-controls="input_${el.name}">+</button>`;
    }
    createElementInputNumber(el, type, data) {
        const id = el.name.split('_')[0];
        const rule = i18next.t(`co2.${type}.questions.${id}.rules`);
        const { info, icon, advice } = this.createInfoBlock(el, type, rule, id);

        const container = document.createElement('div');
        container.setAttribute('class', 'select-section');
        container.id = el.name;
        container.innerHTML = `<div class="input-label">
                                 <h6>${i18next.t(`co2.${type}.questions.${data.id}.${el.ref}.label`)}&nbsp;${icon}</h6>
                                 ${info}
                                 ${advice}
                               </div>`;

        const numberInput = document.createElement('div');
        numberInput.setAttribute('class', 'number-input-container');
        numberInput.innerHTML = this.createNumberInput(el, data);
        // numberInput.setAttribute('role', 'group');
        numberInput.setAttribute('aria-labelledby', `label-${el.name}`);

        container.appendChild(numberInput);
        document.getElementById('questionnaire-container').querySelector('.question').appendChild(container);

        this.trigger('infoIconAdded', el.name);
        this.trigger('inputAdded', numberInput.querySelector(`#input_${el.name}`), type);
    }


    createElementInputSelect(sectionQuestion, el, data, type) {
        const id = el.name.split('_')[0];
        const rule = i18next.t(`co2.${type}.questions.${id}.rules`);

        const { info, icon, advice } = this.createInfoBlock(el, type, rule, id);

        // Création du conteneur principal
        const container = document.createElement('div');
        container.setAttribute('class', 'select-section');
        container.id = el.name;

        // Création du label et ajout des informations
        const inputLabel = document.createElement('div');
        inputLabel.setAttribute('class', 'input-label');

        const heading = document.createElement('h6');
        heading.innerHTML = `${i18next.t(`co2.${type}.questions.${id}.${el.ref}.label`)}&nbsp;${icon}`;
        heading.setAttribute('id', `heading-${el.name}`);
        // heading.setAttribute('role', 'heading');
        // heading.setAttribute('aria-level', '6');
        inputLabel.appendChild(heading);

        if (info) {
            const infoElement = document.createElement('div');
            infoElement.innerHTML = info;
            inputLabel.appendChild(infoElement);
        }

        if (advice) {
            const adviceElement = document.createElement('div');
            adviceElement.innerHTML = advice;
            inputLabel.appendChild(adviceElement);
        }

        container.appendChild(inputLabel);

        // Création du conteneur pour les boutons radio
        const fieldset = document.createElement('fieldset');
        const radio = document.createElement('div');
        radio.setAttribute('class', 'select-input-container switcher');
        radio.id = el.name;
        radio.setAttribute('role', 'radiogroup');
        radio.setAttribute('aria-labelledby', `heading-${el.name}`);
        radio.setAttribute('aria-required', 'true');
        fieldset.appendChild(radio);

        // Ajout des boutons radio
        el.options.forEach((option, index) => {
            const classRight = index === 1 ? "switcher__input--right" : "";
            const checked = this.checkInput(data.inputUser, type, option)
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = el.name;
            input.value = option;
            input.id = option;
            input.className = `switcher__input ${classRight}`;
            input.setAttribute('aria-labelledby', `label-radio-${option}`);
            if (checked) {
                input.checked = true;
            }
            input.setAttribute('tabindex', '-1');

            const label = document.createElement('label');
            label.setAttribute('for', option);
            label.id = `label-radio-${option}`;
            label.className = 'switcher__label';
            label.textContent = i18next.t(`co2.${type}.questions.${data.id}.${el.ref}.options.${option}`);
            input.setAttribute('data-toggle', 'tooltip');
            label.setAttribute('data-placement', 'top');
            label.setAttribute('title', option);
            label.setAttribute('tabindex', '0');

            radio.appendChild(input);
            radio.appendChild(label);
        });

        const toggle = document.createElement('span');
        toggle.className = 'switcher__toggle';
        radio.appendChild(toggle);

        // Ajout du conteneur radio au conteneur principal
        container.appendChild(fieldset);

        // Ajout du conteneur principal à la section de question
        if (sectionQuestion) {
            sectionQuestion.appendChild(container);
        } else {
            console.error('Élément sectionQuestion non trouvé');
        }

        // Déclenchement des événements
        this.trigger('infoIconAdded', el.name);
        this.trigger('selectInputAdded', radio, type);

    }
    checkInput(inputUser, type, option) {
        const isServiceType = type === 'service';
        const isDeviceType = type === 'device';
        const isConnectionMatch = inputUser.connection?.toLowerCase() === option.toLowerCase();
        const isQualityMatch = inputUser.quality?.toLowerCase() === option.toLowerCase();
        const isConditionMatch = inputUser.condition?.toLowerCase() === option.toLowerCase();

        const checked =
            (isServiceType && (isConnectionMatch || isQualityMatch)) ||
            (isDeviceType && isConditionMatch);
        return checked
    }

    checkUserDevicesLongLife() {
        return this._model.getDevicesSelected().some(el => {
            const lifeTime = this._model.getLifetimeByDevice(el.id)
            return el.inputUser.change + el.inputUser.yearsUsage < lifeTime;
        })

    }
    checkUserDevicesReconditione() {
        return this._model.getDevicesSelected().some(el => {
            return el.inputUser?.condition === "new"
        })
    }
    checkIsUserConnection4G() {
        return this._model.getServicesSelected()
            .some(el => el.inputUser?.connection === "4G");
    }
    checkIsUserVideoQualityVideo() {
        return this._model.getServicesSelected()
            .some(service => service.inputUser?.quality === 'video');
    }
    viewUpdate(newData, id) {
        let impact
        if (this._model.getArrayDeviceIds().includes(id)) impact = this._model.averageImpactByDevice(id)
        else impact = this._model.averageImpactByServiceId(id).toFixed(1)

        const impactElement = document.getElementById(`year-impact-${id}`);
        if (impactElement) {
            const oldValue = impactElement.textContent.replace(/[^\d.,]/g, '');
            const newValue = impact;

            impactElement.innerHTML = impact + `${this.getStringElts().co2}`;

            // Annoncer le changement aux lecteurs d'écran
            this.announceImpactChange(id, oldValue, newValue);
        }
    }

    /**
     * Annonce les changements d'impact aux lecteurs d'écran
     * @param {string} id - L'ID de l'élément
     * @param {string} oldValue - L'ancienne valeur
     * @param {string} newValue - La nouvelle valeur
     */
    announceImpactChange(id, oldValue, newValue) {
        if (oldValue !== newValue) {
            const changeDirection = parseFloat(newValue) > parseFloat(oldValue) ? 'augmenté' : 'diminué';
            const deviceName = this._model.getArrayDeviceIds().includes(id)
                ? i18next.t(`co2.device.${id}`)
                : i18next.t(`co2.service.${id}`);

            const message = `Impact de ${deviceName} ${changeDirection} : ${newValue} ${this.getStringElts().co2}`;
            this.announceToScreenReader(message);
        }
    }

    /**
     * Annonce un message aux lecteurs d'écran via aria-live
     * @param {string} message - Le message à annoncer
     */
    announceToScreenReader(message) {
        // Créer ou récupérer la région d'annonce
        let announcer = document.getElementById('aria-live-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'aria-live-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'visually-hidden';
            document.body.appendChild(announcer);
        }

        // Nettoyer le contenu précédent et ajouter le nouveau message
        announcer.textContent = '';
        setTimeout(() => {
            announcer.textContent = message;
        }, 100);
    }

    /**
     * Annonce l'ouverture/fermeture des blocs d'information pour les lecteurs d'écran
     * @param {HTMLElement} infoBlock - Le bloc d'information
     * @param {HTMLElement} toggleButton - Le bouton qui contrôle le bloc
     * @param {boolean} isOpening - True si on ouvre, false si on ferme
     */
    announceInfoBlockToggle(infoBlock, toggleButton, isOpening) {
        const action = isOpening ? 'ouvert' : 'fermé';
        const message = `Bloc d'information ${action}`;

        // Mettre à jour les attributs ARIA du bouton
        toggleButton.setAttribute('aria-expanded', isOpening.toString());

        // Annoncer le changement
        this.announceToScreenReader(message);

        // Donner le focus au bloc d'information quand il s'ouvre
        if (isOpening) {
            setTimeout(() => {
                infoBlock.focus();
            }, 100);
        }
    }

    iconDevice(id) {
        return this._model.questionnaireDataMateriel[0].questions.options.filter(el => el.id === id)[0].icon
    }
    updateReductionElement(reductionElement, impactReduction) {
        const oldValue = reductionElement.dataset.impactReduction || '0';
        const newValue = impactReduction.toFixed(3);

        reductionElement.innerHTML = ` -${impactReduction.toFixed(1)} ${this.getStringElts().co2}`;
        reductionElement.dataset.impactReduction = newValue;

        // Annoncer la réduction d'impact
        if (oldValue !== newValue && parseFloat(newValue) > 0) {
            const message = `Réduction d'impact : ${impactReduction.toFixed(1)} ${this.getStringElts().co2}`;
            this.announceToScreenReader(message);
        }
    }
    getTotalReduction() {
        let total = 0;

        const allReductionsId = [
            { checkboxId: 'checkboxLongLife', reductionId: 'reductionLongLife' },
            { checkboxId: 'checkboxDevicesReconditione', reductionId: 'reductionDevicesReconditioned' },
            { checkboxId: 'checkboxWifi', reductionId: 'reductionWifi' },
            { checkboxId: 'checkboxLowQuality', reductionId: 'reductionLowQuality' }
        ];

        allReductionsId.forEach(item => {
            const checkbox = document.getElementById(item.checkboxId);
            const reductionElement = document.getElementById(item.reductionId);
            if (checkbox && checkbox.checked && reductionElement) {
                const reduction = parseFloat(reductionElement.dataset.impactReduction) || 0;
                total += reduction;
            }
        });
        return total
    }

    showSmiley(type = false, el) {
        if (el.querySelector('.smiley') != undefined) return
        const smileyText = type === 'more' ? '👎' : '👍';
        const animationDuration = 2000,
            fontSize = '40px'

        // Annoncer l'impact du changement
        const impactMessage = type === 'more'
            ? 'Changement défavorable pour l\'environnement'
            : 'Changement favorable pour l\'environnement';
        this.announceToScreenReader(impactMessage);

        // Crée un élément smiley
        const smiley = document.createElement('div');
        smiley.className = 'smiley';
        smiley.textContent = smileyText;
        smiley.setAttribute('role', 'img');
        smiley.setAttribute('aria-label', impactMessage);
        smiley.style.animationDuration = `${animationDuration / 1000}s`; // Ajuste la durée de l'animation
        smiley.style.fontSize = fontSize; // Ajuste la taille du smiley

        // Ajoute le smiley au conteneur
        el.appendChild(smiley);

        // Supprime le smiley après la durée de l'animation
        setTimeout(() => {
            smiley.remove();
        }, animationDuration);
    }
    showInputError(min, max) {
        const errorContainer = document.querySelector("#input-error-notif")
        if (!errorContainer) return;

        // Configuration ARIA pour l'accessibilité
        errorContainer.setAttribute('role', 'alert');
        errorContainer.setAttribute('aria-live', 'assertive');
        errorContainer.setAttribute('aria-atomic', 'true');

        errorContainer.innerHTML = `<span  aria-label="Erreur">⚠️</span> Veuillez entrer une valeur entre ${min} et ${max}`
        errorContainer.classList.remove('d-none')

        // Assurer que le message est focalisable pour les lecteurs d'écran
        errorContainer.setAttribute('tabindex', '-1');
        errorContainer.focus();

        setTimeout(() => {
            errorContainer.classList.add('d-none');
            errorContainer.removeAttribute('tabindex');
        }, 5000);
    }
    loopOverParagraphs(paragraphs) {
        if (!paragraphs.map) return '';
        let formattedHTML = paragraphs.map((paragraph) => {
            return `<span>${paragraph}</span>`;
        }).join('');
        return formattedHTML;
    }
    focusToQuestioner() {
        const container = document.querySelector('#shareElement');
        if (container) {
            container.scrollIntoView({ behavior: "smooth", block: "center" });

            // Assurer que l'élément est focalisable
            if (!container.hasAttribute('tabindex')) {
                container.setAttribute('tabindex', '-1');
            }

            // Délai pour laisser le temps au défilement de se terminer
            setTimeout(() => {
                container.focus();
                // Annoncer le changement de contexte aux lecteurs d'écran
                container.setAttribute('aria-live', 'polite');
                container.setAttribute('aria-atomic', 'true');
            }, 500);
        } else {
            console.error("Element #shareElement not found.");
        }
    }
    scrollToBottom() {
        const indexScrollArrow = document.getElementById('index-scroll-arrow');
        if (!indexScrollArrow) return;

        // Animation pulse
        indexScrollArrow.style.animation = 'pulse 0.7s';

        const progressHeader = document.querySelector('.main-container');
        if (progressHeader) {
            progressHeader.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        setTimeout(() => {
            indexScrollArrow.style.animation = 'none';
        }, 700);

    }
    async awaitI18next() {
        return new Promise((resolve, reject) => {

            if (!Object.keys(i18next.store.data).length) {
                setTimeout(() => {
                    this.awaitI18next();
                }, 100);
                return;
            }
            resolve();
            this.init();

        });
    }
}
export default View
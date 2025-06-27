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
    init() {
        this._controller.on('startQuestionnaire', 'dispalayFirstQuestion', () => {
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
            co2: " kg eqCO<sub>2</sub>/an"
        }
        return stringEls
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
        const questionTitle = document.createElement('h3');
        questionTitle.innerText = question.label;

        const container = document.getElementById('questionnaire-container');
        container.appendChild(questionTitle);

        // Create options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';

        question.options.forEach(option => {
            const optionElement = this.createOptionElement(option, elementIds, type);
            optionsContainer.appendChild(optionElement);
        });
        if (question.options.length > 6) optionsContainer.classList.add('grid-four-columns')

        container.appendChild(optionsContainer);
        // Update navigation buttons
        document.querySelector('.step').innerText = '';
        if (type != 'service') {
            document.querySelector('#prev').classList.add('d-none');
            document.querySelector('#prev').classList.remove('inline-block');
        }

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
        if (elementIds.includes(checkbox.id)) checkbox.checked = true
        else checkbox.checked = false

        const label = document.createElement('label');
        label.setAttribute('for', option.id);
        if (type === 'device') {
            label.innerHTML = `<img src="/public/green-digital-skills/assets/images/${option.image}" alt="icon_device">
            <p>${option.label}</p>`;
        } else {
            label.innerHTML = `<img src="/public/green-digital-skills/assets/images/${option.image}" alt="icon_service">
      
                <p>${option.label}</p>`;
        }
        optionElement.appendChild(label);
        optionElement.appendChild(checkbox);

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
        this.clearContainer()
        this._model.getQuestionnaireDataMaterial().forEach(el => device.push(el.practical_tips))
        this._model.getQuestionnaireDataUtilization().forEach(el => service.push(el.practical_tips))
        const container = document.getElementById('questionnaire-container');
        container.innerHTML += `<div class="masonry-grid"></div>`
        const gridContainer = document.querySelector('.masonry-grid')
        const allTips = [...device, ...service]
        const titles = [...this._model.getQuestionnaireDataMaterial(), ...this._model.getQuestionnaireDataUtilization()]
        allTips.forEach((el, i) => {
            if (el === undefined) return
            const item = document.createElement('div');
            item.className = 'masonry-item';
            const itemTitle = document.createElement('strong');
            const itemText = document.createElement('div');
            itemTitle.innerHTML = titles[i].title;
            itemText.innerHTML = this.loopOverParagraphs(el)
            item.appendChild(itemTitle);
            item.appendChild(itemText)
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

        document.querySelectorAll('.masonry-item').forEach(item => {
            item.style.breakInside = 'avoid';
            item.style.marginBottom = '16px';
            item.style.padding = '12px';
            item.style.background = '#f5f5f5';
            item.style.borderRadius = '8px';
            item.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    }

    displayDeviceQuestion(index, currentValues) {
        this.clearContainer()

        const section = this._model.getQuestionnaireDataMaterial();
        const question = section[index];
        const id = question.visible_if.device_selection
        const container = document.getElementById('questionnaire-container');
        container.innerHTML = this.templateQuestionLabel(question, id)
        const sectionQuestion = container.querySelector('.question')
        question.questions.map(el => {
            if (el.type === 'select') {
                this.createElementInputSelect(sectionQuestion, el, currentValues, "device")
            } else {
                this.createElementInputNumber(el, "device", currentValues);
            }
        })
        // Update navigation buttons
        this._navigation.updateNavButtons()

    }

    displayServiceQuestion(index, currentValues) {
        this.clearContainer()
        const section = this._model.getQuestionnaireDataUtilization()
        const question = section[index];
        const container = document.getElementById('questionnaire-container');
        container.innerHTML = this.templateQuestionLabel(question, question.id)
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
    }
    sharePrintCaptureGroupButtons() {
        const shareElement = navigator.share ? '<button id="shareMyImpact" class="ide-btn" data-toggle="tooltip" data-placement="top" data-i18n="[title]code.aiInterface.preview.screenshot" title="Partager"><i class="fa-solid fa-share"></i></button>' : ""
        return `
        ${shareElement}
        <button id="captureMyImpact" class="ide-btn" data-toggle="tooltip" data-placement="top" data-i18n="[title]code.aiInterface.preview.screenshot" title="Capture d'ecran"><i class="fa-solid fa-camera"></i></button>
        <button id="printMyImpact" class="ide-btn" data-toggle="tooltip" data-placement="top" title="Imprimer"><i class="fa fa-print"></i></button>`
    }
    displayBalanceSheet() {

        const shareElement = document.querySelector(`#shareElement`);
        if (!shareElement) return; // Vérifie que l'élément existe avant de continuer

        shareElement.removeEventListener('click', () => {
        })
        this.clearContainer()
        const devicesSelected = this._model.getArrayDeviceIds()
        const servicesSelected = this._model.getArrayServiceIds()
        const impuctTotal = this._model.getSumAverage().toFixed(1)

        document.querySelector('.text-grow-bar').innerText = ""
        const growBar = document.querySelector('.grow-bar');
        growBar.style.width = '0px'
        const label = document.createElement('div');
        label.classList.add('titleWithButtons')
        const questionTitle = document.createElement('h3');
        questionTitle.innerText = `Détail de votre impact`;
        const buttons = document.createElement('div')
        buttons.setAttribute('class', 'ide-btn-group mt-2')
        buttons.innerHTML = this.sharePrintCaptureGroupButtons()
        label.appendChild(questionTitle)
        const container = document.getElementById('questionnaire-container');
        container.appendChild(label);
        label.appendChild(buttons)
        container.innerHTML += `<br>`

        devicesSelected.forEach(device => {
            const label = this._model.getQuestionnaireDataMaterial()[0].questions.options.filter(el => el.id === device)[0].label
            const icon = this._model.getQuestionnaireDataMaterial()[0].questions.options.filter(el => el.id === device)[0].image

            const impact = Number(this._model.averageImpactByDevice(device)).toFixed(1)
            let bg_color = 'green';

            if (impact >= 70) {
                bg_color = 'red';
            }
            if (impact >= 50 && impact < 70) {
                bg_color = 'orange';
            }
            container.innerHTML += `
                 
                    <div class="impact-container">
                    <div class="text-start">
                      <img src="/public/green-digital-skills/assets/images/${icon}" alt="Icon">
                      <span>${label}</span>
                    </div>
                    <div class="grid-item">
                      <div class="progress-balance-sheet ${bg_color}" style="width: ${impact / 4}em;"></div>
                      </div>
                      <span>${impact} ${this.getStringElts().co2}</span>
                      
                      <span id="device-info-${device}" class="mx-2 clickable">
                      <i class="fa-regular fa-circle-question"></i>
    
                      </span>
                      </div>
                      <div class="co2-tooltip d-none" id="co2-tooltip-${device}"></div>
                     
                  `
        })

        servicesSelected.forEach(service => {
            const label = this._model.getQuestionnaireDataUtilization()[0].questions.options.filter(el => el.id === service)[0].label
            const icon = this._model.getQuestionnaireDataUtilization()[0].questions.options.filter(el => el.id === service)[0].image
            const impact = Number(this._model.averageImpactByServiceId(service)).toFixed(1)
            let bg_color = 'green';

            if (impact >= 70) {
                bg_color = 'red';
            }
            if (impact >= 50 && impact < 70) {
                bg_color = 'orange';
            }
            container.innerHTML += `
            <div>
            <div class="impact-container">
            <div class="text-start"><img src="/public/green-digital-skills/assets/images/${icon}">
            <span>${label}</span></div>
            <div class="grid-item">
            <div class="progress-balance-sheet ${bg_color}" style="width: ${impact / 4}em;"></div>
            </div>
            <span>${impact} ${this.getStringElts().co2}</span>
          <span id="service-info-${service}" class="mx-2 clickable">
            <i class="fa-regular fa-circle-question"></i>
            </span>
            </div>
            <div class="co2-tooltip d-none" id="co2-tooltip-${service}"></div>
            </div>`
        })
        this.trigger('infoIconDeviceAdded')
        const deviceLongLife = this.checkUserDevicesLongLife() ? `<div class="impact-container reduction">
        <div>
        <input type="checkbox" id="checkboxLongLife" name="checkboxLongLife" value="longLife">
        <label for="checkboxLongLife">Assurez une longue durée de vie à vos appareils.</label>
        </div>
        <div class="smiley-container"></div>
        <span id = "reductionLongLife">-0.0 ${this.getStringElts().co2}</span>
        </div>` : ''
        const deviceReconditionne = this.checkUserDevicesReconditione() ? `<div class="impact-container reduction">
        <div>
        <input type="checkbox" id="checkboxDevicesReconditione" name="checkboxDevicesReconditione" value="longLife">
        <label for="checkboxDevicesReconditione">Avec une préférence pour les appareils reconditionnés</label>
        </div>
        <div class="smiley-container"></div>
        <span id = "reductionDevicesReconditioned">-0.0 ${this.getStringElts().co2}</span>
        </div>` : ''
        const redWifi = this.checkIsUserConnection4G() ? `<div class="impact-container reduction">
        <div>
        <input type="checkbox" id="checkboxWifi" name="checkboxWifi" value="wifi">
        <label for="checkboxWifi">Privilégier l'utilisation des l'appareil en wifi</label>
        
        </div>
        <div class="smiley-container"></div>
        <span id = "reductionWifi">-0.0 ${this.getStringElts().co2}</span>
        </div>` : ''
        const redAudio = this.checkIsUserVideoQualityVideo() ? `<div class="impact-container reduction">
        <div>
        <input type="checkbox" id="checkboxLowQuality" name="checkboxLowQuality" value="low_quality">
        <label for="checkboxLowQuality">Privilégier video appels en mode audio</label>
        </div>
        <div class="smiley-container"></div>
        <span id = "reductionLowQuality">-0.0 ${this.getStringElts().co2}</span>
        </div>` : ''
        container.innerHTML += `<span>Total: ${impuctTotal} ${this.getStringElts().co2}`

        container.innerHTML +=
            `<fieldset>
        <legend>Réduire mon impact</legend>${deviceLongLife}${deviceReconditionne}${redWifi}${redAudio}</fieldset>`
        this.trigger('balanceSheetDisplayed')

    }


    templateQuestionLabel(question, idDevice) {
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
            <label>
              <h1>${question.title}</h1>
              <div id="year-impact-${id}">${impact} ${this.getStringElts().co2}
              </div>
            </label>
     
                  <hr>
                  </div>
        <div class="d-none text-end" id="input-error-notif"></div>`
    }

    getUserData(el, data) {
        let value = 0, unit = "années", step = 0.5, min = "0", max = "20";

        if (el.name.includes('ai_image')) {
            value = data.inputUser.ai_image;
            step = 1;
            unit = value <= 1 ? "image" : "images";
        } else if (el.name.includes('ai_text')) {
            value = data.inputUser.ai_text;
            step = 1;
            unit = "";
        } else if (el.name.includes('email_')) {
            value = data.inputUser[el.name];
            unit = "";
        } else if (el.name.includes('_day_time')) {
            value = data.inputUser.day_time;
            unit = value < 1 ? "heure" : "heures";
            min = 0.5;
            max = 20;
        } else if (el.name.includes('_years_usage')) {
            value = data.inputUser.yearsUsage;
            unit = value < 1 ? "année" : "années";
        } else if (el.name.includes('_change')) {
            value = data.inputUser.change;
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
    createInfoBlock(el, type, rule) {
        let domains = "", source = ""
        if (el.links) {
            domains = this.extractDomain(el.links);
            source = el.links ? `<p>Sources&nbsp;: ${domains}</p>` : "";
        }
        const rules = rule && (el.name.includes('years_usage') || (type === 'service' && el.name.includes('day_time')))
            ? `<span>${rule}<hr/></span>` : "";
        const advice = el.advice ? `<code>${el.advice}</code>` : "";
        const info = el.info ? `<span class="d-none info-block"><button type="button" aria-label="Close" class="btn btn-close close-button"></button>${rules}${this.loopOverParagraphs(el.info)}${source}</span>` : "";
        const icon = el.info ? `<i aria-label="Info" class="fa-solid fa-circle-info m-2" style="color: #757575;"></i>` : "";

        return { info, icon, advice };
    }
    createNumberInput(el, data) {
        const { value, unit, step, min, max } = this.getUserData(el, data);
        return `<button id="minus-${el.name}" class="minus">-</button>
                <input type="number" id="input_${el.name}" min="${min}" max="${max}" step="${step}" value="${value}">
                <div>${unit}</div>
                <button id="plus-${el.name}" class="plus">+</button>`;
    }
    createElementInputNumber(el, type, data) {
        const id = el.name.split('_')[0];
        const rule = type === 'device' ? this._model.getRulesByDevice(id) : this._model.getRulesByService(id);
        const { info, icon, advice } = this.createInfoBlock(el, type, rule);

        const container = document.createElement('div');
        container.setAttribute('class', 'select-section');
        container.id = el.name;
        container.innerHTML = `<div class="input-label">
                                 <h6>${el.label}&nbsp;${icon}</h6>
                                 ${info}
                                 ${advice}
                               </div>`;

        const numberInput = document.createElement('div');
        numberInput.setAttribute('class', 'number-input-container');
        numberInput.innerHTML = this.createNumberInput(el, data);

        container.appendChild(numberInput);
        document.getElementById('questionnaire-container').querySelector('.question').appendChild(container);

        this.trigger('infoIconAdded', el.name);
        this.trigger('inputAdded', numberInput.querySelector(`#input_${el.name}`), type);
    }


    createElementInputSelect(sectionQuestion, el, data, type) {
        const id = el.name.split('_')[0];
        const rule = type === 'device' ? this._model.getRulesByDevice(id) : this._model.getRulesByService(id);
        const { info, icon, advice } = this.createInfoBlock(el, type, rule);

        // Création du conteneur principal
        const container = document.createElement('div');
        container.setAttribute('class', 'select-section');
        container.id = el.name;

        // Création du label et ajout des informations
        const inputLabel = document.createElement('div');
        inputLabel.setAttribute('class', 'input-label');

        const heading = document.createElement('h6');
        heading.innerHTML = `${el.label}&nbsp;${icon}`;
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
        const radio = document.createElement('div');
        radio.setAttribute('class', 'select-input-container switcher');
        radio.id = el.name;

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
            if (checked) {
                input.checked = true;
            }

            const label = document.createElement('label');
            label.htmlFor = option;
            label.className = 'switcher__label';
            label.textContent = option;

            radio.appendChild(input);
            radio.appendChild(label);
        });

        // Ajout du toggle
        const toggle = document.createElement('span');
        toggle.className = 'switcher__toggle';
        radio.appendChild(toggle);

        // Ajout du conteneur radio au conteneur principal
        container.appendChild(radio);

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
            return el.inputUser?.condition === "Neuf"
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
        document.getElementById(`year-impact-${id}`).innerHTML = impact + `${this.getStringElts().co2}`

    }

    iconDevice(id) {
        return this._model.questionnaireDataMateriel[0].questions.options.filter(el => el.id === id)[0].icon
    }
    updateReductionElement(reductionElement, impactReduction) {
        reductionElement.innerHTML = ` -${impactReduction.toFixed(1)} ${this.getStringElts().co2}`;
        reductionElement.dataset.impactReduction = impactReduction.toFixed(3);
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
        // const container = document.getElementById('smiley-container');

        // Crée un élément smiley
        const smiley = document.createElement('div');
        smiley.className = 'smiley';
        smiley.textContent = smileyText;
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
        errorContainer.innerHTML = `Veuillez entrer une valeur entre ${min} et ${max}`
        errorContainer.classList.remove('d-none')
        setTimeout(() => {
            errorContainer.classList.add('d-none');
        }, 5000);
    }
    loopOverParagraphs(paragraphs) {
        if (!paragraphs.map) return '';
        let formattedHTML = paragraphs.map((paragraph) => {
            return `<span>${paragraph}</span>`;
        }).join('');
        return formattedHTML;
    }
}
export default View
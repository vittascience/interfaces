import Controller from './Controller.js';
import View from './View.js';
import Observable from "./Observable.js";


class Model extends Observable {
    constructor() {
        // Singleton pattern check
        if (typeof Model._instance !== 'undefined') {
            return Model._instance;
        } // Observable Inheritance
        super();
        // Singleton pattern instanciation 
        Model._instance = this;
        this._controller = new Controller();
        this._view = new View();
        this.questionnaireDataUtilization = [];
        this.questionnaireDataMateriel = [];
        this.devicesSelected = [];
        this.servicesSelected = [];
        this.sumTotal = 0;
        this.sumAverage = 0;
        this.lastAverage = undefined;

    }
    init() {

        this.loadQuestionnaire();
        this._controller.on('deviceConsumChanged', 'computeConsum', (newData, id) => {
            this.updateDeviceSelected(id, newData)
            this.computedSumTotal()
            this.computedSumAverage()
        })
        this._controller.on('serviceConsumChanged', 'computeConsum', (newData, id) => {

            this.updateServicesSelected(id, newData)
            this.computedSumTotal()
            this.computedSumAverage()
        })
    }

    /**
     * Loads questionnaire data from a JSON file
     * @returns {Promise<void>} Resolves when data is loaded or rejects on error
     */
    async loadQuestionnaire() {
        try {
        const response = await fetch(`${CDN_PATH}/public/green-digital-skills/data/questionnaire.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Validate data structure
            if (!data.materiel || !data.utilization) {
                throw new Error('Invalid questionnaire data structure');
            }

            // Assign data with optional chaining and nullish coalescing
            this.questionnaireDataMateriel = data.materiel ?? [];
            this.questionnaireDataUtilization = data.utilization ?? [];
            this.trigger('dataLoaded');

            // Return the data for potential chaining
            return data;

        } catch (error) {
            console.error('Error loading questionnaire:', error);

            // Provide fallback empty data
            this.questionnaireDataMateriel = [];
            this.questionnaireDataUtilization = [];

            // Re-throw to allow caller handling
            throw error;
        }
    }

    getQuestionnaireDataMaterial() {
        return this.questionnaireDataMateriel
    }
    getQuestionnaireDataUtilization() {
        return this.questionnaireDataUtilization
    }
    getTotalQuestions() {
        return this.questionnaireDataUtilization[0].questions.length + this.questionnaireDataMateriel.length
    }

    getLifetimeByDevice(id) {
        return this.questionnaireDataMateriel[0].questions.options.filter(el => el.id === id)[0].lifetime
    }
    getYearConsumByDevice(id) {
        if (this.questionnaireDataMateriel[0].questions.options.filter(el => el.id === id)[0] === undefined) return
        return this.questionnaireDataMateriel[0].questions.options.filter(el => el.id === id)[0].one_year_utilization
    }
    getLinkByDevice(id) {
        return this.questionnaireDataMateriel.filter((el, i) => {
            return i != 0 && el.visible_if.device_selection == id
        })[0].link
    }

    getLinkByService(id) {
        return this.questionnaireDataUtilization.filter((el) => el.id == `${id}_consum`)[0].link
    }
    getRulesByDevice(id) {
        return this.questionnaireDataMateriel.filter((el, i) => {
            return i != 0 && el.visible_if.device_selection == id
        })[0].rules
    }
    getRulesByService(id) {
        return this.questionnaireDataUtilization.filter((el) => el.id == `${id}_consum`)[0].rules
    }
    getFabByDevice(id) {
        if (typeof (id) === 'object') id = id.id
        if (this.questionnaireDataMateriel[0].questions.options.filter(el => el.id === id)[0] === undefined) return
        return this.questionnaireDataMateriel[0].questions.options.filter(el => el.id === id)[0].fabrication
    }
    getTipDevice(id) {
        return this.questionnaireDataMateriel.filter((el, i) => {
            return i != 0 && el.visible_if.device_selection == id
        })[0].practical_tips
    }
    getTipService(id) {
        return this.questionnaireDataUtilization.filter((el) => el.id == `${id}_consum`)[0].practical_tips

    }
    getTheoreticalUseById(id) {
        return this.questionnaireDataMateriel[0].questions.options.filter(el => el.id === id)[0].theoretical_use
    }
    getSecondHandImpact(id) {
        return this.questionnaireDataMateriel[0].questions.options.filter(el => el.id === id)[0].secondHandImpact
    }
    getImpactHourWifiByDevice(id, quality) {

        if (quality === 'audio') return this.questionnaireDataUtilization[0].questions.options.filter(el => el.id === id)[0].impact_audio_wiFi
        return this.questionnaireDataUtilization[0].questions.options.filter(el => el.id === id)[0].impact_hour_wiFi
    }
    getImpactHour4gByDevice(id, quality) {

        if (quality === 'audio') return this.questionnaireDataUtilization[0].questions.options.filter(el => el.id === id)[0].impact_audio_4g
        return this.questionnaireDataUtilization[0].questions.options.filter(el => el.id === id)[0].impact_hour_4g
    }
    getTheoreticalUseServiceById(id) {
        id = id.split('_')[0]
        return this.questionnaireDataUtilization[0].questions.options.filter(el => el.id === id)[0].theoretical_use
    }
    getImpactAiText(id) {
        return this.questionnaireDataUtilization[0].questions.options.filter(el => el.id === id)[0].impact_ai_text
    }
    getImpactAiImage(id) {
        return this.questionnaireDataUtilization[0].questions.options.filter(el => el.id === id)[0].impact_ai_image
    }
    getImpactEmailText(id) {
        return this.questionnaireDataUtilization[0].questions.options.filter(el => el.id === id)[0].impact_email_text
    }
    getImpactEmailAttachment(id) {
        return this.questionnaireDataUtilization[0].questions.options.filter(el => el.id === id)[0].impact_email_attachment
    }
    getImpactEmailAttachment5(id) {
        return this.questionnaireDataUtilization[0].questions.options.filter(el => el.id === id)[0].impact_email_attachment_5
    }
    getImpactEmailSpam(id) {
        return this.questionnaireDataUtilization[0].questions.options.filter(el => el.id === id)[0].impact_email_spam
    }



    /**
  * Adds a device to the selected devices list and recalculates totals
  * @param {Object} device - The device object to add
 
  * */
    setDevicesSelected(device) {
        this.devicesSelected.push(device)
        this.computedSumTotal()
        this.computedSumAverage()
    }
    getDevicesSelected() {
        return this.devicesSelected
    }
    getUserDataDeviceById(id) {
        return this.devicesSelected.filter(el => el.id === id)[0]
    }
    getArrayDeviceIds() {
        return this.getDevicesSelected().map(el => el.id)
    }
    removeUnselectedItem(id, type) {
        const section = type === 'device' ? this.devicesSelected : this.servicesSelected
        const elementById = section.filter(el => el.id === id)[0]
        section.splice(section.indexOf(elementById), 1)
        this.computedSumTotal()
        this.computedSumAverage()

    }
    updateDeviceSelected(deviceId, newData) {
        const element = this.getUserDataDeviceById(deviceId)
        const index = this.getDevicesSelected().indexOf(element)
        this.getDevicesSelected()[index] = newData
    }

    /**
 * Adds a service to the selected services list and recalculates averages
 * @param {Object} service - The service object to add
 * */
    setServicesSelected(service) {
        this.servicesSelected.push(service)
        this.computedSumAverage()
    }
    getServicesSelected() {
        return this.servicesSelected
    }
    getUserDataServiceById(id) {
        return this.servicesSelected.filter(el => el.id === id)[0]
    }
    updateServicesSelected(serviceId, newData) {
        const element = this.getUserDataServiceById(serviceId)
        const index = this.getServicesSelected().indexOf(element)
        this.getServicesSelected()[index] = newData
    }
    getArrayServiceIds() {
        return this.getServicesSelected().map(el => el.id)
    }
    computeImpactFabricationDevices() {
        let total = 0;
        const devicesSelected = this.getArrayDeviceIds()
        this.questionnaireDataMateriel[0].questions.options.map(el => {
            if (devicesSelected.includes(el.id))
                total += el.fabrication
        })
        return total
    }
    averageImpactDevices(simulation = false) {
        const countSimulation = simulation ? simulation : this.getServicesSelected()

        return countSimulation.map(el => {
            const theoreticalTime = this.getTheoreticalUseById(el.id)
            const dailyTime = el.inputUser.day_time 
            const impact = this.getSecondHandImpact(el.id)
            let result = (this.getFabByDevice(el.id) / this.computedYears(el.inputUser) + (this.getYearConsumByDevice(el.id) * dailyTime / theoreticalTime))
            if (el.inputUser.condition == "D'occasion") {
                result = result * ((100 - impact) / 100)
            }
            return result
        })
    }
    /**
 * Calculates the average environmental impact for a specific device
 * @param {string|Object} device - Device ID or device object
 * @returns {string} Formatted impact result with 2 decimal places
 */
    averageImpactByDevice(id) {
        if (typeof (id) === 'object') id = id.id
        if (!this.getArrayDeviceIds().includes(id)) {
            return this.lastAverage
        }
        const elementById = this.devicesSelected.find(el => el.id === id)
        const theoreticalTime = this.getTheoreticalUseById(id)
        const dailyTime = elementById.inputUser.day_time
        let result = this.getFabByDevice(id) / this.computedYears(elementById.inputUser) + this.getYearConsumByDevice(id) * dailyTime / theoreticalTime
        if (elementById.inputUser.condition == "D'occasion") {

            const reduction = this.getSecondHandImpact(id)
            result = result * ((100 - reduction) / 100)
        }
        return result.toFixed(1)
    }

    averageImpactServices(simulation = false) {
        const countSimulation = simulation ? simulation : this.getServicesSelected()
        return countSimulation.map(el => {
            return this.computeImpactByService(el)
        })
    }
    averageImpactByServiceId(id) {
        const elementById = this.getServicesSelected().filter(el => el.id === id)[0]
        return this.computeImpactByService(elementById)
    }
    computeImpactByService(el) {
        if (el.id === "ai") {
            const impactAiText = this.getImpactAiText(el.id)
            const impactAiImage = this.getImpactAiImage(el.id)
            const aitext = el.inputUser.ai_text
            const aiimage = el.inputUser.ai_image / 7
            const result = (impactAiText * aitext + impactAiImage * aiimage) * 365
            return result
        }
        if (el.id === "email") {
            const impactEmailText = this.getImpactEmailText(el.id)
            const impactEmailAttachment = this.getImpactEmailAttachment(el.id)
            const impactEmailAttachment5 = this.getImpactEmailAttachment5(el.id)
            const impactEmailSpam = this.getImpactEmailSpam(el.id)
            const emailtext = el.inputUser.email_text
            const emailattachment = el.inputUser.email_attachment
            const emailattachment5 = el.inputUser.email_attachment_5
            const emailspam = el.inputUser.email_spam
            const result = (impactEmailText * emailtext + impactEmailAttachment * emailattachment + impactEmailAttachment5 * emailattachment5 + impactEmailSpam * emailspam) * 365 / 1000
            return result
        } else {
            const dailyTime = el.inputUser.day_time
            const connection = el.inputUser.connection
            const quality = el.id === 'video' ? el.inputUser.quality : false
            const impuctByHour = connection == false || connection === "4G" ? this.getImpactHour4gByDevice(el.id, quality) : this.getImpactHourWifiByDevice(el.id, quality)
            const result = impuctByHour * dailyTime * 365
            return result
        }
    }
    computeTotalImpactDevices() {
        let total = 0
        this.getDevicesSelected().map(el => {
            total += this.computedYears(el.inputUser) * this.getYearConsumByDevice(el.id)
        })
        return total

    }
    computedSumTotal() {
        this.sumTotal = this.computeImpactFabricationDevices()
        this.sumTotal += this.computeTotalImpactDevices()

    }
    computedSumAverage() {
        this.lastAverage = this.sumAverage
        this.sumAverage = this.computedSumAverageDevices() + this.computedSumAverageServices()
        this.trigger('sumAverageChanged') 

    }
    computedSumAverageDevices(simulation = false) {
        const devices = simulation ? simulation : this.getDevicesSelected()

        if (devices.length === 0) return 0
        const arrayDataDevices = this.averageImpactDevices(devices)
        let total = 0
        arrayDataDevices.map(el => {
            total += Number(el)
        })
        return total
    }
    computedSumAverageServices(simulation = false) {
        const devices = simulation ? simulation : this.getServicesSelected()
        if (devices.length === 0) return 0
        const arrayDataServices = this.averageImpactServices(devices)
        let total = 0
        arrayDataServices.map(el => total += el)
        return total
    }
    getSumTotal() {
        return this.sumTotal.toFixed(1)
    }
    getSumAverage() {
        return this.sumAverage
    }
    setLastAverage(value) {
        this.lastAverage = value
    }

    computedYears(value) {
        let total = value.change + value.yearsUsage
        return total

    }
    toReduceByWifi() {
        this.getServicesSelected().map(el => {
            if (el.inputUser.connection === "4G") return true
        })
        return false
    }
    toReduceByLowQuality() {
        this.getServicesSelected().map(el => {
            if (el.inputUser.quality === "video") return true
        })
        return false
    }
    computeImpactReduction(settings) {
        const {
            checkboxId,
            reductionElementId,
            simulationMethod,
            eventName = "simulationEnabled"
        } = settings;

        const checkbox = document.getElementById(checkboxId);
        if (!checkbox) return;

        const reductionElement = document.getElementById(reductionElementId);
        const last = this.getSumAverage();
        const simulation = this[simulationMethod]();
        const el = checkbox.parentElement.parentElement.querySelector('.smiley-container');
        const impactReduction = last - simulation;
        this._view.updateReductionElement(reductionElement, impactReduction);


        if (checkbox.checked) {
            // Simulation positive
            this.trigger(eventName, simulation);
            this._view.showSmiley(false, el);
        } else {
            // Simulation négative
            this.trigger(eventName, simulation, 'more');
            this._view.showSmiley("more", el);
        }
    }

    computWifiImpact() {
        this.computeImpactReduction({
            checkboxId: 'checkboxWifi',
            reductionElementId: 'reductionWifi',
            simulationMethod: 'simulationAverageWithWifi'
        });
    }
    computReconditioned() {
        this.computeImpactReduction({
            checkboxId: 'checkboxDevicesReconditione',
            reductionElementId: 'reductionDevicesReconditioned',
            simulationMethod: 'simulationAverageWithReconditioned'
        });
    }

    computAudioImpact() {
        this.computeImpactReduction({
            checkboxId: 'checkboxLowQuality',
            reductionElementId: 'reductionLowQuality',
            simulationMethod: 'simulationAverageWithAudio'
        });
    }

    computeLongLifeImpact() {
        this.computeImpactReduction({
            checkboxId: 'checkboxLongLife',
            reductionElementId: 'reductionLongLife',
            simulationMethod: 'simulationAverageLongLife'
        });
    }
    simulationAverageLongLife() {
        const reconditioneChecked = document.querySelector('#checkboxDevicesReconditione') && document.querySelector('#checkboxDevicesReconditione').checked ? true : false
        const reductionReconditione = reconditioneChecked ? parseFloat(document.querySelector('#reductionDevicesReconditioned').dataset.impactReduction) : 0
        // Clonage profond pour éviter de modifier l'original
        const simulation = this.getDevicesSelected().map(el => ({
            ...el,
            inputUser: {
                ...el.inputUser,
                yearsUsage: this.getLifetimeByDevice(el.id),
                change: 0

            }
        }));
               const simulationCondit =this.getDevicesSelected().map(el => ({
           ...el,
           inputUser: {
               ...el.inputUser,
                condition: "D'occasion",
                yearsUsage: this.getLifetimeByDevice(el.id),
               change: 0

           }
       }
   ))
        const total = reconditioneChecked ? this.computedSumAverageDevices(simulationCondit) + reductionReconditione + this.computedSumAverageServices() : this.computedSumAverageDevices(simulation) + this.computedSumAverageServices()

        return total
    }
        simulationAverageWithReconditioned() {
        const longLifeChecked = document.querySelector('#checkboxLongLife') && document.querySelector('#checkboxLongLife').checked ? true : false
        const reductionLongLife = longLifeChecked ? parseFloat(document.querySelector('#reductionLongLife').dataset.impactReduction) : 0
        // Clonage profond pour éviter de modifier l'original
        const simulation = this.getDevicesSelected().map(el => ({
            ...el,
            inputUser: {
                ...el.inputUser,
                condition: "D'occasion", // Affectation directe sans modifier l'original
            }
        }));
            const simulationCondit = this.getDevicesSelected().map(el => ({
              ...el,
            inputUser: {
                ...el.inputUser,
                 condition: "D'occasion",
                yearsUsage: this.getLifetimeByDevice(el.id),
                change: 0

            }}))

        const total = longLifeChecked ?  this.computedSumAverageDevices(simulationCondit) +reductionLongLife + this.computedSumAverageServices() : this.computedSumAverageDevices(simulation) + this.computedSumAverageServices()
        return total
    }
    simulationAverageWithWifi() {
        const connectionAudioChecked = document.querySelector('#checkboxLowQuality') && document.querySelector('#checkboxLowQuality').checked ? true : false
        const reductionAudio = connectionAudioChecked ? parseFloat(document.querySelector('#reductionLowQuality').dataset.impactReduction) : 0
        // Clonage profond pour éviter de modifier l'original
        const simulation = this.getServicesSelected().map(el => ({
            ...el,
            inputUser: {
                ...el.inputUser,
                quality: connectionAudioChecked ? "audio" : el.inputUser.quality, // Si l'option audio est cochée, on change la qualité

                connection: "Wi-fi"
            }
        }));
        const total = connectionAudioChecked ? this.computedSumAverageDevices() + reductionAudio + this.computedSumAverageServices(simulation) : this.computedSumAverageDevices() + this.computedSumAverageServices(simulation)
        return total
    }
    simulationAverageWithAudio() {
        const connectionWifiChecked = document.querySelector('#checkboxWifi') && document.querySelector('#checkboxWifi').checked ? true : false
        const reductionWifi = connectionWifiChecked ? parseFloat(document.querySelector('#reductionWifi').dataset.impactReduction) : 0
        // Clonage profond des services sélectionnés
        const simulation = this.getServicesSelected().map(el => ({
            ...el,
            inputUser: {
                ...el.inputUser,

                connection: connectionWifiChecked ? "Wi-fi" : el.inputUser.connection,
                quality: "audio"
            }
        }));

        const total = connectionWifiChecked ? this.computedSumAverageDevices() + reductionWifi + this.computedSumAverageServices(simulation) : this.computedSumAverageDevices() + this.computedSumAverageServices(simulation)
        return total
    }

}
export default Model
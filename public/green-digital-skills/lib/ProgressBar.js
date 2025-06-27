import Controller from './Controller.js';
import View from './View.js';
import Model from './Model.js';
import Observable from "./Observable.js";

class ProgressBar extends Observable {
    constructor() {
        // Singleton pattern check
        if (typeof ProgressBar._instance !== 'undefined') {
            return ProgressBar._instance;
        } // Observable Inheritance
        super();
        // Singleton pattern instanciation 
        ProgressBar._instance = this;
        this._controller = new Controller();
        this._model = new Model();
        this._view = new View();


    }
    init() {
    }
    updateProgressAverage() {
        const growBar = document.querySelector('.grow-bar');
        const textGrowBar = document.querySelector('.text-grow-bar');
        const progressBar = document.getElementById('progressBarAverage');
        const progressContainerImg = document.querySelector('.progress-container img');
        const progressBarAverageText = document.getElementById('progressBarAverageText');
        const whiteSheen = document.querySelector('.white-sheen');

        const MAX_CO2_VALUE = 400;
        const MIN_CO2_VALUE = 300;
        this.smileUpdate();

        const co2Value = 0;
        const lastAverage = this._model.lastAverage;
        const sumAverage = this._model.getSumAverage();

        // Vérifie si les éléments DOM existent
        if (!growBar || !textGrowBar || !progressBar || !progressContainerImg || !progressBarAverageText || !whiteSheen) {
            console.error('Un ou plusieurs éléments DOM non trouvés');
            return;
        }

        // Mise à jour du texte de la barre de progression
        progressBarAverageText.innerHTML = `${co2Value} ${this._view.getStringElts().co2}`;

        if (lastAverage === MAX_CO2_VALUE && sumAverage < MIN_CO2_VALUE) {
            this._model.setLastAverage(0);
        }

        if (lastAverage === undefined) {
            document.getElementById('progressBarAverageText').innerHTML = `${co2Value} ${this._view.getStringElts().co2}`;

            return;
        }

        if (sumAverage === 0) {
            textGrowBar.innerText = "";
            progressBar.style.display = 'block';
            progressBar.style.left = '0%';
            progressBar.style.width = '100%';
            growBar.style.width = '0%';
            return;
        }

        let value = Math.min(sumAverage, MAX_CO2_VALUE);

        // Affiche ou masque l'image en fonction de la valeur
        progressContainerImg.style.display = value >= MAX_CO2_VALUE ? "block" : "none";
        progressBar.style.display = value >= MAX_CO2_VALUE ? 'none' : 'block';
        growBar.style.display = value >= MAX_CO2_VALUE ? 'none' : 'block';

        // Met à jour la position et la largeur de la barre de progression
        progressBar.style.left = `${value / 4}%`;
        progressBar.style.width = `${100 - value / 4}%`;

        const growBarWidth = value - lastAverage;

        if (growBarWidth > 0) {
            growBar.classList.add('shadow-grow-bar');
            whiteSheen.classList.remove('reverse');
            growBar.style.width = `${growBarWidth / 4}%`;
            growBar.style.left = `${lastAverage / 4}%`;
            textGrowBar.innerText = `+${growBarWidth.toFixed(1)}`;
            textGrowBar.style.left = `${lastAverage / 4}%`;
        } else {
            growBar.classList.add('shadow-grow-bar');
            whiteSheen.classList.add('reverse');
            growBar.style.width = `${Math.abs(growBarWidth) / 4}%`;
            growBar.style.left = `${value / 4}%`;
            textGrowBar.innerText = `${growBarWidth.toFixed(1)}`;
            textGrowBar.style.left = `${value / 4}%`;
        }

        if (value >= MAX_CO2_VALUE) {
            textGrowBar.innerText = '';
        }

        // Met à jour le texte final de la barre de progression
        progressBarAverageText.innerHTML = `${sumAverage.toFixed(1)} ${this._view.getStringElts().co2}`;
    }

    addProgressBarSimulation() {
        // Sélection des éléments DOM
        const containerQuestion = document.querySelector("#simul-container");
        const progressBar = document.querySelector('.progress-container');

        // Vérification si les éléments DOM existent
        if (!containerQuestion || !progressBar) {
            console.error('Un ou plusieurs éléments DOM non trouvés');
            return;
        }

        // Clonage de la barre de progression
        const newProgressBar = progressBar.cloneNode(true);
        newProgressBar.id = 'progressBarCopy';

        // Clonage du texte de la moyenne
        let average = document.querySelector('#progressBarAverageText').cloneNode(true);
        if (document.querySelector('#progressBarAverageTextSimulation')) {
            average = document.querySelector('#progressBarAverageTextSimulation')
        } else average.id = 'progressBarAverageTextSimulation';

        // Ajout des éléments clonés au conteneur de la question
        containerQuestion.appendChild(average);
        containerQuestion.appendChild(newProgressBar);

        // Modification de l'identifiant de la barre de progression clonée
        const progressBarAverageSimulation = newProgressBar.querySelector('#progressBarAverage');
        if (progressBarAverageSimulation) {
            progressBarAverageSimulation.id = 'progressBarAverageSimulation';
        }

        // Ajout de la classe 'reverse' à l'élément gradient
        const gradient = document.querySelector('#simul-container .white-sheen');
        if (gradient) {
            gradient.classList.add('reverse');
        }
    }

    updateProgressSimulation(reduction, type) {
        const MAX_CO2_VALUE = 400; // Définir une constante pour la valeur maximale de CO2

        const progressContainer = document.querySelector('#progressBarCopy');
        if (!progressContainer) {
            console.error('Élément progressContainer non trouvé');
            return;
        }

        const growBar = progressContainer.querySelector('.grow-bar');
        const whiteSheen = growBar?.querySelector('.white-sheen');
        const textGrowBar = progressContainer.querySelector('.text-grow-bar');
        const progressBar = progressContainer.querySelector('#progressBarAverageSimulation');
        const progressBarCopyImg = document.querySelector('#progressBarCopy img');
        const averageSimulation = document.getElementById('progressBarAverageTextSimulation');

        // Vérification si les éléments DOM existent
        if (!growBar || !whiteSheen || !textGrowBar || !progressBar || !progressBarCopyImg || !averageSimulation) {
            console.error('Un ou plusieurs éléments DOM non trouvés');
            return;
        }

        // Gestion de la classe 'reverse' en fonction du type
        if (type === "more") {
            whiteSheen.classList.remove('reverse');
        } else {
            whiteSheen.classList.add('reverse');
        }

        let value = this._model.getSumAverage();
        const impactReduction = value - reduction;

        if (this.simulationSold === 0) {
            textGrowBar.innerText = "";
            progressBar.style.display = 'block';
            progressBar.style.left = '0%';
            progressBar.style.width = '100%';
            growBar.style.width = '0%';
            return;
        }

        const sign = type === 'more' ? '+' : '-';
        this.simulationSold = type === 'more' ? this.simulationSold + impactReduction : this.simulationSold - impactReduction;

        const growBarWidth = impactReduction;

        // Mise à jour de la barre de progression
        progressBar.style.display = 'block';
        progressBar.style.left = `${this.simulationSold / 4}%`;
        progressBar.style.width = `${100 - this.simulationSold / 4}%`;

        // Mise à jour de la barre de croissance
        growBar.style.width = `${Math.min(impactReduction / 4, (MAX_CO2_VALUE - this.simulationSold) / 4)}%`;
        growBar.style.left = `${this.simulationSold / 4}%`;

        // Mise à jour du texte de la barre de croissance
        textGrowBar.innerText = `${sign}${growBarWidth.toFixed(1)}`;
        textGrowBar.style.left = `${this.simulationSold / 4}%`;

        if (type === 'more') {
            growBar.classList.add('shadow-grow-bar');
            growBar.style.left = `${(this.simulationSold - impactReduction) / 4}%`;
            textGrowBar.style.left = `${(this.simulationSold - impactReduction) / 4}%`;
        }

        // Gestion de la valeur maximale
        if (this.simulationSold > MAX_CO2_VALUE) {
            textGrowBar.innerText = '';
            value = MAX_CO2_VALUE;
            progressBarCopyImg.style.display = "block";
            progressBar.style.display = 'none';
            growBar.style.display = 'none';
        } else {
            progressBarCopyImg.style.display = "none";
            progressBar.style.display = 'block';
            growBar.style.display = 'block';
        }
        const result = value - this._view.getTotalReduction()
        // Mise à jour du texte de la moyenne de simulation
        averageSimulation.innerHTML = `Total avec reduction: ${result.toFixed(1)} ${this._view.getStringElts().co2}`;
        if (type === 'more') averageSimulation.dataset.lastReduction = this.simulationSold.toFixed(2);
        else averageSimulation.dataset.lastReduction = 0;

    }
    updateProgressBarSimulation(impuctReduction, type = false) {
        document.querySelector('#simul-container').classList.remove('d-none')
        if (document.querySelector('#progressBarCopy') === null || document.querySelector('#progressBarCopy') === undefined) {
            this.addProgressBarSimulation()
            this.simulationSold = this._model.getSumAverage()
        }
        this.updateProgressSimulation(impuctReduction, type)
    }




    smileUpdate() {

        const smile = document.querySelector('.smileProgression');
        const sum = this._model.getSumAverage();

        // Vérification si l'élément existe avant de modifier son contenu
        if (!smile) {
            console.error("L'élément avec la classe '.smileProgression' est introuvable.");
            return;
        }
        switch (true) {
            case (sum < 50): // Pour les valeurs de 0 à 49
                smile.innerHTML = "😀"; // Content
                break;
            case (sum >= 50 && sum < 100): // Pour les valeurs de 50 à 99
                smile.innerHTML = "😊"; // Sourire avec les joues rosées
                break;
            case (sum >= 100 && sum < 150): // Pour les valeurs de 100 à 149
                smile.innerHTML = "🙂"; // Léger sourire
                break;
            case (sum >= 150 && sum < 200): // Pour les valeurs de 150 à 199
                smile.innerHTML = "😌"; // Soulagé
                break;
            case (sum >= 200 && sum < 250): // Pour les valeurs de 200 à 249
                smile.innerHTML = "🫠"; // Fondant
                break;
            case (sum >= 250 && sum < 300): // Pour les valeurs de 250 à 299
                smile.innerHTML = "😕"; // Perplexe
                break;
            case (sum >= 300 && sum < 340): // Pour les valeurs de 300 à 339
                smile.innerHTML = "😵"; // Étourdi
                break;
            case (sum >= 340 && sum < 370): // Pour les valeurs de 340 à 369
                smile.innerHTML = "🥵"; // Chaleur intense
                break;
            case (sum >= 370): // Pour les valeurs de 370 à 400
                smile.innerHTML = "🤯"; // Esprit soufflé
                break;
            default: // Pour les valeurs supérieures à 400
                smile.innerHTML = "👎"; // Hand down
                break;
        }

    }
}
export default ProgressBar
class ProgrammingPage {
    constructor(isMobile) {
        this.isMobile = isMobile;
        this.types = new Set();
        this.levels = new Set();
        this.languages = new Set();
        this.searchParam = '';
        this.divTags = document.querySelector('#filter-tags');
        this.pageItems = document.querySelectorAll('.interface-container');

        if (this.isMobile) {
            this.searchInput = document.querySelector('#interface-search-mobile');
            this.filtersContainer = document.querySelector('#filters-mobile');
        } else {
            this.searchInput = document.querySelector('#interface-search');
            this.filtersContainer = document.querySelector('#filters');
        }

        this.initialize();
    }

    initialize() {
        this.filtersContainer.querySelectorAll('.filter-type, .filter-lng, .filter-level').forEach((filter) => {
            filter.addEventListener('change', () => this.update());
        });
        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => this.update());
        }
        this.updateFromURL();

        const title = document.getElementById("anchor-title");
        const btn1 = document.getElementById("back-to-top");

        // Création d'un IntersectionObserver pour surveiller l'élément "title"
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Si le titre est visible, le bouton reste masqué
                if (entry.isIntersecting) {
                    if (!btn1.classList.contains('d-none')) {
                        btn1.classList.add('d-none');
                    }
                } else {
                    // Si le titre n'est pas visible, le bouton apparaît
                    if (btn1.classList.contains('d-none')) {
                        btn1.classList.remove('d-none');
                    }
                }
            });
        });

        // Démarrer l'observation sur l'élément "title"
        observer.observe(title);


        btn1.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth" // Défilement en douceur
            });
        });
    }

    update() {
        this.updateFilters();
        this.updateTags();
        this.updateURLByFilters();
        this.applyFilters();
    }

    applyFilters() {
        // Filtrer les éléments en fonction des tags (filtres)
        this.pageItems.forEach((element) => {
            this.checkVisibilityByTag(element);
        });
        // Filtrer en fonction de l'input
        if (this.searchInput) {
            const searchText = this.searchInput.value.toLowerCase();
            if (searchText) {
                // Recherche sur les éléments de la page en fonction du texte
                this.pageItems.forEach((element) => {
                    this.checkVisibilityBySearchInput(element, searchText);
                });
            }
        }
    }

    updateFilters() {
        this.types.clear();
        this.levels.clear();
        this.languages.clear();

        this.filtersContainer.querySelectorAll('.filter-type:checked').forEach((checkbox) => {
            this.types.add(checkbox.value);
        });

        this.filtersContainer.querySelectorAll('.filter-level:checked').forEach((checkbox) => {
            this.levels.add(checkbox.value);
        });

        this.filtersContainer.querySelectorAll('.filter-lng:checked').forEach((checkbox) => {
            this.languages.add(checkbox.value);
        });

        if (this.searchInput) {
            this.searchParam = this.searchInput.value;
        }
    }

    updateTags() {
        this.divTags.innerHTML = '';

        // Créer une liste de tous les filtres sélectionnés
        const allFilters = [...this.types, ...this.languages, ...this.levels];

        // Vérification si des filtres existent
        if (allFilters.length === 0) {
            return;
        }

        // Ajouter chaque filtre sous forme de tag dans le DOM
        allFilters.forEach((filter) => {
            const tagDiv = document.createElement('div');
            tagDiv.classList.add('d-inline-flex', 'align-items-center', 'bg-light', 'border', 'rounded-pill', 'px-3', 'py-2', 'mb-3');
            tagDiv.id = "filter-tag";

            const tagSpan = document.createElement('span');
            tagSpan.classList.add('me-2');
            tagSpan.innerText = filter;

            const tagButton = document.createElement('button');
            tagButton.classList.add('btn-close');
            tagButton.setAttribute('aria-label', 'Close');
            tagButton.style.fontSize = '0.75rem';
            tagButton.addEventListener('click', () => {
                this.filtersContainer.querySelectorAll('input[class^="filter-"]').forEach(input => {
                    if (input.value === filter) {
                        input.checked = false;
                    }
                });
                this.update();
            });

            // Ajouter les éléments créés au tag
            tagDiv.appendChild(tagSpan);
            tagDiv.appendChild(tagButton);
            this.divTags.appendChild(tagDiv);
        });
    }

    checkVisibilityByTag(element) {
        const thisType = element.getAttribute('data-type');
        const thisLanguage = element.getAttribute('data-code');
        const thisLevel = element.getAttribute('data-level');

        let typeValid = true;
        let levelValid = true;
        let lngValid = true;

        if (this.types.size > 0) {
            typeValid = [...this.types].some((t) => thisType.includes(t));
        }
        if (this.levels.size > 0) {
            levelValid = [...this.levels].some((l) => thisLevel.includes(l));
        }
        if (this.languages.size > 0) {
            lngValid = [...this.languages].some((l) => thisLanguage.includes(l));
        }

        if (typeValid && levelValid && lngValid) {
            element.classList.remove('hidden');  // Afficher l'élément
        } else {
            element.classList.add('hidden');  // Masquer l'élément
        }
    }

    checkVisibilityBySearchInput(element, searchText) {
        if (!element.classList.contains('hidden')) {
            const textContent = element.textContent || element.innerText;
            if (textContent.toLowerCase().includes(searchText)) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    }

    updateURLByFilters() {

        // Construire l'URL avec les paramètres
        const baseURL = window.location.pathname;  // Récupérer l'URL sans les paramètres
        const urlParams = [];

        if (this.types.size > 0) urlParams.push('types=' + [...this.types].join(','));
        if (this.levels.size > 0) urlParams.push('levels=' + [...this.levels].join(','));
        if (this.languages.size > 0) urlParams.push('languages=' + [...this.languages].join(','));
        if (this.searchParam) urlParams.push('q=' + encodeURIComponent(this.searchParam));

        // Joindre tous les paramètres
        const newURL = baseURL + '?' + urlParams.join('&');

        // Mettre à jour l'URL sans recharger la page
        history.pushState(null, '', newURL);
    }

    updateFromURL() {
        this.cleanURL();
        const searchParam = $_GET('q');
        const types = $_GET('types');
        const levels = $_GET('levels');
        const languages = $_GET('languages');

        if (searchParam && this.searchInput) {
            this.searchInput.value = searchParam;
        }

        const setInputState = (value, dropdown) => {
            this.filtersContainer.querySelectorAll(`input.filter-${dropdown}[value="${value}"]`).forEach((input) => {
                input.checked = true;
            });
        };

        if (types) {
            types.split(',').forEach(function (type) {
                setInputState(type, 'type');
            });
        }
        if (levels) {
            levels.split(',').forEach(function (level) {
                setInputState(level, 'level');
            });
        }
        if (languages) {
            languages.split(',').forEach(function (lng) {
                setInputState(lng, 'lng');
            });
        }

        if (types || levels || languages || searchParam) {
            this.updateFilters();
            this.updateTags();
            this.applyFilters();
        }
    }

    cleanURL() {
        const validParams = ['types', 'q', 'languages', 'levels'];
        const url = new URL(window.location.href);  // Récupérer l'URL actuelle
        const searchParams = new URLSearchParams(url.search);

        // Supprimer les paramètres invalides
        searchParams.forEach((value, key) => {
            if (!validParams.includes(key)) {
                searchParams.delete(key);
            }
        });

        // Mettre à jour l'URL avec les paramètres valides seulement
        const newURL = url.pathname + '?' + searchParams.toString();
        history.pushState(null, '', newURL);  // Mettre à jour l'URL sans recharger la page
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(userAgent);
    window.codePage = new ProgrammingPage(isMobileDevice);
});

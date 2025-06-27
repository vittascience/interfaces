document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.filter-type, .filter-lng, .filter-level').forEach(function (filter) {
        filter.addEventListener('change', function () {
            doFilters();
        });
    });

    document.querySelector('#interface-search').addEventListener('input', function () {
        search(this);
    });
    document.querySelector('#interface-search-mobile').addEventListener('input', function () {
        search(this);
    });
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
});

function search(input) {
    let search = input.value.toLowerCase();
    console.log(search);
    document.querySelectorAll('.interface-container').forEach(function (element) {
        if (!element.classList.contains('hidden')) {
            element.classList.add('hidden');
        }
        let name = element.attributes['data-name'].value.toLowerCase();
        if (name.includes(search)) {
            element.classList.remove('hidden');
        }
    });
}

function doFilters() {
    let type = [];
    let code = [];
    let level = [];
    const divTags = document.querySelector('#filter-tags');
    document.querySelectorAll('.filter-type').forEach(function (filter) {
        if (filter.checked) {
            type.push(filter.value);
        }
    });
    document.querySelectorAll('.filter-lng').forEach(function (filter) {
        if (filter.checked) {
            code.push(filter.value);
        }
    });
    document.querySelectorAll('.filter-level').forEach(function (filter) {
        if (filter.checked) {
            level.push(filter.value);
        }
    });
    const allFilters = type.concat(code).concat(level);
    divTags.innerHTML = '';
    allFilters.forEach(function (filter) {
        const tagDiv = document.createElement('div');
        tagDiv.classList.add('d-inline-flex', 'align-items-center', 'bg-light', 'border', 'rounded-pill', 'px-3', 'py-2', 'mb-3');
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('me-2');
        tagSpan.innerText = filter;
        const tagButton = document.createElement('button');
        tagButton.classList.add('btn-close');
        tagButton.setAttribute('aria-label', 'Close');
        tagButton.style.fontSize = '0.75rem';
        tagButton.addEventListener('click', function () {
            document.querySelectorAll('input[class^="filter-"]').forEach(input => {
                if (input.value == filter) {
                    input.checked = false;
                }
            });
            doFilters();
        });
        tagDiv.appendChild(tagSpan);
        tagDiv.appendChild(tagButton);
        divTags.appendChild(tagDiv);
    });

    document.querySelectorAll('.interface-container').forEach(function (element) {
        if (!element.classList.contains('hidden')) {
            element.classList.add('hidden');
        }
        let typeShow = false;
        let codeShow = false;
        let levelShow = false;
        let thisType = element.attributes['data-type'].value;
        let thisCode = element.attributes['data-code'].value;
        let thisLevel = element.attributes['data-level'].value;
        if (type.length == 0 && code.length == 0 && level.length == 0) {
            if (element.classList.contains('hidden')) {
                element.classList.remove('hidden');
            }
            return;
        }
        type.some(function (t) {
            if (thisType.includes(t)) {
                typeShow = true;
                return true;
            }
        });
        code.some(function (l) {
            if (thisCode.includes(l)) {
                codeShow = true;
                return true;
            }
        });
        level.some(function (l) {
            if (thisLevel.includes(l)) {
                levelShow = true;
                return true;
            }
        });

        if (typeShow || codeShow || levelShow) {
            element.classList.remove('hidden');
        }
    });
}

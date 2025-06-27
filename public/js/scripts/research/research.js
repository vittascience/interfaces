document.addEventListener("DOMContentLoaded", function () {
    function loadWorks(page) {
        fetch(`/services/get/getResearch.php?page=${page}&type=works`)
            .then(response => response.json())
            .then(data => {
                const worksList = document.getElementById('works-list');
                worksList.innerHTML = ''; // Réinitialiser la liste des articles
                worksList.innerHTML += "<hr>";
                data.works.forEach((work) => {
                    const workHTML = `
                        <div class="work-post d-flex flex-row justify-content-between align-items-center">
                            <div class="d-flex flex-column flex-md-row">
                                <p class="m-0 fw-bold text-primary" style="min-width: fit-content;">
                                    ${checkIfDateIsValid(work.date)}
                                </p>
                                <div class="d-flex gap-2 flex-column flex-grow-1 mx-md-4 text-start">
                                    <p class="mb-0 fw-bold">${work.title}</p>
                                    <p class="mb-0">${work.content}</p>
                                </div>
                            </div>
                            <div class="d-md-flex flex-row mx-4 gap-2">
                                <p class="d-none d-md-flex mb-0 fw-bold rounded border border-info text-info px-2">${work.category}</p>
                                <a href="${work.link}" target="_blank" class="btn btn-sm btn-primary align-self-center h-auto" data-i18n="research.section3.btn">Accéder</a>
                            </div>
                            
                        </div>
                        <hr>
                    `;
                    worksList.innerHTML += workHTML;
                });

                updatePagination(data.totalPages, data.currentPage, "works");
            })
            .catch(error => console.error('Erreur lors du chargement des articles:', error));
    }
    loadWorks(1);
    function loadEvents(page) {
        fetch(`/services/get/getResearch.php?page=${page}&type=events`)
            .then(response => response.json())
            .then(data => {
                const eventsList = document.getElementById('events-list');
                eventsList.innerHTML = ''; // Réinitialiser la liste des articles
                const currentDate = new Date();
                data.works.forEach((event) => {
                    const eventHTML = `
                        <div class="event-card">
                            ${new Date(event.date) > currentDate ? '<span class="badge rounded-pill text-bg-info event-badge">A venir</span>' : ''}
                            <img src="/public/content/user_data/research/images/${event.image}" class="img-fluid rounded-circle" alt="image ${event.title}" style="width: 125px; height: 125px;">
                            <p class="text-center my-2">${checkIfDateIsValid(event.date)} - ${event.type}</p>
                            <p class="text-center vitta-green fw-bold">${event.title}</p>
                            <p>${event.content}</p>
                            <a href="${event.link}" class="btn btn-primary align-self-center h-auto" data-i18n="research.section5.btn">Accéder à l’événement</a>
                        </div>
                    `;
                    eventsList.innerHTML += eventHTML;
                });

                updatePagination(data.totalPages, data.currentPage, 'events');
            })
            .catch(error => console.error('Erreur lors du chargement des events:', error));
    }
    loadEvents(1);
    function checkIfDateIsValid(date) {
        try {
            return new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch (error) {
            console.error('Erreur lors du formatage de la date:', error);
            return date;
        }
    }
    function updatePagination(totalPages, currentPage, type) {
        let paginationContainer;
        if (type == "works") {
            paginationContainer = document.getElementById('works-pagination');
        } else {
            paginationContainer = document.getElementById('events-pagination');
        }

        paginationContainer.innerHTML = '';

        let pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Toujours afficher la première page
            pages.push(1);

            let lower, upper;
            if (currentPage === 1) {
                // Si on est sur la première page, afficher 2 et 3
                lower = 2;
                upper = 3;
            } else if (currentPage === 2 || currentPage === 3) {
                // Si on est sur la page 2 ou 3, afficher 2 à 4
                lower = 2;
                upper = 4;
            } else if (currentPage >= totalPages - 1) {
                // Si on est sur la dernière ou l'avant-dernière page, afficher les 2 pages précédentes
                lower = totalPages - 2;
                upper = totalPages - 1;
            } else {
                // Dans les autres cas, afficher la page précédente, la page courante et la page suivante
                lower = currentPage - 1;
                upper = currentPage + 1;
            }

            // Ajout d'une ellipse si l'intervalle ne commence pas directement après la première page
            if (lower > 2) {
                pages.push('...');
            }

            // Ajout des numéros de pages de la plage déterminée
            for (let i = lower; i <= upper; i++) {
                pages.push(i);
            }

            // Ajout d'une ellipse si l'intervalle ne se termine pas juste avant la dernière page
            if (upper < totalPages - 1) {
                pages.push('...');
            }

            // Toujours afficher la dernière page
            pages.push(totalPages);
        }


        // Création des éléments de pagination
        pages.forEach(page => {
            if (page === '...') {
                const span = document.createElement('a');
                span.textContent = '...';
                span.classList.add('pagination-ellipsis', 'btn-pagination', 'no-hover'); // Vous pouvez ajouter du style via CSS
                paginationContainer.appendChild(span);
            } else {
                const link = document.createElement('a');
                link.href = "#";
                link.textContent = page;
                link.classList.add('btn-pagination');
                if (page === currentPage) {
                    link.classList.add('active'); // Style pour la page active
                }
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (type === 'works') {
                        loadWorks(page);
                    } else {
                        loadEvents(page);
                    }
                });
                paginationContainer.appendChild(link);
            }
        });
    }
});
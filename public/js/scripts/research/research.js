document.addEventListener("DOMContentLoaded", function () {
    let lng = 'fr';
    if (getCookie('lng').length > 0) {
        lng = getCookie('lng');
    }
    let suffix = '';
    if (lng !== 'fr') {
        suffix = `_en`;
    }
    const FEATURED_VIDEO_ID = 'x6Hor2yPwko';
    const FEATURED_VIDEO_TITLE = "Les doctoriales 2025";
    const FEATURED_VIDEO_DATE = '10 Janvier 2025';

    document.getElementById('works-list').addEventListener('click', function (e) {
        const thumb = e.target.closest('.video-thumbnail');
        if (!thumb) return;
        const videoId = thumb.dataset.videoId;
        const modalIframe = document.getElementById('videoModalIframe');
        modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        const modal = new bootstrap.Modal(document.getElementById('videoModal'));
        modal.show();
    });

    document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
        document.getElementById('videoModalIframe').src = '';
    });

    function loadWorks(page) {
        fetch(`/services/get/getResearch.php?page=${page}&type=works`)
            .then(response => response.json())
            .then(data => {
                const worksList = document.getElementById('works-list');
                worksList.innerHTML = `
                    <div class="work-card work-card-featured">
                        <p class="text-center my-2">${checkIfDateIsValid(FEATURED_VIDEO_DATE)}</p>
                        <p class="text-center vitta-green fw-bold mb-3">${FEATURED_VIDEO_TITLE}</p>
                        <div class="video-thumbnail" data-video-id="${FEATURED_VIDEO_ID}" role="button" aria-label="Lire la vidéo">
                            <img src="https://img.youtube.com/vi/${FEATURED_VIDEO_ID}/hqdefault.jpg" alt="Miniature vidéo" class="img-fluid rounded">
                            <div class="video-play-btn"><i class="fa fa-play"></i></div>
                        </div>
                        <a href="https://www.youtube.com/watch?v=${FEATURED_VIDEO_ID}" target="_blank" class="btn btn-primary align-self-center h-auto mt-auto" data-i18n="research.section3.btn">${i18next.t('research.section3.btn')}</a>
                    </div>
                `;
                data.works.forEach((work) => {
                    const workHTML = `
                        <div class="work-card">
                            <p class="text-center my-2">${checkIfDateIsValid(work.date)}</p>
                            <p class="text-center vitta-green fw-bold">${work['title' + suffix]}</p>
                            <p class="text-center">${work['content' + suffix]}</p>
                            <hr class="border-secondary w-100 mt-auto">
                            <span class="badge rounded-pill text-bg-info work-badge" title="${work['category' + suffix]}">${work['category' + suffix]}</span>
                            <hr class="border-secondary w-100">
                            <a href="${work.link}" target="_blank" class="btn btn-primary align-self-center h-auto" data-i18n="research.section3.btn">${i18next.t('research.section3.btn')}</a>
                        </div>
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
                            <img src="/public/content/user_data/research/images/${event.image}" class="img-fluid rounded-circle" alt="image ${event['title' + suffix]}" style="width: 125px; height: 125px;">
                            <p class="text-center my-2">${checkIfDateIsValid(event.date)} - ${event['type' + suffix]}</p>
                            <p class="text-center vitta-green fw-bold">${event['title' + suffix]}</p>
                            <p>${event['content' + suffix]}</p>
                            <a href="${event.link}" class="btn btn-primary align-self-center h-auto mt-auto" data-i18n="research.section5.btn">${i18next.t('research.section5.btn')}</a>
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
document.addEventListener("DOMContentLoaded", function () {
    /* let currentPageArticle = 1;
    let totalPagesArticle = 1; // Cette valeur sera mise à jour après le premier appel AJAX.

    let currentPagePresse = 1;
    let totalPagesPresse = 1; // Cette valeur sera mise à jour après le premier appel AJAX. */

    // Fonction pour charger les articles
    function loadArticles(page) {
        fetch(`/services/get/getMedia.php?page=${page}&type=article`)
            .then(response => response.json())
            .then(data => {
                const articlesList = document.getElementById('media-articles-list');
                articlesList.innerHTML = ''; // Réinitialiser la liste des articles
                articlesList.innerHTML += "<hr>";

                data.articles.forEach((article, index) => {
                    const articleHTML = `
                        <div class="row ${index % 2 === 0 ? "" : "flex-row-reverse"}">
                            <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
                                <img src="/public/content/user_data/kit_media/images/${article.image}" alt="Image ${article.image}" class="img-fluid rounded w-75">
                            </div>
                            <div class="col-12 col-md-6 d-flex flex-column justify-content-between align-items-start">
                                <div class="d-flex flex-column">
                                    <p>${checkIfDateIsValid(article.date)} — ${article.category}</p>
                                    <h3 class="text-uppercase">${article.title}</h3>
                                    <p>${article.content}</p>
                                </div>
                                <a href="${article.link}" target="_blank" class="btn btn-primary">Lire l'article</a>
                            </div>
                        </div>
                        <hr>
                    `;
                    articlesList.innerHTML += articleHTML;
                });

                // Mettre à jour le totalPages (au cas où il changerait)
                /* totalPages = data.totalPages;
                currentPage = data.currentPage; */

                // Mise à jour de la pagination dynamique
                updatePagination(data.totalPages, data.currentPage, 'articles');
            })
            .catch(error => console.error('Erreur lors du chargement des articles:', error));
    }
    loadArticles(1);

    function loadPresse(page) {
        fetch(`/services/get/getMedia.php?page=${page}&type=presse`)
            .then(response => response.json())
            .then(data => {
                const pressesList = document.getElementById('media-presse-list');
                pressesList.innerHTML = ''; // Réinitialiser la liste des articles
                pressesList.innerHTML += "<hr>";
                data.articles.forEach((article, index) => {
                    const articleHTML = `
                        <div class="blog-post d-flex flex-row justify-content-between align-items-center">
                            <p class="m-0 fw-bold text-primary" style="min-width: fit-content;">
                                ${checkIfDateIsValid(article.date)}
                            </p>
                            <div class="d-flex flex-column flex-grow-1 mx-4">
                                <p class="mb-0 fw-bold">${article.content}</p>
                            </div>
                            <a href="/public/content/user_data/kit_media/pdf/${article.pdf}" target="_blank" class="btn btn-sm btn-primary">Accéder</a>
                        </div>
                        <hr>
                    `;
                    pressesList.innerHTML += articleHTML;
                });

                // Mettre à jour le totalPages (au cas où il changerait)
                /* totalPagesPresse = data.totalPages;
                currentPagePresse = data.currentPage; */

                updatePagination(data.totalPages, data.currentPage, 'presses');
            })
            .catch(error => console.error('Erreur lors du chargement des articles:', error));
    }
    loadPresse(1);

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
        if (type === 'articles') {
            paginationContainer = document.getElementById('media-articles-pagination');
        } else {
            paginationContainer = document.getElementById('media-presse-pagination');
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
                    if (type === 'articles') {
                        loadArticles(page);
                    } else {
                        loadPresse(page);
                    }
                });
                paginationContainer.appendChild(link);
            }
        });
    }

});

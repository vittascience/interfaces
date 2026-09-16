document.addEventListener("DOMContentLoaded", function () {
    const I18N = window.WEBINARS_I18N || {
        inscription: "Inscription",
        replay: "Replay",
        agenda: { google: "Google Agenda", yahoo: "Yahoo Agenda", outlook: "Outlook" }
    };
    const USER = window.WEBINARS_USER || { email: "", firstname: "" };

    function escapeHtml(value) {
        if (value === null || value === undefined) return "";
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function thumbInner(w) {
        if (w.thumbnail) {
            return `<img src="${escapeHtml(w.thumbnail)}" alt="${escapeHtml(w.title)}" loading="lazy">`;
        }
        return `<i class="fa-solid fa-photo-film webinar-thumb-placeholder" aria-hidden="true"></i>`;
    }

    function langBadge(w) {
        if (!w.language) return "";
        return `<span class="webinar-lang">${escapeHtml(w.language)}</span>`;
    }

    function agendaLinks(w) {
        if (!w.agenda) return "";
        const a = w.agenda;
        return `
            <div class="webinar-agenda">
                <a class="webinar-agenda-link" href="${escapeHtml(a.google)}" target="_blank" rel="noopener" title="${escapeHtml(I18N.agenda.google)}" aria-label="${escapeHtml(I18N.agenda.google)}"><i class="fa-brands fa-google" aria-hidden="true"></i></a>
                <a class="webinar-agenda-link" href="${escapeHtml(a.yahoo)}" target="_blank" rel="noopener" title="${escapeHtml(I18N.agenda.yahoo)}" aria-label="${escapeHtml(I18N.agenda.yahoo)}"><i class="fa-brands fa-yahoo" aria-hidden="true"></i></a>
                <a class="webinar-agenda-link" href="${escapeHtml(a.outlook)}" target="_blank" rel="noopener" title="${escapeHtml(I18N.agenda.outlook)}" aria-label="${escapeHtml(I18N.agenda.outlook)}"><i class="fa-brands fa-microsoft" aria-hidden="true"></i></a>
            </div>`;
    }

    function upcomingCard(w) {
        return `
            <article class="webinar-card webinar-card--upcoming">
                <div class="webinar-thumb">${thumbInner(w)}</div>
                <div class="webinar-body">
                    <div class="webinar-meta">
                        <span class="webinar-date">${escapeHtml(w.start_label)}</span>
                        ${langBadge(w)}
                    </div>
                    <h4 class="webinar-title">${escapeHtml(w.title)}</h4>
                    <p class="webinar-desc">${escapeHtml(w.description)}</p>
                    <div class="webinar-card-footer">
                        ${agendaLinks(w)}
                        ${w.landing_url
                            ? `<a class="webinar-inscription-btn" href="${escapeHtml(w.landing_url)}">${escapeHtml(I18N.inscription)}</a>`
                            : (w.can_register
                                ? `<button type="button" class="webinar-inscription-btn" data-webinar-id="${w.id}" data-webinar-title="${escapeHtml(w.title)}">${escapeHtml(I18N.inscription)}</button>`
                                : `<button type="button" class="webinar-inscription-btn is-disabled" disabled>${escapeHtml(I18N.inscription)}</button>`)}
                    </div>
                </div>
            </article>`;
    }

    function pastCard(w) {
        const picto = `<i class="fa-solid fa-play" aria-hidden="true"></i> ${escapeHtml(I18N.replay)}`;
        const replay = w.landing_url
            ? `<a class="webinar-replay-btn" href="${escapeHtml(w.landing_url)}">${picto}</a>`
            : (w.replay_url
                ? `<a class="webinar-replay-btn" href="${escapeHtml(w.replay_url)}" target="_blank" rel="noopener">${picto}</a>`
                : `<span class="webinar-replay-btn is-disabled">${picto}</span>`);
        return `
            <article class="webinar-card webinar-card--past">
                <div class="webinar-thumb">${thumbInner(w)}</div>
                <div class="webinar-body">
                    ${langBadge(w)}
                    <h4 class="webinar-title">${escapeHtml(w.title)}</h4>
                    <p class="webinar-desc">${escapeHtml(w.description)}</p>
                    <div class="webinar-card-footer webinar-card-footer--past">
                        ${replay}
                    </div>
                </div>
            </article>`;
    }

    /* ================= Vue mosaïque (grille + recherche + filtre langue) ================= */
    const grid = document.getElementById("webinars-grid");
    if (grid) {
        initMosaic(grid);
    } else {
        initTeaser();
    }

    function initMosaic(gridEl) {
        const type = gridEl.dataset.type === "past" ? "past" : "upcoming";
        const render = type === "upcoming" ? upcomingCard : pastCard;
        const emptyEl = document.getElementById("webinars-grid-empty");
        const searchEl = document.getElementById("webinars-search");
        const langFilterEl = document.getElementById("webinars-lang-filter");
        let allItems = [];
        let currentLang = "";
        let currentSearch = "";

        fetch(`/services/get/getWebinars.php?type=${type}&all=1`)
            .then(response => response.json())
            .then(data => {
                allItems = data.webinars || [];
                renderGrid();
            })
            .catch(error => console.error("Erreur lors du chargement des webinaires :", error));

        function renderGrid() {
            const q = currentSearch.trim().toLowerCase();
            const filtered = allItems.filter(w => {
                if (currentLang && (w.language || "").toLowerCase() !== currentLang) return false;
                if (q) {
                    const hay = ((w.title || "") + " " + (w.description || "")).toLowerCase();
                    if (hay.indexOf(q) === -1) return false;
                }
                return true;
            });
            gridEl.innerHTML = filtered.map(render).join("");
            if (emptyEl) emptyEl.classList.toggle("d-none", filtered.length > 0);
        }

        if (searchEl) {
            searchEl.addEventListener("input", function () {
                currentSearch = this.value;
                renderGrid();
            });
        }
        if (langFilterEl) {
            langFilterEl.addEventListener("click", function (e) {
                const btn = e.target.closest(".webinars-lang-btn");
                if (!btn) return;
                currentLang = btn.dataset.lang || "";
                langFilterEl.querySelectorAll(".webinars-lang-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderGrid();
            });
        }
    }

    /* ================= Vue teaser (accueil : grille de 3 max, « Voir plus » toujours visible) ================= */
    function initTeaser() {
        const els = {
            upcoming: {
                row: document.getElementById("webinars-upcoming-row"),
                empty: document.getElementById("webinars-upcoming-empty")
            },
            past: {
                row: document.getElementById("webinars-past-row"),
                empty: document.getElementById("webinars-past-empty")
            }
        };

        Object.keys(els).forEach(loadTeaser);

        function loadTeaser(type) {
            const el = els[type];
            if (!el.row) return;
            const limite = type === "upcoming" ? 2 : 4;
            fetch(`/services/get/getWebinars.php?type=${type}&page=1&limit=${limite}`)
                .then(response => response.json())
                .then(data => {
                    const list = data.webinars || [];
                    if (list.length === 0) {
                        if (el.empty) el.empty.classList.remove("d-none");
                        return;
                    }
                    const render = type === "upcoming" ? upcomingCard : pastCard;
                    el.row.innerHTML = list.map(render).join("");
                })
                .catch(error => console.error("Erreur lors du chargement des webinaires :", error));
        }
    }

    /* ================= Inscription à un webinaire (partagé teaser + mosaïque) ================= */
    const modal = document.getElementById("webinar-inscription-modal");
    const modalWebinarTitle = document.getElementById("webinar-modal-webinar-title");
    const modalForm = document.getElementById("webinar-inscription-form");
    const modalEmail = document.getElementById("webinar-inscription-email");
    const modalSubmit = document.getElementById("webinar-inscription-submit");
    const modalSuccess = document.getElementById("webinar-modal-success");
    const modalError = document.getElementById("webinar-modal-error");
    const modalClose = document.getElementById("webinar-modal-close");
    let currentWebinarId = null;

    function openInscriptionModal(id, title) {
        if (!modal) return;
        currentWebinarId = id;
        if (modalWebinarTitle) modalWebinarTitle.textContent = title || "";
        if (modalEmail) modalEmail.value = USER.email || "";
        if (modalForm) modalForm.hidden = false;
        if (modalSuccess) modalSuccess.hidden = true;
        if (modalError) modalError.hidden = true;
        if (modalSubmit) modalSubmit.disabled = false;
        modal.hidden = false;
        document.body.style.overflow = "hidden";
        if (modalEmail) modalEmail.focus();
    }

    function closeInscriptionModal() {
        if (!modal) return;
        modal.hidden = true;
        document.body.style.overflow = "";
        currentWebinarId = null;
    }

    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".webinar-inscription-btn:not(.is-disabled)");
        if (btn && btn.dataset.webinarId) {
            openInscriptionModal(btn.dataset.webinarId, btn.dataset.webinarTitle);
        }
    });
    if (modalClose) modalClose.addEventListener("click", closeInscriptionModal);
    if (modal) modal.addEventListener("click", function (e) { if (e.target === modal) closeInscriptionModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal && !modal.hidden) closeInscriptionModal(); });

    if (modalForm) {
        modalForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!currentWebinarId || !modalEmail) return;
            const email = modalEmail.value.trim();
            if (!email) return;
            if (modalSubmit) modalSubmit.disabled = true;
            if (modalError) modalError.hidden = true;

            const fd = new FormData();
            fd.append("email", email);
            fd.append("webinarId", currentWebinarId);
            if (USER.firstname) fd.append("firstname", USER.firstname);

            fetch("/services/post/postWebinarSubscribe.php", { method: "POST", body: fd })
                .then(response => response.json().catch(() => ({ success: false })))
                .then(data => {
                    if (modalSubmit) modalSubmit.disabled = false;
                    if (data && data.success) {
                        if (modalForm) modalForm.hidden = true;
                        if (modalSuccess) modalSuccess.hidden = false;
                    } else if (modalError) {
                        modalError.textContent = (data && data.message) ? data.message : (I18N.modalError || "Erreur");
                        modalError.hidden = false;
                    }
                })
                .catch(function () {
                    if (modalSubmit) modalSubmit.disabled = false;
                    if (modalError) {
                        modalError.textContent = I18N.modalError || "Erreur";
                        modalError.hidden = false;
                    }
                });
        });
    }

    /* ================= Newsletter (réutilisé des autres pages) ================= */
    const nlForm = document.querySelector("form[data-id='newsletter-subscribe']");
    if (nlForm) {
        nlForm.addEventListener("submit", function (ev) {
            ev.preventDefault();
            const btn = nlForm.querySelector("button[type='submit']");
            if (btn) btn.disabled = true;
            nlForm.querySelectorAll(".alert").forEach(a => { a.style.display = "none"; });

            fetch("/shop/newsletter/newsletter.php", { method: "POST", body: new FormData(nlForm) })
                .then(response => { if (btn) btn.disabled = false; return response.json(); })
                .then(data => {
                    const alert = (data && data.success)
                        ? nlForm.querySelector(".alert-success")
                        : nlForm.querySelector(".alert-warning");
                    if (alert) alert.style.display = "block";
                    if (data && data.success) nlForm.reset();
                })
                .catch(error => {
                    console.error(error);
                    if (btn) btn.disabled = false;
                    const alert = nlForm.querySelector(".alert-warning");
                    if (alert) alert.style.display = "block";
                });
        });
    }
});

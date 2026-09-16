document.addEventListener("DOMContentLoaded", function () {
    let currentCategory = "";
    let filtersBuilt = false;

    const listEl = document.getElementById("lux-docs-list");
    const filtersEl = document.getElementById("lux-docs-filters");
    const emptyEl = document.getElementById("lux-docs-empty");
    const paginationEl = document.getElementById("lux-docs-pagination");

    const I18N = window.LUX_DOCS_I18N || { filterAll: "Tous", download: "Télécharger" };

    function escapeHtml(value) {
        if (value === null || value === undefined) return "";
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    const IMAGE_EXTS = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "avif"];
    const FILE_ICONS = {
        pdf:  { icon: "fa-file-pdf", cls: "pdf" },
        doc:  { icon: "fa-file-word", cls: "word" },
        docx: { icon: "fa-file-word", cls: "word" },
        odt:  { icon: "fa-file-word", cls: "word" },
        xls:  { icon: "fa-file-excel", cls: "excel" },
        xlsx: { icon: "fa-file-excel", cls: "excel" },
        ods:  { icon: "fa-file-excel", cls: "excel" },
        csv:  { icon: "fa-file-csv", cls: "excel" },
        ppt:  { icon: "fa-file-powerpoint", cls: "ppt" },
        pptx: { icon: "fa-file-powerpoint", cls: "ppt" },
        odp:  { icon: "fa-file-powerpoint", cls: "ppt" },
        zip:  { icon: "fa-file-zipper", cls: "zip" },
        rar:  { icon: "fa-file-zipper", cls: "zip" },
        "7z": { icon: "fa-file-zipper", cls: "zip" },
        mp4:  { icon: "fa-file-video", cls: "video" },
        mov:  { icon: "fa-file-video", cls: "video" },
        avi:  { icon: "fa-file-video", cls: "video" },
        mp3:  { icon: "fa-file-audio", cls: "audio" },
        wav:  { icon: "fa-file-audio", cls: "audio" },
        txt:  { icon: "fa-file-lines", cls: "txt" }
    };

    function getExtension(name) {
        if (!name || name.indexOf(".") === -1) return "";
        return name.split(".").pop().toLowerCase();
    }

    function buildMediaInner(doc) {
        // Priorité : image de présentation > aperçu si le fichier est une image > picto type de fichier
        if (doc.preview_image) {
            const src = VS_USER_DATA_BASE + "/lux-medias/" + encodeURIComponent(doc.preview_image);
            return `<img class="lux-doc-thumb" src="${src}" alt="${escapeHtml(doc.title)}" loading="lazy">`;
        }
        const ext = getExtension(doc.original_name || doc.file);
        if (IMAGE_EXTS.indexOf(ext) !== -1) {
            const src = VS_USER_DATA_BASE + "/lux-medias/" + encodeURIComponent(doc.file);
            return `<img class="lux-doc-thumb" src="${src}" alt="${escapeHtml(doc.title)}" loading="lazy">`;
        }
        const info = FILE_ICONS[ext] || { icon: "fa-file", cls: "default" };
        return `<i class="fa ${info.icon} lux-doc-ficon lux-doc-ficon-${info.cls}"></i>`;
    }

    function loadDocs(page) {
        const url = `/services/get/getLuxDocs.php?page=${page}&category=${encodeURIComponent(currentCategory)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!filtersBuilt) {
                    buildFilters(data.categories);
                    filtersBuilt = true;
                }

                listEl.innerHTML = "";

                if (!data.docs || data.docs.length === 0) {
                    emptyEl.classList.remove("d-none");
                    paginationEl.innerHTML = "";
                    return;
                }
                emptyEl.classList.add("d-none");

                data.docs.forEach(doc => {
                    const categoryBadge = doc.category_name
                        ? `<span class="lux-doc-category">${escapeHtml(doc.category_name)}</span>`
                        : "";
                    const description = doc.description
                        ? `<p class="lux-doc-desc">${escapeHtml(doc.description)}</p>`
                        : `<p class="lux-doc-desc"></p>`;
                    const downloads = parseInt(doc.downloads, 10) || 0;

                    const card = `
                        <div class="col">
                            <div class="lux-doc-card">
                                <div class="lux-doc-media">
                                    ${buildMediaInner(doc)}
                                    <span class="lux-doc-downloads" title="Nombre de téléchargements">
                                        <i class="fa fa-download"></i> ${downloads}
                                    </span>
                                </div>
                                <div class="lux-doc-body">
                                    ${categoryBadge}
                                    <h4 class="lux-doc-title">${escapeHtml(doc.title)}</h4>
                                    ${description}
                                    <div class="lux-doc-footer">
                                        <a href="/services/get/downloadLuxDoc.php?id=${doc.id}" class="btn btn-primary btn-sm">
                                            ${escapeHtml(I18N.download)} <i class="fa fa-download"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    listEl.innerHTML += card;
                });

                updatePagination(data.totalPages, data.currentPage);
            })
            .catch(error => console.error("Erreur lors du chargement des documents :", error));
    }

    function buildFilters(categories) {
        filtersEl.innerHTML = "";

        const allBtn = createFilterButton(I18N.filterAll, "");
        allBtn.classList.add("active");
        filtersEl.appendChild(allBtn);

        (categories || []).forEach(cat => {
            filtersEl.appendChild(createFilterButton(cat.name, String(cat.id)));
        });
    }

    function createFilterButton(label, value) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "lux-docs-filter-btn";
        btn.textContent = label;
        btn.dataset.category = value;
        btn.addEventListener("click", function () {
            if (currentCategory === value) return;
            currentCategory = value;
            filtersEl.querySelectorAll(".lux-docs-filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            loadDocs(1);
        });
        return btn;
    }

    function updatePagination(totalPages, currentPage) {
        paginationEl.innerHTML = "";
        if (totalPages <= 1) return;

        let pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            let lower, upper;
            if (currentPage === 1) {
                lower = 2; upper = 3;
            } else if (currentPage === 2 || currentPage === 3) {
                lower = 2; upper = 4;
            } else if (currentPage >= totalPages - 1) {
                lower = totalPages - 2; upper = totalPages - 1;
            } else {
                lower = currentPage - 1; upper = currentPage + 1;
            }
            if (lower > 2) pages.push("...");
            for (let i = lower; i <= upper; i++) pages.push(i);
            if (upper < totalPages - 1) pages.push("...");
            pages.push(totalPages);
        }

        pages.forEach(page => {
            if (page === "...") {
                const span = document.createElement("a");
                span.textContent = "...";
                span.classList.add("pagination-ellipsis", "btn-pagination", "no-hover");
                paginationEl.appendChild(span);
            } else {
                const link = document.createElement("a");
                link.href = "#";
                link.textContent = page;
                link.classList.add("btn-pagination");
                if (page === currentPage) link.classList.add("active");
                link.addEventListener("click", function (e) {
                    e.preventDefault();
                    loadDocs(page);
                    document.getElementById("lux-docs-container").scrollIntoView({ behavior: "smooth", block: "start" });
                });
                paginationEl.appendChild(link);
            }
        });
    }
    loadDocs(1);
});

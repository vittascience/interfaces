const TOOLBOXES = [
    {
        "id": TOOLBOX_STYLE_VITTA,
        "categories": TOOLBOX_VITTASCIENCE_CATEGORIES,
        "subcategories": typeof TOOLBOX_VITTASCIENCE_SUBCATEGORIES !== 'undefined' ? TOOLBOX_VITTASCIENCE_SUBCATEGORIES : null,
        "content": TOOLBOX_VITTASCIENCE_CONTENT,
        "content-simple": TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE,
        "theme": THEME_VITTASCIENCE
    },
    {
        "id": TOOLBOX_STYLE_SCRATCH,
        "categories": TOOLBOX_SCRATCH_CATEGORIES,
        "subcategories": typeof TOOLBOX_SCRATCH_SUBCATEGORIES !== 'undefined' ? TOOLBOX_SCRATCH_SUBCATEGORIES : null,
        "content": TOOLBOX_SCRATCH_CONTENT,
        "content-simple": TOOLBOX_SCRATCH_CONTENT_SIMPLE,
        "theme": THEME_SCRATCH
    }
];
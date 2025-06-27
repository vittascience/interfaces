function failedToLoad() {
    if (navigator.navigatorIncompatible) return;
    $.blockUI({
        css: {
            border: 'none',
            padding: '10px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        },
        message: 'Failed to load your interface. Retry in 3 seconds'
    });
    // localStorage.clear(); // Would be useless after localStorage rework
    setTimeout(function () {
        location.reload();
    }, 3000);
}
$(document).ready(function () {
    //Changement d'icone mode
    $(".ide-btn-group-mode .ide-btn").click(function () {
        $(".ide-btn-mode").children('i').attr('class', this.children[0].className);
    });

    //Dropdown hide
    $(".ide-btn-toggle").on('click', function () {
        var elem = $(this).parent().children('div.ide-btn-group');
        $(".ide-btn-group").each(function () {
            if (!$(this).hasClass('hidden') && $(this).attr('class') != elem.attr('class')) {
                $(this).toggleClass('hidden');
            }
        });
        elem.toggleClass('hidden');
    });

    $(document).on("click", function (e) {
        var trigger = $('.ide-dropdown');
        if ((trigger !== e.target) && !trigger.has(e.target).length) {
            $(".ide-btn-group").each(function () {
                if (!$(this).hasClass('hidden')) {
                    $(this).toggleClass('hidden');
                }
            });
        }
    });

    $('.ide-dropdown .ide-btn-group .ide-btn').on('click', function () {
        var parent = $(this).parent();
        if (!parent.hasClass('hidden')) {
            parent.toggleClass('hidden');
        }
    });
})
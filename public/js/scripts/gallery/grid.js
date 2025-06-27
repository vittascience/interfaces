var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    stagger:0,
    transitionDuration: '.5s',
    hiddenStyle: { opacity: 0 },
    visibleStyle: { opacity: 1 }
    });
    // layout Masonry after each image loads
   $grid.imagesLoaded().progress( function() {
        $grid.masonry();
    });
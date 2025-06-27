function closeOtherJob(div) {
    let divOpen = $('.job-details:visible');

    $('.job-active').removeClass('.job-active');
    if (div.data('id') == divOpen.data('id')) {
        $(div).slideUp('slow');
        //$("#job[data-id='"+div.data('id')+"']").removeClass('job-active');
    }
    else
       $(divOpen).slideUp('slow', function(){
            //$('#job').removeClass('job-active');
            $("#job[data-id='"+div.data('id')+"']").addClass('job-active');
            $(div).slideDown('slow');
        });

}

$('.job_element').on('click', function(){
    let id = $(this).data('id');
    let div = $('.job-details[data-id="'+id+'"]');

    if ($('.job-details').is(':visible')) {
        $('.job-active').removeClass('job-active');
        closeOtherJob(div);
    }
    else {
        $(div).slideDown('slow');
        $(this).addClass('job-active');
    }
});
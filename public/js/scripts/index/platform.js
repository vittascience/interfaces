let userPaused = false;
let blockType = "programming";
var currentVideo = "programming";

var platformPlayer;
// Video Player settings
document.addEventListener('DOMContentLoaded', () => {

    platformPlayer = new Plyr('#platform-video', {
        "autoplay": false,
        "muted": true,
        controls: ['play-large', 'play', 'progress', 'current-time']
    });

    platformPlayer.on('pause', () => {
    if (!platformPlayer.seeking && !platformPlayer.ended) {
        userPaused = true;
    }
});

platformPlayer.on('play', () => {
    userPaused = false;
});

    platformPlayer.on('ended', function () {
        setTimeout(function () {


            switch (currentVideo) {
                case "programming":
                    $('.sidebar-element[type="ia"]').trigger('click');
                    break;
                case "ia":
                    $('.sidebar-element[type="resources"]').trigger('click');
                    break;
                case "resources":
                    $('.sidebar-element[type="classroom"]').trigger('click');
                    break;
                case "classroom":
                    $('.sidebar-element[type="shop"]').trigger('click');
                    break;
                case "shop":
                    $('.sidebar-element[type="demo"]').trigger('click');
                    break;
                default:
                    $('.sidebar-element[type="demo"]').trigger('click');
                    break;
            }
        }, 2000);
    });
});

jQuery(document).ready(function ($) {
    $(window).scroll(function () {
        $("video").each(function () {
            if ($(this).is(":in-viewport()") && !userPaused) {
                $(this)[0].play();
            }
        });
    });
});





$(".sidebar-element").click(function (event) {
    if (!$(this).hasClass('sidebar-element-focus')) {
        blockType = $(this).attr("type")

        // changing block display
        $('.sidebar-element-focus').removeClass('sidebar-element-focus')
        $(this).addClass('sidebar-element-focus')

        switch (blockType) {
            case 'demo':
                // Hides the image to show the iframe container
                $('#platform-video-container').hide()
                $('#platform-iframe').show()
                $('#iframe-popup').hide()
                break;

            default:
                // Updates the currently played video
                currentVideo = blockType

                // Udpates the image shown
                $('#platform-iframe').hide()
                $('#platform-video-container').show()
                $('#iframe-popup').hide()

                platformPlayer.source = {
                    type: 'video',
                    sources: [{
                        type: 'video/mp4',
                        src: `${CDN_PATH}/public/content/video/assets/index/platform_${blockType}.mp4`
                    }, {
                        type: 'video/webm',
                        src: `${CDN_PATH}/public/content/video/assets/index/platform_${blockType}.webm`
                    }]
                };
                platformPlayer.play();
                break;

        }

    }

})

$(".demo-element:not(.demo-element-placeholder)").click(function (event) {
    if (!$(this).hasClass('demo-element-focus')) {
        let demoType = $(this).attr("type")

        // changing block display
        $('.demo-element-focus').removeClass('demo-element-focus')
        $(this).addClass('demo-element-focus')
        $('#iframe-popup').show()


        let projectID;
        switch (demoType) {
            case ("arduino"):
                projectID = "6294cecc5b483";
                break;
            case ("microbit"):
                projectID = "6294d0fd33aa2";
                break;
            case ("python"):
                projectID = "6294d15d2b9a6";
                break;
            case ("esp32"):
                projectID = "6294d17db4e08";
                break;
        }


        switch (demoType) {
            case ("quickpi"):
                $('#platform-iframe').html('<iframe src="//' + window.location.hostname + '/quickpi"></iframe>')
                break;

            default:
                $('#platform-iframe').html('<iframe src="//vittascience.com/' + demoType + '/?link=' + projectID + '&mode=mixed&embed=1"></iframe>')
                break;
        }
    }
})

$("#iframe-popup button").click(function (event) {
    $('#iframe-popup').hide()
})
setTimeout(function () {

    if (getParamValue("tab") !== null) {
        switch (getParamValue("tab")) {
            case 'settings':
                $("#my-profile-button").click();
                break;
            case 'experiments':
                $("#my-experiments-button").click();
                break;
            case 'resources':
                $("#my-resources-button").click();
                break;
            case 'projects':
                $("#my-projects-button").click();
                break;
            case 'address':
                $("#my-address-button").click();
                break;
            case 'orders':
                $("#my-orders-button").click();
                break;
            case 'wishlist':
                $("#my-wishlist-button").click();
                break;
            case 'premium':
                $("#premium-button").click();
                break;
            default:
                $("#my-profile-button").click();
                break;
        }
    }

}, 1000);
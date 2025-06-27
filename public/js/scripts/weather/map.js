const styler = [{
    featureType: "administrative",
    stylers: [{
      visibility: "simplified"
    }]
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "landscape",
    stylers: [{
      color: "#FEFEFE"
    }]
  },
  {
    featureType: "landscape.natural.terrain",
    elementType: "geometry",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "poi.attraction",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "poi.business",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "poi.government",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "poi.medical",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "poi.park",
    stylers: [{
      color: "#A5E5C2"
    }]
  },
  {
    featureType: "poi.place_of_worship",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "poi.school",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "poi.sports_complex",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{
      color: "#F2F2F2"
    }]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "road.highway",
    stylers: [{
        color: "#F2F2F2"
      },
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "transit",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{
      color: "#3FA9F5"
    }]
  },
  {
    featureType: "water",
    elementType: "geometry.stroke",
    stylers: [{
      visibility: "simplified"
    }]
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [{
        color: "#FFFFFF"
      },
      {
        weight: 1.5
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [{
      visibility: "off"
    }]
  }
];

let map;
let marker;
let lat_nbr;
let lng_nbr;
let geocoder;
let service;


var markerImg;

function initMap() {
  // The location of Uluru
  let paris = {
    lat: 47.868054,
    lng: 1.950731
  };
  // The map, centered at Uluru
  map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 7,
      center: paris,
      streetViewControl: false,
      styles: styler,
      fullscreenControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DEFAULT,
        mapTypeIds: ['roadmap', 'satellite'],
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      }
    });

  //search box
  let inputSearch = document.getElementById('map-searchbar');
  let searchBox = new google.maps.places.SearchBox(inputSearch);
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputSearch);
  searchBox.addListener('places_changed', function () {
    closeNotice();
  });

  markerImg = {
    url: `${CDN_PATH}/public/content/img/assets/map/marker.png`,
    size: new google.maps.Size(36, 48),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(19, 48),
    scaledSize: new google.maps.Size(36, 48)
  };

  geocoder = new google.maps.Geocoder; //geocoder to find place
  service = new google.maps.places.PlacesService(map);

  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      placeMarkerAndPanTo(place.geometry.location, map, false);
    });
  });

  map.addListener('click', function (e) {
    placeMarkerAndPanTo(e.latLng, map, false);
  });
  google.maps.event.addDomListener(window, "resize", function () {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });
}

function getlocateUser() {
  if (!navigator.geolocation)
    console.error('Navigator doesn\'t have geolocalisation.');
  else {
    $('#geolocate_weather').html(i18next.t('weather.tooltip.geoloc_progress'));
    navigator.geolocation.getCurrentPosition(function (position) {
      lat_nbr = position.coords.latitude;
      lng_nbr = position.coords.longitude;
      $('#geolocate_weather').html('<b>' + i18next.t('weather.tooltip.geoloc') + ' <span class="fa fa-chevron-circle-right"></span></b>');
      placeMarkerAndPanTo({
        lat: lat_nbr,
        lng: lng_nbr
      }, map, true);
      closeNotice(); //work only when window width <= 500
    });
  }
}

function getDataFromLatLng(coordinates) {
  let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + coordinates[0] + '&lon=' + coordinates[1] + '&units=metric&APPID=85ae0a9b2bddfdeb2ac7bf80dc7d47a4';

  let request = getAjaxRequest();
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        var res = JSON.parse(request.responseText);
        setTimezoneAndUpdate(res, coordinates[0], coordinates[1]);
      } else {
        console.error(i18next.t('weather.errors.api'));
      }
    }
  }
  request.open("GET", apiUrl);
  request.send();
}

function fillSearchBox(place, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    $('#map-searchbar').val(place['formatted_address']);
  } else {
    $('#map-searchbar').val('');
  }
}

function placeMarkerAndPanTo(latLng, map, geoloc) {
  if (marker !== undefined)
    marker.setMap(null);

  geocoder.geocode({
    'location': latLng
  }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        var request = {
          placeId: results[1].place_id,
          fields: ['formatted_address']
        };
        service.getDetails(request, fillSearchBox);
      }
    } else {
      console.log('Geocoder failed due to: ' + status);
      $('#map-searchbar').val('');
    }
  });

  marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: markerImg
  });

  map.panTo(latLng);
  let latLngRewrite = [];
  if (!geoloc) {
    latLngRewrite.push(latLng.lat());
    latLngRewrite.push(latLng.lng());
  } else {
    latLngRewrite.push(latLng.lat);
    latLngRewrite.push(latLng.lng);
  }
  getDataFromLatLng(latLngRewrite);
  latLngRewrite = [];
}
var styles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "lightness": "57"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "lightness": "1"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": "0"
            },
            {
                "lightness": "0"
            },
            {
                "gamma": "1.00"
            },
            {
                "weight": "1"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "weight": "1"
            },
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": "1"
            },
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#d2d2d2"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

// Init map based on center with 13 zoom. center must be formatted like so: {lat: x, lng: y}
function initMap(center) {
	var map;
	var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  // Set map to be drabbable if document is wider than 480px
	var isDraggable = $(document).width() > 480 ? true : false;

	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var mapOptions = {
	    zoom: 13,
	    center: center,
	    mapTypeControlOptions: {
	      mapTypeIds: ['map_style']
	    },
			draggable: isDraggable,
	    disableDefaultUI: true,
	    scrollwheel: false,
			zoomControl: true,
			zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
    },
	};
	map = new google.maps.Map(document.getElementById(map),
	mapOptions);
  map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
	return map;
}

var labelIndex = 1;

function addMarker(location, map,message) {
  // Custom icons go here //
	// var myicon = {
	//     url: "/img/global/map-pointer-low-2x.png",
	//     scaledSize: new google.maps.Size(35, 50),
	// };

	if(labelIndex < 10){
		var marker = new MarkerWithLabel({
		    position: location,
		    labelContent: labelIndex++,
				labelAnchor: new google.maps.Point(5,34),
	      labelClass: "markers", // the CSS class for the label
		    map: map,
		    // icon:myicon,
		});
	}
	else {
		var marker = new MarkerWithLabel({
		    position: location,
		    labelContent: labelIndex++,
				labelAnchor: new google.maps.Point(10,34),
	      labelClass: "markers", // the CSS class for the label
		    map: map,
		    // icon:myicon,
		});
	}
  attachMessage(marker, message);
}

var infowindow;

function attachMessage(marker, Message) {
	marker.addListener('click', function() {
			if (infowindow) infowindow.close();
			infowindow = new google.maps.InfoWindow({content: Message, maxWidth:250});
	    infowindow.open(marker.get('map'), marker);
	});
}

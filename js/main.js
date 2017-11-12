ymaps.ready(init);
    var myMap;

    function init(){     
        myMap = new ymaps.Map("map", {
            center: [59.91817154482064,30.30557799999997],
            zoom: 11,
            controls: []
        });

        myMap.behaviors.disable('scrollZoom');

		var coords = [
		    [59.94554327989287,30.38935262114668],
		    [59.91142323563909,30.50024587065841],
		    [59.88693161784606,30.319658102103713],
		    [59.97033574821672,30.315194906302924]
		],
		    myCollection = new ymaps.GeoObjectCollection({}, {
		    	iconLayout: 'default#image',
	        	iconImageHref: 'icons/map-marker.svg',
	        	iconImageSize: [46, 57],
	        	iconImageOffset: [-26, -52],
		    	draggable: false
		    });

		for (var i = 0; i < coords.length; i++) {
		    myCollection.add(new ymaps.Placemark(coords[i]));
		}

		myMap.geoObjects.add(myCollection);
    }
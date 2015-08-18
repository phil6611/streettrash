/* 
 * Ce fichier sert à afficher les points de collecte des déchets.
 * Version 0.1 05 août 2015
 * Copyleft Philippe Poisse
 * Licence GPL V3.
 */

/*
 * Fonctions spécifiques
 */
//Fonctions pour les popup.
function pointInfo (feature, layer){
        
    };

/*
 * Gestions des données.
 */

//Conteneurs à papier
var paper;

paper = L.layerJSON({
	url: 'http://overpass-api.de/api/interpreter?data=[out:json];node({lat1},{lon1},{lat2},{lon2})[amenity=recycling]["recycling:paper"];out;',
	propertyItems: 'elements',
	propertyTitle: 'tags.name',
	propertyLoc: ['lat','lon'],
	buildPopup: function(data, marker) {
		return data.tags.name || null;
	},
	buildIcon: function(data, title) {
	  return new L.Icon({
	    iconUrl:'./images/recycling.png',
	    iconSize: new L.Point(16, 16),
	    iconAnchor: new L.Point(1, 16),
	    popupAnchor: new L.Point(0, -16)
	  });
	}
});

//Conteneurs à verre
var glass;

glass = L.layerJSON({
	url: 'http://overpass-api.de/api/interpreter?data=[out:json];node({lat1},{lon1},{lat2},{lon2})[amenity=recycling]["recycling:glass"];out;',
	propertyItems: 'elements',
	propertyTitle: 'tags.name',
	propertyLoc: ['lat','lon'],
	buildPopup: function(data, marker) {
		return data.tags.name || null;
	},
	buildIcon: function(data, title) {
	  return new L.Icon({
	    iconUrl:'./images/recycling.png',
	    iconSize: new L.Point(16, 16),
	    iconAnchor: new L.Point(1, 16),
	    popupAnchor: new L.Point(0, -16)
	  });
	}
});

//Conteneurs à ordures ménagères
var waste;

waste = L.layerJSON({
	url: 'http://overpass-api.de/api/interpreter?data=[out:json];node({lat1},{lon1},{lat2},{lon2})[amenity=recycling]["recycling:waste"];out;',
	propertyItems: 'elements',
	propertyTitle: 'tags.name',
	propertyLoc: ['lat','lon'],
	buildPopup: function(data, marker) {
		return data.tags.name || null;
	},
	buildIcon: function(data, title) {
	  return new L.Icon({
	    iconUrl:'./images/recycling.png',
	    iconSize: new L.Point(16, 16),
	    iconAnchor: new L.Point(1, 16),
	    popupAnchor: new L.Point(0, -16)
	  });
	}
});

//Corbeille pour les petits déchets.
basket = L.layerJSON({
	url: 'http://overpass-api.de/api/interpreter?data=[out:json];node({lat1},{lon1},{lat2},{lon2})[amenity=waste_basket];out;',
	propertyItems: 'elements',
	propertyTitle: 'tags.name',
	propertyLoc: ['lat','lon'],
	buildPopup: function(data, marker) {
		return data.tags.name || null;
	},
	buildIcon: function(data, title) {
	  return new L.Icon({
	    iconUrl:'./images/waste_basket.png',
	    iconSize: new L.Point(12, 12),
	    iconAnchor: new L.Point(1, 12),
	    popupAnchor: new L.Point(0, -12)
	  });
	}
});

/*
 * Création de la carte
 */

//Fond de carte Mapbox
var mapbox = L.tileLayer('http://{s}.tiles.mapbox.com/v3/phil6611.ikebkh58/{z}/{x}/{y}.png', {
                attribution: 'StreetTrash : carte des points de collecte des déchets &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
            });

//Création de la carte.
var map = L.map('map', {
    center: new L.LatLng(42.698611, 2.895556),
    zoom: 15,
    maxZoom: 18,
    layers: [mapbox, waste, paper, glass, basket]
});

/*
 * Création des contrôles.
 */

//Contrôles pour les fonds de cartes.
var baseMap = {
    "Rendu Mapbox" : mapbox
};

//Contrôles pour les layers contenant les données.
var overlaysMaps = {
    "Ordures ménagères" : waste,
    "Papier" : paper,
    "Verre" : glass,
    "Corbeilles" : basket
};

L.control.layers(baseMap, overlaysMaps,{ collapsed: false }).addTo(map);
L.control.scale({imperial: false}).addTo(map);


/*
 * Géolocalisation de l'internaute
 */

function onLocationFound(e) {
    L.marker(e.latlng).addTo(map);
    map.setView(e.latlng, 18);
}
function onLocationError(e) {
    alert(e.message);
    map.stopLocate();
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({watch: true, setView: true, maxZoom: 18});

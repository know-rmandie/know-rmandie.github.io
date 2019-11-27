$.getJSON("./data/data-normandie.json", function(data) {
    $.getJSON("./data/N_SCOT_ZSUP_R23etR25_FLA-201502.geojson", function(SCoTs) {

      var sources = "sources : " + data.metadata.source + " - " + data.metadata.date;
      var context = "map";
      var Couches = new Array;
      var tiles = {};
      for (i in fonds) {
          var couche = new L.TileLayer(fonds[i].url, {
              attribution: sources + " | " + fonds[i].attrib,
              minZoom: fonds[i].zMin,
              maxZoom: fonds[i].zMax,
              unloadInvisibleTiles: true
          });
          Couches[fonds[i].id] = couche;
          tiles[fonds[i].nom] = couche
      }(function($) {
          $(function() {
              setTimeout(function() {
                  if (L) letsStart()
              }, 250)
          })
      })(jQuery);

function letsStart() {
  if (document.location.href.match(/carteSeule/g)) {
      context = "full";
      $("body").addClass("carteSeule");
      knwrmdZoom = 9;
  }
  $(window).resize(function() {
      clearTimeout(window.resizedFinished);
      window.resizedFinished = setTimeout(function() {
          getWidth(context);
          $("#map").css("width", rW).css("height", rH)
      }, 250)
  });
  getWidth(context);
  $("#map").css("width", rW).css("height", rH);
  if (knwrmdZoom == null) knwrmdZoom = Math.sqrt(rW) / 3.75;
  carte = L.map("map").setView([knwrmdLat,
      knwrmdLong
  ], Math.round(knwrmdZoom));
  for (i in fonds) {
      var couche = new L.TileLayer(fonds[i].url, {
          attribution: sources + " | " + fonds[i].attrib,
          minZoom: fonds[i].zMin,
          maxZoom: fonds[i].zMax,
          unloadInvisibleTiles: true
      });
      Couches[fonds[i].id] = couche;
      tiles[fonds[i].nom] = couche
  }
  if (knwrmdFond == null) knwrmdFond = fonds[0].id;
  Couches[knwrmdFond].addTo(carte);

	// insertion des SCoTs au format geoJSON (export direct depuis QGIS, stockage dans 	N_SCOT_ZSUP_R23etR25_FLA-201502.geo.json)
	var dataScots;
	var cScots=new L.geoJson(SCoTs, {
		attribution: 'sources : IGN - GeoFLA 2010, METL - SUDOCUH, DREAL Haute-Normandie - Observatoire des SCoTs',
		// colorisation des polygones
		style: function (feature) {
			var fill;
			// recherche des données dans la base de l'Observatoire normand (plus à jour)
			dataScots=data.liste;
			if (eval("dataScots.$"+feature.properties.idScot)) {
				var avancement=eval("dataScots.$"+feature.properties.idScot+".avancement");
				switch(avancement) {
					case "elab" : return {color:'blue',weight:1,fillOpacity:0.4};
					case "cad" : return {color:'blue',weight:1,fillOpacity:0.4};
					case "opelab" : return {color:'darkorchid',weight:1,fillOpacity:0.4};
					case "opap" : return {color:'red',weight:1,fillOpacity:0.4};
					case "presc" : return {color:'green',weight:1,fillOpacity:0.4};
					case "inten" : return {color:'green',weight:1,fillOpacity:0.4};
					case "saispas" : return {color:'gray',weight:1,fillOpacity:0.4};
					case "voissaispas" : return {color:'gray',weight:1,fillOpacity:0.4};
					case "voisap" : return {color:'red',weight:1,fillOpacity:0.4};
					case "voiselab" : return {color:'blue',weight:1,fillOpacity:0.4};
					default : return {color:'gray',weight:1,fillOpacity:0.4};
					}
				}
			// à défaut, récupération des données dans la base issues de Sudocuh
			else {
				var avancement=feature.properties.CODE_ETAT1;
				switch(avancement) {
					case "5" : return {color:'blue',weight:1,fillOpacity:0.4};
					case "50" : return {color:'blue',weight:1,fillOpacity:0.4};
					case "2" : return {color:'darkorchid',weight:1,fillOpacity:0.4};
					case "20" : return {color:'darkorchid',weight:1,fillOpacity:0.4};
					case "3" : return {color:'red',weight:1,fillOpacity:0.4};
					case "30" : return {color:'red',weight:1,fillOpacity:0.4};
					default : return {color:'gray',weight:1,fillOpacity:0.4};
					}
				}
			},
		onEachFeature: function (feature,layer) {
			if (eval("dataScots.$"+feature.properties.idScot)) {
				var html='<h6>'+eval("dataScots.$"+feature.properties.idScot+".nom")+'</h6>';
				html+=''+eval("dataScots.$"+feature.properties.idScot+".description");
				layer.bindPopup(html);
				}
			else {
				var html='<h6>'+feature.properties.NomOffic+'</h6>';
				html+='-&nbsp'+feature.properties.ETAT1_SCOT+'<br/>';
				if (feature.properties.DATE_APPRO!=null) {
					var dateAppro=feature.properties.DATE_APPRO.split('\/');
					html+='-&nbsp;approuvé le&nbsp;'+dateAppro[2]+' / '+dateAppro[1]+' / '+dateAppro[0]+'<br/>'
					}
				layer.bindPopup(html);
				}
			}});
	cScots.addTo(carte);

	// insertion de la légende
	var legende = L.control({position: 'bottomleft'});
	legende.onAdd = function (map) {
		var div = L.DomUtil.create('div','info legend');
		div.innerHTML += '<img src="./img/legende.png" alt="légende" style="opacity:0.9;min-width:200px">';
		return div;
		};
	legende.addTo(carte);

	// adding function on local network only
	if(document.location.href.match(/file:\/\/\//g)) {
		// possibilité de choisir sa couche de fond
		// couche IGN WMS sur i²
		var RgeIgn = L.tileLayer.wms("http://georef.application.i2/cartes/mapserv?", {
			layers: 'fonds_nb',
			format: 'image/png',
			transparent: true,
			attribution: "&copy; IGN 2014"
			});
		Couches["RgeIgn"]=RgeIgn;
		tiles["IGN (réseau i²)"]=RgeIgn;
		// installation du contrôle
		var selecteur=L.control.layers(tiles);
			selecteur.addTo(carte);
		//affichage de l'aide
		document.getElementById("aide").setAttribute("style","display:block");
		}
	// si sur internet
	else {}

	// affichage de la carte uniquement avec l'ajout de ?carteSeule
	if(document.location.href.match(/\?carteSeule/g)) {
		$('#header,#footer,#main>h2').css('display','none');
		}
	}
})
});

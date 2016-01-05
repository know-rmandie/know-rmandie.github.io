// récupération des informations sur les sources de données	
var sources='sources : '+data.source+" - "+data.date;
var context='map';
var radius;

// ajout des couches de fonds dans la liste des couches disponibles	
var Couches=new Array(); 	// couches de tiles leaflet
var tiles={};				// désignation des tiles pour le control	
	// remplissage de la liste
for(i in fonds) {
	var couche=new L.TileLayer(fonds[i].url, {
		attribution: sources+fonds[i].attrib,
		minZoom : fonds[i].zMin,
		maxZoom : fonds[i].zMax,
		unloadInvisibleTiles:true
		});
	Couches[fonds[i].id]=couche;
	tiles[fonds[i].nom]=couche;
	}

// waitings	
(function($) {
	$(function() { 										// let's wait for jQuery	
		setTimeout(function(){if(L) letsStart()}, 250); // let's wait for Leaflet
	})
})(jQuery);	

function letsStart() {
	/* affichage de la carte uniquement avec l'ajout de ?carteSeule */	
	if(document.location.href.match(/\?carteSeule/g)) {
		context='full';
		$('#header,#footer,h2').css('display','none');
		$('#main, #page').css('width','100%');
		$('#page').css('max-width','none');
		$('#main, #page').css('margin','0');
		$('#main, #page').css('padding','0');
		}
	// resizing map when resizing window
	$(window).resize(function() {
		clearTimeout(window.resizedFinished);
		window.resizedFinished = setTimeout(function(){
			getWidth(context);
			$('#map')
				.css('width',rW)
				.css('height',rH);
			}, 250);
		});
	// carte mise à la taille de l'espace disponible
	getWidth(context);
	$('#map')
		.css('width',rW)
		.css('height',rH);
	// mise à une échelle permettant de voir la Haute-Normandie en entier	
	if(knwrmdZoom==null) knwrmdZoom=Math.sqrt(rW)/3.75;
	carte=L.map('map').setView([knwrmdLat,knwrmdLong],Math.round(knwrmdZoom));
	// ajout des couches de fonds dans la liste des couches disponibles	
	// remplissage de la liste
	for(i in fonds) {
		var couche=new L.TileLayer(fonds[i].url, {
			attribution: sources+fonds[i].attrib,
			minZoom : fonds[i].zMin,
			maxZoom : fonds[i].zMax,
			unloadInvisibleTiles:true
			});
		Couches[fonds[i].id]=couche;
		tiles[fonds[i].nom]=couche;
		}	
	// Installation du fond par défaut (premier de la liste dans fonds.json)
	if(knwrmdFond==null) knwrmdFond=fonds[0].id;
	Couches[knwrmdFond].addTo(carte);

// Construction des légendes
	// contenus des légendes - initialisation
	var HtmlLeg=new Array();
		HtmlLeg['Labellisation']='<div style="background-color:white;border:1px solid #ddd;opacity:0.8;padding:5px">';
		HtmlLeg['Avancement']='<div style="background-color:white;border:1px solid #ddd;opacity:0.8;padding:5px">';
	// liste des états de labellisation et éléments de légende. Point d'ancrage au milieu bas de l'icone
	var Labellisation = [
		{"id":"caap","icone":"la0-aap","string":"candidat aux appels à projet (2009 et 2011)"},
		{"id":"clab","icone":"la1-clab","string":"candidat au label"},
		{"id":"elab","icone":"la2-elab","string":"<i>engagé</i> dans la démarche de labellisation"},
		{"id":"label","icone":"la3-label","string":"projet labellisé écoquartier"},
		{"id":"autres","icone":"la9-autre","string":"autres projets"}
		];
	var PinCat=new Array;
	for(i in Labellisation) {
		var url=Labellisation[i].icone+'.png';
		PinCat[Labellisation[i].id] = L.icon({
			iconUrl: './img/'+url,
			iconRetinaUrl: './img/'+url,
			iconSize: [20, 38],
			iconAnchor: [15, 38],
			popupAnchor: [-5, -39],
			shadowUrl: './img/la-ombre.png',
			shadowRetinaUrl: './img/la-ombre.png',
			shadowSize: [40, 20],
			shadowAnchor: [0,20]
			});
		HtmlLeg['Labellisation']+='<img src="./img/'+url+'" style="height:16px"/>&nbsp;'+Labellisation[i].string+'<br/>';
		}
	HtmlLeg["Labellisation"]+='</div>';
	// liste des niveaux d'avancement et éléments de légende
	var Avancement=[
		{"id":"abandonné","icone":"av0-int","string":"projet abandonné"},
		{"id":"suspendu","icone":"av0-int","string":"projet suspendu"},
		{"id":"inconnu","icone":"av0-int","string":"avancement inconnu"},
		{"id":"intention","icone":"av0-int","string":"intention d'écoquartier"},
		{"id":"projet","icone":"av1-pro","string":"écoquartier en projet"},
		{"id":"chantier","icone":"av2-chan","string":"écoquartier en chantier"},
		{"id":"réalisé","icone":"av3-real","string":"écoquartier réalisé"}];
	var PinAv=new Array;
	for(i in Avancement) {
		var url=Avancement[i].icone+'.png';
		PinAv[Avancement[i].id] = L.icon({
			iconUrl: './img/'+url,
			iconRetinaUrl: './img/'+url,
			iconSize: [29, 37],
			iconAnchor: [20, 37],
			popupAnchor: [-6, -32],
			shadowUrl: './img/av-ombre.png',
			shadowRetinaUrl: './img/av-ombre.png',
			shadowSize: [37, 23],
			shadowAnchor: [0,20]
			});
		HtmlLeg["Avancement"]+='<img src="./img/'+url+'" style="height:20px"/>&nbsp;'+Avancement[i].string+'<br/>';
		}
	HtmlLeg["Avancement"]+='</div>';
// Clusterisation des couches
	
	// Couche labellisation
	var ecoQlabel=L.markerClusterGroup({
		name:"ecoQlabel",
		maxClusterRadius:function() {return (clusterRadius-50)/9*carte.getZoom()+50-(clusterRadius-50)/9;},
		iconCreateFunction:function (cluster) {
			var cC=cluster.getChildCount();    //cluster number of entities
			var cS=Math.sqrt(cC)*carte.getZoom()*carte.getZoom()/250*clusterRadius;    //cluster size
				if(cS<25) cS=25;
			var cF=cS/2;    //cluster font-size
				if(cF<12) cF=12;
			return new L.DivIcon({
				html:'<div style="width:'+cS+'px;height:'+cS+'px;font-size:'+cF+'px;background-color:hsla(270,'+2*Math.sqrt(cC)*carte.getZoom()+'%,40%,0.5)"><div><span style="line-height:'+cS+'px">'+cC+'</span></div></div>',
				className:'marker-cluster marker-cluster-'+cC,
				iconSize: new L.Point(cS,cS)
				})},
		});
	ecoQlabel.name="ecoQlabel";
	
	// Couche avancement	
	var ecoQavancement=L.markerClusterGroup({
		name:"ecoQavancement",
		maxClusterRadius:function() {return (clusterRadius-50)/9*carte.getZoom()+50-(clusterRadius-50)/9;},
		iconCreateFunction:function (cluster) {
			var cC=cluster.getChildCount();    //cluster number of entities
			var cS=Math.sqrt(cC)*carte.getZoom()*carte.getZoom()/250*clusterRadius;    //cluster size
				if(cS<25) cS=25;
			var cF=cS/2;    //cluster font-size
				if(cF<12) cF=12;
			return new L.DivIcon({				
				html:'<div style="width:'+cS+'px;height:'+cS+'px;font-size:'+cF+'px;background-color:hsla(170,'+2*Math.sqrt(cC)*carte.getZoom()+'%,40%,0.5)"><div><span style="line-height:'+cS+'px">'+cC+'</span></div></div>',
				className:'marker-cluster marker-cluster-'+cC,
				iconSize: new L.Point(cS,cS)
				})},
		});
	ecoQavancement.name="ecoQavancement";
// insertion des points dans les deux couches
	var dataEQ=data.liste;
	for(i in dataEQ) {
		var html='<h6>'+dataEQ[i].commune+' - '+dataEQ[i].Nom+'</h6>';
		html+='<i class="avct '+dataEQ[i].Aetat+'">'+dataEQ[i].Aetat+'</i>';
			var ha=dataEQ[i].Isurf,
			logts=dataEQ[i].Ilogmt;
			if(ha==0) {} else {html+='<br/>'+ha+' ha, '}
			if(logts==0) {} else {html+='<br/>'+logts+' logements,'}
			var inter=dataEQ[i].Rter,
				intra=dataEQ[i].Rtra;
			if(inter==0) {} else {html+='<br/>-&nbsp;<a href="'+inter+'">internet</a>'}
			if(intra==0) {} else {html+='<span class="intranet"><br/>-&nbsp;<a href="'+intra+'">intranet</a></span>'}
		var iconeCat,iconeAv;
		if(PinCat[dataEQ[i].Lcat]==undefined) {iconeCat=PinCat["la9-autre"]} else {iconeCat=PinCat[dataEQ[i].Lcat]}
		if(PinAv[dataEQ[i].Aetat]==undefined) {iconeAv=PinAv["av0-int"]} else {iconeAv=PinAv[dataEQ[i].Aetat]}
		var pointCat = new L.marker([dataEQ[i].lat,dataEQ[i].long],{icon:iconeCat}).bindPopup(html);
		ecoQlabel.addLayer(pointCat);
		var pointAv = new L.marker([dataEQ[i].lat,dataEQ[i].long],{icon:iconeAv}).bindPopup(html);
		ecoQavancement.addLayer(pointAv);
		}
	
// création de la légende
	var legende  = L.control({position: 'bottomleft'});
	legende.onAdd = function (map) {
		var div = L.DomUtil.create('div','info legend');
		div.setAttribute('id','legende');
		div.innerHTML = '';
		return div;
		};
	legende.addTo(carte);

// controle des couches
	var couchesControl = {
		"Labellisation": ecoQlabel,
		"Avancement": ecoQavancement
		};
// interactions couches / légendes		
var WMultip=new Array;
	WMultip["Labellisation"]=4;
	WMultip["Avancement"]=6;
var coucheActive="vide";

/*carte.on("overlayremove", function(layer) {
	if(whileAdding==0) {
		document.getElementById('legende').innerHTML = '';
		coucheActive="vide";
		}
	});*/

/* ajouts de fonctions, uniquement sur le réseau local. */
if(document.location.href.match(/file:\/\/\//g)) {
	// récupération des coordonnées d'un point
	var popup = L.popup();
	var listCoord = "";
	function onMapClick(e) {
		var coo=e.latlng;
		var cooTxt=coo.toString().split("(")[1].split(")")[0];
		if(listCoord==="") {listCoord="Derniers points cliqués :<br/>";}
		listCoord+=cooTxt+";";
		document.getElementById("listCoord").innerHTML=listCoord;
		popup
			.setLatLng(coo)
			.setContent("point : "+cooTxt)
			.openOn(carte);
		}
		
	carte.on('click', onMapClick);
	carte.on('dblclick', function() {listCoord = ""});
	// couche IGN WMS sur i²
		var RgeIgn = L.tileLayer.wms("http://georef.application.i2/cartes/mapserv?", {
			layers: 'fonds_nb',
			format: 'image/png',
			transparent: true,
			attribution: "&copy; IGN 2014"
			});
		Couches["RgeIgn"]=RgeIgn;
		tiles["IGN (réseau i²)"]=RgeIgn;
	// possibilité de choisir sa couche de fond
	//installation du contrôle
	var selecteur1=L.control.layers(tiles);
		selecteur1.addTo(carte);
	var selecteur2=L.control.layers(couchesControl);
		selecteur2.addTo(carte);
	//affichage de l'aide
	document.getElementById("aide").setAttribute("style","display:block");	
	}
// si sur internet affichage uniquement du choix entre les couches écoquartiers
else {
	var selecteur=L.control.layers(couchesControl);
	selecteur.addTo(carte);
	}

	function affLegende(nom) {
		document.getElementById('legende').innerHTML=HtmlLeg[nom];
		}

	// ajout d'une couche
	var Overlays=new Array();
		Overlays["Labellisation"]=0;
		Overlays["Avancement"]=0;

	carte.on("baselayerchange", function(layer) {
		// nettoyage des couches affichées
		for(var i in couchesControl) {
			if(i!=layer.name && carte.hasLayer(couchesControl[i])) {
				carte.removeLayer(couchesControl[i]);
				//justRemoved=i;
				}
			}
		coucheActive=layer.name;
		affLegende(layer.name);
		});	
	// fonctions de bascule entre les couches	
	carte.addLayer(ecoQlabel);
	};	

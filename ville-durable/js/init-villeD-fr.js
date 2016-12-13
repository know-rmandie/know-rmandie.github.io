
$.getJSON("./data/ecoquartiers-france-brut.geojson",function(data) {
    var sources = "sources : " + data.metadata.source + " - " + data.metadata.date;
    var context = "map";
    var radius;
    var Couches = new Array;
    var tiles = {};
    for (i in fonds) {
        var couche = new L.TileLayer(fonds[i].url, {
            attribution: sources + fonds[i].attrib,
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
            $("#header,#footer,h2").css("display", "none");
            $("#main, #page").css("width", "100%");
            $("#page").css("max-width", "none");
            $("#main, #page").css("margin", "0");
            $("#main, #page").css("padding", "0")
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
                attribution: sources + fonds[i].attrib,
                minZoom: fonds[i].zMin,
                maxZoom: fonds[i].zMax,
                unloadInvisibleTiles: true
            });
            Couches[fonds[i].id] = couche;
            tiles[fonds[i].nom] = couche
        }
        if (knwrmdFond == null) knwrmdFond = fonds[0].id;
        Couches[knwrmdFond].addTo(carte);
        var HtmlLeg = new Array;
        HtmlLeg["Labellisation"] = '<div style="background-color:white;border:1px solid #ddd;opacity:0.8;padding:5px">';
        HtmlLeg["Avancement"] = '<div style="background-color:white;border:1px solid #ddd;opacity:0.8;padding:5px">';
        var Labellisation = [{
            "id": "Label - étape 1",
            "icone": "la1-clab",
            "string": "étape 1"
        }, {
            "id": "Label - étape 2",
            "icone": "la2-elab",
            "string": "étape 2"
        }, {
            "id": "Label - étape 3",
            "icone": "la3-label",
            "string": "étape 3"
        }];
        var PinCat = new Array;
        for (i in Labellisation) {
            var url = Labellisation[i].icone + ".png";
            PinCat[Labellisation[i].id] = L.icon({
                iconUrl: "./img/" + url,
                iconRetinaUrl: "./img/" + url,
                iconSize: [20, 38],
                iconAnchor: [15, 38],
                popupAnchor: [-5, -39],
                shadowUrl: "./img/la-ombre.png",
                shadowRetinaUrl: "./img/la-ombre.png",
                shadowSize: [40, 20],
                shadowAnchor: [0, 20]
            });
            HtmlLeg["Labellisation"] += '<img src="./img/' + url + '" style="height:16px"/>&nbsp;' + Labellisation[i].string + "<br/>"
        }
        HtmlLeg["Labellisation"] += "</div>";

        var ecoQlabel = L.markerClusterGroup({
            name: "ecoQlabel",
            maxClusterRadius: function() {
                return (clusterRadius - 50) / 9 * carte.getZoom() +
                    50 - (clusterRadius - 50) / 9
            },
            iconCreateFunction: function(cluster) {
                var cC = cluster.getChildCount();
                var cS = clusterRadius * Math.sqrt(cC) * carte.getZoom() / 20;
                if (cS < 25) cS = 25;
                var cF = cS / 2;
                if (cF < 16) cF = 16;
                return new L.DivIcon({
                    html: '<div style="width:' + cS + "px;height:" + cS + "px;font-size:" + cF + "px;background-color:hsla(270," + 2 * Math.sqrt(cC) * carte.getZoom() + '%,40%,0.5)"><div><span style="line-height:' + cS + 'px">' + cC + "</span></div></div>",
                    className: "marker-cluster marker-cluster-" + cC,
                    iconSize: new L.Point(cS,
                        cS)
                })
            }
        });
        ecoQlabel.name = "ecoQlabel";

        var ecoQengage = L.markerClusterGroup({
            name: "ecoQengage",
            maxClusterRadius: function() {
                return (clusterRadius - 50) / 9 * carte.getZoom() +
                    50 - (clusterRadius - 50) / 9
            },
            iconCreateFunction: function(cluster) {
                var cC = cluster.getChildCount();
                var cS = clusterRadius * Math.sqrt(cC) * carte.getZoom() / 20;
                if (cS < 25) cS = 25;
                var cF = cS / 2;
                if (cF < 16) cF = 16;
                return new L.DivIcon({
                    html: '<div style="width:' + cS + "px;height:" + cS + "px;font-size:" + cF + "px;background-color:hsla(200," + 2 * Math.sqrt(cC) * carte.getZoom() + '%,40%,0.5)"><div><span style="line-height:' + cS + 'px">' + cC + "</span></div></div>",
                    className: "marker-cluster marker-cluster-" + cC,
                    iconSize: new L.Point(cS,
                        cS)
                })
            }
        });
        ecoQengage.name = "ecoQengage";

        var dataEQ = data.features;
        for (i in dataEQ)
            if (document.location.href.match(/tousProjets/g) || document.location.href.match(/adminView/g) || dataEQ[i].properties.Aetat !== "abandonn\u00e9") {
                var html = "<h6>" + dataEQ[i].properties.Ville + " - " + dataEQ[i].properties.name + "</h6>";
                html += '<i class="avct ' +
                    dataEQ[i].properties.avancement + '">' + dataEQ[i].properties.avancement + "</i>";
                var iconeCat;
                if (PinCat[dataEQ[i].properties.avancement] == undefined) iconeCat = PinCat["la9-autre"];
                else iconeCat = PinCat[dataEQ[i].properties.avancement];
                var pointCat = (new L.marker([dataEQ[i].geometry.coordinates[1], dataEQ[i].geometry.coordinates[0]], {
                    icon: iconeCat
                })).bindPopup(html);
                if(dataEQ[i].properties.avancement=="Label - étape 3") ecoQlabel.addLayer(pointCat);
                ecoQengage.addLayer(pointCat);
            }
        var legende = L.control({
            position: "bottomleft"
        });
        legende.onAdd = function(map) {
            var div = L.DomUtil.create("div", "info legend");
            div.setAttribute("id", "legende");
            div.innerHTML = "";
            return div
        };
        legende.addTo(carte);

        var couchesControl = {
            "Labellisés": ecoQlabel,
            "Tous": ecoQengage
        };
        var WMultip = new Array;
        WMultip["Labellisés"] = 4;
        WMultip["Tous"] = 6;
        var coucheActive = "vide";
        if (document.location.href.match(/adminView/g)) {
            var onMapClick =
                function(e) {
                    var coo = e.latlng;
                    var cooTxt = coo.toString().split("(")[1].split(")")[0];
                    if (listCoord === "") listCoord = "Derniers points cliqu\u00e9s :<br/>";
                    listCoord += cooTxt + ";";
                    document.getElementById("listCoord").innerHTML = listCoord;
                    popup.setLatLng(coo).setContent("point : " + cooTxt).openOn(carte)
                };
            var popup = L.popup();
            var listCoord = "";
            carte.on("click", onMapClick);
            carte.on("dblclick", function() {
                listCoord = ""
            });
            var RgeIgn = L.tileLayer.wms("http://georef.application.i2/cartes/mapserv?", {
                layers: "fonds_nb",
                format: "image/png",
                transparent: true,
                attribution: "&copy; IGN 2014"
            });
            Couches["RgeIgn"] = RgeIgn;
            tiles["IGN (r\u00e9seau i\u00b2)"] = RgeIgn;
            var selecteur1 = L.control.layers(tiles);
            selecteur1.addTo(carte);
            var selecteur2 = L.control.layers(couchesControl);
            selecteur2.addTo(carte);
            document.getElementById("aide").setAttribute("style", "display:block")
        } else {
            var selecteur = L.control.layers(couchesControl);
            selecteur.addTo(carte)
        }

        var Overlays = new Array;
        Overlays["Labellisés"] = 0;
        Overlays["Tous"] = 0;
        carte.on("baselayerchange", function(layer) {
            for (var i in couchesControl)
                if (i != layer.name && carte.hasLayer(couchesControl[i])) carte.removeLayer(couchesControl[i]);
            coucheActive = layer.name;
        });
        carte.addLayer(ecoQlabel);
        document.getElementById("legende").innerHTML = HtmlLeg["Labellisation"]
    }
});

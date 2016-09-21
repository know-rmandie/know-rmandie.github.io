$.getJSON("./data/data-normandie-hr.geojson", function(data) {
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
            context =
                "full";
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
/*        var HtmlLeg = new Array;
        HtmlLeg["Icons"] = '<div style="background-color:white;border:1px solid #ddd;opacity:0.8;padding:5px">';
        HtmlLeg["Avancement"] = '<div style="background-color:white;border:1px solid #ddd;opacity:0.8;padding:5px">';*/
        var Icons = [{
            "id": "caap",
            "icone": "la0-aap",
            "string": "candidat aux appels \u00e0 projet (2009 et 2011)"
        }, {
            "id": "clab",
            "icone": "la1-clab",
            "string": "candidat au label"
        }, {
            "id": "elab",
            "icone": "la2-elab",
            "string": "<i>engag\u00e9</i> dans la d\u00e9marche de Icons"
        }, {
            "id": "label",
            "icone": "la3-label",
            "string": "projet labellis\u00e9 \u00e9coquartier"
        }, {
            "id": "autres",
            "icone": "la9-autre",
            "string": "autres projets"
        }];
        var PinCat = new Array;
        for (i in Icons) {
            var url = Icons[i].icone + ".png";
            PinCat[Icons[i].id] = L.icon({
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
            /*HtmlLeg["Icons"] += '<img src="./img/' + url + '" style="height:16px"/>&nbsp;' + Icons[i].string + "<br/>"*/
        }
        /*
        HtmlLeg["Icons"] += "</div>";
        var Avancement = [{
            "id": "abandonn\u00e9",
            "icone": "av0-int",
            "string": "projet abandonn\u00e9"
        }, {
            "id": "suspendu",
            "icone": "av0-int",
            "string": "projet suspendu"
        }, {
            "id": "inconnu",
            "icone": "av0-int",
            "string": "avancement inconnu"
        }, {
            "id": "intention",
            "icone": "av0-int",
            "string": "intention d'\u00e9coquartier"
        }, {
            "id": "projet",
            "icone": "av1-pro",
            "string": "\u00e9coquartier en projet"
        }, {
            "id": "chantier",
            "icone": "av2-chan",
            "string": "\u00e9coquartier en chantier"
        }, {
            "id": "r\u00e9alis\u00e9",
            "icone": "av3-real",
            "string": "\u00e9coquartier r\u00e9alis\u00e9"
        }];
        var PinAv = new Array;
        for (i in Avancement) {
            var url = Avancement[i].icone + ".png";
            PinAv[Avancement[i].id] = L.icon({
                iconUrl: "./img/" + url,
                iconRetinaUrl: "./img/" + url,
                iconSize: [29, 37],
                iconAnchor: [20, 37],
                popupAnchor: [-6, -32],
                shadowUrl: "./img/av-ombre.png",
                shadowRetinaUrl: "./img/av-ombre.png",
                shadowSize: [37, 23],
                shadowAnchor: [0, 20]
            });
            HtmlLeg["Avancement"] += '<img src="./img/' + url + '" style="height:20px"/>&nbsp;' + Avancement[i].string + "<br/>"
        }
        HtmlLeg["Avancement"] += "</div>";*/
        var reseauTE = L.markerClusterGroup({
            name: "reseauTE",
            maxClusterRadius: function() {
                return (clusterRadius - 50) / 9 * carte.getZoom() +
                    50 - (clusterRadius - 50) / 9
            },
            iconCreateFunction: function(cluster) {
                var cC = cluster.getChildCount();
                var cS = Math.sqrt(cC) * carte.getZoom() * carte.getZoom() / 250 * clusterRadius;
                if (cS < 25) cS = 25;
                var cF = cS / 2;
                if (cF < 12) cF = 12;
                return new L.DivIcon({
                    html: '<div style="width:' + cS + "px;height:" + cS + "px;font-size:" + cF + "px;background-color:hsla(270," + 2 * Math.sqrt(cC) * carte.getZoom() + '%,40%,0.5)"><div><span style="line-height:' + cS + 'px">' + cC + "</span></div></div>",
                    className: "marker-cluster marker-cluster-" + cC,
                    iconSize: new L.Point(cS,
                        cS)
                })
            }
        });
        reseauTE.name = "reseauTE";
        /*var ecoQavancement = L.markerClusterGroup({
            name: "ecoQavancement",
            maxClusterRadius: function() {
                return (clusterRadius - 50) / 9 * carte.getZoom() + 50 - (clusterRadius - 50) / 9
            },
            iconCreateFunction: function(cluster) {
                var cC = cluster.getChildCount();
                var cS = Math.sqrt(cC) * carte.getZoom() * carte.getZoom() / 250 * clusterRadius;
                if (cS < 25) cS = 25;
                var cF = cS / 2;
                if (cF < 12) cF = 12;
                return new L.DivIcon({
                    html: '<div style="width:' + cS + "px;height:" + cS + "px;font-size:" + cF + "px;background-color:hsla(170," + 2 * Math.sqrt(cC) *
                        carte.getZoom() + '%,40%,0.5)"><div><span style="line-height:' + cS + 'px">' + cC + "</span></div></div>",
                    className: "marker-cluster marker-cluster-" + cC,
                    iconSize: new L.Point(cS, cS)
                })
            }
        });
        ecoQavancement.name = "ecoQavancement";*/
        var dataTE = data.features;
        for (i in dataTE) {
         if (dataTE[i].geometry.coordinates[1] !== 0) {
               var iconeCat = PinCat["clab"];
                var html = "<h6>" + dataTE[i].properties.firstname + " " + dataTE[i].properties.name + "</h6>";
                html += '<i class="avct ' +  dataTE[i].properties.structure + '">' + dataTE[i].properties.fonction + "</i>";
                html += '<br/>'+ dataTE[i].properties.structure;
                var tel = dataTE[i].properties.tel;
                /* if (tel == 0);
                 else html += "<br/>tel : " + tel;*/
                var email = dataTE[i].properties.email;
                  if (email == "0");
                  else html += "<br/>mél : <a href='mailto:" + email + "'>" + email + "</a>";
               /* var ha = dataTE[i].properties.Isurf,
                    logts = dataTE[i].properties.Ilogmt;
                if (ha == "NULL");
                else html += "<br/>" + ha + " ha, ";
                if (logts == "NULL");
                else html += "<br/>" + logts + " logements,";
                var inter = dataTE[i].properties.Rter,
                    intra = dataTE[i].properties.Rtra;
                if (inter == "NULL");
                else html += "<br/>-&nbsp;<a href=" + inter + '" target="_blank">internet</a>';
                if (intra == "NULL" || document.location.href.match(/adminView/g) == null);
                else html += '<span class="intranet"><br/>-&nbsp;<a href="' +
                    intra + '" target="_blank">intranet</a></span>';*/

                /*iconeCat, iconeAv;
                /*if (PinCat[dataTE[i].properties.Lcat] == undefined) iconeCat = PinCat["la9-autre"];
                else iconeCat = PinCat[dataTE[i].properties.Lcat];
                if (PinAv[dataTE[i].properties.Aetat] == undefined) iconeAv = PinAv["av0-int"];
                else iconeAv = PinAv[dataTE[i].properties.Aetat];*/
                var pointCat = (new L.marker([dataTE[i].geometry.coordinates[1], dataTE[i].geometry.coordinates[0]], {icon: iconeCat}
                )).bindPopup(html);
                reseauTE.addLayer(pointCat);
                /*var pointAv = (new L.marker([dataTE[i].geometry.coordinates[1],
                    dataTE[i].geometry.coordinates[0]
                ], {
                    icon: iconeAv
                })).bindPopup(html);
                ecoQavancement.addLayer(pointAv)*/
            }
         }
        /*var legende = L.control({
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
            "Icons": reseauTE,
            "Avancement": ecoQavancement
        };
        var WMultip = new Array;
        WMultip["Icons"] = 4;
        WMultip["Avancement"] = 6;
        var coucheActive = "vide";*/
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
            /*var selecteur2 = L.control.layers(couchesControl);
            selecteur2.addTo(carte);*/
            document.getElementById("aide").setAttribute("style", "display:block")
        } else {
            /*var selecteur = L.control.layers(couchesControl);
            selecteur.addTo(carte)*/
        }

        function affLegende(nom) {
            document.getElementById("legende").innerHTML = HtmlLeg[nom]
        }
       /* var Overlays = new Array;
        Overlays["Icons"] = 0;
        Overlays["Avancement"] = 0;
        carte.on("baselayerchange", function(layer) {
            for (var i in couchesControl)
                if (i != layer.name && carte.hasLayer(couchesControl[i])) carte.removeLayer(couchesControl[i]);
            coucheActive = layer.name;
            affLegende(layer.name)
        });*/
        carte.addLayer(reseauTE)
    }
});

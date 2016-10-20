$.getJSON("./data/CessionFoncierEtatPoint.geojson", function(data) {
    $.getJSON("./data/CessionFoncierEtatPolygon.geojson", function(dataPoly) {
        var sources = "sources : " + data.metadata.source + " - " + data.metadata.date;
        var context = "map";
        var radius;
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
            var HtmlLeg = new Array;
            HtmlLeg["Statut"] = '<div style="background-color:white;border:1px solid #ddd;opacity:0.8;padding:5px">';
            var Statut = [{
                "id": "projet",
                "icone": "la9-autre",
                "string": "projet de cession"
            }, {
                "id": "cession",
                "icone": "la3-label",
                "string": "cession effective"
            }];
            var PinCat = new Array;
            for (i in Statut) {
                var url = Statut[i].icone + ".png";
                PinCat[Statut[i].id] = L.icon({
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
                HtmlLeg["Statut"] += '<img src="./img/' + url + '" style="height:16px"/>&nbsp;' + Statut[i].string + "<br/>"
            }
            HtmlLeg["Statut"] += "</div>";
            var foncPStatut = L.markerClusterGroup({
                name: "foncPStatut",
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
            foncPStatut.name = "foncPStatut";

            L.geoJson(dataPoly, {
                style: {
                    color: "purple",
                    weight: ".25"
                }
            }).addTo(carte);

            var dataFP = data.features;
            for (i in dataFP)
                if (document.location.href.match(/tousProjets/g) || document.location.href.match(/adminView/g) || dataFP[i].properties.comment !== "abandonn\u00e9") {
                    var statut;
                    // si la date de cession est renseignée, la cession a eu lieu
                    if (dataFP[i].properties.date_ces !== null) statut = "cession";
                    // sinon, c'est un projet
                    else statut = "projet";
                    var html = "<h6>" + dataFP[i].properties.commune + " - " + dataFP[i].properties.operation + "</h6>";
                    if (statut == "cession") {
                        html += '<i class="' + statut + '">date de la cession :&nbsp;' + dataFP[i].properties.date_ces + "</i>";
                    } else html += '<i class="' + statut + '">cession prévue pour&nbsp;' + dataFP[i].properties.prev_ces + "</i>";

                    var m2 = dataFP[i].properties.superficie,
                        logts = dataFP[i].properties.logements,
                        logtssoc = dataFP[i].properties.logt_soc;
                    if (m2 == null);
                    else html += "<br/>- " + m2 + " m², ";
                    if (logts == null);
                    else html += "<br/>- " + logts + " logements,";
                    if (logtssoc == null);
                    else html += "dont " + logtssoc + " logements sociaux,";
                    /*var inter = dataFP[i].properties.Rter,
                        intra = dataFP[i].properties.Rtra;
                    if (inter == "NULL");
                    else html += "<br/>-&nbsp;<a href=" + inter + '" target="_blank">internet</a>';
                    if (intra == "NULL" || document.location.href.match(/adminView/g) == null);
                    else html += '<span class="intranet"><br/>-&nbsp;<a href="' +
                        intra + '" target="_blank">intranet</a></span>';*/
                    var iconeStatut;
                    if (PinCat[statut] == undefined) iconeStatut = PinCat["la9-autre"];
                    else iconeStatut = PinCat[statut];
                    var pointStatut = (new L.marker([dataFP[i].geometry.coordinates[1], dataFP[i].geometry.coordinates[0]], {
                        icon: iconeStatut
                    })).bindPopup(html);
                    foncPStatut.addLayer(pointStatut);
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
            /*var couchesControl = {
                "Statut": foncPStatut,
                "Avancement": ecoQavancement
            };
            var WMultip = new Array;
            WMultip["Statut"] = 4;
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
                    attribution: sources + " | &copy; IGN 2014"
                });
                Couches["RgeIgn"] = RgeIgn;
                tiles["IGN (r\u00e9seau i\u00b2)"] = RgeIgn;
                var selecteur1 = L.control.layers(tiles);
                selecteur1.addTo(carte);
                /*var selecteur2 = L.control.layers(couchesControl);
                selecteur2.addTo(carte);
                document.getElementById("aide").setAttribute("style", "display:block")*/
            } else {
                /*var selecteur = L.control.layers(couchesControl);
                selecteur.addTo(carte)*/
            }
            carte.addLayer(foncPStatut)
            document.getElementById("legende").innerHTML = HtmlLeg["Statut"]
        }
    })
});

(function($) {
    $(function() {
        /* --- */
// outils de débugage
var Tst = [];
function tester(v,text) {
    if(Tst[text] < 10 || Tst[text] === undefined) {
        if(Tst[text] === undefined) Tst[text] = 0;
        console.log("test > "+text);
        console.log(v);
        Tst[text]++;
    }
}
// variables globales
var Geo = [], firstTime = 1;
// -----------------
        // masquage du pilote
        $("#pilote").fadeOut();
        // récupération d'un éventuel identifiant de territoire
        var center,
            hash = window.location.hash.split("#")[1];
        //console.log(hash);

        /* récupération des données */
        // liste des données
        var Dataliste = [
            {type:"csv",url:"./data/territoires.csv"},  // les entités territoriales, avec noms et appartenances
            {type:"csv",url:"./data/oscom-norm-2015.csv"},  // les données d'occupation du sol (OSCOM)
            {type:"json",url:"./data/oscom-legende.json"},   // légende des données OSCOM
            {type:"csv",url:"./data/etb-norm-2004_2013-2017.csv"}  // les données de construction / densité (ETB)
        ];
        // création d'une queue
        var q = d3.queue();
        // récupération des données listées
        Dataliste.forEach(function(obj) {
            if(obj.type === "csv") q.defer(d3.csv, obj.url);
            if(obj.type === "json") q.defer(d3.json, obj.url);
        });
        // lancement des fonctions à l'issue du chargement
        q.awaitAll(launch);

        function launch(err, res) {
            if (err) throw err;
            // remplace le message d'attente par le pilote de recherche
            $("#wait").fadeOut();
            $("#pilote").fadeIn();
            // préparation des données de niveaux territoriaux
            var territ = assoArray(res[0],"id"),
                oscom = res[1],
                oscleg = res[2],
                etb = res[3];
            for(var i in territ) {
                territ[i].label = territ[i].Nom;
                territ[i].value = territ[i].id;
            }
            /* mise en place de l'autocomplete */
            var accentMap = {
                    "á":"a","à":"a",
                    "é":"e","è":"e","ê":"e",
                    "î":"i",
                    "ö":"o","ô":"o",
                    "ù":"u","û":"u"
                };
                normalize = function(term) {
                    var ret = "";
                    for ( var i = 0; i < term.length; i++ ) {
                        //if (i === 0) ret += (accentMap[ term.charAt(i) ] || term.charAt(i)).toUpperCase();
                        //else
                        ret += accentMap[ term.charAt(i) ] || term.charAt(i);
                    }
                    return ret;
                };

            $("#choix").autocomplete({
                source: function( request, response ) {
                      var matcher = new RegExp( $.ui.autocomplete.escapeRegex( normalize(request.term.toLowerCase()) ), "i" );
                      response( $.grep( territ, function( value ) {
                        value = value.label || value.value || value;
                        return matcher.test( value.toLowerCase() ) || matcher.test( normalize( value.toLowerCase() ) );
                      }) );
                  },
                    _renderItem: function(ul,item) {
                        return $( "<li>" )
                        .attr( "data-value",item.id)
                        .append(item.Nom)
                        .appendTo(ul);
                    },
                    /*change:function(event,ui) {
                        $("#titreZone").text(ui.item.label);
                        drawOs(ui.item.value)
                    },
                    focus: function( event, ui ) {
                        $( "#choix" ).val( ui.item.label );
                        return false;
                    },*/
                    select:function(event,ui) {
                        $("#choix").val(ui.item.label);
                        create(ui.item.id);
                        return false;
                    }
                });

            if(hash !== undefined) {
                center = "i"+hash;
                create(center);
            }

            // tracé de toutes les données
            function create(id) {
                // !!todo, faire un traitement différencié pour les différents types de territoires
                // vérifie qu'on part bien d'une commune. Récupère la commune centre sinon...
                for(var t in territ) {
                    if(t === id) {
                        if(territ[t].type !== "c") id = "i"+territ[t].c;
                        break;
                    }
                }
                // récupération des niveaux géographiques
                Geo = geoLevels(id,territ);
                // lancement des différents traitements
                drawOs(id);
                writeIC(id);
            }
            // tracé du graphe d'occupation des sols
            function drawOs(id) {
                $("#titreZone").text(territ[id].Nom);
                var svg = d3.select("svg");
                    svg.attr("width",document.getElementById("OcSol").clientWidth);
                    svg.attr("height","300");
                var margin = {top: 5,right: 5,bottom: 20,left: 100},
                    width = +svg.attr("width") - margin.left - margin.right,
                    height = +svg.attr("height") - margin.top - margin.bottom;
                $("svg g").remove();
                var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var yOs = d3.scaleBand()
                    .rangeRound([0, height])
                    .padding(0.1)
                    .align(0.1);

                var xOs = d3.scaleLinear()
                    .rangeRound([0, width]);

                var stackOs = d3.stack()
                    .offset(d3.stackOffsetExpand);

                var data = [];
                // récupération des en-têtes de colonnes
                data.columns =  oscom.columns;
                // mise en place des données dans la table
                for (var i in oscom) {
                    for (var geo in Geo) {
                        if (oscom[i].insee_2015 === Geo[geo].id) data[+Geo[geo].order] = oscom[i];
                    }
                }
                // valeurs non fournies par oscom dans data : mise à 0
                // !!todo pour les niveaux supérieurs aux communes, on peut reconstituer avec un sumif
                for (var i=0; i<data.length; i++) {
                    console.log(i);
                    if(data[i] === undefined) data.splice(i,1);
                }
                // construction du graphique si on a des données
                if (data.length > 0) {
                    // construction de l'axe y
                    yOs.domain(data.map(function(d) {
                        return territ["i"+d.insee_2015].Nom;
                    }));

                    var tip = d3.tip()
                        .attr('class','d3-tip')
                        .offset([-5, 0])
                        .html(function(d) {
                            var classe = $(this).attr("class").split("c")[1];
                            var title;
                            for (var l in oscleg) {
                                if (oscleg[l].code === classe) title = oscleg[l].nature;
                            }
                            return title;
                        });
                    svg.call(tip);

                    var serie = g.selectAll(".serie")
                        .data(stackOs.keys(data.columns.slice(1))(data))
                        .enter().append("g")
                        .attr("class", function(d) {
                            return "serie c" + d.key;
                        })
                        .on('mouseover', tip.show)
                        .on('mouseout', tip.hide);

                    serie.selectAll("rect")
                        .data(function(d) {
                            return d;
                        })
                        .enter().append("rect")
                        .attr("y", function(d) {
                            return yOs(territ["i"+d.data.insee_2015].Nom);
                        })
                        .attr("x", function(d) {
                            return xOs(d[0]);
                        })
                        .attr("width", function(d) {
                            return xOs(d[1] - d[0]);
                        })
                        .attr("height", yOs.bandwidth());

                    g.append("g")
                        .attr("class", "axis axis--x")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(xOs).ticks(10, "%"));

                    g.append("g")
                        .attr("class", "axis axis--y")
                        .call(d3.axisLeft(yOs));

                    // ajoute les sources et la légende si on est sur la première utilisation
                    if(firstTime === 1) {
                        var ocSoSource = d3.select('#OcSoLeg').append("p").attr("class","source")
                            .html("source : <a href='http://valor.national.agri/R23-01-Haute-Normandie-Occupation?id_rubrique=187'>Observatoire de l'occupation des Sol Communale</a> (OSCOM) 2015 - <a href='http://draaf.normandie.agriculture.gouv.fr'>DRAAF Normandie</a> - 2016");
                        var ocSoLeg = d3.select('#OcSoLeg').append('ul');;
                        for (var l in oscleg) {
                            ocSoLeg.append('li')
                                .text(oscleg[l].nature)
                                .attr('class','fa fa-square c'+oscleg[l].code);
                        }
                    firstTime = 0;
                    }
                }
            }

            // tableau des données ETB
            function writeIC(id) {
                // récupération des niveaux géographiques
                // nettoyage de la table existante
                $('#iCons table tr').remove();
                // mise en place de la table
                var table = d3.select('#iCons').append('table');
                // en-têtes
                var thead = table.append('tr');
                    thead.append('th').text('Nom');
                    thead.append('th').text('Locaux construits');
                    thead.append('th').text('Surface utilisée');
                    thead.append('th').text('Densité');
                    thead.append('th').text('Intensité');

                // création des lignes pour chaque niveau géographiques
                var Line = [];
                for(var geo in Geo) {
                    Line[Geo[geo].order] = table.append('tr');
                }
                // remplissage des lignes
                for (var t in etb) {
                    for (var geo in Geo) {
                        if(etb[t].insee_2017 === Geo[geo].id) {
                            var l = Line[Geo[geo].order];
                            l.append('td').text(territ['i'+etb[t].insee_2017].Nom);
                            l.append('td').attr('class','int').text(etb[t].loc);
                            l.append('td').attr('class','real').text(Math.round(etb[t].cons/100)/100);
                            l.append('td').attr('class','real').text(Math.round(etb[t].dens*100)/100);
                            l.append('td').attr('class','real').text(Math.round(etb[t].loc/territ["i"+etb[t].insee_2017].pop*1000/10*100)/100);

                        }//fillLine(Line[Geo[geo].order],t);
                    }
                    /*if(etb[t].insee_2017 === id) createLine(tr0,t);
                    if(etb[t].insee_2017 === dep) createLine(tr4,t);
                    if(etb[t].insee_2017 === "Norm") createLine(tr5,t);*/
                }
                // ajout des sources
                var iConsSource = d3.select('#iConsLeg').append("p").attr("class","source")
                    .html("source : <a href='http://www.epf-normandie.fr/Actualites/A-la-Une/Accompagnement-de-l-EPF-Normandie-dans-la-mesure-de-la-consommation-fonciere-a-l-echelle-regionale-Mise-en-ligne-de-la-base-de-donnees-Extension-du-Tissu-Bati-ETB'>Extension du Tissu Bâti</a> (ETB) 2004 > 2013 - <a href='http://www.epf-normandie.fr/'>EPF Normandie</a> - 2016");
            }
         }

         // fonction de construction des niveaux géographiques
         function geoLevels(id,base) {
             // récupération de l'identifiant de la commune centre (si existe)
             var com = base[id].c;
             // si on a un "centre", on "recentre"
             var Levels = [], ord = 0, sub = null;
             if(com !== "" && com !== null && com !== undefined) {
                 // si notre territoire est une commune, elle a été fusionnée commune nouvelle
                 if(base[id].type === "c") {
                     sub = id.substr(1,id.length);
                     Levels["sub"]={"id":sub,"order":ord};
                     ord++;
                 }
                 // sinon, c'est un epci, un SCoT ou autre
                 // dans tous les cas on repart de la commune nouvelle
                 id = "i"+com;
             }
             else com = id.substr(1,id.length);
             Levels["com"]={"id":com,"order":ord};ord++;
             if(base[id].e !== undefined) {
                 Levels["epci"]={"id":base[id].e,"order":ord};
                 ord++};
             Levels["dep"]={"id":com.substr(0,2),"order":ord};ord++;
             Levels["reg"]={"id":"Norm","order":ord};
             return Levels;
         }
        /* fonction de récupération du nom de territoire
        function searchIn(base,field,val) {
            for(var i in base) {
                if(base[i].field === val) return i;
            }
        }

        function nomTerr(id) {
            var name = territ[searchIn(base,"value",id)].label;
            if (name === undefined) name =
            /*for(var i in base) {
                //console.log(base[i]);
                if(base[i].value === id) return base[i].label;
            }
        }*/

        // transforme un tableau en tableau associatif avec field comme champ "id"
        function assoArray(base,field) {
            var array = [];
            for (var i in base) {
                if(array["i"+base[i][field]] !== undefined) {
                    // création d'un identifiant pour les "sous-communes"
                    array["xi"+base[i][field]] = base[i];
                }
                else array["i"+base[i][field]] = base[i];
            }
            return array;
        }

        /* fonction de bascule entre les onglets */
        $('.onglet').on('click', function(e) {
            var target = $(this).attr("target");
            $('#onglets li').removeClass('active');
            $(this).addClass('active');
            $('#fiche > div').removeClass('active');
            $('#' + target).addClass('active');
        });


        /* --- */
    });
})(jQuery);

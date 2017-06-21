(function($) {
    $(function() {
/* --- */
// outils de débugage
var Tst = [];

function tester(v, text) {
    if (Tst[text] < 20 || Tst[text] === undefined) {
        if (Tst[text] === undefined) Tst[text] = 0;
        console.log("test > " + text);
        console.log(v);
        Tst[text]++;
    }
}
// variables globales
var Geo = [],
    firstTime = 1;
// -----------------
// masquage du pilote
$("#pilote").fadeOut();
// récupération d'un éventuel identifiant de territoire (?) et d'un onglet de départ (#)
tester(window.location,"location");
var center,
    hash = window.location.hash.split("#")[1] || "no",
    pos = window.location.search.split("?")[1] || hash.split("?")[1];
    hash = hash.split("?")[0];
// bascule sur l'onglet de départ
if(hash !== "no") bascule(hash);

tester(hash,"hash");
tester(pos,"pos");
/* récupération des données */
// liste des données
var Dataliste = [{
    type: "csv",
    url: "./data/territoires.csv"
}, // les entités territoriales, avec noms et appartenances
                 {
                     type: "csv",
                     url: "./data/oscom-norm-2015.csv"
                 }, // les données d'occupation du sol (OSCOM)
                 {
                     type: "json",
                     url: "./data/oscom-legende.json"
                 }, // légende des données OSCOM
                 {
                     type: "csv",
                     url: "./data/etb-norm-2004_2013-2017.csv"
                 } // les données de construction / densité (ETB)
                ];
// création d'une queue
var q = d3.queue();
// récupération des données listées
Dataliste.forEach(function(obj) {
    if (obj.type === "csv") q.defer(d3.csv, obj.url);
    if (obj.type === "json") q.defer(d3.json, obj.url);
});
// lancement des fonctions à l'issue du chargement
q.awaitAll(launch);

function launch(err, res) {
    if (err) throw err;
    // remplace le message d'attente par le pilote de recherche
    $("#wait").fadeOut();
    $("#pilote").fadeIn();
    // préparation des données de niveaux territoriaux
    var territ = assoArray(res[0], "id"),
        oscom = res[1],
        oscleg = res[2],
        etb = res[3];
    for (var i in territ) {
        territ[i].label = territ[i].Nom;
        territ[i].value = territ[i].id;
    }
    /* mise en place de l'autocomplete */
    var accentMap = {
        "á": "a","à": "a",
        "é": "e","è": "e","ê": "e",
        "î": "i",
        "ö": "o","ô": "o",
        "ù": "u","û": "u"
    };
    normalize = function(term) {
        var ret = "";
        for (var i = 0; i < term.length; i++) {
            //if (i === 0) ret += (accentMap[ term.charAt(i) ] || term.charAt(i)).toUpperCase();
            //else
            ret += accentMap[term.charAt(i)] || term.charAt(i);
        }
        return ret;
    };

    $("#choix").autocomplete({
        source: function(request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(normalize(request.term.toLowerCase())), "i");
            response($.grep(res[0], function(value) {
                value = value.label || value.value || value;
                return matcher.test(value.toLowerCase()) || matcher.test(normalize(value.toLowerCase()));
            }));
        },
        _renderItem: function(ul, item) {
            return $("<li>")
                .attr("data-value", item.id)
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
        select: function(event, ui) {
            $("#choix").val(ui.item.label);
            create("i"+ui.item.id);
            return false;
        }
    });

tester(pos,"pos");
    if (pos !== undefined) {
        center = "i" + pos;
        create(center);
    }

    // tracé de toutes les données
    function create(id) {
        // !!todo, faire un traitement différencié pour les différents types de territoires
        // vérifie qu'on part bien d'une commune. Récupère la commune centre sinon...
tester(territ[id],"territ/id");
        if (territ[id].type !== "c") id = "i" + territ[id].c;
tester(id,"id1");
        // récupération des niveaux géographiques
        Geo = geoLevels(id, territ);
        // lancement des différents traitements
        drawOs(id);
        writeIC(id);
    }
    // tracé du graphe d'occupation des sols
    function drawOs(id) {
        $("#titreZone").text(territ[id].Nom);
        var svg = d3.select("svg");
        svg.attr("width", document.getElementById("OcSol").clientWidth);
        svg.attr("height", "300");
        var margin = {
            top: 5,
            right: 20,
            bottom: 20,
            left: 100
        },
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
        data.columns = oscom.columns;
        // mise en place des données dans la table
        for (var i in oscom) {
            for (var geo in Geo) {
                if (oscom[i].insee_2015 === Geo[geo].id) data[+Geo[geo].order] = oscom[i];
            }
            for (var geo in Geo) {
                // vérification des données et compléments éventuels
                if (data[+Geo[geo].order] === undefined) {
                    // si on est sur une commune on regarde l
                    if (geo !== "inf" && geo !== "com" && geo !== "dep" && geo !== "reg") {
                        data[+Geo[geo].order] = sumIf(territ, geo.substr(0, 1), Geo[geo].id, oscom, "insee_2015", "all");
                    }
                }
            }
        }
        // valeurs toujours non fournies par oscom dans data : mise à 0
        for (var i = 0; i < data.length; i++) {
            if (data[i] === undefined) data.splice(i, 1);
        }
        // construction du graphique si on a des données
        if (data.length > 0) {
            // construction de l'axe y
            yOs.domain(data.map(function(d) {
                if(territ["i"+d.insee_2015] === undefined) {
                    var nouvTer = {};
                    nouvTer.id = d.insee_2015;
                    nouvTer.Nom = "nom inconnu (" + d.insee_2015 + ")";
                    territ["i"+nouvTer.id] = nouvTer;
                }
                return territ["i" + d.insee_2015].Nom;
            }));

            var tip = d3.tip()
            .attr('class', 'd3-tip')
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
                return yOs(territ["i" + d.data.insee_2015].Nom);
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

            var select = $("#OcSol .axis--y text");
            select.each(function() {
                var txt = $(this).text();
                $(this).text("");
                $(this).parent()
                    .html("<foreignObject y='-" + yOs.bandwidth()/2 + "' x='-" + margin.left + "' width='" + margin.left + "' height='" + yOs.bandwidth() + "'><body xmlns='http://www.w3.org/1999/xhtml'><div><span>" + txt + "</span></div></body></foreignObject>");
            });


            // ajoute les sources et la légende si on est sur la première utilisation
            if (firstTime > 0) {
                var ocSoSource = d3.select('#OcSoLeg').append("p").attr("class", "source")
                .html("source : <a href='http://valor.national.agri/R23-01-Haute-Normandie-Occupation?id_rubrique=187'>Observatoire de l'occupation des Sol Communale</a> (OSCOM) 2015 - <a href='http://draaf.normandie.agriculture.gouv.fr'>DRAAF Normandie</a> - 2016");
                var ocSoLeg = d3.select('#OcSoLeg').append('ul');
                for (var l in oscleg) {
                    ocSoLeg.append('li')
                        .text(oscleg[l].nature)
                        .attr('class', 'fa fa-square c' + oscleg[l].code);
                }
                firstTime += -0.5;
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
        // + vérification de l'existence de la valeur dans la table
        var Line = [],
            Data = [];
        for (var geo in Geo) {
            // ajout de la ligne dans la table
            Line[Geo[geo].order] = table.append('tr');
            for (var t in etb) {
                if (etb[t].insee_2017 === Geo[geo].id) Data[geo] = etb[t];
            }
            if (Data[geo] === undefined) {
                if (geo !== "inf" && geo !== "com" && geo !== "dep" && geo !== "reg") {
                    Data[geo] = sumIf(territ, geo.substr(0, 1), Geo[geo].id, etb, "insee_2017", "all");
                    etb.push(Data[geo]);
                }
            }
        }
        // remplissage des lignes
        for (var d in Data) {
            for (var geo in Geo) {
                if (Data[d].insee_2017 === Geo[geo].id) {
                    var cons = 1 * Data[d].cons,
                        loc = 1 * Data[d].loc,
                        dens = Math.round(loc / cons * 100 * 10000) / 100,
                        pop;
                    if (territ["i" + Data[d].insee_2017] !== undefined) pop = territ["i" + Data[d].insee_2017].pop;
                    else {
                        pop = sumIf(territ, geo.substr(0, 1), Geo[geo].id, territ, "id", "pop");
                        tester(pop, "pop");
                    }

                    var l = Line[Geo[geo].order];
                    l.append('td').text(territ['i' + Data[d].insee_2017].Nom);
                    l.append('td').attr('class', 'int').text(loc);
                    l.append('td').attr('class', 'real').text(Math.round(cons / 100) / 100);
                    l.append('td').attr('class', 'real').text(dens);
                    l.append('td').attr('class', 'real').text(Math.round(loc / pop * 1000 / 10 * 100) / 100);
                } //fillLine(Line[Geo[geo].order],t);
            }
            /*if(etb[t].insee_2017 === id) createLine(tr0,t);
    if(etb[t].insee_2017 === dep) createLine(tr4,t);
    if(etb[t].insee_2017 === "Norm") createLine(tr5,t);*/
        }
        // ajout des sources
        if (firstTime > 0) {
            var iConsSource = d3.select('#iConsLeg').append("p").attr("class", "source")
            .html("source : <a href='http://www.epf-normandie.fr/Actualites/A-la-Une/Accompagnement-de-l-EPF-Normandie-dans-la-mesure-de-la-consommation-fonciere-a-l-echelle-regionale-Mise-en-ligne-de-la-base-de-donnees-Extension-du-Tissu-Bati-ETB'>Extension du Tissu Bâti</a> (ETB) 2004 > 2013 - <a href='http://www.epf-normandie.fr/'>EPF Normandie</a> - 2016");
        }
        firstTime += -0.5;
    }
}

// fonction de construction des niveaux géographiques
function geoLevels(id, base) {
    // récupération de l'identifiant de la commune centre (si existe)
tester(id,"id");
tester(base,"base");
tester(base[id],"base/id");
    var com;
    if(base[id].c !== undefined) com = base[id].c;
    // si on a un "centre", on "recentre"
    var Levels = [],
        ord = 0,
        inf = null;
    if (com !== "" && com !== null && com !== undefined) {
        // si notre territoire est une commune, elle a été fusionnée commune nouvelle
        if (base[id].type === "c") {
            inf = id.substr(1, id.length);
            Levels.inf = {
                "id": inf,
                "order": ord
            };
            ord++;
        }
        // sinon, c'est un epci, un SCoT ou autre
        // dans tous les cas on repart de la commune nouvelle
        id = "i" + com;
    } else com = id.substr(1, id.length);
    Levels.com = {
        "id": com,
        "order": ord
    };
    ord++;
    if (base[id].e !== undefined) {
        Levels.epci = {
            "id": base[id].e,
            "order": ord
        };
        ord++;
    }
    Levels.dep = {
        "id": com.substr(0, 2),
        "order": ord
    };
    ord++;
    Levels.reg = {
        "id": "Norm",
        "order": ord
    };
    return Levels;
}

/* fonction de sum if :
- testBase est un tableau associatif : testBase[id] = {a:"xxxx",b:"xxxx",...}
- sumBase est un tableau classique avec l'identifiant de l'objet en champ 0 :  sumBase[i] = {id:"xxxx",field1:"xxxx",...}        */
function sumIf(testBase, tField, value, sumBase, sJoint, sumField) {
    // initialisation de la somme
    if (sumField === "all") { // on veut sommer toutes les valeurs
        var Sum = {}; // parcours du tableau
        for (var b in sumBase) {
            // vérification de la condition
            if (testBase["i" + sumBase[b][sJoint]][tField] === value) {
                // initialisation
                if (Object.size(Sum) === 0) {
                    var clefs = Object.keys(sumBase[b]);
                    var tmp = {};
                    for (var k in clefs) {
                        if (sumBase[b][clefs[k]] !== undefined) tmp[clefs[k]] = 1 * sumBase[b][clefs[k]];
                        else sumBase[b][clefs[k]] = 0;
                    }
                    Sum = tmp;
                }
                // somme ensuite sinon
                else {
                    for (var v in sumBase[b]) {
                        if (sumBase[b][v] !== undefined) Sum[v] += 1 * sumBase[b][v];
                    }
                }
            }
        }
        // remise de l'identifiant "propre" à la somme
        Sum[sJoint] = value;
        sumBase.push(Sum);
        return(Sum);
    } else { // on veut sommer seulement le champ sumField
        var sum = 0;
        // parcours du tableau
        for (var b in sumBase) {
            // vérification de la condition et somme
            if (testBase["i" + sumBase[b][sJoint]][tField] === value) sum += 1 * sumBase[b][sumField];
        }
        return sum;
    }
    // si la base de test n'a pas l'entité : ajout
    if (testBase["i" + value] === undefined) {
        testBase["i" + value] = {};
        for (var x in testBase) {
            // attention n'est pas "baseProof"
            if (testBase["i" + value].id === undefined) {
                for (var k in testBase[x]) {
                    testBase["i" + value][k] = "calculé (" + value + ")";
                }
            }
        }
    }
}

// fournit la "taille" d'un objet ()
Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
// transforme un tableau en tableau associatif avec field comme champ "id"
function assoArray(base, field) {
    var array = [];
    for (var i in base) {
        if (array["i" + base[i][field]] !== undefined) {
            // création d'un identifiant pour les "sous-communes"
            array["xi" + base[i][field]] = base[i];
        } else array["i" + base[i][field]] = base[i];
    }
    return array;
}

/* fonction de bascule entre les onglets */
function bascule(cible) {
    $('#onglets li').removeClass('active');
    $('#onglets li.' + cible).addClass('active');
    $('#fiche > div').removeClass('active');
    $('#' + cible).addClass('active');
}
$('.onglet').on('click', function(e) {
    var target = $(this).attr("target");
    bascule(target);
});
/* --- */
    });
})(jQuery);

(function($) {
    $(function() {
        /* --- */
// outil de débugage
var test = 0;
function tester(v) {
    if(test < 10) {
        console.log(v);
        test++;
    }
}
//
        var hash = window.location.hash.split("#")[1];
        console.log(hash);

        // récupération des données d'occupation du sol (+nom des communes et recherche des communes)
        d3.csv("./data/oscom-norm-2015.csv", function(error, oscom) {
            if (error) throw error;
            var terr = oscom.map(function(d) {
                return {label:d.Nom,value:d.insee_2015};
            });
            // récupération des textes de légende
            d3.json("./data/oscom-legende.json", function(error, oscleg) {
                var svg = d3.select("svg");
                    svg.attr("width",document.getElementById("OcSol").clientWidth);
                    svg.attr("height","200");
                var margin = {
                  top: 5,
                  right: 5,
                  bottom: 20,
                  left: 100
                    },
                    width = +svg.attr("width") - margin.left - margin.right,
                    height = +svg.attr("height") - margin.top - margin.bottom,
                    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var yOs = d3.scaleBand()
                    .rangeRound([0, height])
                    .padding(0.1)
                    .align(0.1);

                var xOs = d3.scaleLinear()
                    .rangeRound([0, width]);

                var stackOs = d3.stack()
                    .offset(d3.stackOffsetExpand);

                // tracé du graphe d'occupation des sols
                function drawOs(center) {
                    $("#titreZone").text(nomTerr(center,terr));
                    g.remove();
                    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    var data = [];
                    data.columns =  oscom.columns;
                    var dep = center.substr(0,2);
                    // remplissage du tableau de données en partant du "centre";
                    for (var i in oscom) {
                        if (oscom[i].insee_2015 === center) {
                            data[0] = oscom[i];
                            // !!todo récupération des entités supérieures
                        }
                        if (oscom[i].insee_2015 === dep) data[1] = oscom[i];
                        if (oscom[i].insee_2015 === "Norm") data[2] = oscom[i];
                        }
                    if (data.length > 0) {
                        // construction de l'axe y
                        yOs.domain(data.map(function(d) {
                            return d.Nom
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
                            .data(stackOs.keys(oscom.columns.slice(4))(data))
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
                                return yOs(d.data.Nom);
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
                    }
                }

                /* mise en place de l'autocomplete */
                $("#choix").autocomplete({
                    source:terr,
                    _renderItem: function(ul,item) {
                        return $( "<li>" )
                        .attr( "data-value",item.value)
                        .append(item.label)
                        .appendTo(ul);
                    },
                    /*change:function(event,ui) {
                        $("#titreZone").text(ui.item.label);
                        drawOs(ui.item.value)
                    },*/
                    select:function(event,ui) {
                        //
                        drawOs(ui.item.value)
                    }
                    /*function(request,response) {
                        var matcher=new RegExp($.ui.autocomplete.escapeRegex(normalize(request.term)),"i");
                        response($.grep(terr,function(value) {
                            //value=value.label || value.value || value;
                            console.log(matcher);
                            tester(value);
                            return matcher.test(value) || matcher.test(normalize(value));
                        }));
                    }*/
                });

                if(hash !== undefined) drawOs(hash);
            });

            /* mise en place des statistiques d'intensité de construction à partir de la base ETB */
            d3.csv("./data/etb-norm-2004_2013-2017.csv", function(error, etb) {
                if (error) throw error;

                function writeIC(center) {
                    var table = d3.select('#iCons').append('table')
                    var thead = table.append('tr');
                        thead.append('th').text('Nom');
                        thead.append('th').text('Surface utilisée');
                        thead.append('th').text('Locaux construits');
                        thead.append('th').text('Densité moyenne');
                    var tr = table.append('tr');
                    for (var t in etb) {
                        if(etb[t].insee_2017 === center) {
                            tr.append('td').text(nomTerr(etb[t].insee_2017, terr));
                            tr.append('td').attr('class','real').text(Math.round(etb[t].Surfcons/100)/100);
                            tr.append('td').attr('class','int').text(etb[t].Locaux);
                            tr.append('td').attr('class','real').text(Math.round(etb[t].Dens_cons*100)/100);
                        }
                    }
                }
                if(hash !== undefined) writeIC(hash);

            });


        });


        /* fonction de récupération du nom de territoire */
        function nomTerr(id,base) {
            for(var i in base) {
                //console.log(base[i]);
                if(base[i].value === id) return base[i].label;
            }
        }


        /* fonction de bascule entre les onglets */
        $('.onglet').on('click', function(e) {
            var target = $(this).attr("target");
            $('#onglets li').removeClass('active');
            $(this).addClass('active');
            $('#fiche > div').removeClass('active');
            $('#' + target).addClass('active');
        });

        /* fonction de nettoyage des accents */
        var accentMap = {
              "à":"a",
        	  "é":"e","è":"e","ê":"e","ë":"e",
        	  "ù":"u","ô":"o",
        	  "-":" ",
            };
        var normalize=function(term) {
        	var ret = "";
        	for (var i=0;i<term.length;i++) {
                ret+=accentMap[term.charAt(i)] || term.charAt(i);
        		}
            return ret;
            };

        /* --- */
    });
})(jQuery);

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
        var svg = d3.select("svg");
            svg.attr("width",document.getElementById("OcSol").clientWidth);
            svg.attr("height","200");
        var margin = {
          top: 30,
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
            .rangeRound([width, 0]);

        var zOs = d3.scaleOrdinal()
            .range(["#b00","#a08","#b99","#bb9","#b99", // espaces urbanisés 12,11,13,14,15
                "#660","#990","#ac0","#774", // espaces agricoles
                "#292","#9b9","#aaf","#ddd" // espaces naturels, eau et indéfini
            ]);

        var stackOs = d3.stack()
            .offset(d3.stackOffsetExpand);

        // récupération des données d'occupation du sol
        d3.csv("./data/oscom-norm-2015.csv", function(error, oscom) {
            if (error) throw error;
            // récupération des textes de légende
            d3.json("./data/oscom-legende.json", function(error, oscleg) {
                zOs.domain(oscom.columns.slice(3));

                // tracé du graphe d'occupation des sols
                function drawOs(center) {
                    var data = [];
                    data.columns =  oscom.columns;
                    // remplissage du tableau de données en partant du "centre";
                    for (var i in oscom) {
                        if (oscom[i].insee_2015 === center) {
                            data.push(oscom[i]);
                            i++;data.push(oscom[i]);
                            i++;data.push(oscom[i]);
                        }
                    }
                    if (data.length > 0) {
                        // construction de l'axe y
                        yOs.domain(data.map(function(d) {
                            return d.Nom;
                        }));

                        var serie = g.selectAll(".serie")
                            .data(stackOs.keys(oscom.columns.slice(3))(data))
                            .enter().append("g")
                            .attr("class", "serie")
                            .attr("fill", function(d) {
                                return zOs(d.key);
                            });

                        serie.selectAll("rect")
                            .data(function(d) {
                                return d;
                            })
                            .enter().append("rect")
                            .attr("y", function(d) {
                                return yOs(d.data.Nom);
                            })
                            .attr("x", function(d) {
                                return xOs(d[1]);
                            })
                            .attr("width", function(d) {
                                return xOs(d[0]) - xOs(d[1]);
                            })
                            .attr("height", yOs.bandwidth());

                        g.append("g")
                            .attr("class", "axis axis--x")
                            .attr("transform", "translate(0," + height + ")")
                            .call(d3.axisBottom(xOs).ticks(10, "%"));

                        g.append("g")
                            .attr("class", "axis axis--y")
                            .call(d3.axisLeft(yOs));

                        var legend = serie.append("g")
                            .attr("class", "legend")
                            .attr("transform", function(d) {
                                var p = d[0];
                                console.log(p);
                                if(p[0] === p[1]) return "translate(-50,-50)";
                                else return "translate(" + xOs((p[0]+p[1])/2) + ","+ (-margin.top/2) +" )"// + (yOs(d.data.Nom) - yOs.bandwidth()) + ")";
                            });

                        legend.append("line")
                            .attr("y1", 5)
                            .attr("x1", 15)
                            .attr("x2", 15)
                            .attr("y2", 12)
                            .attr("stroke", "#555");

                        legend.append("text")
                            .attr("x", 9)
                            .attr("dy", "0.35em")
                            .attr("fill", "#555")
                            .attr("width", "80")
                            .style("font", "10px sans-serif")
                            .attr("title", function(d) {
                                var title;
                                for (var l in oscleg) {
                                    if (oscleg[l].code === d.key) title = oscleg[l].nature;
                                }
                                return title;
                            })
                            .text(function(d) {
                                return d.key;
                            });
                    }
                }
                drawOs("50480");
            });
        });





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

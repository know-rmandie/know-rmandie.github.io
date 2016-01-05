(function($) {
	$(function() {
	// resizing graphs when resizing window
	$(window).resize(function() {
		clearTimeout(window.resizedFinished);
		window.resizedFinished = setTimeout(function(){
			getWidth();
			console.log(rW);
			$(".full svg")
				.width(rW)
				.height(rW/2);
			$(".full svg > g").attr("transform","translate(5,10) scale("+rW/rWg+")");
			if(rW>=730) rW=rW/2;
				rH=rW/1.6;
			$(".illus svg")
				.width(rW)
				.height(rH);
				console.log(rW+" - "+rH);
			$(".illus svg > g").attr("transform","translate(50,10) scale("+rW/rWi+")");
			}, 250);
		});
	
	// tracé des diagrammes de Sankey	
	function sankeyUrba(div,donnees,w,h) {
		var units="communes";
		// dimensions par défaut (si non fournies en paramètres d'entrée)
		getWidth('graph');
		if(rWg==null) rWg=rW;
		if(!w) w=rW;
		if(!h) h=rH;
		var margin = {top:7,right:0,bottom:5,left:1},
			width = w - margin.left - margin.right,
			height = h - margin.top - margin.bottom;
		var formatNumber = d3.format(".0f");    // zero decimal places
		var formatPercent = d3.format(".1f");   // one decimal places
			format = function(d) { return formatNumber(d) + " " + units; },
			percent = function(d,s) {return formatPercent(d/s*100)+" %"}
			color = d3.scale.category20();
		// append the svg canvas to the page
		var svg = d3.select("#graphe"+div).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", 
				"translate(" + margin.left + "," + margin.top + ")");
		// Set the sankey diagram properties
		var sankey=d3.sankey()
			.nodeWidth(w/4)
			.nodePadding(5)
			.size([width, height]);
		var path = sankey.link();
		var pop=0; // population
		var proc=0; // procédures en cours
		// load the data
		d3.json(donnees,function(error,graph) {
			var nodeMap = {};
			graph.nodes.forEach(function(x) {
				nodeMap[x.name]=x;
				pop+=eval(x.val);
				});
			pop=pop/2;
			graph.links.forEach(function(x) {proc+=eval(x.value)})
			graph.links=graph.links.map(function(x) {
				return {
					source:nodeMap[x.source],
					target:nodeMap[x.target],
					value:x.value
					};
				});
			sankey
				.nodes(graph.nodes)
				.links(graph.links)
				.layout(42);
			// add in the links
			var link = svg.append("g").selectAll(".link")
				.data(graph.links)
				.enter().append("path")
				.attr("class", "link")
				.attr("d",path)
				.style("stroke-width", function(d) { return Math.max(0, d.dy); })
				.sort(function(a, b) { return b.dy - a.dy; });
			// add the link titles
			link.append("title")
				.text(function(d) {
					return d.source.name+""+d.target.name+"\n"+format(d.value)+"\n"+percent(d.value,pop)});
			// add in the nodes
			var node = svg.append("g").selectAll(".node")
				.data(graph.nodes)
				.enter().append("g")
				.attr("class","node")
				.attr("transform", function(d) {
					return "translate(" + d.x + "," + d.y + ")"; })
				.call(d3.behavior.drag()
				.origin(function(d) { return d; })
				.on("dragstart", function() {
					this.parentNode.appendChild(this); })
				.on("drag", dragmove));
			// add the rectangles for the nodes
			node.append("rect")
				.attr("height",function(d) {return d.dy;})
				.attr("width",sankey.nodeWidth())
				.style("fill",function(d) {
					if(!d.couleur) return d.color = color(d.name.replace(/ .*/, "")); 	// bricolé SC
					else return d.color=d.couleur})									 									 // bricolé SC
				.style("stroke", function(d) {
					return d3.rgb(d.color).darker(2); })
				.append("title")
				.text(function(d) {
					return d.name+"\n"+format(d.val)+" ("+percent(d.val,pop)+")"
					}); 
			// add in the title for the nodes
			node.append("text")
				.attr("x", 6)
				.attr("y", function(d) { return d.dy / 2; })
				.attr("dy", ".35em")
				.attr("text-anchor", "start")
				.attr("transform", null)
				.text(function(d) { return d.name+" ("+d.val+" / "+percent(d.val,pop)+")"; })
				.filter(function(d) { return d.x < width / 2; })
				.attr("x", 6 )
				.attr("text-anchor", "start");
			// the function for moving the nodes
			function dragmove(d) {
				d3.select(this).attr("transform",
					"translate(" + (
						d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
						) + "," + (
						d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
						) + ")");
				sankey.relayout();
				link.attr("d", path);
				}
			$("#nb"+div).html(format(proc)+" en proc. ("+percent(proc,pop)+")");	
			});
		//alert(proc+" proc. en cours ("+percent(proc,pop)+"%)");
			
		}
	
	// tracé des barres empilées
	function barresEmpilees(div,donnees,w,h) {
		// dimensions par défaut (si non fournies en paramètres d'entrée)
		getWidth('graph');
		if(rW>=730) rW=rW/2;
		if(rWi==null) rWi=rW;		
		rH=rW/1.6;
		if(!w) var w=rW;
		if(!h) var h=rH;
		var margin = {top: 10, right: 100, bottom: 20, left: 50},
			width = w - margin.left - margin.right,
			height = h - margin.top - margin.bottom;
		var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .5);
		var y = d3.scale.linear()
			.rangeRound([height, 0]);
		var color = d3.scale.ordinal()
			.range(["#c0c0c0", "#ff420e", "#ffd320", "#579d1c", "#0084D1","#83CAFF"]);
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.tickFormat(d3.format(".0%"));
		var svg = d3.select(div).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		d3.csv(donnees, function(error, data) {
			color.domain(d3.keys(data[0]).filter(function(key) { return key !== "territoire"; }));
			data.forEach(function(d) {
				var y0 = 0;
				d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
				d.ages.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
				});
			//data.sort(function(a, b) { return b.ages[0].y1 - a.ages[0].y1; });
			x.domain(data.map(function(d) { return d.territoire; }));
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);
			svg.append("g")
				.attr("class", "y axis")
				.call(yAxis);
			var territoire = svg.selectAll(".territoire")
				.data(data)
				.enter().append("g")
				.attr("class", "territoire")
				.attr("transform", function(d) { return "translate(" + x(d.territoire) + ",0)"; });
			territoire.selectAll("rect")
				.data(function(d) { return d.ages; })
				.enter().append("rect")
					.attr("width", x.rangeBand())
					.attr("y", function(d) { return y(d.y1); })
					.attr("height", function(d) { return y(d.y0) - y(d.y1); })
					.style("fill", function(d) { return color(d.name); })
					.append("title")
						.text(function(d) {return Math.round((d.y1-d.y0)*100) + " %";});
			var legend = svg.select(".territoire:last-child").selectAll(".legend")
				.data(function(d) { return d.ages; })
				.enter().append("g")
				.attr("class", "legend")
				.attr("transform", function(d) { return "translate(" + x.rangeBand()  + "," + y((d.y0 + d.y1) / 2) + ")"; });
			legend.append("line")
				.attr("x2", 10);
			legend.append("text")
				.attr("x", 13)
				.attr("dy", ".35em")
				.text(function(d) { return d.name; });
			});
		}
	// tracé des graphes. Utile pour le réaffichage et le redimensionnement.
	function drawGraphs() {
		for(var i in GraphList) {
			//cleanGraph(GraphList[i].id);
			switch (GraphList[i].type) {
				case "sankey": sankeyUrba(GraphList[i].id,"./data/evolDU-"+GraphList[i].id+"-2015.json");break;
				case "barresEmpilees": barresEmpilees("#age"+GraphList[i].id,"./data/ageDU-"+GraphList[i].id+"-2015.csv");break;
				default:null()
				}
			}
		}
	setTimeout(function(){if(d3.select("#ageNorm")) drawGraphs()}, 250);	
	})
})(jQuery);
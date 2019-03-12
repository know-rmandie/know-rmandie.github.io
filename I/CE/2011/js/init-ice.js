/* Script pour la consultation des indicateurs de consommation d'espace */
/* 	version 0 - 2013 01 21
	informations : sylvain.comte@developpement-durable.gouv.fr
	*/
	
/* VARIABLES */
var idCom, idCan, idCC, idScot, idDep, idReg;			// identifiants des entités géographiques
var nomCom, nomCan, nomCC, nomScot, nomDep, nomReg; 	// nom des entités géographiques
var ListeCom=new Array(); 								// tableau des communes pour autocomplétion
var rW;													// largeur de la partie texte
var G=new Array();										// tableau d'affichage des différents niveaux géographiques
	G["com"]=1;G["can"]=1;G["sco"]=1;G["dep"]=1;G["reg"]=1;G["gra"]=1;G["pay"]=1;
var T=["ocSol","intCons","autres"];						// liste des thèmes
var theme="ocSol";										// thème affiché par défaut
/* Création des thèmes */
var ocSol={"id":"ocSol","pseudo":"Occupation du sol","name":"Occupation du sol (2006)"};
var intCons={"id":"intCons","pseudo":"Construction neuve","name":"Intensité de construction de logements neufs (2001 - 2011)"};
var autres={"id":"autres","pseudo":"à venir...","name":"Autres variables retenues en cours d'élaboration"};
var ListeThemes=new Array(ocSol,intCons,autres);

/* PROGRAMME PRINCIPAL */
// chargement du script
document.addEventListener("DOMContentLoaded",launch,false)
// déclaration jQuery
$=jQuery;

function launch() {
	// construction des onglets
	creeOnglets();
	fAutres();
	// mise en place de l'autocomplete
	$("#choix").autocomplete({
		source:function(request,response ) {
			var matcher=new RegExp($.ui.autocomplete.escapeRegex(request.term ),"i");
			response($.grep(liste,function(value) {
				value=value.label || value.value || value;
				return matcher.test(value) || matcher.test(normalize(value));
				}) );
			}
		});
	$(".niv").click(geoSelect);
	$(".onglets li").click(ongSelect);
	ongSelect();
	$("#go").click(updateClick);
	$(".ui-corner-all").click(updateClick);
	}
// recuperation de l'identifiant via un #hashtag
		// si pas d'identifiant?
		// identifiant existant

function updateClick() {
	var thisId;
	for(var i in zon) {
		if(zon[i][1]==$("#choix").val()) {thisId=zon[i][0];break}
		}
	if(thisId==undefined) {/*fAlert("shit")*/}
	else update(thisId)
	}
		
function update(id) {
	var nameTitle=zon["c"+id][1];
	$("#titreZone").html(nameTitle);
	if(zon["c"+id][2]!="x") id=zon["c"+id][2];
	fOcSol(id);
	fIntCons(id);
	geoApply();
	}

// script d'autocompletion
// récupération des tables json (dans ./data/*******.json)

/* MODULES */
// OCCUPATION DU SOL
/* 	dans un premier temps : Corine Land Cover
	quand sera disponible, utilisation du MOS (comparaison France dans ce cas?) */
/* cf. iet-xx */
function fOcSol(id) {
    getWidth();
	var idCan=zon["c"+id][3];
	var idSco=zon["c"+id][4];
	var idDep=zon["c"+id][5];
	var idReg="Reg"+zon["c"+id][6];
	var html="<h3>"+ocSol.name+"</h3>";
	html+="<table class='bar'>";
	html+="<tr class='can'><td>canton "+zon["c"+idCan][1]+"</td><td id='canOcSo' style='width:"+rW*.75+"px'  class='bar'></td></tr>";
	if(typeof iet34["c"+idSco]==="undefined" || typeof zon["c"+idSco]==="undefined") {} 
	else html+="<tr class='sco'><td>"+zon["c"+idSco][1]+"</td><td id='scoOcSo'></td></tr>";
	html+="<tr class='dep'><td>"+zon["c"+idDep][1]+"</td><td id='depOcSo'></td></tr>";
	html+="<tr class='reg'><td>"+zon["c"+idReg][1]+"</td><td id='regOcSo'></td></tr>";
	html+="<tr class='gra'><td>"+zon["cGrandTer"][1]+"</td><td id='graOcSo'></td></tr>";
	html+="<tr class='pay'><td>"+zon["cFR"][1]+"</td><td id='payOcSo'></td></tr>";
	html+="</table><div id='legOcSol' style='font-size:70%;margin:10px 0 0 0;width:100%;text-align:center'><span class='legende' style='background:#a00'>urbain</span> <span class='legende' style='background:#ca0'>agricole</span><span class='legende' style='background:#280'>naturel</span><span class='legende' style='background:#088'>zones humides</span><span class='legende' style='background:#88f'>eau</span></div><span class='sources'>sources : CORINE LAND COVER 2006</span>";
	$("#ficocSol").html(html);
	function lignOcSo(clas,id) {
		var chart=new Highcharts.Chart({
            chart:{renderTo:clas+'OcSo',type:'bar',height:rW*0.08,width:rW*0.75,spacingBottom:0,spacingTop:0,margin:[0,0,0,0]},
			credits:{enabled:false},
            xAxis:{categories:"",title:{style:{display:'none'}},showEmpty:false},
            yAxis: {min:0,max:100,labels:{enabled:false},title:{style:{display:'none'}},showEmpty:false},
			title:{style:{display:'none'}},
			legend: {enabled:false,reversed: true},
            plotOptions:{
                series:{stacking:'normal',pointWidth:35},
				bar:{borderWidth:0}
				},
            series: [
				{name:'eau',data:[eval(iet34["c"+id][4])],color:'#88f'},
				{name:'zones humides',data:[eval(iet34["c"+id][3])],color:'#088'},
				{name:'espaces naturels',data:[eval(iet34["c"+id][2])],color:'#280'},
				{name:'espaces agricoles',data:[eval(iet34["c"+id][1])],color:'#ca0'},
				{name:'espaces urbanisé',data:[eval(iet34["c"+id][0])],color:'#a00'}
				],
			tooltip:{
				formatter:function() {return this.series.name+' : '+this.y+'%'}
				},
			})
		}
	lignOcSo("can",idCan);
	if(typeof iet34["c"+idSco]==="undefined" || typeof zon["c"+idSco]==="undefined") {}
	else lignOcSo("sco",idSco);
	lignOcSo("dep",idDep);
	lignOcSo("reg",idReg);
	lignOcSo("gra","GrandTer");
	lignOcSo("pay","FR");
    }

// INTENSITE DE CONSTRUCTION DE LOGEMENTS NEUFS
/*	cf. iet-38 */
function fIntCons(id) {
	var un=iet38["cunites"];
	var idCan=zon["c"+id][3];
	var idSco=zon["c"+id][4];
	var idDep=zon["c"+id][5];
	var idReg="Reg"+zon["c"+id][6];
	var html="<h3>"+intCons.name+"</h3><p class='info'>L'intensité de construction de logement neufs est caractérisée par l'<span class='bling'>indice de construction</span> (nombre de logements construits par an pour mille habitants) et par la <span class='bling'>densité de construction de logements</span> (nombre de logements par hectare)</p>";var alerteBas="";
	html+="<table class='table'><tr><th>territoire</th><th>logts indiv / coll.</th><th>surface utilisée</th><th>indice de construction</th><th>densité</th></tr>";
	html+="<tr class='unites'><td></td><td>"+un[1]+"</td><td>"+un[4]+"</td><td>"+un[3]+"</td><td>"+un[5]+"</td></tr>";
	if(eval(iet38["c"+id][1])+eval(iet38["c"+id][2])<11) {
		html+="<tr class='com alerte' title='attention, manque de robustesse des données à cette échelle'>";
		alerteBas+="<span class='alerte fa fa-exclamation-triangle'>Attention à la fiabilité des données lorsque les volumes de construction sont faibles</span><br/>";
		}
	else html+="<tr class='com'>";
	html+="<td>"+zon["c"+id][1]+"</td><td>"+sep(iet38["c"+id][1])+" / "+sep(iet38["c"+id][2])+"</td><td>"+sep(iet38["c"+id][4])+"</td><td>"+iet38["c"+id][3]+"</td><td>"+iet38["c"+id][5]+"</td></tr>";
	html+="<tr class='can'><td>Canton de "+zon["c"+idCan][1]+"</td><td>"+sep(iet38["c"+idCan][1])+" / "+sep(iet38["c"+idCan][2])+"</td><td>"+sep(iet38["c"+idCan][4])+"</td><td>"+iet38["c"+idCan][3]+"</td><td>"+iet38["c"+idCan][5]+"</td></tr>";
	if(typeof iet38["c"+idSco] === "undefined") {}
	else html+="<tr class='sco'><td>"+zon["c"+idSco][1]+"</td><td>"+sep(iet38["c"+idSco][1])+" / "+sep(iet38["c"+idSco][2])+"</td><td>"+sep(iet38["c"+idSco][4])+"</td><td>"+iet38["c"+idSco][3]+"</td><td>"+iet38["c"+idSco][5]+"</td></tr>";
	html+="<tr class='dep'><td>"+zon["c"+idDep][1]+"</td><td>"+sep(iet38["c"+idDep][1])+" / "+sep(iet38["c"+idDep][2])+"</td><td>"+sep(iet38["c"+idDep][4])+"</td><td>"+iet38["c"+idDep][3]+"</td><td>"+iet38["c"+idDep][5]+"</td></tr>";
	if(iet38["c"+idReg][3]!="x") html+="<tr class='reg'><td>"+zon["c"+idReg][1]+"</td><td>"+sep(iet38["c"+idReg][1])+" / "+sep(iet38["c"+idReg][2])+"</td><td>"+sep(iet38["c"+idReg][4])+"</td><td>"+iet38["c"+idReg][3]+"</td><td>"+iet38["c"+idReg][5]+"</td></tr>";
	html+="<tr class='gra'><td>"+zon["cGrandTer"][1]+"</td><td>"+sep(iet38["cGrandTer"][1])+" / "+sep(iet38["cGrandTer"][2])+"</td><td>"+sep(iet38["cGrandTer"][4])+"</td><td>"+iet38["cGrandTer"][3]+"</td><td>"+iet38["cGrandTer"][5]+"</td></tr>";
	html+="</table><span class='sources'>"+alerteBas+"Analyse sur les dix dernières années | sources : SITADEL 2000-2011 - traitement effectué suivant les règles définies pour l'<a href='http://territoires.hn.free.fr/iet/#38'>indicateur 38</a>.</span>";
	document.getElementById("ficintCons").innerHTML=html;
	}
	
function fAutres() {
	var html="<h3>"+autres.name+"</h3>";
	html+="d'autres indicateurs issus de l'étude sont en cours de construction et seront prochainement ajoutés <ul>";
	html+="<li><b>Surface et évolution de la tache urbaine</b> : espace urbanisé basé sur le bâti</li>";
	html+="<li><b>Efficacité de l'occupation du sol</b> : densité en habitants / emplois de l'espace urbanisé</li>";
	html+="<li><b>Taux d'artificialisation de la <acronym title='Surface Agricole Utile'>SAU</acronym></b> : part des espaces agricoles destinés à l'urbanisation</li>";
	html+="<ul>Par ailleurs, les réflexions se poursuivent au niveau national, les bases de données progressent, l'experience apporte également des éléments nouveau. Les indicateurs observés sont donc amenés à s'adapter pour tenir compte de ces évolutions";
	document.getElementById("ficautres").innerHTML=html;
	}

/* SUPPORTS */
// Liste de choix jQ
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
	
// Affichage des nombres avec séparateur
function sep(n) {
	var l=n.length, cor=0;
	if(n.match(/\./)) cor=2;
	if(l-cor<4) return n;
	else if (l-cor<7) return n.substring(0,l-3-cor)+" "+n.substring(l-3-cor,l);
		else return n.substring(0,l-6-cor)+" "+n.substring(l-6-cor,l-3-cor)+" "+n.substring(l-3-cor,l);
	}

// Niveaux géographiques
function geoSelect() {
	var niv=this.id;
	if(G[niv]==1) {$("."+niv).fadeOut();$("#"+niv).fadeTo('slow', 0.3)}
	else {$("."+niv).fadeIn();$("#"+niv).fadeTo('slow', 1)}
	G[niv]=-1*G[niv];
	}
	
function ongSelect() {
	var the;
	if(!this.id) the=theme;
	else the=this.id.substring(3,this.id.length);
	for(var th in T) {
		if(T[th]!=the) {
			$("#ong"+T[th]).fadeTo(0,0.5);
			$("#fic"+T[th]).fadeOut(0)
			}
		}
	$("#ong"+the).fadeTo(500,1);$("#fic"+the).fadeIn(700);
	theme=the;
	}
	
function geoApply() {
	for(var niv in G)
	if(G[niv]!=1) {$("."+niv).fadeOut(0)}
	else {$("."+niv).fadeIn(0)}
	}
		
// Création des "onglets" / sections
function creeOnglets() {
	for (objet in ListeThemes) creeOnglet(ListeThemes[objet]);
	}
function creeOnglet(obj) {
	var li=document.createElement("li");
	li.id="ong"+obj.id;
	li.innerHTML="<a href='#fic"+obj.id+"'>"+obj.pseudo+"</a>";
	document.getElementById("onglets").appendChild(li);
	var div=document.createElement("div");
	div.id="fic"+obj.id;
	div.innerHTML="<h3>"+obj.name+"</h3><i>en attente des données...</i>";
	document.getElementById("fiches").appendChild(div);
	}
	
/* DEV */
function fAlert(text) {$("#alert").append(text)}	
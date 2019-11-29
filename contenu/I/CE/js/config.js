// définition des palettes de couleurs
const colorOscom = d3.scaleOrdinal()
      .domain([11,12,13,14,15,21,22,23,24,31,32,51,"xx"]) // couleurs par type d'occupation du sol
      .range(["#d44","#a58","#aaa","#7a7","#555","#eb0","#fc0","#ac0","#ba5","#292","#8c7","#8af","#ddd"]),
    colorPartNaf = d3.scaleLinear()  // échelle de couleur pour la part du territoire en NAF (urbain -> rural)
    .domain([50, 85, 90, 100])
    .range(["purple", "red", "gold", "green"]),
    colorNaf = d3.scaleLinear() // échelle de couleur pour la part de NAF consommée (forte -> faible)
    .domain([-11, -5, -1, -0.5, 0, 1.5, 20])
    .range(["darkred", "red", "darkorange", "gold", "rgb(160, 221, 43)", "green", "rgb(59, 157, 240)"]),
    colorDens = d3.scaleLinear() // échelle de couleur pour la densité de construction (faible -> forte)
    .domain([0, 2, 5, 8, 15, 30, 1000])
    .range(["darkred", "red", "darkorange", "gold", "green", "rgb(59, 157, 240)", "rgb(59, 157, 240)"]),
    colorInt = d3.scaleLinear() // échelle de couleur pour l'intensité de la construction (forte -> faible)
    .domain([30, 12, 2])
    .range(["indigo", "purple", "lightyellow"]);

// liste des données
const Dataliste = [{
        id: "",
        type: "csv",
        url: "./data/territoires.csv"
    }, // les entités territoriales, avec noms et appartenances
    {
        id: "oscom",
        type: "csv",
        url: "./data/oscom-norm-2017.csv",
        meta: "<a target='_blank' href='http://valor.national.agri/R23-01-Haute-Normandie-Occupation?id_rubrique=187'>Observatoire de l'occupation des Sol Communale</a> (OSCOM) 2017 - DRAAF et DREAL Normandie, DDTM de Seine-Maritime"
    }, // les données d'occupation du sol (OSCOM)
    {
        type: "json",
        url: "./data/oscom-legende.json"
    }, // légende des données OSCOM
    {
        id: "osnaf",
        type: "csv",
        url: "./data/oscom-norm-2008-2017.csv",
        meta: "<a target='_blank' href='http://valor.national.agri/R23-01-Haute-Normandie-Occupation?id_rubrique=187'>Observatoire de l'occupation des Sol Communale</a> (OSCOM) 2017 - DRAAF et DREAL Normandie, DDTM de Seine-Maritime"
    }, // les données de consommation d'espaces naturels, agricoles et forestiers (OSCOM)
    {
        id: "ccf",
        type: "csv",
        url: "./data/ccf-norm-2006_2015-2018.csv",
        meta: "<a target='_blank' href='http://www.epf-normandie.fr/Actualites/A-la-Une/Donnees-sur-la-consommation-fonciere-en-Normandie'>CCF</a> 2006 > 2015 - <a href='http://www.epf-normandie.fr/' target='_blank'>EPF Normandie</a> <a href='https://www.normandie.fr'>Région Normandie</a> - 2018"
    } // les données de construction / densité (CCF)
];

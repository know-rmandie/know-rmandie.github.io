// définition des palettes de couleurs
const colorPartNaf = d3.scaleLinear()
    .domain([50, 85, 90, 100])
    .range(["purple", "red", "gold", "green"]),
    colorNaf = d3.scaleLinear()
    .domain([-11, -5, -1, -0.5, 0, 1.5, 20])
    .range(["darkred", "red", "darkorange", "gold", "rgb(160, 221, 43)", "green", "rgb(59, 157, 240)"]),
    colorDens = d3.scaleLinear()
    .domain([0, 2, 5, 8, 15, 30, 1000])
    .range(["darkred", "red", "darkorange", "gold", "green", "rgb(59, 157, 240)", "rgb(59, 157, 240)"]),
    colorInt = d3.scaleLinear()
    .domain([30, 12, 2])
    .range(["indigo", "purple", "lightyellow"]);

// liste des données
const Dataliste = [{
        type: "csv",
        url: "./data/territoires.csv"
    }, // les entités territoriales, avec noms et appartenances
    {
        type: "csv",
        url: "./data/oscom-norm-2017.csv"
    }, // les données d'occupation du sol (OSCOM)
    {
        type: "json",
        url: "./data/oscom-legende.json"
    }, // légende des données OSCOM
    {
        type: "csv",
        url: "./data/oscom-norm-2008-2017.csv"
    }, // les données de consommation d'espaces naturels, agricoles et forestiers (OSCOM)
    {
        type: "csv",
        url: "./data/ccf-norm-2006_2015-2018.csv"
    } // les données de construction / densité (CCF)
];

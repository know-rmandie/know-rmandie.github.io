*Le [projet original](https://git.framasoft.org/territoires/analyseUrbanisme) est hébergé sur [l'instance gitlab de Framasoft](https://git.framasoft.org). D'autres versions peuvent être déployées, notamment sur github, mais il s'agit de miroirs...*

# Analyse des documents d'urbanisme et de leur évolution
Cette analyse des documents et de leur évolution en cours ([demo](http://territoires.hn.free.fr/urbanisme)) à partir d'une représentation sous forme de diagrammes de sankey est un outil initialement développé pour la Haute-Normandie puis adapté à la Normandie. Adaptable à n'importe quel territoire.

## Adaptation / utilisation
* fonctionne en tant que "module" de [homeCommon](../../../homeCommon). A récupérer par ailleurs.
 1. installer homeCommon dans un répertoire (nom indifférent)
 2. créer dans le répertoire de homeCommon un répertoire (par défaut `./urbanisme`, sinon il faudra modifier homeCommon)
 3. installer les fichiers de analyseUrbanisme dans `./urbanisme`
* mettre à jour les données dans les fichiers de données dans `./urbanisme/data`
* mettre à jour les commentaires associés dans `./urbanisme/index.html`

## Sources utilisées / licences
* **Code** : L'outil s'appuie sur 
  * [jQuery](https://jquery.org)  - Licence MIT
  * [D3](http://d3js.org/) - Licence 3-clause BSD
  * son extension [sankey](https://github.com/d3/d3-plugins/tree/master/sankey) développée par [Mike Bostock](http://bost.ocks.org/mike/sankey/) - Licence ?
  * [normalize.css](github.com/necolas/normalize.css) - Licence MIT
  * [Font Awesome](http://fontawesome.io/) - Licence CC By
* **Données** (figurent sur la carte):
  * Les données sont issues de [Sudocuh](http://adelie.application.developpement-durable.gouv.fr/syntheseFiche.do?fiche=276555), ministère du développement durable (DGALN) éventuellement complétées et amendées par les directions des administrations déconcentrées (DREAL, DDT(M)), observatoire normand de l'urbanisme (données publiques)
  
L'ensemble des codes de l'outil est **réutilisable sous licence [MIT](http://opensource.org/licenses/MIT)** et les **icones, textes et objets graphiques sous licence [CC By 3.0](http://creativecommons.org/licenses/by/3.0/deed.fr)** à l'exception notable des sources utilisées ci-avant qui possèdent leur propre licence.
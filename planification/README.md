*Le [projet original](https://git.framasoft.org/territoires/cartoPlanification) est hébergé sur [l'instance gitlab de Framasoft](https://git.framasoft.org). D'autres versions peuvent être déployées, notamment sur github, mais il s'agit de mirroirs...*

# Cartographie des Schémas de Cohérence Territoriale
Cette carte interactive des projets d'écoquartiers ([demo](http://territoires.hn.free.fr/planification)) est un outil initialement développé pour la Haute-Normandie puis adapté à la Normandie. Adaptable à n'importe quel territoire.

## Adaptation / utilisation
* fonctionne en tant que "module" de [homeCommon](../../../homeCommon). A récupérer par ailleurs.
 1. installer homeCommon dans un répertoire (nom indifférent)
 2. créer dans le répertoire de homeCommon un répertoire (par défaut `./planification`, sinon il faudra modifier homeCommon)
 3. installer les fichiers de analyseUrbanisme dans `./planification`
* mettre à jour les données dans les fichiers de données dans `./planification/data`
* mettre à jour les informations pour le cadrage initial (lat. / long. / zoom) dans `./user/config.js`

## Trucs
Lors de la visualisation sur le réseau local, certaines options apparaissent qui n'apparaissent pas lors de la mise en ligne :
* choix d'autres couches de fond
* accès à l'aide
* outil de récupération des coordonnées
On peut facilement accéder à ces options en ajoutant ``?file://`` à la fin de l'url d'accès à l'outil. Par exemple : http://territoires.hn.free.fr/planification/?file://
Il est également possible d'intégrer la carte sur son propre site en utilisant une balise ``<iframe>`` et en ajoutant ``?carteSeule`` à la fin de l'url.

## Sources utilisées / licences
* **Code** : L'outil s'appuie sur 
  * [jQuery](https://jquery.org)  - Licence MIT
  * [leaflet](http://leafletjs.com/) - Licence 2-clause BSD
  * son extension [markerCluster](https://github.com/Leaflet/Leaflet.markercluster) - Licence MIT
  * [normalize.css](github.com/necolas/normalize.css) - Licence MIT
  * [Font Awesome](http://fontawesome.io/) - Licence CC By
* **Données** (figurent sur la carte):
  * Les contours des SCoTs sont basés sur [GeoFLA](https://www.data.gouv.fr/fr/datasets/geofla-communes/) de l'IGN - [Licence ouverte](http://wiki.data.gouv.fr/wiki/Licence_Ouverte_/_Open_Licence)
  * Les données cartographiques sont fournies par [OpenStreetMap](http://osm.org). Il est possible d'utiliser les traitements graphiques de ESRI, Stamen Design...
  * Observatoire normand des écoquartiers (données publiques - DREAL Haute-Normandie)
  * Données du ministère du développement durable (DGALN / AD4)
  
L'ensemble des codes de l'outil est **réutilisable sous licence [MIT](http://opensource.org/licenses/MIT)** et les **icones, textes et objets graphiques sous licence [CC By 3.0](http://creativecommons.org/licenses/by/3.0/deed.fr)** à l'exception notable des sources utilisées ci-avant qui possèdent leur propre licence.
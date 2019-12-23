*Le projet original est hébergé sur gitlab. D'autres versions peuvent être déployées, notamment sur github, mais il s'agit de miroirs... Il s'intègre dans un site utilisant MkDocs. Se référer à la [racine du dépôt][origin] pour plus d'informations.*

# Cartographie des Schémas de Cohérence Territoriale
Cette [carte des SCoT][demo] est un outil initialement développé pour la Normandie. Facilement adaptable à n'importe quel territoire.

## Options
Il est possible d'activer certaines options non visibles par défaut en ajoutant des termes à l'url d'accès :

* `?carteSeule` pour voir la **Carte en plein écran**. Egalement utile pour insérer la carte sur son site internet via une balise `<iframe>`. Par exemple :
```html
<iframe width="100%" height="542" src="http://know-rmandie.gitlab.io/planification/?carteSeule" frameborder="0" allowfullscreen></iframe>
```

* `?adminView` pour accéder à des options supplémentaires :
    * choix d'autres couches de fond
    * outil de récupération des coordonnées

## Mettre à jour
La mise à jour s'effectue en remplaçant les données des fichiers [data/data-normandie.json](./data/data-normandie.json) et en cas de changement de périmètre [data/N_SCOT_ZSUP_R23etR25_FLA-201502.geojson](./data/N_SCOT_ZSUP_R23etR25_FLA-201502.geojson) dans le dépôt. Seule la branche _master_ est mise en ligne.

La structure des données est décrite dans le répertoire [data](./data/index.md).

## Sources utilisées / licences
* **Code** : Outre les éléments propres à [know-rmandie](../../README.md) l'outil s'appuie sur
  * [jQuery][jQuery] - Licence MIT
  * [leaflet][leaflet] - Licence 2-clause BSD
* **Données** (figurent sur la carte):
  * Les données cartographiques sont fournies par [OpenStreetMap](http://osm.org). Il est possible d'utiliser les traitements graphiques de ESRI, Stamen Design...
  * Observatoire des SCoT de Normandie (données publiques - DDTM et DREAL de Normandie)

Pour tous les éléments non listés ci-avant l'ensemble des codes et données de l'outil est **réutilisable sous [licence Ouverte][LO-v2]**.

[origin]: https://gitlab.com/know-rmandie/know-rmandie.gitlab.io
[demo]: http://know-rmandie.gitlab.io/planification
[jQuery]: https://jquery.org
[leaflet]: http://leafletjs.com
[markerCluster]: https://github.com/Leaflet/Leaflet.markercluster



===============================
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

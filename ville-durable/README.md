*Le [projet original][origin] est hébergé sur [l'instance gitlab de Framasoft][framagit]. D'autres versions peuvent être déployées, notamment sur github, mais il s'agit de mirroirs...*

# Cartographie des projets urbains durables
Cette carte interactive des projets d'écoquartiers ([demonstration][demo]) ou assimilés est un outil initialement développé pour la Haute-Normandie puis adapté à la Normandie. Facilement adaptable à n'importe quel territoire.

## Adaptation / utilisation
* fonctionne en tant que "module" de [homeCommon](../../../homeCommon). A récupérer par ailleurs.
 1. installer homeCommon dans un répertoire (nom indifférent)
 2. créer dans le répertoire de homeCommon un répertoire (par défaut `./ville-durable`, sinon il faudra modifier homeCommon)
 3. installer les fichiers de analyseUrbanisme dans `./ville-durable`
* mettre à jour les données dans les fichiers de données dans `./ville-durable/data`
* mettre à jour les informations pour le cadrage initial (lat. / long. / zoom) dans `./ville-durable/user/config.js`

## Options
Il est possible d'activer certaines options non visibles par défaut :
* Voir les **projets abandonnés** : par défaut, les projets abandonnés (champs `Aetat`) n'apparaissent pas. On peut toutefois choisir de voir la liste complète des projets en ajoutant `?tousProjets` à la fin de l'url d'accès à l'outil.
* **Carte en plein écran** : il est possible d'afficher la carte en plein écran, par exemple pour l'insérer dans son site web via une balise iframe en ajoutant `?carteSeule` à la fin de l'url d'accès à l'outil (http://know-rmandie.github.io/ville-durable/?carteSeule)
* **Options supplémentaires** : un mode "administrateur" est disponible en ajoutant `?adminView` à la fin de l'url d'accès à l'outil. Il active les éléments suivants
    * choix d'autres couches de fond
    * outil de récupération des coordonnées
    * affichage de tous les projets, abandonnés compris

## Sources utilisées / licences
* **Code** : L'outil s'appuie sur 
  * [jQuery][jQuery] - Licence MIT
  * [leaflet][leaflet] - Licence 2-clause BSD
    * son extension [markerCluster][markerCluster] - Licence MIT
  * [normalize.css][normalize.css] - Licence MIT
  * [Font Awesome][Font Awesome] - Licence CC By
* **Données** (figurent sur la carte):
  * Les données cartographiques sont fournies par [OpenStreetMap](http://osm.org). Il est possible d'utiliser les traitements graphiques de ESRI, Stamen Design...
  * Observatoire normand des écoquartiers (données publiques - DREAL Normandie)
  * Données du ministère du développement durable (DGALN / AD4)
  
L'ensemble des codes de l'outil est **réutilisable sous licence [MIT][MIT]** et les **icones, textes et objets graphiques sous licence [CC By 3.0][CCBy]** à l'exception notable des sources utilisées ci-avant qui possèdent leur propre licence.

[origin]: https://git.framasoft.org/territoires/cartoVilleDurable
[demo]: http://know-rmandie.github.io/ville-durable
[framagit]: https://git.framasoft.org
[jQuery]: https://jquery.org
[leaflet]: http://leafletjs.com
[markerCluster]: https://github.com/Leaflet/Leaflet.markercluster
[normalize.css]: github.com/necolas/normalize.css
[Font Awesome]: http://fontawesome.io/
[MIT]: http://opensource.org/licenses/MIT
[CCBy]: http://creativecommons.org/licenses/by/3.0/deed.fr

title: à propos

*Le [projet original][origin] est hébergé sur [l'instance gitlab de Framasoft][framagit]. D'autres versions peuvent être déployées, notamment sur github, mais il s'agit de mirroirs...*

# Cartographie des opérations de cession de foncier public
Cette carte des opérations de cession de foncier public en faveur du logement est un outil initialement développé pour la Normandie. Facilement adaptable à n'importe quel territoire.

## Adaptation / utilisation
* installer les dépendances citées déclarer le bon chemin dans la partie `<head>` de `index.html` (cf. Sources ci-après également)
* modifier le fichier `CessionFoncierEtat.geojson` situé dans `./data`
* en cas de modification de la structure de ce fichiers (champs) il faudra modifier `init-foncP.js` dans `./js` pour en tenir compte

## Options
Il est possible d'activer certaines options non visibles par défaut :
* **Carte en plein écran** : il est possible d'afficher la carte en plein écran, par exemple pour l'insérer dans son site web via une balise iframe en ajoutant `?carteSeule` à la fin de l'url d'accès à l'outil (http://know-rmandie.github.io/foncier-public/?carteSeule)
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

[origin]: https://framagit.org/know-rmandie/know-rmandie-gitlab-io
[demo]: http://know-rmandie.github.io/foncier-public
[framagit]: https://framagit.org
[jQuery]: https://jquery.org
[leaflet]: http://leafletjs.com
[markerCluster]: https://github.com/Leaflet/Leaflet.markercluster
[normalize.css]: github.com/necolas/normalize.css
[Font Awesome]: http://fontawesome.io/
[MIT]: http://opensource.org/licenses/MIT
[CCBy]: http://creativecommons.org/licenses/by/3.0/deed.fr

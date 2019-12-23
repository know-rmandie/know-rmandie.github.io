*Le [projet original][origin] est hébergé sur gitlab. D'autres versions peuvent être déployées, notamment sur github, mais il s'agit de miroirs...*

# Cartographie des projets urbains durables
Cette [carte interactive des projets d'écoquartiers][demo] ou assimilés est un outil initialement développé pour la Haute-Normandie puis adapté à la Normandie. Assez facilement adaptable à n'importe quel territoire.

## Options
Il est possible d'activer certaines options non visibles par défaut en ajoutant des termes à l'url d'accès :

* `?tousProjets` pour voir tous les projets, y compris les **projets abandonnés** (le champ `Acom` comporte le terme `archivé`)
* `?carteSeule` pour voir la **Carte en plein écran**. Egalement utile pour insérer la carte sur son site internet via une balise `<iframe>`. Par exemple :
```html
<iframe width="100%" height="542" src="http://know-rmandie.gitlab.io/ville-durable/?carteSeule" frameborder="0" allowfullscreen></iframe>
```

* `?adminView` pour accéder à des options supplémentaires :
    * choix d'autres couches de fond
    * outil de récupération des coordonnées
    * affichage de tous les projets, abandonnés compris
    * liens vers les éléments pour la mise à jour

## Mettre à jour
La mise à jour s'effectue en remplaçant les données du fichier [data/data-ville-durable.geojson](./data/data-ville-durable.geojson) dans le dépôt. Seule la branche _master_ est mise en ligne.

1. mettre à jour les données dans le [tableau en ligne][gdoc-ecoquartiers] (onglet **EcoQnor**),
2. copier le contenu de la cellule **B1** de l'onglet **NorGeoJson**,
3. mettre à jour le fichier `data-ville-durable.geojson` du dépôt avec ces données

## Réutiliser, adapter
La cartographie est désormais un _sous-module_ de l'ensemble know-rmandie. On peut très simplement le réutiliser en clonant le projet depuis le dépôt, puis en mettant à jour :

* [data/data-ville-durable.geojson](./data/data-ville-durable.geojson) pour les données sur les écoquartiers (cf. [structure des données](./data/) et procédure ci-dessus),
* [js/config.js](./js/config.js) pour les réglages de base (coordonnées et zoom de départ, choix de la couche de fonds),
* pensez à supprimer les sous dossiers du projet que vous ne souhaitez pas réutiliser.

## Sources utilisées / licences
* **Code** : Outre les éléments propres à [know-rmandie](../../README.md) l'outil s'appuie sur
  * [jQuery][jQuery] - Licence MIT
  * [leaflet][leaflet] - Licence 2-clause BSD
    * son extension [markerCluster][markerCluster] - Licence MIT
* **Données** (figurent sur la carte):
  * Les données cartographiques sont fournies par [OpenStreetMap](http://osm.org). Il est possible d'utiliser les traitements graphiques de ESRI, Stamen Design...
  * Observatoire normand des écoquartiers (données publiques - DREAL Normandie)
  * Données du ministère du développement durable (DGALN / AD4)

Pour tous les éléments non listés ci-avant l'ensemble des codes et données de l'outil est **réutilisable sous [licence Ouverte][LO-v2]**.

[origin]: https://gitlab.com/know-rmandie/know-rmandie.gitlab.io/ville-durable
[demo]: http://know-rmandie.gitlab.io/ville-durable
[gdoc-ecoquartiers]: https://docs.google.com/spreadsheets/d/1lybcyHklnN4y_bhH5zRWUhpAJx9AvYdzzw_HphBIT8U
[jQuery]: https://jquery.org
[leaflet]: http://leafletjs.com
[markerCluster]: https://github.com/Leaflet/Leaflet.markercluster
[LO-v2]: https://www.etalab.gouv.fr/licence-ouverte-open-licence

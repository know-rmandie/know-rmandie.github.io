*Le projet original est hébergé sur gitlab. D'autres versions peuvent être déployées, notamment sur github, mais il s'agit de miroirs... Il s'intègre dans un site utilisant MkDocs. Se référer à la [racine du dépôt][origin] pour plus d'informations.*

# Cartographie des opérations de cession de foncier public
Cette [carte des opérations de cession de foncier public][demo] en faveur du logement est un outil initialement développé pour la Normandie. Facilement adaptable à n'importe quel territoire.

## Options
Il est possible d'activer certaines options non visibles par défaut en ajoutant des termes à l'url d'accès :

* `?tousProjets` pour voir tous les projets, y compris les **projets abandonnés** (le champ `Acom` comporte le terme `archivé`)
* `?carteSeule` pour voir la **Carte en plein écran**. Egalement utile pour insérer la carte sur son site internet via une balise `<iframe>`. Par exemple :
```html
<iframe width="100%" height="542" src="http://know-rmandie.gitlab.io/Foncier/foncier-public/?carteSeule" frameborder="0" allowfullscreen></iframe>
```

* `?adminView` pour accéder à des options supplémentaires :
    * choix d'autres couches de fond
    * outil de récupération des coordonnées
    * affichage de tous les projets, abandonnés compris
    * liens vers les éléments pour la mise à jour

## Mettre à jour
La mise à jour s'effectue en remplaçant les données des fichiers [data/CessionFoncierEtat.geojson](./data/CessionFoncierEtat.geojson) et [data/CessionFoncierEtatPolygon.geojson](./data/CessionFoncierEtatPolygon.geojson) dans le dépôt. Seule la branche _master_ est mise en ligne.

La structure des données est décrite dans le répertoire [data](./data/index.md).

## Sources utilisées / licences
* **Code** : Outre les éléments propres à [know-rmandie](../../README.md) l'outil s'appuie sur
  * [jQuery][jQuery] - Licence MIT
  * [leaflet][leaflet] - Licence 2-clause BSD
    * son extension [markerCluster][markerCluster] - Licence MIT
* **Données** (figurent sur la carte):
  * Les données cartographiques sont fournies par [OpenStreetMap](http://osm.org). Il est possible d'utiliser les traitements graphiques de ESRI, Stamen Design...
  * Observatoire de la mobilisation du foncier public (données publiques - DDTM et DREAL de Normandie)

Pour tous les éléments non listés ci-avant l'ensemble des codes et données de l'outil est **réutilisable sous [licence Ouverte][LO-v2]**.

[origin]: https://gitlab.com/know-rmandie/know-rmandie.gitlab.io
[demo]: http://know-rmandie.gitlab.io/Foncier/foncier-public
[jQuery]: https://jquery.org
[leaflet]: http://leafletjs.com
[markerCluster]: https://github.com/Leaflet/Leaflet.markercluster

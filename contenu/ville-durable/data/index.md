title: structure des données

structure des données utilisées pour la cartographie de la ville durable dans le fichier [data-ville-durable.geojson](./data-ville-durable.geojson). En gras, les éléments plus ou moins _fixes_. Il est bien sûr possible de modifier cette structure. Il faudra alors modifier le [script](../js/leaflet.js) en conséquence.

## structure du GeoJson
Il s'agit d'un geojson _presque standard_ il comporte toutefois une section metadata non normalisée. Par ailleurs, les objets (_features_) disposent de propriétés propres au projet.

* `type`:**FeatureCollection**
* `crs` (système de projection - ici les valeurs par défaut)
    * `type`:**name**
    * `properties`
        * `name` : **urn:ogc:def:crs:EPSG::4979**
* `metadata`
    * `date`: date de mise à jour des données
    * `source`: Source des objets de la base. Le code html est accepté, notamment pour les liens vers les sources en question.
* `features` (tableau des objets encadré par `[` et `]`)
    * `type`:**Feature**,
    * `geometry`
        * `type`:**Point**
        * `coordinates`:[_longitude_,_latitude_]
    * `properties`:
        * `id`: identifiant unique du projet
        * `name`: nom du projet
        * `longDesc`: description du projet
        * `commune`: commune d'implantation en toutes lettres
        * `Lcat`: [catégorie](#categories) du projet
        * `Rter`: lien vers une page internet décrivant le projet
        * `Rtra`: lien vers une page intranet décrivant le projet
        * `Acom`: commentaire sur l'avancement du projet. Si ce champ comporte le mot **archivé**, le projet n'apparaitra pas sur la carte par défaut
        * `Aetat`: [état d'avancement](#avancements) du projet
        * `Isurf`: surface totale du projet en hectares
        * `Ilogmt`: nombre de logements prévus / réalisés dans le projet
        * `Ilogsoc`: nombre de logements sociaux prévus / réalisés dans le projet

## Catégories
Valeurs possibles pour le champ `Lcat`

* **elab** : _engagé dans le label_ - charte écoquartiers signée
* **clab** : _candidat au label_ - le projet a fait ou fera prochainement l'objet d'un examen par la commission
* **label** : _projet labellisé_ - le projet a obtenu le label
* **caap** : _candidata à un appel à projets_ - le projet a été candidat à un appel à projet (années 2009 et 2011)
* **autres** : _tout autre projet relatif à la ville durable_

## Avancements
Valeurs possibles pour le champ `Aetat`. les titres parlent d'eux-même en général.

* **intention**
* **études**
* **projet**
* **chantier**
* **réalisé**
* **abandonné**
* **inconnu**

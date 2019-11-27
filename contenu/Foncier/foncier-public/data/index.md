title: structure des données

structure des données utilisées pour la présentation des opérations de cession du foncier public à destination de logement. Il est bien sûr possible de modifier cette structure. Il faudra alors modifier le [script](../js/leaflet.js) en conséquence. Pour des raisons de facilité, nous avons utilisé la projection WGS84, mais ça n'est pas une obligation.

## structure des données pour les opérations
Fichier `CessionFoncierEtatPoint.geojson`. Il s'agit d'un fichier de **points** geojson _presque standard_ il comporte toutefois une section metadata non normalisée. Par ailleurs, les objets (_features_) disposent de propriétés propres au projet.

* `type`:**FeatureCollection**
* `crs` (système de projection - ici les valeurs par défaut)
    * `type`:**name**
    * `properties`
        * `name` : **urn:ogc:def:crs:OGC:1.3:CRS84**
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
        * `operation`: nom du projet ou de l'opération
        * `commune`: commune d'implantation du projets
        * `superficie`: superficie de la cession (en m²)
        * `logements`: nombre total de logements prévus / réalisés dans l'opération"
        * `logt_soc`: nombre de logements sociaux prévus / réalisés (pris en compte pour la décote)
        * `date_ces`: date de la cession (_pour utiliser `/` comme séparateur, taper `\/`_)
        * `prev_ces`: date prévisionnelle de cession si il s'agit d'un projet
        * `comment`: commentaire éventuel sur le projet, description plus longue etc.

## structure des données pour les emprises de projet
Fichier `CessionFoncierEtatPolygon.geojson`. Il s'agit d'un fichier de **polygones** geojson _presque standard_ il comporte toutefois une section metadata non normalisée. Par ailleurs, les objets (_features_) disposent de propriétés propres au projet.

* `type`:**FeatureCollection**
* `crs` (système de projection - ici les valeurs par défaut)
    * `type`:**name**
    * `properties`
        * `name` : **urn:ogc:def:crs:OGC:1.3:CRS84**
* `metadata`
    * `date`: date de mise à jour des données
    * `source`: Source des objets de la base. Le code html est accepté, notamment pour les liens vers les sources en question.
* `features` (tableau des objets encadré par `[` et `]`)
    * `type`:**Feature**,
    * `geometry`
        * `type`:**Polygon**
        * `coordinates`:[[[_longitude_,_latitude_],[_longitude_,_latitude_],[_longitude_,_lati..._ ...]]
    * `properties`:
        * `id`: identifiant unique du projet
        * `operation`: nom du projet ou de l'opération

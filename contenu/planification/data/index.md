title: structure des données

structure des données utilisées pour la présentation des SCoTs. Il est bien sûr possible de modifier cette structure. Il faudra alors modifier le [script](../js/leaflet.js) en conséquence. Pour des raisons de facilité, nous avons utilisé la projection WGS84, mais ça n'est pas une obligation.

## structure des données pour les SCoT
Fichier `data-normandie.json`. Il s'agit d'un fichier json.

* `metadata`
    * `date`: date de mise à jour
    * `source`: source de la donnée (html possible)
* `liste`
    * **$** _identifiant-SCoT_ identifiant du SCoT pour le joint avec les données géographiques (`N_SCOT_ZSUP_R23etR25_FLA.geojson`) précédé d'un `$`
        * `nom du SCoT`: nom d'affichage du ScoT
        * `avancement`: état d'avancement (cf. liste des valeurs possibles)
        * `description`: éléments intéressant pour connaitre le SCoT (nombre de communes, d'habitants, superficie, dates...). Au format htmal pour les retours à la ligne et les listes à puce. S'affichera dans la bulle d'information de l'objet.

## structure des données pour les périmètres
Fichier `N_SCOT_ZSUP_R23etR25_FLA.geojson`. Il s'agit d'un fichier de **polygones** geojson standard Dans cette version, les données sont issues de Sudocuh et les polygones de geoFLA. Les métadonnées sont fournies dans le fichier de données `data-normandie.json`. Les objets (_features_) disposent de propriétés propres au projet. Seules les propriétés indispensables au fonctionnement sont reprises ici...

* `type`: "FeatureCollection"
* `crs` (système de projection - ici les valeurs par défaut)
    * `type`: "name"
    * `properties`
        * `name` : **urn:ogc:def:crs:OGC:1.3:CRS84**
* `features` (tableau des objets encadré par `[` et `]`)
    * `type`:**Feature**,
    * `geometry`
        * `type`:**MultiPolygon**
        * `coordinates`: [ [ [ [_longitude_,_latitude_] ...
    * `properties`:
        * `idScot`: identifiant unique du projet (pour faire le joint avec les données de _data-normandie.json_)
        * `NomOffic`: nom officiel du SCoT (sera utilisé si la valeur n'existe pas dans _data-normandie.json_)
        * `CODE_ETAT1`: code etat d'avancement du SCoT (sera utilisé si la valeur n'existe pas dans _data-normandie.json_)
        * `ETAT1_SCOT`: etat d'avancement du SCoT (sera utilisé si la valeur n'existe pas dans _data-normandie.json_)
        * `DATE_APPRO`: date d'approbation du SCoT (du SCoT (sera utilisée si la valeur n'existe pas dans _data-normandie.json_))

## valeurs d'avancement possibles
Les valeurs prises par `avancement` dans le fichier `data-normandie.json` peuvent prendre les valeurs suivantes

* _elab_ : SCoT en cours d'élaboration
* _cad_ : SCoT
* _opelab_ : SCoT en révision (opposable + élaboration)
* _opap_ : SCoT opposable (opposable + approuvé)
* _presc_ : SCoT prescrit
* _inten_ : intention de SCoT
* _saispas_ : information inconnue

Une série de valeur peuvent être utilisées pour les SCoTs des régions voisines si on veut une mise en forme différente

* _voissaispas_ : information inconnue (SCoT d'une autre région)
* _voisap_ : SCoT approuvé (autre région)
* _voiselab_ : SCoT en cours d'élaboration (autre région)

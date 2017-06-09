*Le [projet original][origin] est hébergé sur [l'instance gitlab de Framasoft][framagit]. D'autres versions peuvent être déployées, notamment sur gitlab ou github, mais il s'agit de mirroirs...*

# Outils et pages au service des territoires
Ce répertoire contient plusieurs projets destinés à capitaliser et mettre en forme des informations sur les territoires. C'est un travail initié pour la Normandie, mais adaptable à n'importe quel autre territoire...

## Projets diponibles
*chaque projet dispose de sa branche de développement, merci de les respecter pour vos PR*
* [analyse des documents d'urbanisme](../../../analyseUrbanisme/) : une analyse de l'évolution des documents d'urbanisme à partir des données de sudocu. Notamment des diagrammes de Sankey, et des commentaires associés,
* [cartographie de la planification](../../../cartoPlanification) : une cartographie des Schémas de cohérence territoriale et de leur avancement,
* [cartographie de la ville durable](../../../cartoVilleDurable) : Une cartographie des projets d'écoquartiers, avec des éléments sur leur avancement et leur labellisation,
* Pas encore mis à jour sur ce répertoire :
  * Indicateurs économiques pour le suivi des territoires,
  * Indicateurs de consommation d'espace.

## Installation
L'ensemble est conçu pour fonctionner comme des pages web simples html / css / js.

Structure de base pour respecter les dépendances existantes :
* repertoire d'installation
  * planification : contient [cartoPlanification](../../../cartoPlanification)
  * urbanisme : contient [analyseUrbanisme](../../../analyseUrbanisme)
  * ville-durable : contient [cartoVilleDurable](../../../cartoVilleDurable)

Penser à modifier `index.html` et l'arborescence en fonction des modules qu'on souhaite mettre en place.

## Pré-requis
* serveur pour héberger des pages statiques html

## Licence
Sauf mention contraire les codes sont **réutilisable sous licence [MIT](http://opensource.org/licenses/MIT)** et les **icones, textes et objets graphiques sous licence [CC By 3.0](http://creativecommons.org/licenses/by/3.0/deed.fr)** et les données sous licence ODBL

## Crédits
Le projet utilise
* [jQuery](http://jquery.com/) *1.11.1*
* [d3](https://d3js.org/) *3.?* et ses plugins
   * [sankey-d3](https://github.com/soxofaan/d3-plugin-captain-sankey)
   * d3-queue
* [leaflet](http://leafletjs.com) *1.0.1*
   * son extension [leaflet-markercluster](https://github.com/Leaflet/Leaflet.markercluster)
* [normalize.css](http://necolas.github.io/normalize.css) *3.0.3*
* [font-awesome](http://fontawesome.io) *4.3.0*
* [pgi](http://sycom.gitlab.io/post-Gitlab-issues/) *0.1.1*

Imaginé, construit et mis en oeuvre par
* Sylvain Comte (DREAL Normandie)

## Circuit
* **[Framagit][origin]** ([issues][issues]) > [frama.io page][f.io-page]
   * [Gitlab][gitlab] > [gitlab page][gl-page]
      * [Github][github] > **[github page][gh-page]**

[origin]:https://framagit.org/know-rmandie/know-rmandie.frama.io
[issues]:https://framagit.org/know-rmandie/know-rmandie.frama.io/issues
[f.io-page]:https://know-rmandie.frama.io
[gl-page]:https://know-rmandie.gitlab.io
[gh-page]:https://know-rmandie.github.io

[framagit]:https://framagit.org
[gitlab]:https://gitlab.com/know-rmandie/know-ramndie.gitlab.io
[github]:https://github.com/know-rmandie/know-rmandie.gitlab.io

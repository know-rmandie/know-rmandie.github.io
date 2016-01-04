*Le [projet original](https://git.framasoft.org/territoires/homeCommon) est hébergé sur [l'instance gitlab de Framasoft](https://git.framasoft.org). D'autres versions peuvent être déployées, notamment sur github, mais il s'agit de mirroirs...*

# Outils et pages au service des territoires
Ce répertoire contient plusieurs projets destinés à capitaliser et mettre en forme des informations sur les territoires. C'est un travail initié pour la Normandie, mais adaptable à n'importe quel autre territoires... 

## Projets diponibles
*nb : les liens sont conçus pour fonctionner sur git.framasoft.org . Si vous être sur une copie hébergée ailleurs, il se peut qu'ils ne fonctionnent pas*
* [analyse des documents d'urbanisme](../../../analyseUrbanisme/) : une analyse de l'évolution des documents d'urbanisme à partir des données de sudocu. Notamment des diagrammes de Sankey, et des commentaires associés,
* [cartographie de la planification](../../../cartoPlanification) : une cartographie des Schémas de cohérence territoriale et de leur avancement,
* [cartographie de la ville durable](../../../cartoVilleDurable) : Une cartographie des projets d'écoquartiers, avec des éléments sur leur avancement et leur labellisation,
* Pas encore partagés sur ce répertoire :
  * Indicateurs économiques pour le suivi des territoires,
  * Indicateurs de consommation d'espace.

## Adaptation / utilisation
L'ensemble est conçu pour fonctionner comme des pages web simple.
Structure de base pour respecter les dépendances existantes :
* repertoire d'installation
  * planification : contient [cartoPlanification](../../../cartoPlanification)
  * urbanisme : contient [analyseUrbanisme](../../../analyseUrbanisme)
  * ville-durable : contient [cartoVilleDurable](../../../cartoVilleDurable)

Tout ceci est modifiable, il faut juste `index.html` et l'arborescence en fonction des modules qu'on souhaite mettre en place.

## Sources utilisées / licences
Chaque module présente les sources et codes qu'il utilise ainsi que les licences associées. La page d'accueil utilise seulement [jQuery](https://jquery.org) sous Licence MIT.
  
Sauf mention contraire les codes sont **réutilisable sous licence [MIT](http://opensource.org/licenses/MIT)** et les **icones, textes et objets graphiques sous licence [CC By 3.0](http://creativecommons.org/licenses/by/3.0/deed.fr)**.
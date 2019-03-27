*Le [projet original][origin] est hébergé sur [l'instance gitlab de Framasoft][framagit]. D'autres versions peuvent être déployées, notamment sur gitlab ou github, mais il s'agit de mirroirs...*

# Outils et pages au service des territoires
Ce répertoire contient plusieurs projets destinés à capitaliser et mettre en forme des informations sur les territoires. C'est un travail initié pour la Normandie, mais adaptable à n'importe quel autre territoire en changeant ce qu'il faut...

## Projets diponibles
*chaque projet dispose de sa branche de développement, merci de les respecter pour vos PR*
* [analyse des documents d'urbanisme](../../../analyseUrbanisme/) : une analyse de l'évolution des documents d'urbanisme à partir des données de sudocu. Notamment des diagrammes de Sankey, et des commentaires associés,
* [cartographie de la planification](../../../cartoPlanification) : une cartographie des Schémas de cohérence territoriale et de leur avancement,
* [cartographie de la ville durable](../../../cartoVilleDurable) : Une cartographie des projets d'écoquartiers, avec des éléments sur leur avancement et leur labellisation,
* [Indicateurs de consommation d'espace][ice] : Des indicateurs pour décrire l'usage du foncier,
* En cours de mise à jour sur ce répertoire :
   * Indicateurs économiques pour le suivi des territoires,

* Voir également :
   * [TiddlyPAC][TiddlyPAC] : un outil pour faciliter la création de porter à connaissance pour les documents d'urbanisme

## Installation
L'ensemble est conçu pour fonctionner comme des pages web simples html / css / js. Penser à modifier l'ensemble des fichiers, en particulier `index.html`, en fonction des modules et de l'arborescence qu'on souhaite mettre en place. Les librairies extérieures sont rassemblées à la racine dans .lib pour essayer de rationaliser les mises à jour.

## Pré-requis
* serveur pour héberger des pages statiques html

## Crédits - Licence
Chaque partie du projet utilise ses ressources et dépendances propres qui sont listées dans son répertoire. Ne sont listées ici que les ressources propre à la page d'accueil.
* [jQuery](http://jquery.com/) *1.11.1*
* [normalize.css](http://necolas.github.io/normalize.css) *3.0.3*
* [font-awesome](http://fontawesome.io) *4.3.0*
* [pgi](http://sycom.gitlab.io/post-Gitlab-issues/) *0.1.1*

A l'exception des ressources externes utilisées et dûment listées, l'ensemble des sources développées pour ce projet est sous [licence ouverte](https://www.etalab.gouv.fr/licence-ouverte-open-licence) (_DREAL Normandie_)

![licence ouverte](https://www.etalab.gouv.fr/wp-content/uploads/2014/05/Logo_Licence_Ouverte_bleu_blanc_rouge.png "licence ouverte")

Imaginé, construit et mis en oeuvre par
* Fouad Gafsi (DDTM de Seine-Maritime)
* Eloi Larchevêque, Samuel Malbet, Sylvain Comte (DREAL Normandie)

## Circuit
* **[Framagit][origin]** ([issues][issues]) > [frama.io page][f.io-page]
   * [Gitlab][gitlab] > [gitlab page][gl-page]
      * [Github][github] > **[github page][gh-page]**

[ice]: ./I/CE/README.md
[TiddlyPAC]: https://framagit.org/know-rmandie/TiddlyPAC

[origin]:https://framagit.org/know-rmandie/know-rmandie.frama.io
[issues]:https://framagit.org/know-rmandie/know-rmandie.frama.io/issues
[f.io-page]:https://know-rmandie.frama.io
[gl-page]:https://know-rmandie.gitlab.io
[gh-page]:https://know-rmandie.github.io

[framagit]:https://framagit.org
[gitlab]:https://gitlab.com/know-rmandie/know-ramndie.gitlab.io
[github]:https://github.com/know-rmandie/know-rmandie.gitlab.io

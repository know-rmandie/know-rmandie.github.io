*Le [projet original][origin] est hébergé sur gitlab. D'autres versions peuvent être déployées, notamment sur github, mais il s'agit de miroirs...*

# Analyse des documents d'urbanisme et de leur évolution
Cette analyse des documents et de leur évolution en cours ([demo][demo]) à partir d'une représentation sous forme de diagrammes de sankey est un outil initialement développé pour la Haute-Normandie puis adapté à la Normandie. Adaptable à n'importe quel territoire.

## Mettre à jour
La mise à jour s'effectue

1. en remplaçant les données du répertoire [data](./data/) dans le dépôt. Seule la branche _master_ est mise en ligne. Le répertoire comporte une information sur la structure des données utilisées.
1. en modifiant en conséquence la liste des graphes à réaliser dans [js/config.js](./js/config.js)
1. en modifiant les éléments de référence dans la page [index.md](./index.md)

Naturellement tous les textes seront à adapter aux nouvelles analyses ;-)

## Réutiliser, adapter
L'analyse est un _sous-module_ de l'ensemble know-rmandie. On peut très simplement le réutiliser en clonant le projet depuis le dépôt, puis en mettant à jour les fichiers de la même façon que pour la mise à jour décrite ci-avant.

Pensez à supprimer les sous dossiers du projet que vous ne souhaitez pas réutiliser.

## Sources utilisées / licences
* **Code** : Outre les éléments propres à [know-rmandie](../../README.md) l'outil s'appuie sur
  * [jQuery][jQuery] - Licence MIT
  * [D3](https://d3js.org/)V4 - Licence 3-clause BSD
    * son extension [sankey](https://github.com/d3/d3-plugins/tree/master/sankey) développée par [Mike Bostock](http://bost.ocks.org/mike/sankey/)
* **Données** :
  * Les données sont issues de [Sudocuh][sudocuh], ministère du développement durable (DGALN) éventuellement complétées et amendées par les directions des administrations déconcentrées (DREAL, DDT(M)), observatoire normand de l'urbanisme (données publiques)

Pour tous les éléments non listés ci-avant l'ensemble des codes et données de l'outil est **réutilisable sous [licence Ouverte][LO-v2]**.

[origin]: https://gitlab.com/know-rmandie/know-rmandie.gitlab.io/urbanisme
[demo]: http://know-rmandie.gitlab.io/urbanisme
[jQuery]: https://jquery.org
[sudocuh]: https://www.data.gouv.fr/fr/datasets/sudocuh-2018-com-pluis-met-etat-davancement-des-pluis-en-metropole-par-commune/
[LO-v2]: https://www.etalab.gouv.fr/licence-ouverte-open-licence

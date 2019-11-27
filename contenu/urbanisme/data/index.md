title: structure des données

structure des données utilisées pour l'analyse de l'évolution des documents d'urbanisme. Il est bien sûr possible de modifier cette structure. Il faudra alors modifier le [script](../js/d3.js) en conséquence. Toutes ces données sont extractibles depuis [Sudocuh][sudocuh].

## structure des données pour l'évolution en cours (.json)
Le json pour chaque entité géographique comporte deux parties. Un tableau pour les _noeuds_ de départ et d'arrivée (avant la procédure et après la procédure), et un tableau pour les _liens_ entre ces noeuds.

* `nodes`
    * `name`: type de document d'urbanisme (précédé de `>` pour l'état futur)
    * `val`: nombre communes concernées
    * `couleur`: code couleur pour le type de document (voir [palette](#palette))
* `links`
    * `source`: type du document de départ (cf. `name` ci-dessus)
    * `target`: type du document d'arrivée (cf. `name` ci-dessus)
    * `value`: nombre de communes en transition entre le type de départ et le type d'arrivée

!!! error "Précautions"
    Compte-tenu du fonctionnement de la librairie _sankey_ utilisée, il est important

    * de respecter une convention de nommage **distinguant les noeuds de départ des noeuds d'arrivée** (ici sous la forme **>**type_de_doc_urba par exemple `PLUi` pour un noeud de départ et `>PLUi` pour un noeud d'arrivée).
    * de **placer tous les liens possibles** entre les noeuds existant. Quitte à mettre
    * Pour le cas particulier du lien d'**un document vers lui-même, si le nombre de commune est nul**, mettre une valeur très faible _0.001_ par exemple.

## structure du tableau pour l'âge des Documents (.csv)
Le tableau comporte l'identifiant du territoire (code de département / région) et le nombre de communes par âge de document d'urbanisme.

* `territoire`
* `pas de document`
* `12 ans et plus`
* `de 8 à 12 ans`
* `de 4 à 8 ans`
* `moins de 4 ans`

[sudocuh]: https://www.data.gouv.fr/fr/datasets/sudocuh-2018-com-pluis-met-etat-davancement-des-pluis-en-metropole-par-commune/

## Palette

<span style="background:#bb66bb;padding:1rem">PLUi : #BB66BB</span>
<span style="background:#6070DA;padding:1rem">PLU : #6070DA</span>
<span style="background:#DF6E38;padding:1rem">POS : #DF6E38</span>
<span style="background:#70A76C;padding:1rem">CC : #70A76C</span>
<span style="background:#DFDFDF;padding:1rem">RNU : #DFDFDF</span>

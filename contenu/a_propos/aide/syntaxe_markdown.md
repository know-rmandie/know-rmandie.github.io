title: La syntaxe markdown
revision: 2019-12-13

# La syntaxe markdown

Pour formater votre texte vous avez la possibilité d'utiliser la syntaxe markdown[^1] qui permet à partir d'une mise en forme en format texte de produire des documents structurés.

## Titres
Pour faire un titre, vous devez mettre un `#` devant la ligne. Pour faire un titre plus petit, ajoutez un `#` (jusque 6) :

```
# Un grand titre
## Un titre un peu moins grand
### Un titre encore moins grand
```

## Styles de texte
Vous pouvez utiliser `_` autour d'un mot pour le mettre en italique. Mettez deux `*` pour le mettre en gras.

*  `_italique_` s'affiche ainsi : _italique_
*  `**gras**` s'affiche ainsi : **gras**
* `**_gras-italique_**` s'affiche ainsi : **_gras-italique_**
* `~~barré~~` s'affiche ainsi : ~~barré~~

## Liens
Créez un lien intégré en mettant le texte désiré entre crochets et le lien associé entre parenthèses.

`Aidez-nous à [améliorer le site foncier éco](https://foncier-eco.gitlab.io/a_propos/contribuer) !`

s'affichera :

Aidez-nous à [améliorer le site foncier éco](https://foncier-eco.gitlab.io/a_propos/contribuer) !

On peut également faire des liens entre les documents du site. Au lieu de faire démarrer le lien par `http://`, mettez juste `./` pour le dossier en cours, `./sous-dossier/` pour un sous dossier et remontez l'arborescence avec `../`.

## Images
Utilisez une image en ligne en copiant son adresse (finissant par `.jpg`, `.png`, `.gif` etc…) avec un texte alternatif entre crochets (qui sera affiché si l'image n'apparaît pas) et le lien entre parenthèses. Vous pouvez aussi ajouter un texte qui apparaîtra au survol de la souris grâce aux `"`.

```
![Le logo de know-rmandie](https://know-rmandie.gitlab.io/images/logo.png "Mais qu'est ce que c'est?")
```
Qui donnera (survolez l'image avec votre souris pour voir apparaître le texte) :

![Le logo de know-rmandie](https://know-rmandie.gitlab.io/images/logo.png "Mais qu'est ce que c'est?")

## Citation
Les citations se font avec le signe `>` :

```
> Oh la belle prise !
```

> Oh la belle prise !

On peut également pour une autre mise en forme utiliser les encadrés, parfois appelés [admonition](#admonitions)

## Listes
Vous pouvez créer des listes avec les caractères `*` et `-` pour des listes non ordonnées ou avec des nombres pour des listes ordonnées.

Une liste non ordonnée :

```
* une élément
* un autre
    * un sous élément
    * un autre sous élément
* un dernier élément
```

* une élément
* un autre
    * un sous élément
    * un autre sous élément
* un dernier élément

Une liste ordonnée (notez que le numéro n'a aucune importance):

```
2. élément un
17. élément deux
```

2. élément un
17. élément deux

## Tableaux
Pour créer un tableau vous devez placer une ligne de tirets (`-`) sous la ligne d'entête et séparer les colonnes avec des `|`. Vous pouvez aussi préciser l'alignement en utilisant des `:`. :

```
| Aligné à gauche  | Centré          | Aligné à droite |
| :--------------- |:---------------:| -----:|
| Aligné à gauche  |   ce texte        |  Aligné à droite |
| Aligné à gauche  | est             |   Aligné à droite |
| Aligné à gauche  | centré          |    Aligné à droite |
```

| Aligné à gauche  | Centré          | Aligné à droite |
| :--------------- |:---------------:| -----:|
| Aligné à gauche  |   ce texte        |  Aligné à droite |
| Aligné à gauche  | est             |   Aligné à droite |
| Aligné à gauche  | centré          |    Aligné à droite |

## Blocs de code
Créez un bloc de code en indentant chaque ligne avec quatre espaces, ou en mettant trois accents graves sur la ligne au dessus et en dessous de votre code.
Exemple :

` ```bloc de code``` `

s'affiche ainsi :

```
bloc de code
```

## Notes de bas de page
pour créer une note de bas de page, indiquez juste sa référence entre crochets avec un accent circonflexe devant, puis placez quelque part dans votre texte le contenu de cette note. Les notes de bas de page s'affiche en fin de document et la notation est automatique (elle dépend du moment où est rencontré le texte de la note et pas du moment où apparait le renvoi).

```
Les notes de bas de page permettent d'alléger le texte[^nbp]

[^nbp]: cela permet de laisser le lecteur se concentrer sur le fond du texte tout en lui offrant la possibilité d'approfondir le sujet si il le souhaite.
```

S'affichera comme ceci (notez que la note de bas page est bien en bas de la page...)

Les notes de bas de page permettent d'alléger le texte[^nbp]

[^nbp]: cela permet de laisser le lecteur se concentrer sur le fond du texte tout en lui offrant la possibilité d'approfondir le sujet si il le souhaite.

## Admonitions
Les _admonitions_ permettent de placer des encadrés avec un petit logo pour mettre en exergue certains éléments. On place `!!!` au début de la ligne du titre (ou `???` pour un bloc dépliable), puis le type (voir liste), puis le titre entre `""`. Le texte contenu dans le bloc doit quant à lui être **indenté de 4 espaces**.

```
??? info "A propos des _admonitions_"
    Il existe plusieurs sortes d'admonitions avec des logos et parfois des couleurs différentes. Il n'est pas sûr que la liste qui suit soit complète.
```

donnera (cliquez sur le titre pour déplier) :

??? info "A propos des _admonitions_"
    Il existe plusieurs sortes d'admonitions avec des logos et parfois des couleurs différentes. Il n'est pas sûr que la liste qui suit soit complète.

Quelques types d'admonitions

<div markdown="1" class="five cols">

!!! abstract "abstract"

!!! chart "chart"

!!! contact "contact"

!!! bug "bug"

!!! danger "danger"

!!! doc "doc"

!!! error "error"

!!! euro "euros"

!!! example "example"

!!! failure "failure"

!!! info "info"

!!! label "label"

!!! map "map"

!!! note "note"

!!! question "question"

!!! quote "quote"

!!! recycle "recycle"

!!! success "success"

!!! tip "tip"

!!! warning "warning"   

</div>

## Références

* [Writing with markdown](https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown) un guide (en anglais) sur la syntaxe markdown - Site officiel de MkDocs
* Eléments ajoutés par le thème _material_ utilisé sur ce site dont [Admonition](https://squidfunk.github.io/mkdocs-material/extensions/admonition/) et [Footnotes](https://squidfunk.github.io/mkdocs-material/extensions/footnotes/) - Site officiel de MkDocs-material

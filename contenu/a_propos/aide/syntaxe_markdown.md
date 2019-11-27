title: La syntaxe markdown
source: https://docs.framasoft.org/fr/grav/markdown.html
revision: 2019-10-22

# La syntaxe markdown

Pour formater votre texte vous avez la possibilité d'utiliser la syntaxe markdown[^1] qui permet à partir d'une mise en forme en format texte de produire des documents structurés.

## Titres
Pour faire un titre, vous devez mettre un `#` devant la ligne. Pour faire un titre plus petit, ajoutez un `#` (jusque 6) :

```
# Un grand titre
## Un titre un peu moins grand
### Un titre encore moins grand
```
Vous pouvez également souligner le texte en utilisant `===` ou `---` pour créer des titres.

```
Un grand titre
=============
```

## Styles de texte
Vous pouvez utiliser `_` ou `*` autour d'un mot pour le mettre en italique. Mettez-en deux pour le mettre en gras.

*  `_italique_` s'affiche ainsi : _italique_
*  `**gras**` s'affiche ainsi : **gras**
* `**_gras-italique_**` s'affiche ainsi : **_gras-italique_**
* `~~barré~~` s'affiche ainsi : ~~barré~~


## Liens
Créez un lien intégré en mettant le texte désiré entre crochets et le lien associé entre parenthèses.

`Aidez-vous avec [la documentation de Framasite](https://docs.framasoft.org/fr/grav/) !`

s'affichera :

Aidez-vous avec [la documentation de Framasite](https://docs.framasoft.org/fr/grav/) !

Vous pouvez ajouter aux liens des attributs `id` et `class` de cette manière :

    [la documentation de Framasite](https://docs.framasoft.org/fr/grav/){#id .class1 .class2}

Les liens peuvent ainsi être mis sous forme de boutons à l’aide des classes CSS de Bootstrap :
<p>
<button type="button" class="btn btn-default ">Default</button>
<button type="button" class="btn btn-primary ">Primary</button>
<button type="button" class="btn btn-success ">Success</button>
<button type="button" class="btn btn-info ">Info</button>
<button type="button" class="btn btn-warning ">Warning</button>
<button type="button" class="btn btn-danger ">Danger</button>
<button type="button" class="btn btn-link ">Link</button>
</p>

``` markdown
[Default](#){.btn .btn-default}
[Primary](#){.btn .btn-primary}
[Info](#){.btn .btn-info}
[Success](#){.btn .btn-success}
[Warning](#){.btn .btn-warning}
[Danger](#){.btn .btn-danger}
[Link](#){.btn .btn-link}
```

Dans les modules et autres composants du thème GravStrap, [la syntaxe est plus détaillée](https://docs.framasoft.org/fr/grav/composants-de-base.html#boutons).

## Images
Utilisez une image en ligne en copiant son adresse (finissant par `.jpg`, `.png`, `.gif` etc…) avec un texte alternatif entre crochets (qui sera affiché si l'image n'apparaît pas) et le lien entre parenthèses. Vous pouvez aussi ajouter un texte qui apparaîtra au survol de la souris grâce aux `"`.

```
![le logo de Framasoft](https://framasoft.org/nav/img/logo.png)
```
donnera :

![le logo de Framasoft](https://framasoft.org/nav/img/logo.png)

On peut ajouter un texte au survol :

```
![Le logo de Framasoft](https://framasoft.org/nav/img/logo.png "Un bien beau logo !")
```
Qui donnera (survolez l'image avec votre souris pour voir apparaître le texte) :

![Le logo de Framasoft](https://framasoft.org/nav/img/logo.png "Un bien beau logo !")

## Citation
Les citations se font avec le signe `>` :

```
> Oh la belle prise !
```

> Oh la belle prise !

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

Une liste ordonnée :

```
1. élément un
2. élément deux
```

1. élément un
2. élément deux

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

[^1]: ceci est une note de bas de page

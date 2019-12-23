*Le [projet original][origin] est hébergé sur [gitlab][gitlab]. D'autres versions peuvent être déployées, notamment sur github, mais il s'agit de mirroirs, pas forcément fonctionnels...*

# Outils et pages au service des territoires
Ce répertoire contient plusieurs projets (ou leur documentation) destinés à capitaliser et mettre en forme des informations sur les territoires. C'est un travail initié pour la Normandie, mais adaptable à n'importe quel autre territoire...

## Projets

* Atlas de la [ville durable](./contenu/ville-durable/)
* Indicateurs
    * [ICE](./contenu/I/CE) indicateurs de consommation d'espaces
* Cartographies
    * des [SCoT](./contenu/planification/) de normandie
    * de la [mobilisation du foncier public](./contenu/Foncier/foncier-public/)
* Analyse de l'[évolution des documents d'urbanisme](./contenu/urbanisme/)

Et d'autres projets désormais [archivés](./contenu/archives/)

## Tester Know-rmandie sur votre machine

L'outil nécessite python 3.x pour produire les pages ainsi que les bibliothèques figurant dans [py-requirements.txt](py-requirements.txt). On peut les installer facilement en faisant
```bash
pip install -r py-requirements.txt
```

Ceci fait, on peut soit produire l'ensemble du site tel qu'il sera envoyé au serveur. Le résultat apparaitra dans un dossier `site` . Une fois les pages produites, le site est "statique" et ne nécessite rien d'autre qu'un serveur de fichiers.
```bash
mkdocs build
```

On peut également lancer un serveur virtuel qui permet à la fois de prévisualiser le site, mais de visualiser en temps réel les modification qu'on fait dans le projet.
```bash
mkdocs serve
```

### Problèmes dans l'exécution du programme
Il est possible que le programme soit un peu capricieux, au moment de l'installation (problèmes de dépendances, de connexion etc.) ou durant son exécution. Nous essayons de tenir à jour une liste des difficultés rencontrées et des solutions associées : [Problèmes fréquents avec mkdocs](https://gitlab.com/know-rmandie/know-rmandie.gitlab.io/issues/5)

* problèmes avec le paquet `cffi` : ce problème ne se produit pas si vous utilisez PyPy pour faire fonctionner vos programmes en python. Cela peut en revanche arriver avec Python 3.8. Pour le régler, installer proprement cffi avec : `pip install cffi`
* problèmes avec le paquet `tornado` : régulièrement rencontré avec Python 3.8. Il faudra alors éditer le fichier `... \AppData\Local\Programs\Python\Python38\Lib\site-packages\tornado\platform` en ajoutant les lignes suivantes

```
import sys

if sys.platform == 'win32':
	asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
```

python vous renvoie une erreur à cause du module tornado. Vous référer à [cette solution](https://github.com/tornadoweb/tornado/issues/2608#issuecomment-491489432) dans un tel cas.


## Licences

Know-rmandie est libre et s'appuye sur des logiciels libres. La plate-forme tourne grâce à

* [MkDocs](https://www.mkdocs.org) propulse le wiki - licence BSD 2-Clause
  * le theme [material](https://squidfunk.github.io/mkdocs-material) - licence MIT
  * le plugin [awesome-pages](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin) - licence MIT

L'ensemble des adaptations, développements et contenus sont, sauf mention contraire, sous [licence ouverte][./LICENCE.md]. Chacun des sous-projets évoqué indique les librairies qu'il utilise. Toutes sont rassemblées dans le répertoire [lib](./theme/lib)

![licence ouverte](https://www.etalab.gouv.fr/wp-content/uploads/2014/05/Logo_Licence_Ouverte_bleu_blanc_rouge.png "licence ouverte")

## Circuit
* **[Gitlab][origin]** ([issues][issues]) > **[gitlab.io page][gl-page]** [![build](https://gitlab.com/know-rmandie/know-rmandie.gitlab.io/badges/master/pipeline.svg)](https://gitlab.com/know-rmandie/know-rmandie.gitlab.io/commits/master)
  * [Github][github] > [github.io page][gh-page]
  * [Framagit][framagit] > [frama.io page][f.io-page]

[origin]: https://gitlab.com/know-rmandie/know-rmandie.gitlab.io
[issues]: https://gitlab.com/know-rmandie/know-rmandie.gitlab.io/issues
[f.io-page]: https://know-rmandie.frama.io
[gl-page]: https://know-rmandie.gitlab.io
[gh-page]: https://know-rmandie.github.io

[gitlab]:https://gitlab.com/know-rmandie/know-ramndie.gitlab.io
[github]:https://github.com/know-rmandie/know-rmandie.github.io
[framagit]:https://framagit.org/know-rmandie/know-rmandie.frama.io

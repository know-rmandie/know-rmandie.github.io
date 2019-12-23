# Indicateurs de consommation d'espace

Cette partie du projet présente des indicateurs de consommation d'espaces pour les territoires. Les indicateurs présentés ici ont été choisis dans le cadre des études réalisées par la DREAL Normandie avec l'appui du CEREMA Normandie Centre. Il a notamment été considéré que la production d'un seul indicateur de synthèse était  insuffisante pour décrire la consommation d'espaces sur un territoire et que la sélection d'un faisceau d'indicateurs était préférable.

## Crédits
Intégrée au cadre plus global du site [know-rmandie](../../README.md) cette partie du projet utilise plus spécifiquement :
* [jQuery][jquery] (*3.2.1*) et son extension
   * [jQuery UI][jquery_ui] (*1.12.1*)
* [D3][d3js] (*Data Driven Documents - 4.13.0*) et ses extensions
   * [d3-tip][d3-tip]
   * [d3-queue][d3-queue]

## Sources
Les indicateurs s'appuyent sur les bases de données qui ont paru les plus adaptées au moment de la mise à jour. A la fois en terme de disponibilité, de fréquence de mise à jour, de qualité et de précision géographique. Dans la version actuelle, les [données](./data) utilisées sont issues

* de l'[observatoire de l'occupation des sols communale][OSCOM] (OSCOM) développé et mis à jours par la DRAAF Normandie et la DDTM de Seine-Maritime
* de la base [cartographie de la consommation foncière][CCF] (CCF) développée et mise à jour par l'EPF Normandie avec l'appui de la Région Normandie

## Licence
L'ensemble des développements pour cet outil sont sous [licence ouverte](https://www.etalab.gouv.fr/licence-ouverte-open-licence)

[jquery]:http://jquery.com
[jquery_ui]:http://jqueryui.com
[d3js]:https://d3js.org
[d3-tip]:https://d3js.org/d3-tip
[d3-queue]:https://d3js.org/d3-queue
[normalize_css]:http://necolas.github.io/normalize.css
[font-awesome]:http://fontawesome.io
[pgi]:http://sycom.gitlab.io/post-Gitlab-issues/

[OSCOM]:http://carto.geo-ide.application.developpement-durable.gouv.fr/481/DRAAF_OSCOM_R28.map
[CCF]:http://www.epf-normandie.fr/Actualites/A-la-Une/Donnees-sur-la-consommation-fonciere-en-Normandie

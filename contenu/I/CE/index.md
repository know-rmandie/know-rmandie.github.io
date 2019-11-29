title: ICE - Indicateurs de Consommation d'Espace
d3: v4
modified: 2016-03-03
author: Sylvain Comte

<div id="wait" alt="chargement... ">
    <svg class="feather x3"><use href="../../lib/feather-sprite.svg#clock"></use></svg><br/>

    L'application charge les données, merci de patienter...
</div>
<div id="pilote">
    <input id="choix" name="choix" type="text" title="secteur géographique" placeholder="nom du territoire recherché" class="md-search__input"></input>
</div>
<nav id="onglets">
    <ul>
        <li class="onglet OcSol active" target="OcSol">Occ. Sol</li>
        <li class="onglet ConsNaf" target="ConsNaf">Cons. Naf</li>
        <li class="onglet ConsNeuve" target="ConsNeuve">Constr.</li>
        <li class="onglet Infos" target="Infos">Infos</li>
    </ul>
</nav>

<div markdown="1" id="fiche">
<span class="hyperlink" title="double clickez pour obtenir un lien permanent..."><i class="material-icons">link</i><span class="hidden"></span></span>

## collectivite

  <div markdown="1" id="OcSol" class="active">
### Occupation du sol

L'occupation du sol, représentée ici par grands types d'usages est importante pour **comprendre le contexte** dans lequel les espaces sont utilisés pour le développement des activités humaines.
    <figure>
      <svg class="full" id="OcsolAdn"></svg>
      <div id="OcSoLeg" class="legende"></div>
    </figure>  
  </div>

  <div markdown="1" id="ConsNaf">
### Consommation d'espaces naturels agricoles et forestiers</h3>
La consommation des espaces **naturels, agricoles et forestier** est un des éléments à surveiller, notamment dans le cadre de l'élaboration des documents d'urbanisme. Avec un point particulier sur **la disparition des prairies** qui sont les principaux espaces touchés, tant au profit des terres arables qu'au profit des espaces urbanisés.
    <figure>
      <figcaption>évolution des espaces naturels, agricoles et forestiers au cours des 10 dernières années</figcaption>
      <div id="iNaf"></div>
      <div id="iNafLeg" class="legende"></div>
      <div markdown="1" class="legende">

* contexte (% territoire NAF) : urbain --<span id="echPartNaf"></span>--> rural
* niveau de disparition (% NAF consommé) : importante --<span id="echNaf"></span>--> faible
      </div>
    </figure>
  </div>
  <div markdown="1" id="ConsNeuve">
### Construction neuve
La construction neuve est caractérisée, en _intensité_ par l'**indice de construction** (nombre de locaux construits par an pour mille habitants) et en _qualité_ par la **densité de construction** (nombre de locaux par hectare)
    <figure>
      <figcaption>densité et intensité de la construction au cours des dix dernières années</figcaption>
      <div id="iCons"></div>
      <div id="iConsLeg" class="legende"></div>
      <div markdown="1" class="legende">

* densité (locaux / ha) : faible --<span id="echDens"></span>--> forte
* intensité (loc. / an / 1000 hab.) : faible --<span id="echInt"></span>--> forte
      </div>        
    </figure>
  </div>
  <div markdown="1" id="Infos">
### Informations sur ce travail
Les indicateurs présentés ici ont été choisis dans le cadre des études réalisées par la DREAL Normandie avec l'appui du CEREMA Normandie Centre. Il a notamment été considéré que la production d'un seul indicateur de synthèse était  insuffisante pour décrire la consommation d'espaces sur un territoire et que la sélection d'un faisceau d'indicateurs était préférable.

* **l'occupation du sol** (onglet "Occ. Sol") fourni un aperçu rapide de la répartition entre espaces urbanisés, agricoles et naturels. C'est une sorte de _portrait express_ qui fourni un contexte à l'évolution                   et à la consommation des espaces,
* **la consommation des espaces naturels, agricoles et forestiers** (onglet "cons. NAF") donne une estimation de la disparition de ces espaces au cours des dix dernières années (période 2008-2017 ramenée à 10 ans) notamment au profit des espaces artificialisés. Un focus est fait sur **la disparition des prairies**,
* la **construction neuve** (onglet "Constr.") donne des chiffres clés de l'utilisation des espaces au cours des dix dernières années à travers deux indicateurs : la **densité de construction** (en locaux par hectare utilisé) donne une indication sur la _sobriété_ de cette utilisation et l'**indice de construction** (_intensité_ en locaux pour 1&nbsp;000 habitants et par an) montre la pression subie par le territoire.

#### Quelques éléments régionaux
Les graphes qui suivent présentent la distribution des valeurs pour les communes de Normandie et permettent de situer le territoire étudié par rapport à cette référence.<br/>
    <figure id="IcePartNaf"></figure>
    <figure id="IceEvolNaf"></figure>
    <figure id="IceDensGraph"></figure>
    <figure id="IceIntGraph"></figure>
  </div>
</div>

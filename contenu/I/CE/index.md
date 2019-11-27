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

<div id="fiche">
    <span class="hyperlink" title="double clickez pour obtenir un lien permanent..."><i class="material-icons">link</i><span class="hidden"></span></span>
    <h2 id='titreZone'></h2>
    <div id="OcSol" class="active">
        <h3>Occupation du sol</h3>
        <p>L'occupation du sol, représentée ici par grands types d'usages est importante pour <strong>comprendre le contexte</strong> dans lequel les espaces sont utilisés pour le développement des activités humaines.</p>
        <figure>
          <svg class="full" id="OcsolAdn"></svg>
          <div id="OcSoLeg" class="legende">
          </div>
        </figure>  
    </div>
    <div id="ConsNaf">
        <h3>Consommation d'espaces naturels, agricoles et forestiers</h3>
        <p>La consommation des espaces <strong>naturels, agricoles et forestier</strong> est un des éléments à surveiller, notamment dans le cadre de l'élaboration des documents d'urbanisme. Avec un point particulier sur <strong>la disparition des prairies</strong> qui sont les principaux espaces touchés, tant au profit des terres arables qu'au profit des espaces urbanisés.</p>
        <figure>
            <figcaption>évolution des espaces naturels, agricoles et forestiers au cours des 10 dernières années</figcaption>
            <div id="iNaf"></div>
            <div id="iNafLeg" class="legende"></div>
        </figure>
    </div>
    <div id="ConsNeuve">
        <h3>Construction neuve</h3>
        <p>La construction neuve est caractérisée, en <i>intensité</i> par l'<strong>indice de construction</strong> (nombre de locaux construits par an pour mille habitants) et en <i>qualité</i> par la <strong>densité de construction</strong>                        (nombre de locaux par hectare)</p>
        <figure>
            <figcaption>densité et intensité de la construction au cours des dix dernières années</figcaption>
            <div id="iCons"></div>
            <div id="iConsLeg" class="legende"></div>        
        </figure>
    </div>
    <div id="Infos">
        <h3>Informations sur ce travail</h3>
        <p>Les indicateurs présentés ici ont été choisis dans le cadre des études réalisées par la DREAL Normandie avec l'appui du CEREMA Normandie Centre. Il a notamment été considéré que la production d'un seul indicateur de synthèse était
            insuffisante pour décrire la consommation d'espaces sur un territoire et que la sélection d'un faisceau d'indicateurs était préférable.
            <ul>
                <li><strong>l'occupation du sol</strong> (onglet "Occ. Sol") fourni un aperçu rapide de la répartition entre espaces urbanisés, agricoles et naturels. C'est une sorte de <i>portrait express</i> qui fourni un contexte à l'évolution
                    et à la consommation des espaces,</li>
                <li><strong>la consommation des espaces naturels, agricoles et forestiers</strong> (onglet "cons. NAF") donne une estimation de la disparition de ces espaces au cours des dix dernières années (période 2008-2017 ramenée à 10 ans)
                    notamment au profit des espaces artificialisés. Un focus est fait sur <strong>la disparition des prairies</strong>.
                    <br/><em>Echelles</em> :
                    <ul>
                        <li>contexte (% territoire NAF) : urbain --<span id="echPartNaf"></span>--> rural</li>
                        <li>niveau de disparition (% NAF consommé) : importante --<span id="echNaf"></span>--> faible</li>
                    </ul>
                </li>
                <li>la <strong>construction neuve</strong> (onglet "Constr.") donne des chiffres clés de l'utilisation des espaces au cours des dix dernières années à travers deux indicateurs : la <strong>densité de construction</strong> (en locaux
                    par hectare utilisé) donne une indication sur la <i>sobriété</i> de cette utilisation et l'<strong>indice de construction</strong> (<i>intensité</i> en locaux pour 1&nbsp;000 habitants et par an) montre la pression subie
                    par le territoire
                    <br/><em>Echelles</em> :
                    <ul>
                        <li>densité (locaux / ha) : faible --<span id="echDens"></span>--> forte</li>
                        <li>intensité (loc. / an / 1000 hab.) : faible --<span id="echInt"></span>--> forte</li>
                    </ul>
                </li>
            </ul>
        </p>
        <h3>Quelques éléments régionaux</h3>
        <p>Les graphes qui suivent présentent la distribution des valeurs pour les communes de Normandie et permettent de situer le territoire étudié par rapport à cette référence.<br/>
            <figure id="IcePartNaf">
            </figure>
            <figure id="IceEvolNaf">
            </figure>
            <figure id="IceDensGraph">
            </figure>
            <figure id="IceIntGraph">
            </figure>
        </p>
    </div>

</div>

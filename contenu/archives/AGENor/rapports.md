title: Rapports
---
body:
Présentation des différentes mises en formes possibles à partir de la base de données. Des filtres en en-tête de l'outil permettent d'affiner les résultats ou de faire des recherches.

## Filtres à afficher
* année du programme [E][an_prog]
* statut d'avancement *calculé*
* service pilote [E][pil_service]
* type de prestation [E][type]

## Rapport thématique
Cette vue est la vue par défaut. Elle permet de visualiser le programme d'études pour une année en cours.
Regroupement des études par *{Themes}*.

<table>
   <tr>
      <td></td>
      <td>Titre / réf.</td>
      <td>Direction</td>
      <td>Service</td>
      <td>Prestataire</td>
      <td>Montant</td>
      <td>Budget</td>
   </tr>
   <tr>
      <td colspan="5">**Thématique - `[T][nom]`**</td>
   </tr>
   <tr>
      <td title="avancement">*statut*(1)</td>
      <td>`[E][titre]` - `[E][id]` / `[E][ref_moeuvre]`</td>
      <td>`[S][E[pil_service]]`</td>
      <td>`[E][pil_service]`</td>
      <td>`[E][m_oeuvre]`</td>
      <td>`[E][ae_engage]` ou `[E][ae_programme]` ou `[E][ae_demande]` ou `-`</td>
      <td>`[E][ae_ligne]`</td>
   </tr>
</table>

** *Questions en suspend* **
* Il avait été demandé que le rapport permette de filtrer facilement sur le critère type de prestation (`[E][type]`). *Cela est-il toujours pertinent?*
* *Fait-on la liste uniquement des études ayant pour thème principal* le thème titre ou bien aussi celles dont c'est un thème secondaire? Cela pourrait conduire à des doublons, certaines études pouvant être concernées par plusieurs thèmes.


## Rapport budgétaire
Cette vue est la vue qui permet de faire la programmation budgétaire. Regroupement des études par *ligne budgétaire* (avec mention du pilote et de la dotation) et somme des montants demandés / programmés / engagés.

<table>
   <tr>
      <td></td>
      <td>Titre / réf.</td>
      <td>Direction</td>
      <td>Service</td>
      <td>Demandé</td>
      <td>Programmé</td>
      <td>Engagé</td>
   </tr>
   <tr>
      <td colspan="4">**`[B][BOP]` - `[B][nom]` - `[B][gestionnaire]` `{[D][an_dot] : Σ[D][montant]}`**</td>
      <td>`Σ[E][ae_demande]`</td>
      <td>`Σ[E][ae_programme]`</td>
      <td>`Σ[E][ae_engage]`</td>
   </tr>
   <tr>
      <td title="avancement">*statut*(1)</td>
      <td>`[E][titre]` - `[E][id]` / `[E][ref_moeuvre]`</td>
      <td>`[S][E[pil_service]]`</td>
      <td>`[E][pil_service]`</td>
      <td>`[E][ae_demande]`</td>
      <td>`[E][ae_programme]`</td>
      <td>`[E][ae_engage]`</td>
   </tr>
</table>

## Autres rapports
*liste de rapports à définir pour faciliter le travail des services*

### La "liste du directeur"
* Ensemble des études pour lesquelles la priorité est égale à 0 (`[E][priorite] == 0`). En sélectionnant par direction, on a la liste du directeur pour chacune des entités de la ZGE.

### Les listes par statut d'étude
* Les études en cours (*statut == commence*)
* Les études à valoriser (*statut == termine && statut!=valorise*)
* Les études à mettre dans CIRCE (`[E][circe]==null`)

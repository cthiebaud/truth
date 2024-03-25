# Alètheia

<!-- ⁰¹²³⁴⁵⁶⁷⁸⁹ -->

| Links                                                    |                                                                                              |
| :------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| ![Apple App Store](assets/svg/Apple_logo_grey.svg)       | [on iPhone and iPad](https://apps.apple.com/us/app/aletheia-by-%C3%A6quologica/id6476017817) |
| ![Android App Store](assets/svg/android-svgrepo-com.svg) | [on Android](https://play.google.com/store/apps/details?id=com.cthiebaud.aletheia.twa)       |
| ![WWW](assets/svg/internet-svgrepo-com.svg)              | [on the Web](https://aletheia.cthiebaud.com/)                                                |
|                                                          | [on YouTube](https://youtu.be/ayb2metdNAI)                                                   |

La référence à Martin Heidegger est flagrante : « *En traduisant alètheia par Unverborgenheit, dévoilement ou plutôt non-voilement, et non plus simplement par “Vérité”, Heidegger s'efforce de faire entendre quelque chose du sens, de ce vers quoi alètheia faisait signe, même à l'insu des Grecs, et à partir duquel ils déployaient leur monde.* » [⁽¹⁾](https://fr.wikipedia.org/wiki/Al%C3%A8theia_dans_la_philosophie_de_Martin_Heidegger)

Il s'agit donc de dévoiler les petites briques colorées pour faire apparaître ce que l'on appelle les tables de vérité [⁽²⁾](https://fr.wikipedia.org/wiki/Table_de_v%C3%A9rit%C3%A9) en jargon mathématique. Un peu plus de détails - tout en restant le plus succinct possible - dans le fichier QUICK-GUIDE.md [⁽³⁾](QUICK-GUIDE.md) (en anglais).

--- 

### Niveaux

On a hardiment fusionné Le Lièvre et la Tortue [⁽⁴⁾](https://fr.wikipedia.org/wiki/Le_Li%C3%A8vre_et_la_Tortue_(La_Fontaine)), fable bien connue de La Fontaine [⁽⁵⁾](https://fr.wikipedia.org/wiki/Jean_de_La_Fontaine), avec le Paradoxe d'Achille et de la tortue [⁽⁶⁾](https://fr.wikipedia.org/wiki/Paradoxe_d%27Achille_et_de_la_tortue) de Zénon d'Élée [⁽⁷⁾](https://fr.wikipedia.org/wiki/Z%C3%A9non_d%27%C3%89l%C3%A9e).

<img src="svg/tortoise-fill-svgrepo-com.svg" style="width: 24px;">&nbsp; `Tortue` Le joueur a 2 minutes pour dévoiler les briques.

<img src="svg/hare-fill-svgrepo-com.svg" style="width: 24px;">&nbsp; `Lièvre` Le joueur a 1 minute pour dévoiler les briques.

<img src="svg/ancient-greek-helmet-1-svgrepo-com.svg" style="width: 24px;">&nbsp; `Casque Corinthien` Ce pourrait être celui d'Achille [⁽⁸⁾](https://fr.wikipedia.org/wiki/Achille), mais aussi celui d'Hermès [⁽⁹⁾](https://fr.wikipedia.org/wiki/Herm%C3%A8s), le messager des dieux, réputé pour sa vitesse. On va en avoir besoin, car il ne reste plus que 30 secondes pour dévoiler les briques.

ⓘ *la 🎵 de <img src="svg/ancient-greek-helmet-1-svgrepo-com.svg" alt="Achilles" style="width: 24px;">
est sur [![SoundCloud](svg/soundcloud.svg)](https://soundcloud.com/christophe-thiebaud/aletheia?si=83569a3c774e4cdf84c684e74478af34).*

--- 

### Résultats

1. `You won!` Toutes les briques (32) sont dévoilées dans le temps imparti, sans erreurs.
2. `You - quasi - won…` Toutes les briques sont dévoilées dans le temps imparti, avec erreurs.
3. `Time's up!` Le temps imparti est écoulé, et il reste au moins une brique à dévoiler.
4. `Rather quiet today, isn't it?` Le temps imparti est écoulé et le joueur s'est endormi sans cliquer nulle part.
5. `You cheated?!` Le joueur a cliqué sur toutes les cases sans distinction. Bien que toutes les briques ont été dévoilées dans le temps imparti, ce qui pourrait être considéré comme une victoire, le nombre d'erreurs est énorme (>=28), il a triché! C'est mal.
6. `Ooooh… Subtle!` Le joueur a joué au qui-perd-gagne. Toutes les erreurs possibles (32) ont été faites, tout en évitant soigneusement de dévoiler la moindre brique. Très fort.

--- 

### Expressions

La formule qui donne la clé de chaque de table de vérité peut être exprimée, soit en algèbre de Boole [⁽¹⁰⁾](https://fr.wikipedia.org/wiki/Alg%C3%A8bre_de_Boole_(logique)), par exemple `𝖠 ∧ 𝖡`, soit par une expression javascript, `α & β`. Pour ce dernier cas, il est intéressant de noter que le moteur de l'application évalue factuellement l'expression javascript dans le contexte d'une fonction anonyme [⁽¹¹⁾](https://fr.wikipedia.org/wiki/Fonction_anonyme) : `(α, β) => α & β`.

|  | symbole logique | javascript |
|---|---|---|
| négation              | `¬`  | `!`   |
| conjonction           | `∧`  | `&`   |
| disjonction inclusive | `∨`  | `\|`  |
| disjonction exclusive | `⊻`  | `^`   |
| contradiction         | `⊥`  | ` `   |
| tautologie            | `⊤`  | `true`|

*N. B. : Concernant javascript, `!` est un opérateur logique [⁽¹²⁾](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_and_operators#op%C3%A9rateurs_logiques), `&`, `|` et `^` sont des opérateurs binaires [⁽¹³⁾](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_and_operators#op%C3%A9rateurs_binaires), ` ` est une chaine de caractères vide, dite "falsy" [⁽¹⁴⁾](https://fr.wiktionary.org/wiki/falsy), et `true` est une valeur primitive booléenne.*

<!-- https://fr.wikipedia.org/wiki/Liste_de_symboles_logiques -->

| expression | algèbre | javascript |  |
|---|---|---|---|
| toujours faux       | `⊥`       | ` `        | □ □<br>□ □ |
| A et B              | `𝖠 ∧ 𝖡`   | `α & β`    | ■ □<br>□ □ |
| A et non B          | `𝖠 ∧ ¬𝖡`  | `α & !β`   | □ ■<br>□ □ |
| non A et non B      | `¬𝖠 ∧ ¬𝖡` | `!α & !β`  | □ □<br>□ ■ |
| non A et B          | `¬𝖠 ∧ 𝖡`  | `!α & β`   | □ □<br>■ □ |
| A                   | `𝖠`       | `α`        | ■ ■<br>□ □ |
| B                   | `𝖡`       | `β`        | ■ □<br>■ □ |
| non A               | `¬𝖠`      | `!α`       | □ □<br>■ ■ |
| non B               | `¬𝖡`      | `!β`       | □ ■<br>□ ■ |
| A ou exclusif B     | `𝖠 ⊻ 𝖡`   | `α ^ β`    | □ ■<br>■ □ | 
| A ou exclusif non B | `𝖠 ⊻ ¬𝖡`  | `α ^ !β`   | ■ □<br>□ ■ |
| A ou B              | `𝖠 ∨ 𝖡`   | `α \| β`   | ■ ■<br>■ □ |
| A ou non B          | `𝖠 ∨ ¬𝖡`  | `α \| !β`  | ■ ■<br>□ ■ |
| non A ou non B      | `¬𝖠 ∨ ¬𝖡` | `!α \| !β` | □ ■<br>■ ■ |
| non A ou B          | `¬𝖠 ∨ 𝖡`  | `!α \| β`  | ■ □<br>■ ■ |
| toujours vrai       | `⊤`       | `true`     | ■ ■<br>■ ■ |

--- 

### Tricherie

Durant une partie, en pressant un petit moment sur une expression en en-tête, la solution apparaît, floue. 😉 

--- 

### Raccourcis clavier

* <kbd>Space</kbd> &nbsp;&nbsp;&nbsp;<img src="svg/b-start.svg">/<img src="svg/b-stop.svg" >&nbsp;&nbsp;&nbsp; Démarre ou arrête une partie. Si la boite de dialogue qui affiche les résultats de la partie précédente est visible, mélange les tables aléatoirement avant de démarrer une nouvelle partie.
* <kbd>Q</kbd> &nbsp;&nbsp;&nbsp;<img src="svg/b-grid.svg"   >&nbsp;&nbsp;&nbsp; Affiche ou non les bords des tables et des celulles.
* <kbd>W</kbd> &nbsp;&nbsp;&nbsp;<img src="svg/b-axes.svg"   >&nbsp;&nbsp;&nbsp; Affiche ou non les en-têtes des axes des tables.
* <kbd>A</kbd> &nbsp;&nbsp;&nbsp;`𝖠`/`α`&nbsp;&nbsp;&nbsp; Passe de symboles logiques à expression javascript et vice versa.
* <kbd>S</kbd> &nbsp;&nbsp;&nbsp;<img src="svg/b-shuffle.svg">&nbsp;&nbsp;&nbsp; Mélange les tables aléatoirement.
* <kbd>←</kbd> / <kbd>→</kbd> Change de niveau, <img src="svg/tortoise-fill-svgrepo-com.svg" style="width: 24px;"> ⇆ <img src="svg/hare-fill-svgrepo-com.svg" style="width: 24px;"> ⇆ <img src="svg/ancient-greek-helmet-1-svgrepo-com.svg" style="width: 24px;">.

*Les raccourcis suivants sont sans équivalents graphiques, et de ce fait disponibles uniquement dans la version web :*
* <kbd>Escape</kbd> 'Tue' une partie (i.e. sans afficher les résultats). 
* <kbd>C</kbd> Mélange les couleurs des briques aléatoirement.
* <kbd>O</kbd> Retour à l'ordre initial des tables.

--- 

### Bascules 

*'Bascule' est le mot français officiellement utilisé pour traduire l'anglais 'Toggle'.*

* <img src="svg/b-grid.svg" >&nbsp; Affiche ou non les bords des tables et des celulles.
* <img src="svg/b-axes.svg" >&nbsp; Affiche ou non les en-têtes des axes des tables.
* `𝖠`/`α`&nbsp; Passe de symboles logiques à expression javascript et vice versa.

--- 

![ἀλήθεια](screenshots/2024-03-20_2330x1688.jpg)

--- 

On a commencé avec Heidegger, on termine avec Wittgenstein : « *pour deux propositions élémentaires, il y aura donc 16 propositions complexes (celles-ci sont présentées au 5.101). On peut déterminer sur la base de ces combinaisons les fonctions de vérité et donc les tables de vérité, qui sont une des innovations techniques du livre. Wittgenstein n’a certes pas « inventé » les tables de vérité : on peut faire remonter celles-ci aux stoïciens et Wittgenstein lui-même reconnaissait que l’idée se trouvait déjà chez Frege.* » Ludwig Wittgenstein - Introduction au « Tractatus logico philosophicus », par Mathieu Marion [⁽¹⁵⁾](https://www.cairn.info/ludwig-wittgenstein--9782130533344-page-85.htm)

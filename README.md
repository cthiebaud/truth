# ἀλήθεια

[![WWW](assets/svg/internet-svgrepo-com.svg)](https://aletheia.cthiebaud.com/) 
[![Android App Store](assets/svg/android-svgrepo-com.svg)](https://play.google.com/apps/testing/com.cthiebaud.aletheia.twa)
[![Apple App Store](assets/svg/Apple_logo_grey.svg)](https://apps.apple.com/us/app/aletheia-by-%C3%A6quologica/id6476017817)

La référence à Martin Heidegger est flagrante : « <i>En traduisant ἀλήθεια par Unverborgenheit, dévoilement ou plutôt non-voilement, et non plus simplement par “Vérité”, Heidegger s'efforce de faire entendre quelque chose du sens, de ce vers quoi ἀλήθεια faisait signe, même à l'insu des Grecs, et à partir duquel ils déployaient leur monde.</i> » [⁽¹⁾](https://fr.wikipedia.org/wiki/Al%C3%A8theia_dans_la_philosophie_de_Martin_Heidegger).

Il s'agit donc de dévoiler les petites briques colorées pour faire apparaître ce que l'on appelle les tables de vérité [⁽²⁾](https://fr.wikipedia.org/wiki/Table_de_v%C3%A9rit%C3%A9) en jargon mathématique.

--- 

### Niveaux

<img src="svg/tortoise-fill-svgrepo-com.svg" style="width: 24px; height: 24px;">&nbsp;&nbsp;&nbsp;`Tortue` Le joueur a 2 minutes pour dévoiler les briques.

<img src="svg/hare-fill-svgrepo-com.svg" style="width: 24px; height: 24px;">&nbsp;&nbsp;&nbsp;`Lièvre` Le joueur a 1 minute pour dévoiler les briques.

<img src="svg/ancient-greek-helmet-1-svgrepo-com.svg" style="width: 24px; height: 24px;">&nbsp;&nbsp;&nbsp;`Casque Corinthien` Ce pourrait être celui d'Achille - **la** référence en matière de super-héros - mais aussi celui d'Hermès, le messager des dieux, réputé pour sa vitesse. On va en avoir besoin, car il ne reste plus que 30 secondes pour dévoiler les briques.

La 🎵musique🎶 du niveau <img src="svg/ancient-greek-helmet-1-svgrepo-com.svg" alt="Achilles" style="width: 24px; height: 24px;">
est sur [SoundCloud](https://soundcloud.com/christophe-thiebaud/aletheia?si=83569a3c774e4cdf84c684e74478af34&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing)

--- 

### Résultats

1. `You won!` Toutes les briques (32) sont dévoilées dans le temps imparti, sans erreurs.
2. `You - quasi - won…` Toutes les briques sont dévoilées dans le temps imparti, avec erreurs.
3. `Time's up!` Le temps imparti est écoulé, et il reste au moins une brique à dévoiler.
4. `Rather quiet today, isn't it?` Le temps imparti est écoulé et le joueur s'est endormi sans cliquer nulle part.
5. `You cheated?!` Le joueur a cliqué sur toutes les cases sans distinction. Bien que toutes les briques ont été dévoilées dans le temps imparti, ce qui pourrait être considéré comme une victoire, le nombre d'erreurs est énorme (>=28), il a triché! C'est mal.
6. `Ooooh… Subtle!` Le joueur a joué au qui-perd-gagne. Toutes les erreurs possibles (32) ont été faites, tout en évitant soigneusement de dévoiler la moindre brique. Très fort.

Chaque résultat est accompagné d'un son différent.

--- 

### Représentations

'𝖠' ou 'α'

La formule peut être exprimée soit sous forme de [symboles logiques](https://fr.wikipedia.org/wiki/Liste_de_symboles_logiques), soit par une expression javascript. Il est intéressant de noter que cette denière forme est factuellement interprétée par le moteur javascript de l'application. 

| | symboles logiques | javascript |
|---|---|---|
| TOUJOURS FAUX           | `⊥       `       |   `false                         `  |
| A ET B                  | `𝖠 ∧ 𝖡   `       |   `α & β                         `  |
| A ET NON N              | `𝖠 ∧ ¬𝖡  `       |   `α & !β                        `  |
| NON A ET B              | `¬𝖠 ∧ ¬𝖡 `       |   `!α & !β                       `  |
| NON A ET NON B          | `¬𝖠 ∧ 𝖡  `       |   `!α & β                        `  |
| A                       | `𝖠       `       |   `α                             `  |
| B                       | `𝖡       `       |   `β                             `  |
| NON A                   | `¬𝖠      `       |   `α | !β                        `  |
| NON B                   | `¬𝖡      `       |   `!β                            `  |
| A OU EXCLUSIF B         | `𝖠 ⊻ 𝖡   `       |   `α == β` càd `α & β | !α & !β`    |
| A OU EXCLUSIF NON B     | `𝖠 ⊻ 𝖡   `       |   `α != β` càd `!α & β | α & !β`    |
| A OU B                  | `𝖠 ∨ 𝖡   `       |   `α | β                         `  |
| A OU NON B              | `𝖠 ∨ ¬𝖡  `       |   `α | !β                        `  |
| NON A OU NON B          | `¬𝖠 ∨ ¬𝖡 `       |   `!α | !β                       `  |
| NON A OU B              | `¬𝖠 ∨ 𝖡  `       |   `!α | β                        `  |
| TOUJOURS VRAI           | `⊤       `       |   `true                          `  |


--- 

### Raccourcis clavier

* `Space` Démarre <img src="svg/b-start.svg" style="width: auto; height: 16px;">&nbsp; ou arrête <img src="svg/b-stop.svg" style="width: auto; height: 16px;">&nbsp; une partie. Si les résultats de la partie précédente sont encore affichés, redémarre une nouvelle partie après avoir mélangé les tables aléatoirement. 
* `Escape` 'Tue' une partie (i.e. sans afficher les résultats). 
* `Q` <img src="svg/b-grid.svg" style="width: auto; height: 16px;"   >&nbsp; Affiche les bords des tables et des celulles.
* `W` <img src="svg/b-axes.svg" style="width: auto; height: 16px;"   >&nbsp; Affiche les en-têtes des axes des tables.
* `E` <img src="svg/b-group.svg" style="width: auto; height: 16px;"  >&nbsp; Groupe les tables par nombre de briques en ordre croissant.
* `S` <img src="svg/b-shuffle.svg" style="width: auto; height: 16px;">&nbsp; *[swipe right]* Mélange les tables aléatoirement.
* `O` *[swipe left]* Trie les tables par nombre de briques en ordre croissant, ou mélange les couleurs si les tables sont déjà triées.
* `A` Change la représentation des en-têtes des tableaux.

--- 

### Bascules 

'Bascule' est le mot français offciellement utilisé pour traduire l'anglais 'Toggle':

<img src="svg/b-grid.svg"> Les bords des tables

<img src="svg/b-axes.svg"> Les en-têtes des axes

<img src="svg/b-sort.svg"> Les groupes de tables

`𝖠`ou `α` - Les représentations des formules

--- 

![ἀλήθεια](screenshots/2024_03_09-1824x1824.jpg)



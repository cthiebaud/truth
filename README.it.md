# Aletheia

<!-- ⁰¹²³⁴⁵⁶⁷⁸⁹ -->

| Links                                                    |                                                                                              |
| :------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| ![Apple App Store](assets/svg/Apple_logo_grey.svg)       | [per iPhone e iPad](https://apps.apple.com/us/app/aletheia-by-%C3%A6quologica/id6476017817)  |
| ![Android App Store](assets/svg/android-svgrepo-com.svg) | [per Android](https://play.google.com/store/apps/details?id=com.cthiebaud.aletheia.twa)      |
| ![WWW](assets/svg/internet-svgrepo-com.svg)              | [in rete](https://aletheia.cthiebaud.com/)                                                   |
|                                                          | [su YouTube](https://youtu.be/ayb2metdNAI)                                                   |

Il riferimento a Martin Heidegger è evidente: "*Traducendo alètheia con Unverborgenheit, svelamento o meglio non-velamento, e non più semplicemente con "Verità", Heidegger si sforza di far comprendere qualcosa del significato, di ciò a cui alètheia faceva riferimento, anche a insaputa dei Greci, e da cui essi sviluppavano il loro mondo.*" [⁽¹⁾](https://fr.wikipedia.org/wiki/Al%C3%A8theia_dans_la_philosophie_de_Martin_Heidegger) (in francese).

Si tratta quindi di rivelare i piccoli mattoni colorati per far apparire ciò che viene chiamato tabelle di verità [⁽²⁾](https://it.wikipedia.org/wiki/Tabella_della_verit%C3%A0) nel gergo matematico. Un po' più di dettagli - pur restando il più concisi possibile - nel file QUICK-GUIDE.md [⁽³⁾](QUICK-GUIDE.md) (in inglese).

--- 

### Livelli

Abbiamo audacemente fuso **La lepre e la tartaruga** [⁽⁴⁾](https://it.wikipedia.org/wiki/La_lepre_e_la_tartaruga), favola ben nota attribuita a Esopo [⁽⁵⁾](https://it.wikipedia.org/wiki/Esopo), con il **Paradosso di Achille e la tartaruga** [⁽⁶⁾](https://it.wikipedia.org/wiki/Paradosso_di_Achille_e_la_tartaruga) di Zenone di Elea [⁽⁷⁾](https://it.wikipedia.org/wiki/Zenone_di_Elea).

<img src="svg/tortoise-fill-svgrepo-com.svg" style="width: 24px;">&nbsp; `Tartaruga` Il giocatore ha 2 minuti per rivelare i mattoni.

<img src="svg/hare-fill-svgrepo-com.svg" style="width: 24px;">&nbsp; `Lepre`  Il giocatore ha 1 minuto per rivelare i mattoni.

<img src="svg/ancient-greek-helmet-1-svgrepo-com.svg" style="width: 24px;">&nbsp; `Elmo Corinzio` Potrebbe essere quello di Achille [⁽⁸⁾](https://it.wikipedia.org/wiki/Achille), ma anche quello di Hermes [⁽⁹⁾](https://it.wikipedia.org/wiki/Ermes), il messaggero degli dei, noto per la sua velocità. Ne avremo bisogno, perché rimangono solo 30 secondi per rivelare i mattoni.

ⓘ *la 🎵 di <img src="svg/ancient-greek-helmet-1-svgrepo-com.svg" alt="Achilles" style="width: 24px;">
è su [![SoundCloud](svg/soundcloud.svg)](https://soundcloud.com/christophe-thiebaud/aletheia?si=83569a3c774e4cdf84c684e74478af34).*

--- 

### Risultati

1. `You won!` Tutti i mattoni (32) sono stati rivelati nel tempo previsto, senza errori.
2. `You - quasi - won…` Tutti i mattoni sono stati rivelati nel tempo previsto, con errori.
3. `Time's up!` Il tempo previsto è scaduto e rimane almeno un mattoncino da rivelare.
4. `Rather quiet today, isn't it?` Il tempo previsto è scaduto e il giocatore si è addormentato senza cliccare da nessuna parte.
5. `You cheated?!` Il giocatore ha cliccato su tutte le caselle indiscriminatamente. Anche se tutti i mattoni sono stati rivelati nel tempo previsto, il numero di errori è enorme (>=28), ha barato! È male.
6. `Ooooh… Subtle!` Il giocatore ha giocato a perdere-vincere. Tutti gli errori possibili (32) sono stati fatti, evitando accuratamente di rivelare anche solo un mattoncino. Molto astuto.

--- 

### Espressioni

La formula che fornisce la chiave di ogni tabella di verità può essere espressa, sia in algebra di Boole [⁽¹⁰⁾](https://it.wikipedia.org/wiki/Algebra_di_Boole), ad esempio `𝖠 ∧ 𝖡`, sia mediante un'espressione javascript, `α & β`. Per quest'ultimo caso, è interessante notare che il motore dell'applicazione valuta effettivamente l'espressione javascript nel contesto di una funzione anonima [⁽¹¹⁾](https://it.wikipedia.org/wiki/Funzione_anonima) : `(α, β) => α & β`.

|  | simbolo logico | javascript |
|---|---|---|
| negazione              | `¬`  | `!`   |
| congiunzione           | `∧`  | `&`   |
| disgiunzione inclusiva | `∨`  | `\|`  |
| disgiunzione esclusiva | `⊻`  | `^`   |
| contraddizione         | `⊥`  | ` `   |
| tautologia            | `⊤`  | `true`|

*N. B. : Riguardo a javascript, `!` è un operatore logico [⁽¹²⁾](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#logical_operators), `&`, `|` et `^` sono operatori binari [⁽¹³⁾](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#bitwise_operators), ` ` è una stringa vuota, detta "falsy" [⁽¹⁴⁾](https://en.wiktionary.org/wiki/falsy), e `true` è un valore booleano primitivo.*

| expression | algèbre | javascript |  |
|---|---|---|---|
| sempre falso      | `⊥`       | ` `        | □ □<br>□ □ |
| A e B              | `𝖠 ∧ 𝖡`   | `α & β`    | ■ □<br>□ □ |
| A e non B          | `𝖠 ∧ ¬𝖡`  | `α & !β`   | □ ■<br>□ □ |
| non A e non B      | `¬𝖠 ∧ ¬𝖡` | `!α & !β`  | □ □<br>□ ■ |
| non A e B          | `¬𝖠 ∧ 𝖡`  | `!α & β`   | □ □<br>■ □ |
| A                   | `𝖠`       | `α`        | ■ ■<br>□ □ |
| B                   | `𝖡`       | `β`        | ■ □<br>■ □ |
| non A               | `¬𝖠`      | `!α`       | □ □<br>■ ■ |
| non B               | `¬𝖡`      | `!β`       | □ ■<br>□ ■ |
| A o exclusif B     | `𝖠 ⊻ 𝖡`   | `α ^ β`    | □ ■<br>■ □ | 
| A o exclusif non B | `𝖠 ⊻ ¬𝖡`  | `α ^ !β`   | ■ □<br>□ ■ |
| A o B              | `𝖠 ∨ 𝖡`   | `α \| β`   | ■ ■<br>■ □ |
| A o non B          | `𝖠 ∨ ¬𝖡`  | `α \| !β`  | ■ ■<br>□ ■ |
| non A o non B      | `¬𝖠 ∨ ¬𝖡` | `!α \| !β` | □ ■<br>■ ■ |
| non A o B          | `¬𝖠 ∨ 𝖡`  | `!α \| β`  | ■ □<br>■ ■ |
| sempre vero      | `⊤`       | `true`     | ■ ■<br>■ ■ |

--- 

### Truffa

Durante una partita, tenendo premuto per un breve periodo su un'espressione nell'intestazione, la soluzione appare, sfocata. 😉

--- 

### Scorciatoie da tastiera

* <kbd>Spazio</kbd> &nbsp;&nbsp;&nbsp;<img src="svg/b-start.svg">/<img src="svg/b-stop.svg" >&nbsp;&nbsp;&nbsp; Avvia o interrompe una partita. Se la finestra di dialogo che mostra i risultati della partita precedente è visibile, mescola casualmente le tabelle prima di avviare una nuova partita.
* <kbd>Q</kbd> &nbsp;&nbsp;&nbsp;<img src="svg/b-grid.svg"   >&nbsp;&nbsp;&nbsp; Mostra o nasconde i bordi delle tabelle e delle celle.
* <kbd>W</kbd> &nbsp;&nbsp;&nbsp;<img src="svg/b-axes.svg"   >&nbsp;&nbsp;&nbsp; Mostra o nasconde gli header degli assi delle tabelle.
* <kbd>A</kbd> &nbsp;&nbsp;&nbsp;`𝖠`/`α`&nbsp;&nbsp;&nbsp; Passa da simboli logici a espressioni javascript e viceversa.
* <kbd>S</kbd> &nbsp;&nbsp;&nbsp;<img src="svg/b-shuffle.svg">&nbsp;&nbsp;&nbsp; Mescola casualmente le tabelle.
* <kbd>←</kbd> / <kbd>→</kbd> Cambia livello, <img src="svg/tortoise-fill-svgrepo-com.svg" style="width: 24px;"> ⇆ <img src="svg/hare-fill-svgrepo-com.svg" style="width: 24px;"> ⇆ <img src="svg/ancient-greek-helmet-1-svgrepo-com.svg" style="width: 24px;">.

*I seguenti scorciatoie da tastiera sono disponibili solo nella versione web e non hanno equivalenti grafici:*
* <kbd>Escape</kbd>  'Uccide' una partita (ovvero senza mostrare i risultati).
* <kbd>C</kbd> Mescola casualmente i colori dei mattoni.
* <kbd>O</kbd> Riporta le tabelle all'ordine iniziale.

--- 

### Toggles 

* <img src="svg/b-grid.svg" >&nbsp; Mostra o nasconde i bordi delle tabelle e delle celle.
* <img src="svg/b-axes.svg" >&nbsp; Mostra o nasconde gli header degli assi delle tabelle.
* `𝖠`/`α`&nbsp; Passa da simboli logici a espressioni javascript e viceversa.

--- 

![ἀλήθεια](screenshots/2024-03-20_2330x1688.jpg)

--- 

Abbiamo iniziato con Heidegger, terminiamo con Wittgenstein: "*per due proposizioni elementari, ci saranno quindi 16 proposizioni complesse (queste sono presentate al 5.101). Si possono determinare, basandosi su queste combinazioni, le funzioni di verità e quindi le tabelle di verità, che sono una delle innovazioni tecniche del libro. Wittgenstein non ha certo "inventato" le tabelle di verità: si può far risalire queste ultime agli stoici e Wittgenstein stesso riconosceva che l'idea si trovava già in Frege.*" Ludwig Wittgenstein - Introduzione al "Tractatus logico-philosophicus", di Mathieu Marion [⁽¹⁵⁾](https://www.cairn.info/ludwig-wittgenstein--9782130533344-page-85.htm) (in francese).

import { Modal as bsModal, Carousel as bsCarousel, Offcanvas as bsOffcanvas } from 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/+esm'
import bezierEasing from 'https://cdn.jsdelivr.net/npm/bezier-easing@2.1.0/+esm'
import isotopeLayout from 'https://cdn.jsdelivr.net/npm/isotope-layout@3.0.6/+esm' // ISOTOPE 

/* changed by "NODE_ENV=<development|production> node dev-oder-prod.mjs" or "npm run <dev|prod>" */
import { Infos } from './InfosClass.js'
import { Utils } from './UtilsClass.js'
import { Colors, BlurOverlay } from './ColorsClass.js'
import { Swipe } from './SwipeClass.js'
import { Timer } from './TimerClass.js'
import { SoundMachine } from './SoundMachineClass.js'
import { Result } from './GameClass.js'
import { Reservoir } from './ReservoirClass.js'


const reservoirDogsMeta = document.querySelector("head meta[name='truth-reservoir']")
const reservoirDogs = reservoirDogsMeta ? reservoirDogsMeta.getAttribute("content") || "http://192.168.1.53:5000" : "http://192.168.1.53:5000"
console.log(reservoirDogs)
const reservoir = new Reservoir(reservoirDogs)
try {
    reservoir.read({ pseudo: 'christophet60' })
        .then(data => {
            console.log('GET response:', data)
            document.getElementById('console').innerHTML += JSON.stringify(data) + "\\n"
        })
        .catch(error => {
            console.log('GET error:', error)
            document.getElementById('console').innerHTML += error + "\\n"
        });
} catch (error) {
    console.error('GET error:', error)
    document.glogetElementById('console').innerHTML += error + "\\n"

}
/*
import index_sheet from '../css/index.css' assert { type: 'css' };
import tables_sheet from '../css/tables.css' assert { type: 'css' };
import timer_sheet from '../css/timer.css' assert { type: 'css' };
document.adoptedStyleSheets = [index_sheet, tables_sheet, timer_sheet];
*/

// https://stackoverflow.com/a/9039885/1070215
const isiOS = (() => {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
})()
console.log(navigator.userAgent, `[${isiOS ? "" : "NOT "}a iOS device]`)

function safeById(id, func) {
    if (!id) return
    const elem = document.getElementById(id)
    if (!elem) return
    return func(elem)
}

class CompteARebours {
    #element
    #bezierEasing = bezierEasing(0.50, 0.20, 0.50, 1.00)
    #duration
    #animationFrameId
    #animationTimeInMilliseconds

    constructor() {
        this.#element = document.querySelector(".compte-à-rebours");
        this.#duration = 120
        this.#animationTimeInMilliseconds = 600

    }

    get animationTimeInMilliseconds() {
        return this.#animationTimeInMilliseconds;
    };

    set animationTimeInMilliseconds(animationTimeInMillisecondsParam) {
        this.#animationTimeInMilliseconds = animationTimeInMillisecondsParam
    }

    get duration() {
        return this.#duration;
    };

    set duration(duration) {
        this.animateSetDuration(duration)
    };

    animateSetDuration(durationParam) {
        let nextDuration = Number(durationParam);
        let prevDuration = this.duration;
        const startTime = performance.now();
        const updateAnimation = () => {
            const elapsedTime = Math.min(performance.now() - startTime, this.#animationTimeInMilliseconds);
            const normalized = Utils.normalizeVraiment(elapsedTime, 0, this.#animationTimeInMilliseconds, 0, 1)
            const bezierized = this.#bezierEasing(normalized)
            const whereAreWe = prevDuration + bezierized * (nextDuration - prevDuration)
            this._duration_ = whereAreWe

            if (elapsedTime < this.animationTimeInMilliseconds) {
                requestAnimationFrame(updateAnimation);
            } else {
                this._duration_ = nextDuration
            }
        };

        cancelAnimationFrame(this.#animationFrameId);
        this.#animationFrameId = requestAnimationFrame(updateAnimation);
    }

    set _duration_(durationParam) {
        if (!Utils.isFiniteNumber(durationParam)) throw new Error(`not a finite number: ${durationParam} !`)
        this.#duration = durationParam;
        this.#element.style.color = Colors.mapNumberToColor(this.#duration)
        this.#element.textContent = Utils.formatDuration(this.#duration)
    };
}

let theTables = null
class Tables {
    #tablesElement
    constructor(id) {
        this.#tablesElement = document.getElementById(id)

    }
    get element() {
        return this.#tablesElement
    }
    set innerHTML(innerHTML) {
        if (this.#tablesElement) {
            this.#tablesElement.innerHTML = innerHTML
        }
    }
}
theTables = new Tables('tables')

let player = null
class Player {
    #restarting
    constructor() {
        const resultModal = document.getElementById("result-modal")
        resultModal.addEventListener('hidden.bs.modal', event => {
            player.stop()
        })
        this.restarting = false

        this._soundMachine = new SoundMachine()
        document.getElementById('controls').style.visibility = 'visible'

        this.compteARebours = new CompteARebours()
        this.compteARebours.duration = Number(document.querySelector('.carousel-item.active').dataset.time)
        this._timer = new Timer(this.compteARebours.duration, 'play', {
            onStart: this.onTimerStart,
            onTick: this.onTimerTick,
            onExpired: this.onTimerExpired,
            onStop: this.onTimerStop,
            onClose: this.onTimerClose,
        })

        this.tortoiseHareAchilles = new bsCarousel(document.getElementById('tortoise-hare-achilles'), {})
        let startSlide = undefined
        document.getElementById('tortoise-hare-achilles').addEventListener('slide.bs.carousel', event => {
            // console.log(event)
            startSlide = performance.now()
            this.compteARebours.animateSetDuration(event.relatedTarget.dataset.time)
        })
        document.getElementById('tortoise-hare-achilles').addEventListener('slid.bs.carousel', event => {
            // console.log(event)
            if (startSlide) {
                this.compteARebours.animationTimeInMilliseconds = performance.now() - startSlide
            }
            // BEGIN CAROUSEL
            const carousel = document.getElementById('tortoise-hare-achilles')
            const active = carousel.querySelector('.carousel-item.active')
            carousel.style.opacity = '1'
            carousel.querySelector('.carousel-control-next').disabled = false
            carousel.querySelector('.carousel-control-prev').disabled = false
            if (active.id === 'tortoise') {
                carousel.querySelector('.carousel-control-prev').disabled = true
            } else if (active.id === 'achilles') {
                carousel.querySelector('.carousel-control-next').disabled = true
            }
            // END CAROUSEL
        })

    }

    get restarting() {
        // console.log(`GET restarting ${this.#restarting}`)
        return this.#restarting
    }
    set restarting(restarting) {
        // console.log(`SET restarting from ${this.#restarting} to ${restarting}`)
        this.#restarting = restarting
    }

    get level() {
        return document.querySelector('.carousel-item.active').dataset.sound
    }

    stopTimerShowResultThenCloseTimer(msg, result) {
        // stop timer
        player.result.timerDuration = player._timer.stop()

        document.getElementById('result-msg').innerHTML = msg

        {
            [...document.querySelectorAll('#cloche svg')].forEach(elem => {
                elem.style.display = 'none'
            })
        }

        Utils.safeGetElementByIdThen('result-display-mode', (element, arg) => { element.innerHTML = arg }, result.displayMode);

        document.getElementById(`result-level-${result.level}`).style.display = 'block'
        document.getElementById(`result-scrambled-${result.scrambled}`).style.display = 'block'

        document.getElementById('result-elapsed').innerHTML = Utils.formatDuration(result.timerDuration, 'milliseconds')
        document.getElementById('result-unconcealed').innerHTML = result.unconcealed.value
        if (result.erred.value !== 0) {
            document.getElementById('empty-set').style.display = 'none'
            document.getElementById('result-erred').innerHTML = result.erred.value
        } else {
            document.getElementById('result-erred').innerHTML = ''
            document.getElementById('empty-set').style.display = 'block'

        }

        const currentDate = new Date()

        function getCurrentDateTimeISO() {
            const now = new Date();

            const year = now.getUTCFullYear();
            const month = String(now.getUTCMonth() + 1).padStart(2, '0');
            const day = String(now.getUTCDate()).padStart(2, '0');

            const hours = String(now.getUTCHours()).padStart(2, '0');
            const minutes = String(now.getUTCMinutes()).padStart(2, '0');
            const seconds = String(now.getUTCSeconds()).padStart(2, '0');

            const isoDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

            return isoDateTime;
        }
        const currentDateTimeISO = getCurrentDateTimeISO();

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            // second: 'numeric',
            // timeZoneName: 'short',
        }

        Utils.safeGetElementByIdThen('result-timestamp', (element, arg) => { element.innerHTML = arg }, currentDate.toLocaleString('en-US', options));

        const postData = {
            pseudo: 'christophet60',
            level: result.level,
            elapsed: Math.round(result.timerDuration),
            erred: result.erred.value,
            revealed: result.unconcealed.value,
            symbol: result.displayMode,
            scrambled: result.scrambled,
            when: currentDateTimeISO,
        }
        reservoir.write(postData)
            .then(data => {
                console.log('POST response:', data)
                document.getElementById('console').innerHTML += JSON.stringify(data) + "\\n"
                })
            .catch(error => {
                console.log('POST error:', error)
                document.getElementById('console').innerHTML += error + "\\n"
            });

        // show result
        let resultModal = new bsModal(document.getElementById("result-modal"))
        resultModal.show() // will close timer when dismissed
    }

    onTimerStart() {
        player._soundMachine.underwater.play();
        player._soundMachine[player.level].play();
    }

    onTimerTick(totalTime, ticks) {
        player.compteARebours.duration = (totalTime - ticks)
        player.result.elapsed.increment()

        if (player.compteARebours.duration <= 17 && !player._soundMachine.riser.playing()) {
            player._soundMachine.riser.play()
        }
    }

    onTimerExpired() {
        requestAnimationFrame(() => { // let the javascript paint everything it needs to paint before brining the modal
            let msg
            if (player.result.erred.value === 0 && player.result.unconcealed.value === 0) {
                player.boredom()
                msg = `Rather quiet today, isn't it?`
            } else {
                player.fail()
                msg = `Time's up!`
            }
            player.stopTimerShowResultThenCloseTimer(msg, player.result)
        })
    }

    onTimerStop() {
        if (player.level === 'achilles') {
            // can listen to the complete warrior music only when victory, otherwise, fade !
            if (!player.result.victory) {
                player._soundMachine[player.level].fade(undefined, 0.001, 2500);
            }
        } else {
            // always stop tic-tac
            player._soundMachine[player.level].fade(undefined, 0.001);
        }
        player._soundMachine.underwater.fade(undefined, 0.001);
        player._soundMachine.riser.fade(undefined, 0.001, 1500);
    }

    onTimerClose() {
        document.getElementById("shuffle-all").disabled = false
        player.unveilBricks()
        player._soundMachine[player.level].stop()
        player._soundMachine.underwater.stop()
    }

    victory() {
        requestAnimationFrame(() => { // let the javascript paint everything it needs to paint before brining the modal
            let msg
            if (player.result.erred.value >= 32 && player.result.unconcealed.value === 0) {
                player.guitar()
                msg = `Ooooh&hellip; Subtle!`
            } else if (player.result.erred.value === 0 && player.result.unconcealed.value === 32) {
                if (player.level != 'achilles' || !player.result.victory) {
                    player.tada()
                } else {
                    player.gong()
                }
                msg = `You won!`
            } else if (player.result.erred.value >= 28 && player.result.unconcealed.value === 32) {
                player.boo()
                msg = `You cheated?!`
            } else {
                player.completed_with_errors()
                msg = `You <i>quasi</i> won&hellip;`
            }
            player.stopTimerShowResultThenCloseTimer(msg, player.result)
        })
    }

    get isPlaying() {
        return document.getElementById('play').classList.contains('playing')
    }

    set isPlaying(newIsPlaying) {
        const currentIsPlaying = this.isPlaying
        if (currentIsPlaying !== newIsPlaying) {
            if (newIsPlaying) {
                document.getElementById('play').classList.add('playing')
            } else {
                document.getElementById('play').classList.remove('playing')
            }
        }
    }

    coin() {
        this._soundMachine.coin.play()
    }

    tada() {
        this._soundMachine.tada.play()
    }

    gong() {
        this._soundMachine.gong.play()
    }

    laughs() {
        this._soundMachine.laughs.play()
        this.result.erred.increment()
    }

    fail() {
        this._soundMachine.fail.play()
    }

    abortSound() {
        this._soundMachine.abort.play()
    }

    completed_with_errors() {
        this._soundMachine.completed_with_errors.play()
    }

    boo() {
        this._soundMachine.boo.play()
    }

    guitar() {
        this._soundMachine.guitar.play()
    }

    boredom() {
        this._soundMachine.boredom.play()
    }

    veilBricks() {
        this.#veilOrUnveilBricks('veil')
    }

    unveilBricks() {
        if (!this.restarting) {
            this.#veilOrUnveilBricks('unveil')
        }
    }

    async #veilOrUnveilBricks(veilParam) {
        const veil = veilParam === 'veil';

        function methodThatReturnsAPromise(tbody, veil) {
            return new Promise((resolve) => {
                tbody.parentNode.classList.remove('completed')
                const tds = tbody.querySelectorAll('td')
                if (veil) {
                    tds.forEach(td => {
                        if (td.classList.contains('true')) {
                            td.classList.add('concealed')
                        }
                        td.classList.remove('clicked')
                    })
                } else {
                    if (player.isPlaying != true) {
                        tds.forEach(td => {
                            if (td.classList.contains('true')) {
                                td.classList.remove('concealed')
                            }
                            td.classList.remove('clicked')
                        })
                    }
                }
                setTimeout(() => {
                    // console.log(veilParam, tbody.id, performance.now())
                    resolve(tbody)
                }, 20);
            })
        }

        const tbodies = [...document.querySelectorAll('#tables tbody')]
        // Generate an array of indexes
        const indexes = Array.from({ length: tbodies.length }, (_, index) => index);

        // Shuffle the array of indexes
        Utils.shuffleArray(indexes);

        // Iterate over the shuffled indexes and access the corresponding tbodies
        for (const index of indexes) {
            const tbody = tbodies[index]
            await methodThatReturnsAPromise(tbody, veil);
        }
    }

    start() {
        if (this.isPlaying) {
            return
        }
        this.isPlaying = true
        this.result = new Result(this.level, theTables.element.dataset.scrambled, functions.displayMode.symbol)
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Use 'smooth' for smooth scrolling
        })
        this.veilBricks()
        const totalTime = Number(document.querySelector('.carousel-item.active').dataset.time)
        this._timer.start(totalTime)
        document.getElementById("shuffle-all").disabled = true
        // BEGIN CAROUSEL
        document.getElementById('tortoise-hare-achilles').style.opacity = '.5'
        document.querySelectorAll('#tortoise-hare-achilles button').forEach(button => {
            button.disabled = true
        })
        // END CAROUSEL
        this.result.reset()
        this.restarting = false
    }

    abort() {
        requestAnimationFrame(() => { // let the javascript paint everything it needs to paint before brining the modal
            player.abortSound()
            let msg = `You stopped!`
            player.stopTimerShowResultThenCloseTimer(msg, player.result)
        })
    }

    stop() {
        // if (!this.playing) return
        this.isPlaying = false
        this.compteARebours.duration = Number(document.querySelector('.carousel-item.active').dataset.time)
        // BEGIN CAROUSEL
        const carousel = document.getElementById('tortoise-hare-achilles')
        const active = carousel.querySelector('.carousel-item.active')
        carousel.style.opacity = '1'
        carousel.querySelector('.carousel-control-next').disabled = false
        carousel.querySelector('.carousel-control-prev').disabled = false
        if (active.id === 'tortoise') {
            carousel.querySelector('.carousel-control-prev').disabled = true
        } else if (active.id === 'achilles') {
            carousel.querySelector('.carousel-control-next').disabled = true
        }
        // END CAROUSEL
        if (this.result) this.result.timerDuration = this._timer.stop()
        this._timer.close()
    }
}
player = new Player()

class Axes {
    constructor() {
        this.axesArray = [null, true, false]
        this.visible = false
        this.setCellWidth()
    }

    setCellWidth() {
        /* 2*52 + 18 == 2*61 == 122 */
        let cellWidth = 61
        if (this.visible) {
            cellWidth = 52
        }
        let cellWidthSmaller = Math.round(cellWidth * .7)
        document.documentElement.style.setProperty('--cell-width_and_height', `${cellWidth}px`)
        document.documentElement.style.setProperty('--cell-width_and_height-smaller', `${cellWidthSmaller}px`)
        document.documentElement.style.setProperty('--header-width_and_height', '18px')
        document.documentElement.style.setProperty('--border-color', '#215c4d40')
    }

    iterate(iterator) {
        this.axesArray.forEach(iterator)
    }

    applyVisibility() {
        ((thElements) => {
            for (let thElement of thElements) {
                thElement.style.display = this.visible ? "table-cell" : "none"
            }
        })(document.querySelectorAll('#tables th'))
    }

    toggleVisibility() {
        const displayStyle = Utils.toggleElementsVisibility(document.querySelectorAll('#tables th'), 'table-cell')
        this.visible = displayStyle !== 'none'
        this.setCellWidth()
        return this.visible
    }
}
const axes = new Axes()
const colors = new Colors()

class OneOrTwoColors {
    constructor(color1, color2) {
        this.c = 0
        this.colors = [color1]
        if (color2) {
            this.colors.push(color2)
        }
    }
    next() {
        const color = this.colors[this.c]
        this.c = (this.c + 1) % this.colors.length
        return color
    }
}

class Functions {
    static falseFunc = ''
    static trueFunc = 'true'
    #functionArray = [
        /* 0, */
        Functions.falseFunc,
        /* 1, */
        'α & β',
        'α & !β',
        '!α & !β',
        '!α & β',
        /* 2, */
        'α',
        'β',
        '!α',
        '!β',
        'α ^ β',
        'α ^ !β',
        /* 3, */
        'α | β',
        'α | !β',
        '!α | !β',
        '!α | β',
        /* 4, */
        Functions.trueFunc,
    ]
    #displayMode = {
        'canonical': {
            symbol: '𝖠',
            facade: "(𝖠,𝖡)",
            key: 'canonical'
        },
        'javascript': {
            symbol: 'α',
            facade: "(α,β)",
            key: 'javascript'
        }
    }
    #currentDisplayModeKey = 'canonical'
    constructor() {
        // cf. CSS rule for .negation.canonical:before (¬)
        const negationMap = {
            '!α': "<span class='negation canonical'>𝖠</span>",
            '!β': "<span class='negation canonical'>𝖡</span>"
        };
        this.#functionArray.forEach(item => {
            if (typeof item === 'string') {
                const key = item
                // javascript
                this.#displayMode.javascript[key] = item.replace(/^$/g, "&nbsp;")

                // canonical 
                this.#displayMode.canonical[key] = item
                    .replace(/&/g, "∧")
                    .replace(/\|/g, "∨")
                    .replace(new RegExp(`^${Functions.trueFunc}$`), "⊤")
                    .replace(new RegExp(`^${Functions.falseFunc}$`), "⊥")
                    .replace(/\^/g, "⊻")
                    .replace(/(!?)α|(!?)β/g, (match, negationA, negationB) => {
                        if (negationA === '!') {
                            return negationMap['!α'];
                        } else if (negationB === '!') {
                            return negationMap['!β'];
                        } else {
                            return match === 'α' ? '𝖠' : '𝖡';
                        }
                    })
            }
        });
    }

    static toAnonymous(func) {
        return new Function('α', 'β', `return ${func};`)
    }


    iterate(iterator) {
        this.#functionArray.forEach(iterator)
    }

    getOneOrTwoColors(f) {
        if (f === Functions.falseFunc) {
            return new OneOrTwoColors(colors.colorFalse)
        }
        if (f === Functions.trueFunc) {
            return new OneOrTwoColors(colors.colorTrue)
        }
        if (f.includes('^')) {
            return new OneOrTwoColors(colors.nextColor(), colors.nextColor())
        }
        return new OneOrTwoColors(colors.nextColor())
    }
    toggleDisplayMode() {
        this.#currentDisplayModeKey = this.#currentDisplayModeKey === 'canonical' ? 'javascript' : 'canonical'
        return this.#currentDisplayModeKey
    }
    get displayMode() {
        return this.#displayMode[this.#currentDisplayModeKey]
    }
}
const functions = new Functions()
document.querySelector('#αβ > span').innerHTML = functions.displayMode.facade

function screenshot() {
    return [...document.querySelectorAll('#tables>div')].map(element => {
        return element.dataset.function;
    })
}

/* ISOTOPE
ISOTOPE */
let iso = undefined
function scrambleIt(originalElementsArray, shuffleParam = true) {
    // Shuffle the order if shuffleParam is true
    if (shuffleParam) {
        theTables.element.dataset.scrambled = true
        iso.shuffle()
    } else {
        theTables.element.dataset.scrambled = false
        iso.arrange({ sortBy: 'original-order' })
    }
    iso.layout();
}


function scrambleIt0(originalElementsArray, shuffleParam = true) {
    // Detach each element with an ID
    const detachedElements = originalElementsArray.map(element => {
        const parent = element.parentNode;
        parent.removeChild(element);
        return element;
    });

    // Shuffle the detached elements
    theTables.element.dataset.scrambled = false
    if (shuffleParam) {
        Utils.shuffleArray(detachedElements);
        theTables.element.dataset.scrambled = true
    }

    // Reattach the shuffled elements
    detachedElements.forEach(element => {
        theTables.element.appendChild(element);
    });
}

function shuffleBrickColors(originalElementsArray) {
    colors.shuffleColors()
    originalElementsArray.forEach(elem => {
        if (elem.dataset.function) {
            let backgroundcolors = functions.getOneOrTwoColors(elem.dataset.function)
            elem.querySelectorAll('td.true').forEach(trueTD => {
                trueTD.style.backgroundColor = backgroundcolors.next()
                trueTD.style.color = colors.bg2color(trueTD.style.backgroundColor)
            })
        }
    })
}

class Blender {
    #container = undefined
    #previousElement = null
    constructor(container) {
        this.#container = container
        this.#previousElement = null
    }

    blend(html, elementID) {
        if (this.#previousElement === null) {
            this.#container.innerHTML = html
        } else {
            this.#previousElement.insertAdjacentHTML("afterend", html)
        }
        this.#previousElement = document.getElementById(elementID)
    }
}

function doIt() {

    if (player.isPlaying) return

    const blender = new Blender(theTables)

    functions.iterate((func, index) => {

        const elementID = `element${index}`

        const theadID = `thead${index}`
        const tbodyID = `tbody${index}`
        const template = `<div id="${elementID}" class="ISOTOPE" data-function="${func}">
<table class="table inline table-sm caption-top table-borderless">
<caption class="text-center">${functions.displayMode[func]}</caption>
<thead id="${theadID}"></thead>
<tbody id="${tbodyID}"></tbody>
</table>
</div>
`
        blender.blend(template, elementID)

        let backgroundcolors = functions.getOneOrTwoColors(func)

        axes.iterate(rowElem => {
            const row = document.createElement("tr")
            axes.iterate(colElem => {
                const col = document.createElement(rowElem === null || colElem === null ? "th" : "td")
                if (colElem === null) {
                    if (rowElem === null) {
                        col.innerHTML = '<div class="diagonal-line">&nbsp;</div>'
                    } else {
                        col.innerHTML = `<div class="vertical-text">${rowElem}</div>`
                    }
                } else {
                    if (rowElem === null) {
                        col.innerHTML = `${colElem}`
                    } else {
                        const result = Functions.toAnonymous(func)(rowElem, colElem)
                        col.classList.add(result ? 'true' : 'false')
                        if (result) {
                            col.style.backgroundColor = backgroundcolors.next()
                            col.style.color = colors.bg2color(col.style.backgroundColor)
                            col.innerHTML = '' // ● 
                        } else {
                            col.style.backgroundColor = colors.colorFalse
                            col.innerHTML = '' // ❌
                        }
                    }
                }
                row.appendChild(col)
            })
            document.getElementById(rowElem === null ? theadID : tbodyID).appendChild(row)
        })
        axes.applyVisibility()
    })

    document.getElementById("aletheia").style.visibility = 'visible'

    document.querySelectorAll('#tables td').forEach(elem => {

        elem.addEventListener('click', clickEvent => {
            clickEvent.preventDefault()
            clickEvent.stopPropagation()
            if (!player.isPlaying) return

            if (elem.classList.contains('concealed')) {
                // lapalissien : only true can be concealed
                /* if (elem.classList.contains('true')) */ {
                    elem.classList.remove('concealed')
                    player.result.unconcealed.increment()

                    // Helper function to find the nearest ancestor with a specific class
                    function findAncestor(element, className) {
                        while ((element = element.parentElement)) {
                            if (element.classList.contains(className)) {
                                return element
                            }
                        }
                        return null
                    }

                    function checkDescendantsClasses(element, classA, classX, classY) {
                        // Find the nearest ancestor with class A
                        const ancestorWithClassA = findAncestor(element, classA)

                        if (!ancestorWithClassA) {
                            return { result: false, ancestor: undefined }
                        }

                        // Find all descendants of the ancestor that have class X
                        // Convert the HTMLCollection to an array for easier iteration
                        const classXDescendants = [...ancestorWithClassA.getElementsByClassName(classX)]

                        // get all descendants with class X that *DO NOT HAVE* class Y
                        // "The every() method of Array instances tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value."
                        const everyDescendantOfClassXHasNotClassY = classXDescendants.every(function (descendant) {
                            return !descendant.classList.contains(classY)
                        })

                        return { result: everyDescendantOfClassXHasNotClassY, ancestor: ancestorWithClassA }
                    }

                    const check = checkDescendantsClasses(elem, 'table', 'true', 'concealed')
                    if (check.result) {
                        check.ancestor.classList.add('completed')
                        player.coin()
                    }
                }
            } else if (elem.classList.contains('false')) {
                player.laughs()
                elem.classList.add('red-cross')
                elem.classList.add('clicked')
                setTimeout(() => {
                    elem.classList.remove('red-cross')
                }, 1000)
            }
            let remainingTrue = document.querySelectorAll('#tables td.true.concealed').length
            let falseClicked = document.querySelectorAll('#tables td.false.clicked').length
            if ((remainingTrue === 0)
                ||
                (falseClicked >= 32 && remainingTrue === 32)) {
                player.victory()
            }
        })

    })

    // BEGIN HINTS 
    let timout = null
    let overlay = new BlurOverlay('td')
    let targetElem = null
    function clearHints() {
        if (timout) {
            clearTimeout(timout)
            timout = null
        }
        [...document.querySelectorAll('.hint')].forEach((hint) => {
            hint.classList.remove("hint")
            targetElem = null
        })
        overlay.hide()
        player._soundMachine.underwater.fade(undefined, 0.001, 1500)
    }
    {
        window.addEventListener("scroll", function (e) {
            clearHints()
        })
        window.addEventListener("touchmove", function (e) {
            // console.log(targetElem, e.target)
            if (targetElem && !(targetElem == e.target || (e.target instanceof Node && targetElem.contains(e.target)))) {
                clearHints()
            }
        })
        window.addEventListener("touchend", (event) => {
            clearHints()
        });
    }
    [...document.getElementsByTagName('caption')].forEach((caption) => {
        // bug on iPad, user-select=none ignored
        // https://stackoverflow.com/a/16613634/1070215
        caption.addEventListener('touchstart', (e) => {
            if (!player.isPlaying) return
            targetElem = caption
            /* if (isiOS) */ {
                e.preventDefault();
            }
        })
        caption.addEventListener('pointerdown', (e) => {

            if (!player.isPlaying) return

            overlay.move(caption.parentNode)
            overlay.show()

            caption.setPointerCapture(e.pointerId);
            player._soundMachine.underwater.fade(undefined, 0.4)

            timout = setTimeout(() => {
                e.target.parentNode.classList.add("hint")
                e.target.parentNode.parentNode.classList.add("hint")
            }, 300)
        })
        caption.addEventListener('pointerup', (e) => {
            clearHints()
            caption.releasePointerCapture(e.pointerId)
        })
    })
    // END HINTS 

    // ISOTOPE Initialize Isotope
    iso = new isotopeLayout(theTables.element, {
        itemSelector: 'div.ISOTOPE',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: 10,
            fitWidth: true,
        }
    })

    // Get all elements with the selector '#tables>div'
    return [...document.querySelectorAll('#tables>div')]

}

window.addEventListener("load", loadEvent => {

    const originalElementsArray = doIt()

    function safe_shuffle() {
        if (player.isPlaying) return
        scrambleIt(originalElementsArray)
    }

    function safe_reorder() {
        if (player.isPlaying) return
        scrambleIt(originalElementsArray, false)
    }

    function safe_recolor() {
        if (player.isPlaying) return
        shuffleBrickColors(originalElementsArray)
    }

    function toggle_borders() {
        return safeById('tables', tables => {
            if (tables.classList.contains("transparent-border")) {
                tables.classList.remove("transparent-border")
                return false
            } else {
                tables.classList.add("transparent-border")
                return true
            }
        })
    }

    function toggle_displayMode() {
        functions.toggleDisplayMode()
        if (functions.displayMode.key === 'canonical') {
            document.getElementById('main-id').classList.remove('javascript')
        } else {
            document.getElementById('main-id').classList.add('javascript')
        }
        document.getElementById('canonical-or-javascript.label').innerHTML = functions.displayMode.symbol
        document.querySelector('#αβ > span').innerHTML = functions.displayMode.facade
        document.querySelectorAll('#tables [data-function] caption').forEach((c) => {
            c.innerHTML = functions.displayMode[c.parentNode.parentNode.dataset.function]
        })
        return functions.displayMode.key !== 'canonical'
    }

    document.getElementById("table-borders").addEventListener('click', clickEvent => {
        clickEvent.stopPropagation()
        toggle_borders()
    })

    document.getElementById("ab-axes").addEventListener('click', clickEvent => {
        clickEvent.stopPropagation()
        axes.toggleVisibility()
    })

    document.getElementById("canonical-or-javascript")?.addEventListener('click', clickEvent => {
        clickEvent.stopPropagation()
        toggle_displayMode()
    })

    /* BEGIN infos */
    const infos = new Infos(bsOffcanvas, 'offcanvas-right', "/QUICK-GUIDE.md").fetch(() => {
        console.log('/QUICK-GUIDE.md fetched')
    })
    const wip = new Infos(bsOffcanvas, 'offcanvas-left', "/WIP.md").fetch(() => {
        console.log('/WIP.md fetched')
    })
    // Listen for swipe events
    const swipe = new Swipe('body-id', function (direction) {
        if (direction === 'swiperight') {
            // console.log('Swiped right!');
            if (infos._element.classList.contains('show')) {
                infos.hide()
            } else {
                if (!wip._element.classList.contains('show')) {
                    wip.show()
                }
            }
        } else if (direction === 'swipeleft') {
            // console.log('Swiped left!');
            if (wip._element.classList.contains('show')) {
                wip.hide()
            } else {
                if (!infos._element.classList.contains('show')) {
                    infos.show()
                }
            }
        }
    });
    /* END infos */

    document.getElementById("shuffle-all").addEventListener('click', clickEvent => {
        clickEvent.preventDefault()
        clickEvent.stopPropagation()
        safe_shuffle()
    })

    function playToggle(event) {
        event.preventDefault()
        event.stopPropagation()
        if (player.isPlaying) {
            player.abort()
        } else {
            player.start()
        }
    }

    function playAgain() {
        player.restarting = true
        player.veilBricks()
        let resultModal = document.getElementById("result-modal")
        resultModal.addEventListener('hidden.bs.modal', event => {
            requestAnimationFrame(() => { // let the javascript paint everything it needs to paint before brining the modal
                // player.stop() // already in initial hidden.bs.modal event
                safe_shuffle()
                player.start()
            })
        }, { once: true, })
        let modal = bsModal.getInstance(resultModal)
        modal.hide()
    }

    document.getElementById("play").addEventListener('click', clickEvent => {
        playToggle(clickEvent)
        // remove focus from element
        document.activeElement?.blur()
    })

    document.addEventListener('keyup', function (keyboardEvent) {
        // is modal visible ?
        {
            const element = document.getElementById("result-modal");
            const computedStyle = window.getComputedStyle(element);
            const displayValue = computedStyle.getPropertyValue("display");
            if (displayValue !== 'none') {
                // edge case when space is pushed
                if (event.code === 'Space') {
                    playAgain()
                }
                return // mute every other keypress when modal is visible
            }
        }
        //  others
        switch (event.code) {
            case 'Space':
                playToggle(keyboardEvent);
                break;
            case 'Escape':
                if (player.isPlaying) {
                    player.stop();
                }
                break;
            case 'KeyS':
                safe_shuffle();
                break;
            case 'KeyO':
                safe_reorder();
                break;
            case 'KeyC':
                safe_recolor();
                break;
            case 'KeyQ':
                document.getElementById("table-borders").checked = !toggle_borders();
                break;
            case 'KeyW':
                document.getElementById("ab-axes").checked = axes.toggleVisibility();
                break;
            case 'KeyA':
                document.getElementById("canonical-or-javascript").checked = toggle_displayMode();
                break;
            case 'ArrowRight':
                if (!player.isPlaying) {
                    player.tortoiseHareAchilles.next();
                }
                break;
            case 'ArrowLeft':
                if (!player.isPlaying) {
                    player.tortoiseHareAchilles.prev();
                }
                break;
        }
    })

    document.getElementById("play-again").addEventListener('click', clickEvent => {
        clickEvent.preventDefault()
        clickEvent.stopPropagation()
        playAgain()
    })

    // BEGIN CAROUSEL
    {
        [...document.getElementsByClassName('carousel-item')].forEach(carouselItem => {
            carouselItem.addEventListener('click', clickEvent => {
                clickEvent.preventDefault()
                clickEvent.stopPropagation()

                if (player.isPlaying) return

                const target = clickEvent.target
                const rect = target.getBoundingClientRect()
                const clickX = event.clientX - rect.left
                const midpoint = rect.width / 2

                if (clickX < midpoint) {
                    // Clicked on the left half
                    player.tortoiseHareAchilles.prev()
                } else {
                    // Clicked on the right half
                    player.tortoiseHareAchilles.next()
                }
            })
        })
    }
    // END CAROUSEL

})


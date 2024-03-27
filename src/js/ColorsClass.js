import tinycolor2 from 'https://cdn.jsdelivr.net/npm/tinycolor2@1.6.0/+esm'

function shuffleArrayWithNonConsecutive(colors, lengthOfNonConsecutiveColors) {
    const n = colors.length
    let world = [...colors]
    let exclusions = new Map()
    let lastPicks = []

    for (let i = 0; i < world.length; i++) {
        if (!exclusions.has(world[i])) {
            exclusions.set(world[i], 1)
        } else {
            exclusions.set(world[i], exclusions.get(world[i]) + 1)
        }
    }
    if (!lengthOfNonConsecutiveColors) lengthOfNonConsecutiveColors = 0
    if (lengthOfNonConsecutiveColors < 0 || exclusions.size < lengthOfNonConsecutiveColors) {
        throw new Error("Invalid parameters: lengthOfNonConsecutiveColors should be a number greater or equal than zero and less than the length of possible colors array")
    }

    let shuffled = []

    while (true) {
        let candidates = []
        exclusions.forEach((remain, value) => {
            if (remain > 0 && !lastPicks.includes(value)) {
                candidates.push({ value, remain })
            }
        })

        if (candidates.length === 0) {
            exclusions.forEach((remain, value) => {
                if (remain > 0) {
                    candidates.push({ value, remain })
                }
            })
        }

        if (candidates.length === 0) {
            break // No more candidates, exit loop
        }

        let chosenIndex 
        if (candidates.length === 1) {
            chosenIndex = candidates[0]
        } else {
            let randomIndex = Math.floor(Math.random() * candidates.length)
            chosenIndex = candidates[randomIndex]
        }

        shuffled.push(chosenIndex.value)
        lastPicks.push(chosenIndex.value)

        // Update lastPicks FIFO queue
        if (lastPicks.length > lengthOfNonConsecutiveColors) {
            lastPicks.shift() // Remove oldest pick if queue exceeds lengthOfNonConsecutiveColors
        }

        exclusions.set(chosenIndex.value, chosenIndex.remain - 1)

        // Check if all remaining exclusions have 0 remaining counts
        let allZero = true
        exclusions.forEach((remain) => {
            if (remain > 0) {
                allZero = false
            }
        })
        if (allZero) {
            break
        }
    }

    return shuffled
}

// {
//     // Test the shuffleArrayWithNonConsecutive function
//     const colors = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]
//     const lengthOfNonConsecutiveColors = 0
//     try {
//         const shuffledArray = shuffleArrayWithNonConsecutive(colors, lengthOfNonConsecutiveColors)
//         console.log(shuffledArray, shuffledArray.length, lengthOfNonConsecutiveColors)
//     } catch (error) {
//         console.error(error.message)
//     }
// 
// }


export class Colors {
    // ########################
    // Function to map a number between 0 and 120 to a color
    static mapNumberToColor(number) {
        // Define the fixed colors
        const colors = [
            { value: 120, color: ("#00852B") },
            { value: 60, color: ("#1E5AA8") },
            { value: 30, color: ("#B40000") },
            { value: 0, color: ("#FF0000") }
        ]

        if (colors[0].value < number) {
            return colors[0].color
        }
        if (number <= colors[colors.length - 1].value) {
            return colors[colors.length - 1].color
        }

        // Initialize index
        let index = null

        // Find the two closest boundaries
        for (let i = 0; i < colors.length - 1; i++) {
            if (colors[i].value >= number && number > colors[i + 1].value) {
                index = i
                break
            }
        }
        if (index === null) {
            return "#000000"
        }

        // Calculate the ratio for interpolation
        const ratio = (number - colors[index].value) / (colors[index + 1].value - colors[index].value)

        // Interpolate between the two colors
        const resultColor = tinycolor2.mix(colors[index].color, colors[index + 1].color, ratio * 100)

        return resultColor.toHexString()
    }

    // // Test the mapNumberToColor function
    // const numbers = [120, 90, 60, 45, 30, 15, 0]
    // numbers.forEach(function (number) {
    //     console.log(number + " => " + Colors.mapNumberToColor(number))
    // })
    // // ########################

    constructor() {
        let colorTrue = '#545955'
        let colors = [
            '#F4F4F4',
            '#FAC80A',
            '#B40000',
            '#00852B',
            '#1E5AA8',
            '#8A928D',
            '#ABD9FF',
            '#91501C',
            colorTrue,
        ]
        // Randomly pick a color from 'colors'
        let randomIndex = Math.floor(Math.random() * colors.length)
        this.colorTrue = colors[randomIndex]
        this.colorFalse = 'transparent'

        // Remove the randomly picked color from the 'colors' array
        colors.splice(randomIndex, 1)
        this.colors = [...colors, ...colors]

        // will change this.colors and this.lengthOfNonConsecutiveColors
        this.shuffleColors(4)
    }

    #lengthOfNonConsecutiveColors = 4
    #currentColorIndex = 0
    nextColor() {
        const currentColor = this.colors[this.#currentColorIndex++]
        this.#currentColorIndex %= this.colors.length
        return currentColor
    }
    shuffleColors(lengthOfNonConsecutiveColors = this.#lengthOfNonConsecutiveColors) {
        this.colors = shuffleArrayWithNonConsecutive(this.colors, lengthOfNonConsecutiveColors)
        return this.colors
    }
    bg2color(bg) {
        return tinycolor2(bg).darken(3).toString("hex6")
    }
}

export class BlurOverlay {
    static overlaySingleton = null

    static getOrCreateOverlaySingleton() {
        if (BlurOverlay.overlaySingleton == null) {
            BlurOverlay.overlaySingleton = document.createElement('div')
            BlurOverlay.overlaySingleton.classList.add('overlay')
            BlurOverlay.overlaySingleton.style.display = 'none'
            document.body.appendChild(BlurOverlay.overlaySingleton)
            window.addEventListener('resize', () => {
                new BlurOverlay().updateOverlayPosition()
            })
        }
        return BlurOverlay.overlaySingleton
    }

    #overlay
    #targetSelector
    constructor(targetSelector) {
        this.#targetSelector = targetSelector
        this.#overlay = BlurOverlay.getOrCreateOverlaySingleton()
    }

    show() {
        this.#overlay.style.display = 'block'
    }

    move(elementCoveredByOverlay) {
        this.elementCoveredByOverlay = elementCoveredByOverlay
        this.updateOverlayPosition()
    }

    hide() {
        this.#overlay.style.display = 'none'
    }

    clear() {
        this.#overlay.style.display = 'none'
        this.elementCoveredByOverlay = null
    }

    updateOverlayPosition() {
        if (this.elementCoveredByOverlay == null) return

        const targetElements = this.elementCoveredByOverlay.querySelectorAll(this.#targetSelector)
        if (targetElements.length === 0) return

        let minTop = Number.MAX_SAFE_INTEGER
        let minLeft = Number.MAX_SAFE_INTEGER
        let maxBottom = Number.MIN_SAFE_INTEGER
        let maxRight = Number.MIN_SAFE_INTEGER

        targetElements.forEach(element => {
            const rect = element.getBoundingClientRect()
            minTop = Math.min(minTop, rect.top)
            minLeft = Math.min(minLeft, rect.left)
            maxBottom = Math.max(maxBottom, rect.bottom)
            maxRight = Math.max(maxRight, rect.right)
        })

        const parentRect = this.#overlay.parentElement.getBoundingClientRect()
        const elementRect = this.elementCoveredByOverlay.getBoundingClientRect()

        const overlayStyle = this.#overlay.style
        overlayStyle.position = 'absolute'
        overlayStyle.top = (minTop - parentRect.top    /* + elementRect.top  */) + 'px'
        overlayStyle.left = (minLeft - parentRect.left /* + elementRect.left */) + 'px'
        overlayStyle.width = (maxRight - minLeft) + 'px'
        overlayStyle.height = (maxBottom - minTop) + 'px'
    }
}

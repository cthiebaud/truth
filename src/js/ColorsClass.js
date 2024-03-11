import tinycolor2 from 'https://cdn.jsdelivr.net/npm/tinycolor2@1.6.0/+esm'


function rotateArray(arr, offset) {
    if (offset == 0) return arr
    const n = arr.length
    const rotated = arr.slice()

    for (let i = 0; i < n; i++) {
        const newPosition = (i + offset) % n
        rotated[newPosition] = arr[i]
    }

    return rotated
}

function shuffleNoAdjacentDuplicates(array) {
    const n = array.length
    const shuffledArray = array.slice()

    let previousValue = null
    for (let i = n - 1; i > 0; i--) {
        const possibles = Array.from({ length: i + 1 }, (_, index) => index)
        let world = possibles
        if (previousValue !== null) {
            world = possibles.filter(index => shuffledArray[index] !== previousValue)
        }

        let pos
        if (world.length !== 0) {
            // Pick a random element in the world of possibles
            const p = Math.floor(Math.random() * world.length)
            pos = world[p]
        } else {
            // Pick a random element in the array
            pos = Math.floor(Math.random() * i)
        }

        previousValue = shuffledArray[pos]

            // Swap element at position pos with element at position i
            ;[shuffledArray[i], shuffledArray[pos]] = [shuffledArray[pos], shuffledArray[i]]
    }

    const randomPosition = Math.floor(Math.random() * n)
    return rotateArray(shuffledArray, randomPosition)
}

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
        ];

        if (colors[0].value < number) {
            return colors[0].color
        }
        if (number <= colors[colors.length - 1].value) {
            return colors[colors.length - 1].color
        }

        // Initialize index
        let index = null;

        // Find the two closest boundaries
        for (let i = 0; i < colors.length - 1; i++) {
            if (colors[i].value >= number && number > colors[i + 1].value) {
                index = i;
                break;
            }
        }
        if (index === null) {
            return "#000000";
        }

        // Calculate the ratio for interpolation
        const ratio = (number - colors[index].value) / (colors[index + 1].value - colors[index].value);

        // Interpolate between the two colors
        const resultColor = tinycolor2.mix(colors[index].color, colors[index + 1].color, ratio * 100);

        return resultColor.toHexString();
    }

    // Test the function
    /*
    const numbers = [120, 90, 60, 45, 30, 15, 0];
    numbers.forEach(function (number) {
        console.log(number + " => " + Colors.mapNumberToColor(number));
    });
    */
    // ########################

    constructor() {
        let colors = [
            '#F4F4F4',
            '#FAC80A',
            '#B40000',
            '#00852B',
            '#1E5AA8',
            '#8A928D',
            '#ABD9FF',
            '#91501C',
        ]
        this.colors = colors.concat(colors)
        this.shuffleColors()
    }

    colorFalse = 'transparent'
    colorTrue = '#545955'
    currentColorIndex = 0
    nextColor() {
        const currentColor = this.colors[this.currentColorIndex++]
        this.currentColorIndex %= this.colors.length
        if (this.currentColorIndex === 0) {
            this.shuffleColors()
        }
        return currentColor
    }
    shuffleColors() {
        this.colors = shuffleNoAdjacentDuplicates(this.colors)
    }
    bg2color(bg) {
        return tinycolor2(bg).darken(3).toString("hex6")
    }
}

export class BlurOverlay {
    static overlaySingleton = null;

    static getOrCreateOverlaySingleton() {
        if (BlurOverlay.overlaySingleton == null) {
            BlurOverlay.overlaySingleton = document.createElement('div');
            BlurOverlay.overlaySingleton.classList.add('overlay');
            BlurOverlay.overlaySingleton.style.display = 'none'
            document.body.appendChild(BlurOverlay.overlaySingleton);
            window.addEventListener('resize', () => {
                new BlurOverlay().updateOverlayPosition()
            });
        }
        return BlurOverlay.overlaySingleton
    }

    #overlay
    #targetSelector
    constructor(targetSelector) {
        this.#targetSelector = targetSelector;
        this.#overlay = BlurOverlay.getOrCreateOverlaySingleton();
    }

    show() {
        this.#overlay.style.display = 'block'
    }

    move(elementCoveredByOverlay) {
        this.elementCoveredByOverlay = elementCoveredByOverlay;
        this.updateOverlayPosition();
    }

    hide() {
        this.#overlay.style.display = 'none'
    }

    clear() {
        this.#overlay.style.display = 'none'
        this.elementCoveredByOverlay = null
    }

    updateOverlayPosition() {
        if (this.elementCoveredByOverlay == null) return;

        const targetElements = this.elementCoveredByOverlay.querySelectorAll(this.#targetSelector);
        if (targetElements.length === 0) return;

        let minTop = Number.MAX_SAFE_INTEGER;
        let minLeft = Number.MAX_SAFE_INTEGER;
        let maxBottom = Number.MIN_SAFE_INTEGER;
        let maxRight = Number.MIN_SAFE_INTEGER;

        targetElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            minTop = Math.min(minTop, rect.top);
            minLeft = Math.min(minLeft, rect.left);
            maxBottom = Math.max(maxBottom, rect.bottom);
            maxRight = Math.max(maxRight, rect.right);
        });

        const parentRect = this.#overlay.parentElement.getBoundingClientRect();
        const elementRect = this.elementCoveredByOverlay.getBoundingClientRect();

        const overlayStyle = this.#overlay.style;
        overlayStyle.position = 'absolute';
        overlayStyle.top = (minTop - parentRect.top    /* + elementRect.top  */) + 'px';
        overlayStyle.left = (minLeft - parentRect.left /* + elementRect.left */) + 'px';
        overlayStyle.width = (maxRight - minLeft) + 'px';
        overlayStyle.height = (maxBottom - minTop) + 'px';
    }
}

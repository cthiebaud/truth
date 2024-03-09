export class ResultProperty {
    #value 

    constructor(value) {
        this.#value = value
    }

    // Getter for value
    get value() {
        return this.#value
    }

    // Setter for value
    set value(newValue) {
        if (typeof newValue === 'number') {
            this.#value = newValue
        } else {
            console.error('Value must be a number')
        }
    }

    // Method to increment value
    increment() {
        const previous = this.#value
        this.#value += 1
        return previous
    }
}

export class Result {
    #timerDuration
    #elapsed
    #erred
    #revealed
    #level
    #displayModeSymbol

    constructor(level, displayModeSymbol = '𝖠') {
        this.#level = level
        this.#displayModeSymbol = displayModeSymbol
        this.reset()
    }

    reset() {
        this.#timerDuration = undefined
        this.#elapsed = new ResultProperty(1)
        this.#erred = new ResultProperty(0)
        this.#revealed = new ResultProperty(0)
    }

    // Getter for level
    get level() {
        return this.#level
    }

    // Getter for displayModeSymbol
    get displayModeSymbol() {
        return this.#displayModeSymbol
    }

    // Getter for elapsed
    get elapsed() {
        return this.#elapsed
    }

    // Getter for erred
    get erred() {
        return this.#erred
    }

    // Getter for unconcealed
    get unconcealed() {
        return this.#revealed
    }

    get timerDuration() {
        return this.#timerDuration
    }

    set timerDuration(timerDuration) {
        this.#timerDuration = timerDuration
    }

    get victory() {
        return this.erred.value === 0 && this.unconcealed.value === 32
    }
}

export class Scores {
    #taxonomy
    constructor() {
        this.#taxonomy = {
            shuffled: [true, false],
            level: ['tortoise', 'hare', 'achilles'],
            unconcealed: [0,32],
            erred: [0,32],
            timerDuration: [0,120],
        }
    }

    add(result) {
    }

}
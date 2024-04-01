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
    #unconcealed
    #level
    #displayMode
    #scrambled

    constructor(level, scrambled, displayModeSymbol) {
        this.#level = level
        this.scrambled = scrambled // NB. using set as it provides conversion to boolean
        this.displayMode = displayModeSymbol // idem, see conversion below
        this.reset()
    }

    reset() {
        this.#timerDuration = undefined
        this.#elapsed = new ResultProperty(1)
        this.#erred = new ResultProperty(0)
        this.#unconcealed = new ResultProperty(0)
    }

    // Getter for level
    get level() {
        return this.#level
    }

    // Getter for isOrdered
    get scrambled() {
        return this.#scrambled
    }

    set scrambled(value) {
        if (typeof value === "undefined") {
            return; // Ignore undefined values
        }        
        if (value === null || typeof value === 'boolean') {
            this.#scrambled = value; // Assign the value directly if it's null or a boolean
        } else if (typeof value === 'string') {
            // Convert strings "true" and "false" (case-insensitive) to boolean
            const lowerCaseValue = value.toLowerCase();
            if (lowerCaseValue === 'true') {
                this.#scrambled = true;
            } else if (lowerCaseValue === 'false') {
                this.#scrambled = false;
            } else {
                // For any other string input, attempt to convert it to a boolean
                this.#scrambled = !!value;
            }
        } else {
            // For any other type of input, attempt to convert it to a boolean
            this.#scrambled = !!value;
        }
    }

    // Getter for displayModeSymbol
    get displayMode() {
        return this.#displayMode
    }

    set displayMode(value) {
        if (value === '𝖠') {
            this.#displayMode = "canonical"
        } else if (value === 'α') {
            this.#displayMode = "javascript"
        } else {
            this.#displayMode = null
        }
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
        return this.#unconcealed
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

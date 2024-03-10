export class Utils {

    static normalizeVraiment(x, srcmin, srcmax, dstmin, dstmax) {
        if (srcmax === srcmin) return 0
        if (Math.abs(x - srcmax) < Number.EPSILON) {
            return dstmax;
        }
        const y = dstmin + (dstmax - dstmin) * (x - srcmin) / (srcmax - srcmin)
        return y
    }

    // https://stackoverflow.com/q/5690071/1070215
    static isFiniteNumber(num) {
        return isFinite(num) && !isNaN(num);
    }

    static formatDuration(duration, type = 'seconds') {
        if (type !== 'seconds' && type !== 'milliseconds') {
            throw new Error("Invalid 'type' parameter. 'type' must be either 'seconds' or 'milliseconds'.");
        }

        if (type === 'seconds') {
            duration *= 1000; // Convert seconds to milliseconds
        }

        if (600000 <= duration) { // 10 minutes
            throw new Error(`Duration ${duration} must be under 9′59″9999`);
        }

        const minutes = Math.floor(duration / 60000); // Calculate minutes
        const seconds = Math.floor(duration / 1000) % 60; // Calculate seconds

        // Format the time
        let formattedTime = '' + minutes + '′' + String(seconds).padStart(2, '0') + '″';

        if (type === 'milliseconds') {
            const milliseconds = Math.floor(duration % 1000); // Round milliseconds
            formattedTime += String(milliseconds).padStart(4, '0'); // Ensure 4-digit representation
        }

        return formattedTime;
    }

    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[array[i], array[j]] = [array[j], array[i]]
        }
    }

    static toggleElementsVisibility(elements, displayValueWhenVisible) {
        let displayStyle = null
        for (let tag of elements) {
            if (displayStyle == null) {
                displayStyle = (tag.style.display !== displayValueWhenVisible ? displayValueWhenVisible : 'none')
            }
            tag.style.display = displayStyle
        }
        return displayStyle
    }

}
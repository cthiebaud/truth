export class Utils {

    static normalizeVraiment(x, srcmin, srcmax, dstmin, dstmax) {
        if (srcmax === srcmin) return 0
        if (Math.abs(x - srcmax) < Number.EPSILON) {
            return dstmax;
        }
        const y = dstmin + (dstmax - dstmin) * (x - srcmin) / (srcmax - srcmin)
        return y
    }

    static isNumber(value) {
        return !Number.isNaN(parseFloat(value)) && Number.isFinite(value);
    }

    static formatDuration(duration, type = 'seconds') {
        if (type !== 'seconds' && type !== 'milliseconds') {
            throw new Error("Invalid 'type' parameter. 'type' must be either 'seconds' or 'milliseconds'.");
        }

        if (type === 'seconds') {
            duration *= 1000; // Convert seconds to milliseconds
        }

        if (duration >= 540000 && type === 'milliseconds') { // 9 minutes in milliseconds
            throw new Error('Duration must be under 9′59″');
        }

        const minutes = Math.floor(duration / 60000); // Calculate minutes
        const seconds = Math.floor(duration / 1000) % 60; // Calculate seconds

        // Format the time
        let formattedTime = minutes + '′' + String(seconds).padStart(2, '0') + '″';

        if (type === 'milliseconds') {
            const milliseconds = Math.round(duration % 1000); // Round milliseconds
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
                displayStyle = tag.style.display !== displayValueWhenVisible ? displayValueWhenVisible : 'none'
            }
            tag.style.display = displayStyle
        }
        return displayStyle
    }


}
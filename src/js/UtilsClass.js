export class Utils {

    static safeGetElementByIdThen(id, func, ...args) {
        if (id) {
            const element = document.getElementById(id)
            if (element) {
                return func(element, ...args)
            }
        }
        return undefined
    }

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

    static formatReadableDateLong(isoDateString) {
        const date = new Date(isoDateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }

    static formatReadableDate(isoDateString) {
        const date = new Date(isoDateString);
        
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
        const dateFormatter = new Intl.DateTimeFormat('en-US', timeOptions);
        const time = dateFormatter.format(date);
    
        // Format day, month, and year manually
        const day = ('0' + date.getDate()).slice(-2);
        const monthAbbrev = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
    
        // Format the date string as desired
        return `${day} ${monthAbbrev} ${year} · ${time}`;
    }

    static formatDuration(duration, type = 'seconds') {
        if (type !== 'seconds' && type !== 'milliseconds') {
            throw new Error("Invalid 'type' parameter. 'type' must be either 'seconds' or 'milliseconds'.");
        }

        if (type === 'seconds') {
            duration *= 1000; // Convert seconds to milliseconds
        }

        if (600000 <= duration) { // 10 minutes
            throw new Error(`Duration ${duration} must be under 9′59″999`);
        }

        const minutes = Math.floor(duration / 60000); // Calculate minutes
        const seconds = Math.floor(duration / 1000) % 60; // Calculate seconds

        // Format the time
        let formattedTime = '' + minutes + '′' + String(seconds).padStart(2, '0') + '″';

        if (type === 'milliseconds') {
            const milliseconds = Math.floor(duration % 1000); // Round milliseconds
            formattedTime += String(milliseconds).padStart(3, '0'); // Ensure 4-digit representation
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
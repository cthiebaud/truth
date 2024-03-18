// Create a class for the element
export class TimerElement extends HTMLElement {
    static observedAttributes = ["size"];

    constructor() {
        // Always call super first in constructor
        super();
        this._size = null;
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        
        fetch('/src/css/timer.css')
            .then(response => response.text())
            .then(cssText => {
                // console.log("Custom element added to page.");
                const sheet = new CSSStyleSheet();
                sheet.replaceSync(cssText)
                // Append the style element to the shadow root
                shadow.adoptedStyleSheets = [sheet];
            })
            .catch(error => {
                console.error('Error fetching CSS file:', error);
            });

        shadow.innerHTML = `<div class="timer-container" style="width: ${this._size}px; height: ${this._size}px; margin:auto;">
        <svg class="timer-not-playing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" />
        </svg>
        <div class="timer-playing">
            <div class="compte-à-rebours"></div>
            <svg viewBox="4 4 92 92" xmlns="http://www.w3.org/2000/svg">
                <g transform="rotate(-90 50 50)">
                    <circle id="innerCircle1" cx="50" cy="50" r="55" stroke="rgba(23, 63, 53, .25)" stroke-width="46" fill="none" />
                    <circle id="innerCircle2" cx="50" cy="50" r="40" stroke="rgba(23, 63, 53, .666)" stroke-width="0" fill="none" />
                </g>
            </svg>
        </div></div>`
    }

    disconnectedCallback() {
        // console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        // console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(`Attribute ${name} has changed.`);
        this._size = newValue;
    }

    get size() {
        return this._size;
    }
    set size(v) {
        this.setAttribute("size", v);
    }
}

customElements.define("timer-element", TimerElement);

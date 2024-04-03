export class SessionId {
    #sessionIdContainer
    #sessionIdDiv
    #originalValue
    #reservoir

    constructor(reservoir) {
        this.#reservoir = reservoir
        this.#sessionIdContainer = document.getElementById("session-id-container");
        this.#sessionIdDiv = document.getElementById("session-id");
        this.#originalValue = this.#sessionIdDiv.textContent.trim();

        // Event listener to start edit session by clicking on the container
        this.#sessionIdContainer.addEventListener("click", (event) => {
            if (!this.isEditing()) {
                event.preventDefault();
                event.stopPropagation();
                this.enterEditMode();
            }
        });

        // Event listener to handle keydown events
        this.#sessionIdDiv.addEventListener("keyup", (event) => {
            if (this.isEditing()) {
                event.preventDefault();
                event.stopPropagation();
                if (event.key === "Enter") {
                    this.validateEditMode();
                } else if (event.key === "Escape") {
                    this.abortEditMode();
                }
            }
        });

        // Event listener to validate edit mode when clicking outside the container
        document.addEventListener("click", (event) => {
            if (this.isEditing() && event.target !== this.#sessionIdDiv) {
                event.preventDefault();
                event.stopPropagation();
                this.validateEditMode();
            }
        });
    }

    isEditing() {
        return this.#sessionIdDiv.isContentEditable
    }

    // Enter edit mode
    enterEditMode() {
        this.#sessionIdDiv.contentEditable = true;
        this.#sessionIdDiv.focus();
        this.#originalValue = this.#sessionIdDiv.textContent.trim();
    }

    // Abort edit mode
    abortEditMode() {
        this.#sessionIdDiv.textContent = this.#originalValue;
        this.#sessionIdDiv.contentEditable = false;
    }

    // Validate edit mode
    validateEditMode() {
        const sessionId = this.#sessionIdDiv.textContent.trim().toLowerCase()
        if (sessionId.length === 0 || /^[a-z0-9\-]+$/.test(sessionId)) {
            this.#sessionIdDiv.contentEditable = false;
            console.log("Valid session ID:", sessionId);
            this.#reservoir.changeSessionId(sessionId)
        } else {
            alert("Invalid session ID! User-defined session ID must contain only lowercase alphanumeric characters or the hyphen ('-'), or be empty.");
            this.abortEditMode();
        }
    }
}

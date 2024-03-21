// SwipeClass.js

export class Swipe {
    constructor(elementId, swipeHandler) {
        this.swipeArea = document.getElementById(elementId);

        if (!this.swipeArea) {
            throw new Error(`Element with id '${elementId}' not found.`);
        }

        this.startX = 0;
        this.currentX = 0;
        this.swipeHandler = swipeHandler;
        this.touchThreshold = 50; // Minimum distance threshold for swipe gesture

        // Set touch event listeners as non-passive
        this.swipeArea.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        this.swipeArea.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.swipeArea.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });

        // Store a reference to the element for swipe events
        this.swipeElement = this.swipeArea;

        // Listen for swipe events on the swipe element
        this.swipeElement.addEventListener('swipe', this.handleSwipe.bind(this));
    }

    handleTouchStart(event) {
        this.startX = this.currentX = event.touches[0].clientX;
    }

    handleTouchMove(event) {
        this.currentX = event.touches[0].clientX;
    }

    handleTouchEnd(event) {
        if (!this.startX || !this.currentX) return
        const distance = this.currentX - this.startX;
        if (Math.abs(distance) > this.touchThreshold) {
            if (distance > 0) {
                this.fireSwipeEvent('swiperight');
            } else {
                this.fireSwipeEvent('swipeleft');
            }
        }
        this.startX = this.currentX = undefined
    }

    fireSwipeEvent(direction) {
        const swipeEvent = new CustomEvent('swipe', { detail: direction });
        this.swipeElement.dispatchEvent(swipeEvent);
    }

    handleSwipe(event) {
        // Invoke the swipe handler callback provided by the client
        if (typeof this.swipeHandler === 'function') {
            this.swipeHandler(event.detail);
        }
    }
}

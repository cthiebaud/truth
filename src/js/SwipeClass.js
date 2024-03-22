// SwipeClass.js

export class Swipe {
    constructor(elementId, swipeHandler) {
        this.swipeArea = document.getElementById(elementId);

        if (!this.swipeArea) {
            throw new Error(`Element with id '${elementId}' not found.`);
        }

        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.minY = 0;
        this.maxY = 0;
        this.touchThresholdX = 150; // Minimum distanceX threshold for swipe gesture
        this.touchThresholdY = 80; // Maximum distanceY threshold for swipe left or right
        this.swipeHandler = swipeHandler;

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
        this.startY = this.minY = this.maxY = event.touches[0].clientY;
    }

    handleTouchMove(event) {
        this.currentX = event.touches[0].clientX;
        this.minY = Math.min(this.minY, event.touches[0].clientY);
        this.maxY = Math.max(this.maxY, event.touches[0].clientY);
    }

    handleTouchEnd(event) {
        if (!this.startX || !this.currentX || !this.startY || !this.minY) return
        const distanceX = this.currentX - this.startX;
        const distanceY = this.maxY - this.minY;
        if (Math.abs(distanceX) > this.touchThresholdX &&
            Math.abs(distanceY) < this.touchThresholdY ) {
            if (distanceX > 0) {
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

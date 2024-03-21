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
        this.currentY = 0;
        this.swipeHandler = swipeHandler;
        this.touchThresholdX = 50; // Minimum distanceX threshold for swipe gesture
        this.touchThresholdY = 30; // Maximum distanceY threshold for swipe left or right

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
        this.startY = this.currentY = event.touches[0].clientY;
    }

    handleTouchMove(event) {
        this.currentX = event.touches[0].clientX;
        this.currentY = event.touches[0].clientY;
    }

    handleTouchEnd(event) {
        if (!this.startX || !this.currentX || !this.startY || !this.currentY) return
        const distanceX = this.currentX - this.startX;
        const distanceY = this.currentY - this.startY;
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

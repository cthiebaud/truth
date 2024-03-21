// SwipeClass.js

class Swipe {
    constructor(elementId) {
        this.swipeArea = document.getElementById(elementId);

        this.startX = 0;
        this.currentX = 0;

        // Set touch event listeners as non-passive
        this.swipeArea.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        this.swipeArea.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.swipeArea.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    }

    handleTouchStart(event) {
        this.startX = event.touches[0].clientX;
    }

    handleTouchMove(event) {
        event.preventDefault();
        this.currentX = event.touches[0].clientX;
    }

    handleTouchEnd(event) {
        const distance = this.currentX - this.startX;
        if (Math.abs(distance) > 50) {
            if (distance > 0) {
                this.fireSwipeEvent('swiperight');
            } else {
                this.fireSwipeEvent('swipeleft');
            }
        }
    }

    fireSwipeEvent(direction) {
        const swipeEvent = new CustomEvent('swipe', { detail: direction });
        this.swipeArea.dispatchEvent(swipeEvent);
    }
}

export default Swipe;

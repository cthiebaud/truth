// TimerClass.js
import tinycolor2 from 'https://cdn.jsdelivr.net/npm/tinycolor2@1.6.0/+esm'

export class Timer {
    constructor(totalTime, containerId, callbacks = {}) { // onTimerReady, onTimerTick, onTimerExpiredCallback, onTimerClosedCallback 
        try {
            this.timerContainer = document.getElementById(containerId);
            this.timerContainer.disabled = false
            this.timerElementPlaying = this.timerContainer.querySelector(".timer-playing");
            this.timerElementNotPlaying = this.timerContainer.querySelector(".timer-not-playing");
            this.ticks = 0
            this.innerCircle1 = this.timerElementPlaying.querySelector('#innerCircle1');
            this.innerCircle2 = this.timerElementPlaying.querySelector('#innerCircle2');
            this.radius1 = this.innerCircle1.getAttribute('r');
            this.radius2 = this.innerCircle2.getAttribute('r');
            this.circonf1 = this.radius1 * 2 * Math.PI;
            this.circonf2 = this.radius2 * 2 * Math.PI;
            this.radius = this.timerElementPlaying.width / 4;
            this.centerX = this.timerElementPlaying.width / 2;
            this.centerY = this.timerElementPlaying.height / 2;
            this.timerId = null;
            this.totalTime = totalTime;
            this.callbacks = {
                onStart: () => { },
                onTick: () => { },
                onExpired: () => { },
                onStop: () => { },
                onClose: () => { },
            };
            // Override default callbacks with provided callbacks
            this.callbacks = Object.assign(this.callbacks, callbacks);
            // console.log(this.callbacks)

        } catch (error) {
            console.error(error)
        }
    }

    drawTimer(timeRemaining) {
        let percentElapsed = ((this.totalTime - timeRemaining) / this.totalTime)

        let hidden1 = percentElapsed * this.circonf1
        let visible1 = this.circonf1 - hidden1

        let visible2 = percentElapsed * this.circonf2
        let hidden2 = this.circonf2 - visible2

        innerCircle1.setAttribute('stroke-dasharray', `0 ${hidden1} ${visible1}`);
        if (visible2 - 6 >= 0) {
            innerCircle2.setAttribute('stroke-dasharray', `0 3 ${visible2 - 6} ${hidden2 + 3}`);
            innerCircle2.setAttribute('stroke-width', 2);
        } else {
            innerCircle2.setAttribute('stroke-width', 0);
        }
    }

    updateTimer(timestamp, startTime) {
        const progress = (timestamp - startTime) / 1000;
        const timeRemaining = Math.max(this.totalTime - progress, 0);

        if (timeRemaining > 0) {
            this.drawTimer(timeRemaining);
            this.timerId = requestAnimationFrame((timestamp) => this.updateTimer(timestamp, startTime));
        } else {
            clearInterval(this.showNumber)
            this.callbacks.onExpired();
        }
    }

    start(totalTime) {
        if (totalTime) {
            this.totalTime = totalTime
        }
        this.timerElementPlaying.style.display = 'block';
        this.timerElementNotPlaying.style.display = 'none';
        this.ticks = 0
        const startTime = performance.now();
        this.timerId = requestAnimationFrame((timestamp) => this.updateTimer(timestamp, startTime));
        this.callbacks.onStart()
        this.callbacks.onTick(this.totalTime, this.ticks)
        this.showNumber = setInterval(() => {
            this.callbacks.onTick(this.totalTime, ++this.ticks)
        }, 1000)

        /* console.log('timer started') */
    }
    stop() {
        clearInterval(this.showNumber)

        // this.clearTimer()
        cancelAnimationFrame(this.timerId);
        this.timerId = null
        this.callbacks.onStop()
        // console.log('timer stopped')
    }
    close() {
        if (this.audioContext) {
            /* console.log("closing audioContext...") */
            this.audioContext.close().then(() => {
                /* console.log('Audio context closed and nullified') */
                if (this.onTimerClosedCallback) {
                    this.onTimerClosedCallback();
                }
            });
            this.audioContext = null;
        } else {
            this.callbacks.onClose();
        }
        this.timerElementPlaying.style.display = 'none';
        this.timerElementNotPlaying.style.display = 'block';
        /* console.log('timer closed') */
    }
}

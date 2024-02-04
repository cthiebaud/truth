// TimerClass.js

class Sound {
    constructor(file) {
        this.file = file
        this.arrayBuffer = null
        this.soundBuffer = null
        this.soundSource = null
        this.audioContext = null
    }
    async load() {
        const response = await fetch(this.file);
        this.arrayBuffer = await response.arrayBuffer();
    }
    async decode(audioContext) {
        this.audioContext = audioContext
        this.soundBuffer = await this.audioContext.decodeAudioData(this.arrayBuffer.slice(0));
    }
    connect() {
        if (this.soundBuffer == null) {
            return { start: () => console.log("fake start") }
        }
        const soundSource = this.audioContext.createBufferSource();
        soundSource.buffer = this.soundBuffer;
        soundSource.connect(this.audioContext.destination);
        soundSource.onended = () => {
            soundSource.disconnect();
        };
        return soundSource
    }
    play() {
        if (this.soundSource == null) {
            this.connect().start()
        } else {
            this.soundSource.start()
        }
    }
    stop() {
        if (this.soundSource != null) {
            this.soundSource.stop()
        }
    }
}

export class Timer {
    constructor(totalTime, svgId, onTimerReady, onTimerExpiredCallback, onTimerClosedCallback) {
        try {
            this.svg = document.getElementById(svgId);
            this.innerCircle1 = this.svg.querySelector('#innerCircle1');
            this.innerCircle2 = this.svg.querySelector('#innerCircle2');
            this.radius1 = this.innerCircle1.getAttribute('r');
            this.radius2 = this.innerCircle2.getAttribute('r');
            this.circonf1 = this.radius1 * 2 * Math.PI;
            this.circonf2 = this.radius2 * 2 * Math.PI;
            this.radius = this.svg.width / 4;
            this.centerX = this.svg.width / 2;
            this.centerY = this.svg.height / 2;
            this.timerId = null;
            this.audioContext = null;
            this.ticking = new Sound('/assets/audio/ticking.mp3');
            this.coin = new Sound('/assets/audio/coin.mp3');
            this.laughs = new Sound('/assets/audio/laughs-lower.mp3');
            this.tada = new Sound('/assets/audio/tada.mp3');
            this.fail = new Sound('/assets/audio/fail.mp3');
            this.completed_with_errors = new Sound('/assets/audio/completed_with_errors.mp3')
            this.boo = new Sound('/assets/audio/boo.mp3');
            this.guitar = new Sound('/assets/audio/guitar-riff.mp3');
            this.totalTime = totalTime;
            this.onTimerReady = onTimerReady;
            this.onTimerExpiredCallback = onTimerExpiredCallback;
            this.onTimerClosedCallback = onTimerClosedCallback;
        } catch (error) {
            console.error(error)
        }
    }

    async loadResources() {
        await this.ticking.load()
        await this.coin.load()
        await this.laughs.load()
        await this.tada.load()
        await this.fail.load()
        await this.completed_with_errors.load()
        await this.boo.load()
        await this.guitar.load()
        console.log('Sound sources loaded');
        if (this.onTimerReady) {
            this.onTimerReady()
        }
    }

    initializeAudio() {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.audioContext) {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                } else {
                    console.warn('Audio context is already initialized');
                }
                if (this.ticking) {
                    await this.ticking.decode(this.audioContext)
                    this.ticking.soundSource = this.ticking.connect()
                    this.ticking.soundSource.onended = null
                    // Loop the sound 
                    this.ticking.soundSource.loop = true;
                }
                await this.coin.decode(this.audioContext)
                await this.laughs.decode(this.audioContext)
                await this.tada.decode(this.audioContext)
                await this.fail.decode(this.audioContext)
                await this.completed_with_errors.decode(this.audioContext)
                await this.boo.decode(this.audioContext)
                await this.guitar.decode(this.audioContext)

                console.log('Audio context initialized successfully, sound sources connected');
                resolve(); // Resolve the promise on success

            } catch (error) {
                console.error('Error initializing audio:', error);
                reject(error); // Reject the promise on error
            }
        });
    }

    clearTimer() {
        this.svg.style.display = 'none';
        this.innerCircle2.setAttribute('stroke-width', 0);
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
        }
    }

    updateTimer(timestamp, startTime) {
        const progress = (timestamp - startTime) / 1000;
        const timeRemaining = Math.max(this.totalTime - progress, 0);

        if (timeRemaining > 0) {
            this.drawTimer(timeRemaining);
            this.timerId = requestAnimationFrame((timestamp) => this.updateTimer(timestamp, startTime));
        } else {
            this.ticking.stop();
            if (this.onTimerExpiredCallback) {
                this.onTimerExpiredCallback();
            } else {
                this.stop()
                this.close()
            }
        }
    }

    start() {
        this.svg.style.display = 'block';
        this.ticking.play();
        const startTime = performance.now();
        this.timerId = requestAnimationFrame((timestamp) => this.updateTimer(timestamp, startTime));
        console.log('timer started');
    }
    stop() {
        this.clearTimer()
        cancelAnimationFrame(this.timerId);
        this.timerId = null
        this.ticking.stop();
        console.log('timer stopped');
    }
    close() {
        if (this.audioContext) {
            console.log("closing audioContext...")
            this.audioContext.close().then(() => {
                console.log('Audio context closed and nullified');
                if (this.onTimerClosedCallback) {
                    this.onTimerClosedCallback();
                }
            });
            this.audioContext = null;
        } else {
            if (this.onTimerClosedCallback) {
                this.onTimerClosedCallback();
            }
        }
        console.log('timer closed');
    }
}

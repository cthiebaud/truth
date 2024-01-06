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
        this.soundSource.stop()
    }
}

export class Timer {
    constructor(totalTime, canvasId, onTimerExpiredCallback, onTimerClosedCallback) {
        this.canvas = document.getElementById(canvasId);

        /* 
        this.ctx = this.canvas.getContext('2d');
        this.ctx.translate(0.5, 0.5)
        this.ctx.lineJoin = 'bevel';
        this.ctx.lineWidth = 0.001;
        this.ctx.imageSmoothingEnabled = false;
        */

        const innerCircle1 = document.getElementById('innerCircle1');
        const innerCircle2 = document.getElementById('innerCircle2');
        this.radius1 = innerCircle1.getAttribute('r');
        this.radius2 = innerCircle2.getAttribute('r');
        this.circonf1 = this.radius1 * 2 * Math.PI;
        this.circonf2 = this.radius2 * 2 * Math.PI;


        this.radius = this.canvas.width / 4;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.timerId = null;
        this.audioContext = null;
        this.ticking = new Sound('audio/ticking.mp3');
        this.coin = new Sound('audio/coin.mp3');
        this.laughs = new Sound('audio/laughs.mp3');
        this.tada = new Sound('audio/tada.mp3');
        this.fail = new Sound('audio/fail.mp3');
        this.completed_with_errors = new Sound('audio/completed_with_errors.mp3')
        this.boo = new Sound('audio/boo.mp3');
        this.totalTime = totalTime;
        this.onTimerExpiredCallback = onTimerExpiredCallback;
        this.onTimerClosedCallback = onTimerClosedCallback;
    }

    async loadResources() {
        await this.ticking.load()
        await this.coin.load()
        await this.laughs.load()
        await this.tada.load()
        await this.fail.load()
        await this.completed_with_errors.load()
        await this.boo.load()
        console.log('Sound sources loaded');
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

                console.log('Audio context initialized successfully, sound sources connected');
                resolve(); // Resolve the promise on success

            } catch (error) {
                console.error('Error initializing audio:', error);
                reject(error); // Reject the promise on error
            }
        });
    }

    clearTimer() {
        this.canvas.style.display = 'none';
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    drawTimerCanvas(timeRemaining) {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const angle = ((this.totalTime - timeRemaining) / this.totalTime) * 2 * Math.PI;

            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(23, 63, 53, .5)'
            this.ctx.lineWidth = 52;
            this.ctx.arc(this.centerX, this.centerY, this.radius + 30, -Math.PI / 2 + angle, -Math.PI / 2);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(23, 63, 53, 1)'
            this.ctx.lineWidth = 4;
            this.ctx.arc(this.centerX, this.centerY, this.radius + 16, -Math.PI / 2, -Math.PI / 2 + angle, false);
            this.ctx.stroke();
        }
    }

    drawTimer(timeRemaining) {
        let percentElapsed = ((this.totalTime - timeRemaining) / this.totalTime)
        let angleInRadian = percentElapsed * 2 * Math.PI;

        let hidden1 = percentElapsed * this.circonf1
        let visible1 = this.circonf1 - hidden1

        let visible2 = percentElapsed * this.circonf2
        let hidden2 = this.circonf2 - visible2

        console.log(percentElapsed + '%', angleInRadian, hidden1, visible1, hidden2, visible2)
        innerCircle1.setAttribute('stroke-dasharray', `0 ${hidden1} ${visible1}`);
        if (visible2 - 2 >= 0) {
            innerCircle2.setAttribute('stroke-dasharray', `0 1 ${visible2 - 2} ${hidden2 + 1}`);
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
        this.canvas.style.display = 'block';
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

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
        this.ctx = this.canvas.getContext('2d');
        
        /* 
        this.ctx.translate(0.5, 0.5)
        this.ctx.lineJoin = 'bevel';
        this.ctx.lineWidth = 0.001;
        this.ctx.imageSmoothingEnabled = false;
        */

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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawTimer(timeRemaining) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const angle = ((this.totalTime - timeRemaining) / this.totalTime) * 2 * Math.PI;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.arc(this.centerX, this.centerY, this.radius, -Math.PI / 2 + angle, -Math.PI / 2);
        this.ctx.fillStyle = 'rgba(23, 63, 53, .25)'
        this.ctx.fill();
    }

    updateTimer(timestamp, startTime) {
        const progress = (timestamp - startTime) / 1000;
        const timeRemaining = Math.max(this.totalTime - progress, 0);

        this.drawTimer(timeRemaining);

        if (timeRemaining > 0) {
            this.timerId = requestAnimationFrame((timestamp) => this.updateTimer(timestamp, startTime));
        } else {
            this.ticking.stop();
            if (this.onTimerExpiredCallback) {
                this.onTimerExpiredCallback();
            }
            this.stop()
        }
    }

    start() {
        this.ticking.play();
        const startTime = performance.now();
        this.timerId = requestAnimationFrame((timestamp) => this.updateTimer(timestamp, startTime));
    }

    stop() {
        this.clearTimer()
        cancelAnimationFrame(this.timerId);
        this.timerId = null
        if (this.ticking) {
            this.ticking.stop();
            /* this.ticking = null */
            console.log('Sound source stopped and disconnected /* and nullified */');
        }
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
    }
}

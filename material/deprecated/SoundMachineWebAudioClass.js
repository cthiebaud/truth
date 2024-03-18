class Sound {
    constructor(file, initialVolume = 1, loop = false) {
        this.file = file
        this.arrayBuffer = null
        this.soundBuffer = null
        this.soundSource = null
        this.audioContext = null
        this.gainNode = null
        this._initialVolume = initialVolume
        this._loop = loop
    }
    async load() {
        const response = await fetch(this.file)
        this.arrayBuffer = await response.arrayBuffer()
    }
    async decode(audioContext) {
        this.audioContext = audioContext
        this.soundBuffer = await this.audioContext.decodeAudioData(this.arrayBuffer.slice(0))
        this.gainNode = this.audioContext.createGain()
        this.gainNode.gain.value = this._initialVolume
    }
    connect() {
        const soundSource = this.audioContext.createBufferSource()
        soundSource.buffer = this.soundBuffer
        // Connect the gain node to the destination (e.g., speakers)
        this.gainNode.connect(this.audioContext.destination)
        // Connect the audio source to the gain node
        soundSource.loop = this._loop
        soundSource.connect(this.gainNode)
        soundSource.onended = () => {
            // console.log(`${this.file} sound has ended`, this.audioContext.currentTime)
            if (!this._loop) {
                soundSource.disconnect()
                // console.log(`${this.file} sound has been disconnected`, this.audioContext.currentTime)
            }
        }
        return soundSource
    }
    play() {
        if (this.soundSource == null) {
            this.soundSource = this.connect()
        }
        this.gainNode.gain.value = this._initialVolume
        this.soundSource.start(0)
    }
    fade() {
        this.volume = 0.001
    }
    stop() {
        this.soundSource.stop()
        this.soundSource = null
        /* this.soundSource.disconnect()
        this.soundSource = null */
    }
    get volume() {
        return this.gainNode.gain.value
    }
    set volume(nextVolume) {
        if (nextVolume === 0) {
            nextVolume = 0.001
        }
        let prevVolume = this.volume
        if (nextVolume === prevVolume) {
            return
        }
        const ramp = (prevVolume < nextVolume ? "up": "down")

        // console.log(`ramp ${ramp} ${this.file} sound volume from ${prevVolume} to ${nextVolume}`)
        this.gainNode.gain.exponentialRampToValueAtTime(
            nextVolume,
            this.audioContext.currentTime + (ramp === "up" ? 1 : 6)
        )
    }
}

export class SoundMachine {

    constructor() {
        this.audioContext = null
        this.ticking = new Sound('/assets/audio/ticking.mp3', 0.8, true)
        this.coin = new Sound('/assets/audio/coin.mp3')
        this.laughs = new Sound('/assets/audio/guitar-string-snap2.mp3')
        this.tada = new Sound('/assets/audio/tada.mp3')
        this.fail = new Sound('/assets/audio/fail.mp3')
        this.completed_with_errors = new Sound('/assets/audio/completed_with_errors.mp3')
        this.boo = new Sound('/assets/audio/boo.mp3')
        this.guitar = new Sound('/assets/audio/guitar-riff.mp3')
        this.boredom = new Sound('/assets/audio/boredom.mp3')
        this.underwater = new Sound('/assets/audio/underwater.mp3', 0.001, true)
        this.abort = new Sound('/assets/audio/short-whoosh.mp3')
    }

    loadAndInitializeResources() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.ticking.load()
                await this.coin.load()
                await this.laughs.load()
                await this.tada.load()
                await this.fail.load()
                await this.completed_with_errors.load()
                await this.boo.load()
                await this.guitar.load()
                await this.boredom.load()
                await this.underwater.load()
                await this.abort.load()
                if (!this.audioContext) {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
                } else {
                    console.warn('Audio context is already initialized')
                }
                let resourceCounter = 0
                await this.ticking.decode(this.audioContext), ++resourceCounter
                await this.coin.decode(this.audioContext), ++resourceCounter
                await this.laughs.decode(this.audioContext), ++resourceCounter
                await this.tada.decode(this.audioContext), ++resourceCounter
                await this.fail.decode(this.audioContext), ++resourceCounter
                await this.completed_with_errors.decode(this.audioContext), ++resourceCounter
                await this.boo.decode(this.audioContext), ++resourceCounter
                await this.guitar.decode(this.audioContext), ++resourceCounter
                await this.boredom.decode(this.audioContext), ++resourceCounter
                await this.abort.decode(this.audioContext), ++resourceCounter
                await this.underwater.decode(this.audioContext), ++resourceCounter

                // console.log(`Audio context initialized successfully, ${resourceCounter} sound sources connected`)
                resolve() // Resolve the promise on success

            } catch (error) {
                console.error('Error initializing audio:', error)
                reject(error) // Reject the promise on error
            }
        })
    }

}

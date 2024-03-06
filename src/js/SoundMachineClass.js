import { Howl, Howler } from 'https://cdn.jsdelivr.net/npm/howler@2.2.4/+esm';

export class SoundMachine {

    static newHowl(config) {
        if (!Howler.usingWebAudio) {
            return {
                play: () => { },
                fade: () => { },
                stop: () => { },
                volume: () => { },
            };
        }

        class CustomHowl extends Howl {
            constructor(config) {
                super(config); // Call the superclass constructor
                this._initialVolume = config.volume
            }

            play(sprite_or_id) {
                if (this._initialVolume) {
                    this.volume(this._initialVolume)
                }
                super.play(sprite_or_id);
            }

            fade(volume, to, timespan, id) {
                if (typeof volume === "undefined") {
                    volume = this.volume();
                }
                if (typeof timespan === "undefined") {
                    timespan = 1000
                }
                super.fade(volume, to, timespan, id);
            }
        }

        return new CustomHowl(config);
    }

    constructor() {
        this.ticking = SoundMachine.newHowl({ src: ['/assets/audio/ticking.mp3'], loop: true, volume: 0.5 });
        this.underwater = SoundMachine.newHowl({ src: ['/assets/audio/underwater.mp3'], loop: true, volume: 0.001 });
        this.coin = SoundMachine.newHowl({ src: ['/assets/audio/coin.mp3'] });
        this.laughs = SoundMachine.newHowl({ src: ['/assets/audio/guitar-string-snap.mp3'], loop: false, volume: 0.2 });
        this.tada = SoundMachine.newHowl({ src: ['/assets/audio/tada.mp3'] });
        this.fail = SoundMachine.newHowl({ src: ['/assets/audio/fail.mp3'] });
        this.completed_with_errors = SoundMachine.newHowl({ src: ['/assets/audio/completed_with_errors.mp3'] });
        this.boo = SoundMachine.newHowl({ src: ['/assets/audio/boo.mp3'] });
        this.guitar = SoundMachine.newHowl({ src: ['/assets/audio/guitar-riff.mp3'] });
        this.boredom = SoundMachine.newHowl({ src: ['/assets/audio/boredom.mp3'] });
        this.abort = SoundMachine.newHowl({ src: ['/assets/audio/short-whoosh.mp3'] });
        this.riser = SoundMachine.newHowl({ src: ['/assets/audio/scary-riser.mp3'], loop: false, volume: 0.2 });
        this.warrior = SoundMachine.newHowl({ src: ['/assets/audio/warrior.mp3'], loop: false, volume: 1 });
    }

}

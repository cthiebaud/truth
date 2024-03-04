import { Howl, Howler } from 'https://cdn.jsdelivr.net/npm/howler@2.2.4/+esm';

export class SoundMachine {

    static newHowl(config) {
        if (!Howler.usingWebAudio) {
            return {
                play: () => { },
                fade2: () => { },
                stop: () => { },
            };
        }

        const howl = new Howl(config);

        howl.fade2 = (to) => {
            let volume = howl.volume();
            howl.fade(volume, to, 1000);
        };

        return howl;
    }

    constructor() {
        this.ticking = SoundMachine.newHowl({ src: ['/assets/audio/ticking.mp3'], loop: true, volume: 0.67 });
        this.underwater = SoundMachine.newHowl({ src: ['/assets/audio/underwater.mp3'], loop: true, volume: 0.01 });
        this.coin = SoundMachine.newHowl({ src: ['/assets/audio/coin.mp3'] });
        this.laughs = SoundMachine.newHowl({ src: ['/assets/audio/guitar-string-snap2.mp3'] });
        this.tada = SoundMachine.newHowl({ src: ['/assets/audio/tada.mp3'] });
        this.fail = SoundMachine.newHowl({ src: ['/assets/audio/fail.mp3'] });
        this.completed_with_errors = SoundMachine.newHowl({ src: ['/assets/audio/completed_with_errors.mp3'] });
        this.boo = SoundMachine.newHowl({ src: ['/assets/audio/boo.mp3'] });
        this.guitar = SoundMachine.newHowl({ src: ['/assets/audio/guitar-riff.mp3'] });
        this.boredom = SoundMachine.newHowl({ src: ['/assets/audio/boredom.mp3'] });
        this.abort = SoundMachine.newHowl({ src: ['/assets/audio/short-whoosh.mp3'] });
    }

}

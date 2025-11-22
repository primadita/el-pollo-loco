export class MyAudio{
    // #region ATTRIBUTES
    sound;
    loaded = false;
    playPromise = null;
    
    // #endregion

    constructor(_sound){
        this.sound = new Audio(_sound);
        this.sound.preload = 'auto';
        this.sound.addEventListener('canplaythrough', () => {
            this.loaded = true;
        });
        this.sound.load();
    }
}

export class AudioHub{
    // #region ATTRIBUTES
    static VOLUME = 0; // default
    // playPromise = null;
    static BLOCKING = false;
    // Character sound
    static PEPE_DAMAGE = new MyAudio('./assets/sounds/character/characterDamage.mp3');
    static PEPE_DEAD = new MyAudio('./assets/sounds/character/characterDead.wav');
    static PEPE_JUMP = new MyAudio('./assets/sounds/character/characterJump.wav');
    static PEPE_RUN = new MyAudio('./assets/sounds/character/characterRun.mp3');
    static PEPE_SNORE = new MyAudio('./assets/sounds/character/characterSnoring.mp3');
    
    // Enemy's sound
    static CHICKEN_WALK = new MyAudio('./assets/sounds/chicken/chicken_walk.mp3');
    static CHICKEN_DEAD = new MyAudio('./assets/sounds/chicken/chickenDead.mp3');
    static HEN_WALK = new MyAudio('./assets/sounds/chicken/hen_walk.mp3');
    static HEN_DEAD = new MyAudio('./assets/sounds/chicken/chickenDead2.mp3');
    static ENDBOSS_APPROACH = new MyAudio('./assets/sounds/endboss/endbossApproach.wav');

    //  Collectibles's sound
    static COIN_COLLECTED = new MyAudio('./assets/sounds/collectibles/collectSound.wav');
    static BOTTLE_COLLECTED = new MyAudio('./assets/sounds/collectibles/bottleCollectSound.wav');
    static BOTTLE_BROKEN = new MyAudio('./assets/sounds/throwable/bottleBreak.mp3');
    
    // Background sound
    static GAME_START = new MyAudio('./assets/sounds/game/gameStart.mp3');
    static GAME_OVER = new MyAudio('./assets/sounds/game/you_lost.mp3');
    static WIN_GAME = new MyAudio('./assets/sounds/game/you_win.mp3');
    static THEME_SOUND = new MyAudio('./assets/sounds/game/tex-mex-delight-mexican-mariachi-113044.mp3');
    // All sounds
    static ALL_SOUNDS = [
        AudioHub.PEPE_DAMAGE,
        AudioHub.PEPE_DEAD,
        AudioHub.PEPE_JUMP,
        AudioHub.PEPE_RUN,
        AudioHub.PEPE_SNORE,
        AudioHub.CHICKEN_WALK,
        AudioHub.CHICKEN_DEAD,
        AudioHub.HEN_WALK,
        AudioHub.HEN_DEAD,
        AudioHub.ENDBOSS_APPROACH,
        AudioHub.COIN_COLLECTED,
        AudioHub.BOTTLE_COLLECTED,
        AudioHub.BOTTLE_BROKEN,
        AudioHub.GAME_START, 
        AudioHub.GAME_OVER,
        AudioHub.WIN_GAME,
        AudioHub.THEME_SOUND
    ];
    // #endregion

    // #region METHOD
    static playOne({_soundName, _loop = false}={}){
        const audio = _soundName.sound;
        // let playPromise = audio.play();
        if(!_soundName.loaded || AudioHub.BLOCKING || !audio.paused){
            return;
        }
        // if(audio.readyState === 4 || _soundName.loaded){
        if(audio.paused){
            _soundName.loaded = true;
            audio.volume = AudioHub.VOLUME;
            audio.currentTime = 0;
            audio.loop = !!_loop;

            if(_soundName.playPromise) return;

            _soundName.playPromise = audio.play();
            // audio.play();
            if(_soundName.playPromise !== undefined){
                _soundName.playPromise
                    .catch(err => {
                        if(err.name !== "AbortError")
                            console.error(err);
                    })
                    .finally(() => {
                        _soundName.playPromise = null;
                    })
            }
        }
            

            // if (audio.play() !== undefined){
            //     audio.play().catch(err => {
            //         if(err.name !== 'AbortError'){
            //             console.error(err);
            //         }
            //     })
            // }
        // }
    }

    static stopOne(soundName){
        if(soundName.playPromise){
            soundName.playPromise = null;
        }
        soundName.sound.pause();
        soundName.sound.currentTime = 0;
    };
        
    static stopAll(){
        AudioHub.BLOCKING = true;
        AudioHub.ALL_SOUNDS.forEach(soundName => {
            soundName.sound.pause();
            soundName.sound.currentTime = 0;
            soundName.playPromise = null;
        });
        // AudioHub.ALL_SOUNDS.playing = [];
        setTimeout(() => {AudioHub.BLOCKING = false}, 50);
    }

    
    // #endregion
}
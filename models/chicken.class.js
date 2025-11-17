import { AudioHub } from "../js/audio-hub.class.js";
import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject{
    // #region ATTRIBUTES
    static ALIVECOUNTER = 0;
    offset = {
        top: 5,
        left: 6,
        bottom: 8,
        right: 5
    }
    deathSoundPlayed = false;
    isWalking = false;
    // #endregion

    constructor(){
        super({_img: ImageManager.CHICKEN.walk[0], _x: 300, _y: 375, _width: 50, _height: 50, _xSpeed : 0.2 + Math.random() * 0.25});
        this.loadImage(ImageManager.CHICKEN.walk[0]);
        this.loadImages(ImageManager.CHICKEN.dead);
        this.loadImages(ImageManager.CHICKEN.walk);
        this.randomizedStartPosition();
        Chicken.ALIVECOUNTER++;
        IntervalHub.startInterval(this.animate, 1000 / 9);
        IntervalHub.startInterval(this.moveLeft, 1000 / 10);
    }

    // #region METHODS
    animate = () => {
        if (this.dead){
            this.playAnimation(ImageManager.CHICKEN.dead);
            this.isWalking = false;
            
            if(!this.deathSoundPlayed){
                AudioHub.playOne({_soundName: AudioHub.CHICKEN_DEAD});
                this.deathSoundPlayed = true;
                Chicken.ALIVECOUNTER--;
            }
        } else {
            this.playAnimation(ImageManager.CHICKEN.walk);
            this.isWalking = true;
            if(Chicken.ALIVECOUNTER > 0 && this.isWalking){
                AudioHub.playOne({_soundName: AudioHub.CHICKEN_WALK});
            }
        }  
    }
    // #endregion
}
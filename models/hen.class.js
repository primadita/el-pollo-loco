import { AudioHub } from "../js/audio-hub.class.js";
import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a hen enemy in the game.
 * @extends MovableObject
 */
export class Hen extends MovableObject {
    // #region ATTRIBUTES
    static ALIVECOUNTER = 0;
    offset = {
        top: 5,
        left: 5,
        bottom: 15,
        right: 5
    }
    deathSoundPlayed = false;
    isWalking = false;
    // #endregion

    /**
     * Creates a new Hen.
     */
    constructor(){
        super({_img: ImageManager.HEN.walk[0], _x: 200, _y:350, _width: 80, _height: 80, _xSpeed: 0.5 + Math.random() * 0.25});
        this.loadImage(ImageManager.HEN.walk[0]);
        this.loadImages(ImageManager.HEN.walk);
        this.loadImages(ImageManager.HEN.dead);
        this.randomizedStartPosition();
        Hen.ALIVECOUNTER++;
        IntervalHub.startInterval(this.animate, 1000 / 5);
        IntervalHub.startInterval(this.moveLeft, 1000 / 10);
    }

    // #region METHODS
    /**
     * Handles hen animation and sound based on state.
     */
    animate = () => {
        if (this.dead){
            this.playAnimation(ImageManager.HEN.dead);
            this.isWalking = false;
            
            if(!this.deathSoundPlayed){
                AudioHub.playOne({_soundName: AudioHub.HEN_DEAD});
                this.deathSoundPlayed = true;
                Hen.ALIVECOUNTER--;
            } 
        } else {
            this.playAnimation(ImageManager.HEN.walk);
            this.isWalking = true;
            if(Hen.ALIVECOUNTER > 0 && this.isWalking){
                AudioHub.playOne({_soundName: AudioHub.HEN_WALK});
            }
        }
    }
    // #endregion
}
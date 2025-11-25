import { AudioHub } from "../js/audio-hub.class.js";
import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a walking chicken enemy in the game world.
 * Chickens move automatically to the left, play walking sounds while alive,
 * and switch to a death animation when hit. A global counter tracks how many
 * chickens are still alive.
 *
 * @extends MovableObject
 */
export class Chicken extends MovableObject{
    // #region ATTRIBUTES
    /**
     * Tracks the number of chicken enemies currently alive in the world.
     * Decreased when a chicken dies.
     * @type {number}
     */
    static ALIVECOUNTER = 0;

    /**
     * Hitbox offset values used to fine-tune collision detection.
     * @type {{ top: number, left: number, bottom: number, right: number }}
     */
    offset = {
        top: 5,
        left: 6,
        bottom: 8,
        right: 5
    }
    
    /**
     * Ensures the death sound is only played once.
     * @type {boolean}
     */
    deathSoundPlayed = false;

    /**
     * Indicates whether the chicken is currently playing its walking animation.
     * Used to determine when walking sounds should be played.
     * @type {boolean}
     */
    isWalking = false;
    // #endregion

    /**
     * Creates a new chicken enemy with randomized horizontal speed
     * and a randomly generated starting position. Initializes sprite
     * images and animation/movement intervals.
     */
    constructor(){
        super({_img: ImageManager.CHICKEN.walk[0], _x: 300, _y: 375, _width: 50, _height: 50, _xSpeed : 0.2 + Math.random() * 0.25});
        // Load sprites
        this.loadImage(ImageManager.CHICKEN.walk[0]);
        this.loadImages(ImageManager.CHICKEN.dead);
        this.loadImages(ImageManager.CHICKEN.walk);
        // Randomize spawn position
        this.randomizedStartPosition();
        // Increase global alive counter
        Chicken.ALIVECOUNTER++;
        // Begin automated animation and movement
        IntervalHub.startInterval(this.animate, 1000 / 9);
        IntervalHub.startInterval(this.moveLeft, 1000 / 10);
    }

    // #region METHODS
    /**
     * Handles chicken animation and sound effects depending on whether
     * it is alive or dead.
     *
     * - When dead: plays death animation and death sound once, and decreases ALIVECOUNTER.
     * - When alive: plays walking animation and triggers walking sound
     *   (only if at least one chicken is alive).
     *
     * Called continuously via IntervalHub.
     */
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
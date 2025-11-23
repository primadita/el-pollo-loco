import { AudioHub } from "../js/audio-hub.class.js";
import { ImageManager } from "../js/image-manager.class.js";
import { Character } from "./character.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents the endboss enemy in the game.
 * @extends MovableObject
 */
export class Endboss extends MovableObject{
    // #region ATTRIBUTES
    offset = {
        top: 100,
        left: 80,
        bottom: 80,
        right: 55
    }
    hurt = false;
    attacking = false;
    deathSoundPlayed = false;
    // #endregion

    /**
     * Creates a new Endboss.
     */
    constructor(){
        super({_img: ImageManager.HENBOSS.angry[0], _x: 2300, _y: 60, _width: 400, _height: 400, _xSpeed : 3});
        this.loadImage(ImageManager.HENBOSS.angry[0]);
        this.loadImages(ImageManager.HENBOSS.angry);
        this.loadImages(ImageManager.HENBOSS.hurt);
        this.loadImages(ImageManager.HENBOSS.dead);
        this.loadImages(ImageManager.HENBOSS.walk);
        IntervalHub.startInterval(this.animate, 1000 / 9);
        IntervalHub.startInterval(this.action, 1000 / 60);
        IntervalHub.startInterval(this.soundEffect, 1000 / 12);
    }

    // #region METHODS
    /**
     * Handles endboss animation based on state.
     */
    animate = () => {
        if (this.isDying()){
            this.playAnimation(ImageManager.HENBOSS.dead);
            if(this.currentImage > ImageManager.HENBOSS.dead.length){
                this.world.finishDeathAnimation("won");
            }

        } else if (this.hurt){
            console.log('animate hurt', this.xSpeed);
            this.playAnimation(ImageManager.HENBOSS.hurt);
            // setTimeout(() => {
            //     this.playAnimation(ImageManager.HENBOSS.walk)
            // }, 1000);
        } else if (this.attacking){
            console.log('animate walk', this.xSpeed);
            this.playAnimation(ImageManager.HENBOSS.walk);
            // setTimeout(() => {
            //     this.attacking = false;
            // }, 1500);
        } else {
            console.log('animate angry', this.xSpeed);
            this.playAnimation(ImageManager.HENBOSS.angry);
        }
    }

    /**
     * Handles endboss actions (movement) based on state.
     */
    action = () => {
        if (this.hurt){
            if(this.attackingTimeout) return;
            this.attackingTimeout = setTimeout(() => {
                this.attacking = true;
                const attackDuration = 1000; // in milliseconds

                setTimeout(() => {
                    this.attacking = false;
                    this.attackingTimeout = null;
                }, attackDuration);
            }, 300);
        }
        if(this.attacking){
            this.moveLeft();
        }// this.attacking = false;
    }

    soundEffect = () => {
        if (this.hurt){
            AudioHub.playOne({_soundName: AudioHub.ENDBOSS_APPROACH});
        }
    }
    // #endregion
}
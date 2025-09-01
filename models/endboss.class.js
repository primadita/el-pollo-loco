import { ImageManager } from "../js/image-manager.class.js";
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
        left: 70,
        bottom: 80,
        right: 55
    }
    hurt = false;

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
    }

    // #region METHODS
    /**
     * Handles endboss animation based on state.
     */
    animate = () => {
        if (this.isDead()){
            this.playAnimation(ImageManager.HENBOSS.dead);
        } else if (this.isHurt(1)){
            this.playAnimation(ImageManager.HENBOSS.hurt);
        } else if (this.isAngry(1)){
            this.playAnimation(ImageManager.HENBOSS.walk);
        } else {
            this.playAnimation(ImageManager.HENBOSS.angry);
        }
    }

    /**
     * Handles endboss actions (movement) based on state.
     */
    action = () => {
        if (this.isAngry(1)){
            this.moveLeft();
        }
    }
    // #endregion
}
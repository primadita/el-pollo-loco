import { AudioHub } from "../js/audio-hub.class.js";
import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a throwable object (e.g., bottle) in the game.
 * @extends MovableObject
 */
export class ThrowableObject extends MovableObject{
    // #region ATTRIBUTES
    ySpeed = 30;
    thrown = false;
    hit = false;
    fly = false;
    // #endregion

    /**
     * Creates a new ThrowableObject.
     * @param {Object} [params] - Object parameters.
     * @param {number} [params._x] - X position.
     * @param {number} [params._y] - Y position.
     */
    constructor({_x, _y} = {}){
        super({_img:ImageManager.BOTTLE.rotation[0], _x, _y, _width: 70, _height: 70, _xSpeed: 10});
        this.loadImage(ImageManager.BOTTLE.rotation[0]);
        this.loadImages(ImageManager.BOTTLE.rotation);
        this.loadImages(ImageManager.BOTTLE.splash);
        this.throw();
        IntervalHub.startInterval(this.animate, 1000 / 60);
    }

    // #region METHODS
    /**
     * Throws the object and starts its movement.
     */
    throw(){
        this.thrown = true;
        this.ySpeed = 30;
        IntervalHub.startInterval(this.updatePosition, 1000 / 40);
    }

    /**
     * Updates the position of the throwable object.
     */
    updatePosition = () => {
        this.x += 15;
        this.applyGravity();
    }

    /**
     * Always returns true for throwable objects (they are always above ground).
     * @returns {boolean}
     */
    isAboveGround(){
        return true;
    }

    /**
     * Handles animation for the throwable object.
     */
    animate = () => {
        if(this.hit){
            this.playAnimation(ImageManager.BOTTLE.splash);
        } else {
            this.playAnimation(ImageManager.BOTTLE.rotation);
        } 
    }
    // #endregion
}
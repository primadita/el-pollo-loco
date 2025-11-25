import { ImageManager } from "../js/image-manager.class.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents a collectible bottle item in the game world.
 * Bottles can spawn at randomized positions and feature two different
 * ground sprites. They can be collected by the player and rendered
 * using inherited drawable object functionality.
 *
 * @extends DrawableObject
 */
export class Bottle extends DrawableObject{
    // #region ATTRIBUTES
    /**
     * Global X-position for bottle placement.
     * Used as the spawning location until modified by {@link Bottle.randomizedPosition}.
     * @type {number}
     */
    static X = 500;
    /**
     * Collision offset values used for hitbox fine-tuning.
     * @type {{ top: number, left: number, bottom: number, right: number }}
     */
    offset = {
        top: 10,
        left: 30,
        bottom: 10,
        right: 20
    }
    /**
     * Indicates whether the bottle has been collected by the player.
     * @type {boolean}
     */
    collected = false;
    // #endregion

    /**
     * Creates a new Bottle instance with a randomized sprite and position.
     * Initializes image loading for animation frames.
     */
    constructor(){
        super({_img: ImageManager.BOTTLE.onGround[Bottle.randomizedBottle()], _x: Bottle.X, _y: 350, _width: 70, _height: 70});
        this.loadImage(ImageManager.BOTTLE.onGround[Bottle.randomizedBottle()]);
        this.loadImages(ImageManager.BOTTLE.onGround);
        Bottle.randomizedPosition(400, 1500);
    }

    // #region METHODS
    /**
     * Returns a random index (0 or 1) to select one of two
     * available ground bottle sprites.
     *
     * @returns {number} A random integer: 0 or 1.
     */
    static randomizedBottle(){
        return Math.round(Math.random());
    }
    /**
     * Generates a random X-position within the given range and assigns it
     * to {@link Bottle.X}.
     *
     * @param {number} min - The minimum X-coordinate.
     * @param {number} max - The maximum X-coordinate.
     * @returns {number} The newly assigned randomized X-position.
     */
    static randomizedPosition(min, max){ 
        return Bottle.X = Math.random() * (max - min) + min;
    }
    // #endregion
}
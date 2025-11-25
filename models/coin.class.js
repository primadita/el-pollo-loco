import { ImageManager } from "../js/image-manager.class.js";
import { DrawableObject } from "./drawable-object.class.js";
import { Level } from "./level.class.js";

/**
 * Represents a collectible coin in the game world.
 * Coins can spawn at randomized positions and can be collected
 * by the player. They inherit rendering and positioning
 * functionality from {@link DrawableObject}.
 */
export class Coin extends DrawableObject{
    // #region ATTRIBUTES
    static X = 400;
    static Y = 100;
    offset = {
        top: 45,
        left: 45,
        bottom: 45,
        right: 45
    }
    collected = false;
    // #endregion
    /**
     * Creates a new Coin instance at a randomized X and Y position.
     * Initializes the coin's sprite image and collision offset.
     */
    constructor(){
        super({_img: ImageManager.COIN[0], _x: Coin.X, _y: Coin.Y, _width: 140, _height: 140});
        Coin.randomizedXPosition(400, 1500);
        Coin.randomizedYPosition(80, 200);
        this.loadImage(ImageManager.COIN[0]);
    }

    // #region METHODS
    /**
     * Randomizes the coin's global X-position within a given range.
     *
     * @param {number} min - Minimum X-coordinate.
     * @param {number} max - Maximum X-coordinate.
     * @returns {number} The newly assigned randomized X-position.
     */
    static randomizedXPosition(min, max){ 
        return Coin.X = Math.random() * (max - min) + min;
    }

    /**
     * Randomizes the coin's global Y-position within a given range.
     *
     * @param {number} min - Minimum Y-coordinate.
     * @param {number} max - Maximum Y-coordinate.
     * @returns {number} The newly assigned randomized Y-position.
     */
    static randomizedYPosition(min, max){ 
        return Coin.Y = Math.random() * (max - min) + min;
    }
    // #endregion
}
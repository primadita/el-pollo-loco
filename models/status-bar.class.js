import { ImageManager } from "../js/image-manager.class.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents a status bar UI element, such as health or coin bars.
 * Inherits rendering functionality from {@link DrawableObject}.
 * The bar's visual state is determined by the current `percentage`.
 *
 * @extends DrawableObject
 */
export class StatusBar extends DrawableObject{
    // #region ATTRIBUTES
    /**
     * Current percentage value of the status bar (0–100).
     * Determines which sprite image is displayed.
     * @type {number}
     */
    percentage = 100;

    /**
     * Array of image paths representing different states of the status bar.
     * Used to display the appropriate image for the current percentage.
     * @type {string[]}
     */
    imgArray;
    // #endregion

    /**
     * Creates a new StatusBar instance at a given vertical position
     * and initializes it with a sprite array.
     *
     * @param {Object} options - Configuration object.
     * @param {number} options._y - Vertical position of the bar.
     * @param {string[]} options._imgArray - Array of images representing the bar's states.
     */
    constructor({_y, _imgArray} = {}){
        super({_img: ImageManager.STATUSBAR.healthBar[0], _x: 20, _y, _width: 180, _height: 50});
        this.loadImage(ImageManager.STATUSBAR.healthBar[0]);
        this.imgArray = _imgArray;
        this.loadImages(_imgArray);
        this.setPercentage(100);
    }

    // #region METHODS
    /**
     * Sets the current percentage of the status bar and updates
     * the displayed image accordingly.
     *
     * @param {number} percent - New percentage value (0–100).
     */
    setPercentage(percent){
        this.percentage = percent;
        let path = this.imgArray[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image in `imgArray` to use
     * based on the current percentage.
     *
     * Mapping:
     * - 0% → index 0
     * - 1–20% → index 1
     * - 21–40% → index 2
     * - 41–60% → index 3
     * - 61–80% → index 4
     * - 81–100% → index 5
     *
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex(){
        if(this.percentage == 0){
            return 0;
        } else if (this.percentage <= 20){
            return 1;
        } else if (this.percentage <= 40){
            return 2;
        } else if (this.percentage <= 60){
            return 3;
        } else if (this.percentage <= 80){
            return 4;
        } else {
            return 5;
        }
    }
    // #endregion
}
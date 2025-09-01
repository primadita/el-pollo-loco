import { IntervalHub } from "./interval-hub.class.js";

/**
 * Represents a drawable object on the canvas.
 */
export class DrawableObject{
    // #region ATTRIBUTES
    img;
    imageCache = [];
    currentImage = 0;
    x;
    y;
    width;
    height;

    offset = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
    realX;
    realY;
    realWidth;
    realHeight;
    // #endregion

    /**
     * Creates a new DrawableObject.
     * @param {Object} [params] - Object parameters.
     * @param {HTMLImageElement|string} [params._img] - Image or image path.
     * @param {number} [params._x] - X position.
     * @param {number} [params._y] - Y position.
     * @param {number} [params._width] - Width.
     * @param {number} [params._height] - Height.
     */
    constructor({_img, _x, _y, _width, _height} = {}){
        this.img = _img;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    // #region METHODS
    /**
     * Loads a single image.
     * @param {string} path - Path to the image.
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into the cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr){
        arr.forEach((path) => {
            let images = new Image();
            images.src = path;
            this.imageCache[path] = images;
        });
    }

    /**
     * Checks collision with another object.
     * @param {DrawableObject} mo - Another drawable object, mostly movable objects.
     * @returns {boolean} True if colliding.
     */
    isColliding(mo){
        return this.realX + this.realWidth > mo.realX &&
            this.realY + this.realHeight > mo.realY &&
            this.realX < mo.realX + mo.realWidth &&
            this.realY < mo.realY + mo.realHeight;
    }

    /**
     * Updates real frame values based on offset.
     */
    getRealFrame = () => {
        this.realX = this.x + this.offset.left;
        this.realY = this.y + this.offset.top;
        this.realWidth = this.width - this.offset.left - this.offset.right;
        this.realHeight = this.height - this.offset.top - this.offset.bottom;
    }
    // #endregion
}
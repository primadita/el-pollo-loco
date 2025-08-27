import { IntervalHub } from "./interval-hub.class.js";

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

    constructor({_img, _x, _y, _width, _height} = {}){
        this.img = _img;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    // #region METHODS
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let images = new Image();
            images.src = path;
            this.imageCache[path] = images;
        });
    }

    isColliding(mo){
        return this.realX + this.realWidth > mo.realX &&
            this.realY + this.realHeight > mo.realY &&
            this.realX < mo.realX + mo.realWidth &&
            this.realY < mo.realY + mo.realHeight;
    }

    getRealFrame = () => {
        this.realX = this.x + this.offset.left;
        this.realY = this.y + this.offset.top;
        this.realWidth = this.width - this.offset.left - this.offset.right;
        this.realHeight = this.height - this.offset.top - this.offset.bottom;
    }
    // #endregion
} 
import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject{
    // #region ATTRIBUTES
    
    // #endregion

    constructor(){
        super({_img: ImageManager.HENBOSS.angry[0], _x: 2300, _y: 60, _width: 400, _height: 400, _xSpeed : 0.2});
        this.loadImage(ImageManager.HENBOSS.angry[0]);
        this.loadImages(ImageManager.HENBOSS.angry);
        IntervalHub.startInterval(this.animate, 1000 / 9);
    }

    // #region METHODS
    animate = () => {
        this.playAnimation(ImageManager.HENBOSS.angry);
    }
}
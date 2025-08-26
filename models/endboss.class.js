import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject{
    // #region ATTRIBUTES
    offset = {
        top: 100,
        left: 50,
        bottom: 80,
        right: 55
    }

    // #endregion

    constructor(){
        super({_img: ImageManager.HENBOSS.angry[0], _x: 2300, _y: 60, _width: 400, _height: 400, _xSpeed : 0.2});
        this.loadImage(ImageManager.HENBOSS.angry[0]);
        this.loadImages(ImageManager.HENBOSS.angry);
        this.loadImages(ImageManager.HENBOSS.hurt);
        this.loadImages(ImageManager.HENBOSS.dead);
        IntervalHub.startInterval(this.animate, 1000 / 9);
    }

    // #region METHODS
    animate = () => {
        if (this.isDead()){
            this.playAnimation(ImageManager.HENBOSS.dead);
        } else if (this.isHurt()){
            this.playAnimation(ImageManager.HENBOSS.hurt);
        } else {
            this.playAnimation(ImageManager.HENBOSS.angry);
        }
    }
}
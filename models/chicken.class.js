import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject{
    // #region ATTRIBUTES
    offset = {
        top: 5,
        left: 6,
        bottom: 8,
        right: 5
    }
    // #endregion

    constructor(){
        super({_img: ImageManager.CHICKEN.walk[0], _x: 300, _y: 375, _width: 50, _height: 50, _xSpeed : 0.2 + Math.random() * 0.25});
        this.loadImage(ImageManager.CHICKEN.walk[0]);
        this.loadImage(ImageManager.CHICKEN.dead);
        this.loadImages(ImageManager.CHICKEN.walk);
        this.randomizedStartPosition();
        IntervalHub.startInterval(this.animate, 1000 / 9);
        IntervalHub.startInterval(this.moveLeft, 1000 / 10);
    }

    // #region METHODS
    animate = () => {
        if (this.isDead()){
            this.playAnimation(ImageManager.CHICKEN.dead);
        } else {
            this.playAnimation(ImageManager.CHICKEN.walk);
        }  
    }
    // #endregion
}
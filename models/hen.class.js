import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Hen extends MovableObject {
    // #region ATTRIBUTES
    offset = {
        top: 5,
        left: 2,
        bottom: 10,
        right: 2
    }
    // #endregion

    constructor(){
        super({_img: ImageManager.HEN.walk[0], _x: 200, _y:350, _width: 80, _height: 80, _xSpeed: 0.5 + Math.random() * 0.25});
        this.loadImage(ImageManager.HEN.walk[0]);
        this.loadImages(ImageManager.HEN.walk);
        this.randomizedStartPosition();
        this.getRealFrame();
        IntervalHub.startInterval(this.animate, 1000 / 5);
        IntervalHub.startInterval(this.moveLeft, 1000 / 10);
    }

    // #region METHODS
    animate = () => {
        this.playAnimation(ImageManager.HEN.walk);
    }
    // #endregion
}
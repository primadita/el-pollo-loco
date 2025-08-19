import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Hen extends MovableObject {
    // #region ATTRIBUTES

    // #endregion

    constructor(){
        super({_img: ImageManager.HEN.walk[0], _x: 200, _y:350, _width: 80, _height: 80});
        this.loadImage(ImageManager.HEN.walk[0]);
        this.loadImages(ImageManager.HEN.walk);
        this.randomizedStartPosition();
        IntervalHub.startInterval(this.animate, 1000 / 4);
    }

    // #region METHODS
    animate = () => {
        let i = this.currentImage % ImageManager.HEN.walk.length;
        let path = ImageManager.HEN.walk[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    // #endregion
}
import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject{
    // #region ATTRIBUTES
    
    // #endregion

    constructor(){
        super({_img: ImageManager.CHICKEN.walk[0], _x: 300, _y: 375, _width: 50, _height: 50});
        this.loadImage(ImageManager.CHICKEN.walk[0]);
        this.loadImages(ImageManager.CHICKEN.walk);
        this.randomizedStartPosition();
        IntervalHub.startInterval(this.animate, 1000 / 9);
    }

    // #region METHODS
    animate = () => {
        let i = this.currentImage % ImageManager.CHICKEN.walk.length;
        let path = ImageManager.CHICKEN.walk[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    // #endregion
}
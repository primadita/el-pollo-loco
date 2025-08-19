import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject{
    // #region ATTRIBUTES
    
    // #endregion
    
    constructor(){
        super({_img: ImageManager.PEPE.walk[0], _x: 100, _y: 165, _width: 120, _height: 270});
        this.loadImage(ImageManager.PEPE.walk[0]);
        this.loadImages(ImageManager.PEPE.walk);
        IntervalHub.startInterval(this.animate, 1000 / 10);
    }
    
    // #region METHODS
    animate = () => {
        let i = this.currentImage % ImageManager.PEPE.walk.length;
        let path = ImageManager.PEPE.walk[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump(){

    }
    // #endregion

}
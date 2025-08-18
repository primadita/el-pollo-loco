import { ImageManager } from "../js/image-manager.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject{
    // #region ATTRIBUTES
    // #endregion
    
    constructor(){
        super({_img: ImageManager.PEPE.walk[0], _x: 100, _y: 185, _width: 120, _height: 250});
        this.loadImage(ImageManager.PEPE.walk[0]);
    }
    
    // #region METHODS
    jump(){

    }
    // #endregion

}
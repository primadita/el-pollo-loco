import { ImageManager } from "../js/image-manager.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject{
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super({_img: ImageManager.CHICKEN.walk[0], _x: 300, _y: 370, _width: 60, _height: 60});
        this.loadImage(ImageManager.CHICKEN.walk[0]);
    }

    // #region METHODS
    // #endregion
}
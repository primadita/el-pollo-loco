import { ImageManager } from "../js/image-manager.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Hen extends MovableObject {
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super({_img: ImageManager.HEN.walk[0], _x: 200, _y:340, _width: 90, _height: 90});
        this.loadImage(ImageManager.HEN.walk[0]);
        this.randomizedStartPosition();
    }

    // #region METHODS
    
    // #endregion
}
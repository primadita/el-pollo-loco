import { ImageManager } from "../js/image-manager.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject{
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super({_img: ImageManager.BACKGROUND.fullCloud, _x: 30, _y: 30, _width: 2 * 500, _height: 300});
        this.loadImage(ImageManager.BACKGROUND.fullCloud);
        this.randomizedStartPosition();
    }

    // #region METHODS
    // #endregion
}
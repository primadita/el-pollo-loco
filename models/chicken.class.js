import { ImageManager } from "../js/image-manager.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject{
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super();
        this.loadImage(ImageManager.CHICKEN.walk[0]);
    }

    // #region METHODS
    // #endregion
}
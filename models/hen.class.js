import { ImageManager } from "../js/image-manager.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Hen extends MovableObject {
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super();
        this.loadImage(ImageManager.HEN.walk[0]);
    }

    // #region METHODS
    // #endregion
}
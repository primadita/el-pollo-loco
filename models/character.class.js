import { ImageManager } from "../js/image-manager.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject{
    // #region ATTRIBUTES
    // #endregion
    
    constructor(){
        super();
        this.loadImage(ImageManager.PEPE.walk[0]);
    }
    
    // #region METHODS
    jump(){

    }
    // #endregion

}
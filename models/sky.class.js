import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

export class Sky extends Background{
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super({_img: ImageManager.BACKGROUND.air});
    }

    // #region METHODS
    // #endregion
}
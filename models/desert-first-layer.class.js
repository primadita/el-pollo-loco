import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

export class DesertFirstLayer extends Background{
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super({_img: ImageManager.BACKGROUND.fullDesert[2]});
    }

    // #region METHODS
    // #endregion
}
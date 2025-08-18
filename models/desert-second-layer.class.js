import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

export class DesertSecondLayer extends Background{
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super({_img: ImageManager.BACKGROUND.fullDesert[1]});
    }

    // #region METHODS
    // #endregion
}
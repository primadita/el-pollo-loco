import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

export class DesertThirdLayer extends Background{
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super({_img: ImageManager.BACKGROUND.fullDesert[0]});
    }

    // #region METHODS
    // #endregion
}
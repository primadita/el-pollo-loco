import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

export class DesertThirdLayer extends Background{
    // #region ATTRIBUTES
    static XPOS = -2 * canvas.width;
    // #endregion

    constructor(){
        super({_x: DesertThirdLayer.XPOS, _img: ImageManager.BACKGROUND.fullDesert[0]});
        DesertThirdLayer.generateNewXPos(this.width);
    }

    // #region METHODS
    static generateNewXPos(val){
        DesertThirdLayer.XPOS += val;
    }
    // #endregion
}
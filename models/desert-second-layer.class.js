import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

export class DesertSecondLayer extends Background{
    // #region ATTRIBUTES
    static XPOS = -2 * canvas.width;
    // #endregion

    constructor(){
        super({_x: DesertSecondLayer.XPOS, _img: ImageManager.BACKGROUND.fullDesert[1]});
        DesertSecondLayer.generateNewXPos(this.width);
    }

    // #region METHODS
    static generateNewXPos(val){
        DesertSecondLayer.XPOS += val;
    }
    // #endregion
}
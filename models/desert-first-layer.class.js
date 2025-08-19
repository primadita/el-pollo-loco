import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

export class DesertFirstLayer extends Background{
    // #region ATTRIBUTES
    static XPOS = -2 * canvas.width;
    // #endregion

    constructor(){
        super({_x: DesertFirstLayer.XPOS, _img: ImageManager.BACKGROUND.fullDesert[2]});
        DesertFirstLayer.generateNewXPos(this.width);
    }

    // #region METHODS
    static generateNewXPos(val){
        DesertFirstLayer.XPOS += val;
    }
    // #endregion
}
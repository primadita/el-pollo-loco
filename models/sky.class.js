import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

export class Sky extends Background{
    // #region ATTRIBUTES
    static XPOS = -2 * canvas.width;
    // #endregion

    constructor(){
        super({_x: Sky.XPOS, _img: ImageManager.BACKGROUND.air});
        Sky.generateNewXPos(this.width);
    }

    // #region METHODS
    static generateNewXPos(val){
        Sky.XPOS += val;
    }
    // #endregion
}
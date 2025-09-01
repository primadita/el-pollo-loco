import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

/**
 * Represents the third layer of the desert background.
 * @extends Background
 */
export class DesertThirdLayer extends Background{
    // #region ATTRIBUTES
    static XPOS = -2 * canvas.width;
    // #endregion

    /**
     * Creates a new DesertSecondLayer.
     */
    constructor(){
        super({_x: DesertThirdLayer.XPOS, _img: ImageManager.BACKGROUND.fullDesert[0]});
        DesertThirdLayer.generateNewXPos(this.width);
    }

    // #region METHODS
    /**
     * Generates a new X position for the layer.
     * @param {number} val - Value to add to XPOS.
     */
    static generateNewXPos(val){
        DesertThirdLayer.XPOS += val;
    }
    // #endregion
}
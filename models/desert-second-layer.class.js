import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

/**
 * Represents the second layer of the desert background.
 * @extends Background
 */
export class DesertSecondLayer extends Background{
    // #region ATTRIBUTES
    static XPOS = -2 * canvas.width;
    // #endregion

    /**
     * Creates a new DesertSecondLayer.
     */
    constructor(){
        super({_x: DesertSecondLayer.XPOS, _img: ImageManager.BACKGROUND.fullDesert[1]});
        DesertSecondLayer.generateNewXPos(this.width);
    }

    // #region METHODS
    /**
     * Generates a new X position for the layer.
     * @param {number} val - Value to add to XPOS.
     */
    static generateNewXPos(val){
        DesertSecondLayer.XPOS += val;
    }
    // #endregion
}
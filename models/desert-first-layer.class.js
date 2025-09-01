import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

/**
 * Represents the first layer of the desert background.
 * @extends Background
 */
export class DesertFirstLayer extends Background{
    // #region ATTRIBUTES
    static XPOS = -2 * canvas.width;
    // #endregion

    /**
     * Creates a new DesertFirstLayer.
     */
    constructor(){
        super({_x: DesertFirstLayer.XPOS, _img: ImageManager.BACKGROUND.fullDesert[2]});
        DesertFirstLayer.generateNewXPos(this.width);
    }

    // #region METHODS
    /**
     * Generates a new X position for the layer.
     * @param {number} val - Value to add to XPOS.
     */
    static generateNewXPos(val){
        DesertFirstLayer.XPOS += val;
    }
    // #endregion
}
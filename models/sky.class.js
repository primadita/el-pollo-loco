import { ImageManager } from "../js/image-manager.class.js";
import { Background } from "./background.class.js";

/**
 * Represents the sky background layer.
 * @extends Background
 */
export class Sky extends Background{
    // #region ATTRIBUTES
    static XPOS = -2 * canvas.width;
    // #endregion

    /**
     * Creates a new Sky background.
     */
    constructor(){
        super({_x: Sky.XPOS, _img: ImageManager.BACKGROUND.air});
        Sky.generateNewXPos(this.width);
    }

    // #region METHODS
    /**
     * Generates a new X position for the sky layer.
     * @param {number} val - Value to add to XPOS.
     */
    static generateNewXPos(val){
        Sky.XPOS += val;
    }
    // #endregion
}
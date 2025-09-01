import { ImageManager } from "../js/image-manager.class.js";
import { StatusBar } from "./status-bar.class.js";

/**
 * Represents the status bar for the endboss.
 * @extends StatusBar
 */
export class EndBossBar extends StatusBar{
    // #region ATTRIBUTES
    x = 450;
    // #endregion

    /**
     * Creates a new EndBossBar.
     */
    constructor(){
        super({_y: 10, _imgArray: ImageManager.STATUSBAR.endBossBar});
    }
}
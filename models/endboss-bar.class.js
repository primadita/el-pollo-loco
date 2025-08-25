import { ImageManager } from "../js/image-manager.class.js";
import { StatusBar } from "./status-bar.class.js";

export class EndBossBar extends StatusBar{
    // #region ATTRIBUTES
    x = 500;
    // #endregion

    constructor(){
        super({_y: 10, _imgArray: ImageManager.STATUSBAR.endBossBar});
    }

    // #region METHODS
    // #endregion
}
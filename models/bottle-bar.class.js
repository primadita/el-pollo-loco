import { ImageManager } from "../js/image-manager.class.js";
import { StatusBar } from "./status-bar.class.js";

export class BottleBar extends StatusBar{
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super({_y: 90, _imgArray: ImageManager.STATUSBAR.bottleBar});
        this.setPercentage(0);
    }

    // #region METHODS
    // #endregion
}
import { ImageManager } from "../js/image-manager.class.js";
import { StatusBar } from "./status-bar.class.js";

export class HealthBar extends StatusBar{
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super({_y:0, _imgArray:ImageManager.STATUSBAR.healthBar});
        this.setPercentage(100);
    }

    // #region METHODS
    // #endregion
}
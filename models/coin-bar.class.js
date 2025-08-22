import { ImageManager } from "../js/image-manager.class.js";
import { StatusBar } from "./status-bar.class.js";

export class CoinBar extends StatusBar{
    // #region ATTRIBUTES
    // #endregion

    constructor(){
        super({_y: 45, _imgArray: ImageManager.STATUSBAR.coinBar});
    }

    // #region METHODS
    // #endregion
}
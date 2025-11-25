import { ImageManager } from "../js/image-manager.class.js";
import { StatusBar } from "./status-bar.class.js";

/**
 * Represents the coin status bar displayed in the UI.
 * Inherits from {@link StatusBar} and displays the player's
 * collected coins as a percentage of the total.
 *
 * @extends StatusBar
 */
export class CoinBar extends StatusBar{
     /**
     * Creates a new CoinBar instance positioned at a fixed vertical
     * offset and initialized to 0% coins collected.
     */
    constructor(){
        super({_y: 45, _imgArray: ImageManager.STATUSBAR.coinBar});
        this.setPercentage(0);
    }
}
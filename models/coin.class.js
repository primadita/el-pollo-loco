import { ImageManager } from "../js/image-manager.class.js";
import { DrawableObject } from "./drawable-object.class.js";

export class Coin extends DrawableObject{
    // #region ATTRIBUTES
    static X = 400;
    static Y = 100;
    offset = {
        top: 45,
        left: 45,
        bottom: 45,
        right: 45
    }
    collected = false;
    // #endregion

    constructor(){
        super({_img: ImageManager.COIN[0], _x: Coin.X, _y: Coin.Y, _width: 140, _height: 140});
        Coin.randomizedPosition();
        this.loadImage(ImageManager.COIN[0]);
    }

    // #region METHODS
    static randomizedPosition(){ 
        Coin.X += Math.random() * 200 + 200;
        Coin.Y += Math.random() * 50;
    }
    // #endregion
}
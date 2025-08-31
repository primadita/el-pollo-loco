import { ImageManager } from "../js/image-manager.class.js";
import { DrawableObject } from "./drawable-object.class.js";
import { Level } from "./level.class.js";

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
        Coin.randomizedXPosition(400, 1500);
        Coin.randomizedYPosition(80, 200);
        this.loadImage(ImageManager.COIN[0]);
    }

    // #region METHODS
    static randomizedXPosition(min, max){ 
        return Coin.X = Math.random() * (max - min) + min;
    }

    static randomizedYPosition(min, max){ 
        return Coin.Y = Math.random() * (max - min) + min;
    }
    // #endregion
}
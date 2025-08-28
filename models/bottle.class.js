import { ImageManager } from "../js/image-manager.class.js";
import { DrawableObject } from "./drawable-object.class.js";

export class Bottle extends DrawableObject{
    // #region ATTRIBUTES
    static X = 500;
    offset = {
        top: 10,
        left: 30,
        bottom: 10,
        right: 20
    }
    collected = false;
    // #endregion

    constructor(){
        super({_img: ImageManager.BOTTLE.onGround[Bottle.randomizedBottle()], _x: Bottle.X, _y: 350, _width: 70, _height: 70});
        this.loadImage(ImageManager.BOTTLE.onGround[Bottle.randomizedBottle()]);
        this.loadImages(ImageManager.BOTTLE.onGround);
        Bottle.randomizedPosition();
    }

    // #region METHODS
    static randomizedBottle(){
        return Math.round(Math.random());
    }
    
    static randomizedPosition(){ 
        Bottle.X += Math.random() * 200 + 250;
    }
    // #endregion
}
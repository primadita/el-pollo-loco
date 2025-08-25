import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject{
    // #region ATTRIBUTES
    ySpeed = 30;
    thrown = false;
    // #endregion

    constructor({_x, _y} = {}){
        super({_img:ImageManager.BOTTLE.rotation[0], _x, _y, _width: 70, _height: 70, _xSpeed: 10});
        this.loadImage(ImageManager.BOTTLE.rotation[0]);
        this.loadImages(ImageManager.BOTTLE.rotation);
        this.loadImages(ImageManager.BOTTLE.splash);
        this.throw();
        IntervalHub.startInterval(this.animate, 1000 / 12);
    }

    // #region METHODS
    throw(){
        this.thrown = true;
        this.ySpeed = 30;
        IntervalHub.startInterval(this.updatePosition, 1000 / 40);
    }

    updatePosition = () => {
        this.x += 15;
        this.applyGravity();
    }

    isAboveGround(){
        return true;
    }

    animate = () => {
        if(this.thrown){
            this.playAnimation(ImageManager.BOTTLE.rotation);
        }
    }
    // #endregion
}
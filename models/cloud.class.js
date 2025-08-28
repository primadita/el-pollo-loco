import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject{
    constructor(){
        super({_img: ImageManager.BACKGROUND.fullCloud, _x: 30, _y: 30, _width: 2 * 500, _height: 300, _xSpeed: 0.15});
        this.loadImage(ImageManager.BACKGROUND.fullCloud);
        this.randomizedStartPosition();
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
    }
}
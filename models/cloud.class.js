import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a background cloud that moves slowly across the screen.
 * Clouds use parallax movement to add depth to the environment.
 * They continuously move left and respawn with a randomized start position.
 *
 * @extends MovableObject
 */
export class Cloud extends MovableObject{
    /**
     * Creates a new Cloud object with predefined size, speed,
     * and sprite asset. Once created, the cloud begins moving left
     * at a slow, constant speed.
     */
    constructor(){
        super({_img: ImageManager.BACKGROUND.fullCloud, _x: 30, _y: 30, _width: 2 * 500, _height: 300, _xSpeed: 0.15});
        this.loadImage(ImageManager.BACKGROUND.fullCloud);
        this.randomizedStartPosition();
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
    }
}
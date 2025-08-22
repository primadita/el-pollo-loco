import { ImageManager } from "../js/image-manager.class.js";
import { DrawableObject } from "./drawable-object.class.js";

export class StatusBar extends DrawableObject{
    // #region ATTRIBUTES
    percentage = 100;
    imgArray;
    // #endregion

    constructor({_y, _imgArray} = {}){
        super({_img: ImageManager.STATUSBAR.healthBar[0], _x: 20, _y, _width: 180, _height: 50});
        this.loadImage(ImageManager.STATUSBAR.healthBar[0]);
        this.imgArray = _imgArray;
        this.loadImages(_imgArray);
        this.setPercentage(100);
    }

    // #region METHODS
    setPercentage(percent){
        this.percentage = percent;
        let path = this.imgArray[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        } else if (this.percentage > 80){
            return 4;
        } else if (this.percentage > 60){
            return 3;
        } else if (this.percentage > 40){
            return 2;
        } else if (this.percentage > 20){
            return 1;
        } else {
            return 0;
        }
    }
    // #endregion
}
export class DrawableObject{
    // #region ATTRIBUTES
    img;
    imageCache = [];
    currentImage = 0;
    x;
    y;
    width;
    height;
    // #endregion

    constructor({_img, _x, _y, _width, _height} = {}){
        this.img = _img;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
    }

    // #region METHODS
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let images = new Image();
            images.src = path;
            this.imageCache[path] = images;
        });
    }
    // #endregion
} 
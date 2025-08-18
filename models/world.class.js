import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Hen } from "./hen.class.js";

export class World{
    // #region ATTRIBUTES
    ctx;
    character = new Character();
    enemies = [
        new Hen(),
        new Hen(),
        new Hen(),
        new Chicken(),
        new Chicken()
    ];
    // #endregion

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.draw();
    }
    // #region METHODS
    draw(){
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
    }
    // #endregion
}
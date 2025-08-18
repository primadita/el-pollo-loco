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
    canvas;
    // #endregion

    constructor(_canvas){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.draw();
    }
    // #region METHODS
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height)});
        requestAnimationFrame(() => this.draw());
    }
    // #endregion
}
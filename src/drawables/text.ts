import { Color } from "../so/color";
import { Drawable } from "./drawable";

/**
 * Inject text properties
 */
export class Text extends Drawable {

    font!: string;
    text!: string;
    textInfo!: TextMetrics;
    fontColor!: Color;

    constructor() {
        super();
        this.setFont("32px serif");
        this.setText("");
    }

    setText(text: string): this {
        this.text = text;
        this.context.font = this.font;
        this.textInfo = this.context.measureText(this.text);
        return this;
    }

    setFont(font: string): this {
        this.font = font;
        return this;
    }

    draw(): any {
        if(this.text.length > 0) {
            super.draw();
            this.context.font = this.font;
            let x = this.rect.x + this.rect.w/2 - Math.floor(this.textInfo.width / 2);
            let y = this.rect.y + this.rect.h/2 + Math.floor((this.textInfo.actualBoundingBoxAscent + this.textInfo.actualBoundingBoxDescent) / 2);
            this.context.fillText(this.text, x, y);
        }
    }
}
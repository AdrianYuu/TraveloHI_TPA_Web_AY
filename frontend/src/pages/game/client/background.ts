import { GET_BACKGROUND_IMAGE } from "./config";

export class Background {
  x: number;
  y: number;
  sprite: HTMLImageElement;
  ctx: any;
  width: any;
  height: any;

  constructor(ctx: any, width: any, height: any) {
    this.x = 0;
    this.y = 0;
    this.sprite = GET_BACKGROUND_IMAGE();
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  render() {
    this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}

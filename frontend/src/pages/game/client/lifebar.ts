import { GET_LIFEBAR_IMAGE } from "./config";

export class Lifebar {
  x: number;
  y: number;
  sprite: HTMLImageElement;
  ctx: any;
  width: any;

  constructor(ctx: any, width: any) {
    this.x = 25;
    this.y = 20;
    this.sprite = GET_LIFEBAR_IMAGE();
    this.ctx = ctx;
    this.width = width;
  }

  render() {
    this.ctx.drawImage(
      this.sprite,
      this.x,
      this.y,
      (this.width * 95) / 100,
      100
    );
  }
}

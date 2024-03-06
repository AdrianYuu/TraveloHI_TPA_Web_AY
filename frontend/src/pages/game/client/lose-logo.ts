import { GET_LOSE_LOGO_IMAGE } from "./config";

export class LoseLogo {
  x: number;
  y: number;
  sprite: HTMLImageElement;
  ctx: any;

  constructor(ctx: any) {
    this.x = 475;
    this.y = 250;
    this.sprite = GET_LOSE_LOGO_IMAGE();
    this.ctx = ctx;
  }

  render() {
    this.ctx.drawImage(this.sprite, this.x, this.y, 250, 120);
  }
}

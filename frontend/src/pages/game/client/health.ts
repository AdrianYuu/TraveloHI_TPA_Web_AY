export class Health {
  x: number;
  y: number;
  ctx: any;
  health: number;
  name: string;

  constructor(ctx: any, x: number, y: number, health: number, name: string) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.health = health;
    this.name = name;
  }

  render() {
    this.ctx.fillStyle = "blue";
    if (this.name === "Sword Impulse") {
      const remainingHealthWidth = (this.health / 100) * 450;
      this.ctx.fillRect(
        this.x + (450 - remainingHealthWidth),
        this.y,
        remainingHealthWidth,
        25
      );
    } else {
      this.ctx.fillRect(this.x, this.y, this.health * 4.5, 25);
    }
  }
}

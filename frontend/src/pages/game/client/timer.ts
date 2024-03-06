export class Timer {
  x: number;
  y: number;
  ctx: any;
  time: number;

  constructor(ctx: any, time: number) {
    this.x = 0;
    this.y = 0;
    this.ctx = ctx;
    this.time = time;
  }

  render() {
    const formattedTime = String(this.time).padStart(3, "0");
    this.ctx.fillStyle = "white";
    this.ctx.font = "24px Poppins";
    this.ctx.fillText(formattedTime, 576, 80);
    this.ctx.fillStyle = "blue";
  }

  startCountdown() {
    const intervalId = setInterval(() => {
      this.time -= 1;
      if (this.time <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
}

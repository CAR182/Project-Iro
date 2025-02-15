//TODO - Pass direction into Sprite to set default on load
export default class Sprite {
  constructor({ id, position = { x: 0, y: 0 }, img, directions = {}, frames = 1 }) {
    this.ready = false;
    this.position = position;
    this.image = img;
    this.frameCount = frames;
    this.static = Boolean(frames == 1);
    this.image.onload = () => {
      this.width = this.image.width / this.frameCount;
      this.height = this.image.height;
    };
    this.currentFrame = 0;
    this.elapsed = 0;
    this.isMoving = false;
    this.directions = directions;
    this.id = id;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width,
      this.image.height
    );
  }

  animate(ctx, moveSpeed) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(
      this.image,
      this.currentFrame * this.width,
      0,
      this.image.width,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width,
      this.image.height
    );
    this.elapsed++;
    if (!this.isMoving) {
      this.currentFrame = 0;
      return;
    }

    if (this.elapsed % moveSpeed == 0) {
      if (this.currentFrame < this.frameCount - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }
}

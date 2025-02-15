export default class Layer {
  constructor({ position, img }) {
    this.position = position;
    this.image = img;
    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
    };
  }

  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.position.x, //The Offset to focus canvas on
      this.position.y,
      this.image.width,
      this.image.height
    );
  }
}

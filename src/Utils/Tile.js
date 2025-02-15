export default class Tile {
  constructor({ id, type, position, dimensions, onCollision, colour = 'red' }) {
    this.id = id;
    this.type = type;
    this.position = position;
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.colour = colour;
    this.onCollision = onCollision;
  }
  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = this.colour;
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class RandomCoordinate {
  constructor(rangeX, rangeY, offsetX = 0, offsetY = 0) {
    this.x = (Math.random() * rangeX) + offsetX;
    this.y = (Math.random() * rangeY) + offsetY;
  }
}

export default RandomCoordinate;

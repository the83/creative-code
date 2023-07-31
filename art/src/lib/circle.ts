import { randomNumber, randomColor } from './random';

const maxSize = 100;
const minSize = 3;
const lineLength = 50;

type CircleCoords = [number, number, number, number]

export default class Circle {
  x: number;
  y: number;
  x_dir: number = 1;
  y_dir: number = 1;
  size: number;
  color: string;
  canvasSize: number;

  constructor(canvasSize: number) {
    this.canvasSize = canvasSize;
    this._reset()
  }

  private _reset(): void {
    this.x = randomNumber(this.canvasSize);
    this.y = randomNumber(this.canvasSize);
    this.x_dir = 1;
    this.y_dir = 1;
    this.size = randomNumber(maxSize, minSize);
    this.color = randomColor();
  }

  public changeXDir(): void {
    this.x_dir = this.x_dir * -1;
  }

  public changeYDir(): void {
    this.y_dir = this.y_dir * -1;
  }

  public get nextPos(): [number, number] {
    return [
      this.x + this.x_dir,
      this.y + this.y_dir,
    ];
  }

  public get lineCoords(): CircleCoords {
    const offset = Math.floor(0.5 * this.size) - 3;
    return [
      this.x - offset * this.x_dir,
      this.y - offset * this.y_dir,
      this.x + (-1 * this.x_dir * lineLength),
      this.y + (-1 * this.y_dir * lineLength),
    ];
  }

  public get ellipseCoords(): CircleCoords {
    return [
      this.x,
      this.y,
      this.size,
      this.size,
    ];
  }

  private _collision(otherCircle: Circle): boolean {
    if (otherCircle === this) {
      return false;
    }

    const [thisX, thisY] = this.nextPos
    const [dotX, dotY] = otherCircle.nextPos

    return (
      Math.abs(thisX - dotX) < this.size) &&
      (Math.abs(thisY - dotY) < this.size
    );
  }

  private _handleCollision(otherCircle: Circle): void {
    this.size -= 1;
    this.changeXDir();
    this.changeYDir();
    otherCircle.changeXDir();
    otherCircle.changeYDir();
    if (this.size <= minSize) {
      this._reset();
    }
  }

  public move(otherCircles: [Circle]): void {
    otherCircles.forEach((otherCircle) => {
      if (this._collision(otherCircle)) {
        this._handleCollision(otherCircle);
      }
    });

    const [nextX, nextY] = this.nextPos

    if(nextX <= 0 || nextX >= this.canvasSize) {
      this.changeXDir();
    }

    if(nextY <= 0 || nextY >= this.canvasSize) {
      this.changeYDir();
    }

    this.x += this.x_dir;
    this.y += this.y_dir;
  }
}

import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense

interface IProps {
}

function randomNumber(range) {
  return Math.floor(Math.random() * range);
}

function randomColor() {
  const colors = ['black', 'white', 'green'];
  return colors[randomNumber(colors.length)]
}

const canvasSize = 720;
const dotSize = 30;
const maxDotSize = 100;
const numDots = 200;
const minDotSize = 3;
const lineLength = 50;

class Dot {
  x: number;
  y: number;
  x_dir: number = 1;
  y_dir: number = 1;
  dotSize: number;
  color: string;

  constructor() {
    this.reset()
  }

  reset() {
    this.x = randomNumber(canvasSize);
    this.y = randomNumber(canvasSize);
    this.x_dir = 1;
    this.y_dir = 1;
    this.dotSize = randomNumber(maxDotSize);
    this.color = randomColor();
  }

  changeXDir() {
    this.x_dir = this.x_dir * -1;
  }

  changeYDir() {
    this.y_dir = this.y_dir * -1;
  }

  nextPos() {
    return [
      this.x + this.x_dir,
      this.y + this.y_dir,
    ];
  }

  lineCoords() {
    return [
      this.x,
      this.y,
      this.x + (-1 * this.x_dir * lineLength),
      this.y + (-1 * this.y_dir * lineLength),
    ];
  }

  _collision(otherDot) {
    if (otherDot === this) {
      return false;
    }

    const [thisX, thisY] = this.nextPos()
    const [dotX, dotY] = otherDot.nextPos()

    return (
      Math.abs(thisX - dotX) < this.dotSize) &&
      (Math.abs(thisY - dotY) < this.dotSize
    );
  }

  _handleCollision(otherDot) {
    this.dotSize -= 1;
    this.changeXDir();
    this.changeYDir();
    otherDot.changeXDir();
    otherDot.changeYDir();
    if (this.dotSize <= minDotSize) {
      this.reset();
    }
  }

  move(otherDots) {
    otherDots.forEach((otherDot) => {
      if (this._collision(otherDot)) {
        this._handleCollision(otherDot);
      }
    });

    const [nextX, nextY] = this.nextPos()

    if(nextX <= 0 || nextX >= canvasSize) {
      this.changeXDir();
    }

    if(nextY <= 0 || nextY >= canvasSize) {
      this.changeYDir();
    }

    this.x += this.x_dir;
    this.y += this.y_dir;
  }
}

export default function Dots(props: IProps) {
  // let x = 50;
  // const y = 50;

  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasSize, canvasSize).parent(canvasParentRef);
  };

  const dots = [];

  for(let i = 0; i < numDots; i++) {
    dots.push(new Dot());
  }

  const draw = (p5: p5Types) => {
    p5.background(500);

    dots.forEach((dot) => {
      p5.ellipse(dot.x, dot.y, dot.dotSize, dot.dotSize);
      p5.fill(dot.color);
      p5.line(...dot.lineCoords());
    });

    dots.forEach((dot) => {
      dot.move(dots);
    });
  };

  return (
    <Sketch setup={setup} draw={draw} />
  );
};

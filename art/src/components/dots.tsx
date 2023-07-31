import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense
import Circle from '../lib/circle';

interface IProps {
}

const canvasSize = 720;
const numDots = 300;

export default function Dots(props: IProps) {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasSize, canvasSize).parent(canvasParentRef);
  };

  const dots = [];

  for(let i = 0; i < numDots; i++) {
    dots.push(new Circle(canvasSize));
  }

  const draw = (p5: p5Types) => {
    p5.background(500);

    dots.forEach((dot) => {
      p5.ellipse(...dot.ellipseCoords);
      p5.fill(dot.color);
      p5.line(...dot.lineCoords);
    });

    dots.forEach((dot) => {
      dot.move(dots);
    });
  };

  return (
    <Sketch setup={setup} draw={draw} />
  );
};

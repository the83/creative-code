import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense

interface IProps {
}


function HelloWorld(props: IProps) {

  let x = 50;
  const y = 50;

  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 10, 10);
    x++;
  };

  return (
    <Sketch setup={setup} draw={draw} />
  );
};

export default HelloWorld;

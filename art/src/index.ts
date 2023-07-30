// import { myp5 } from './processing';

import * as p5 from 'p5';

export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(600, 600);
    }

    p.draw = () => {
        p.background(220);
        p.ellipse(50,50,80,80);
    }
}

export const myp5 = new p5(sketch, document.body);

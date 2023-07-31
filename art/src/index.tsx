import React from 'react';
import { createRoot } from 'react-dom/client';
import Dots from './components/dots';

interface IProps {
}

function Index(props: IProps) {
  return (
    <div>
      <div>
        <Dots />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Index />);

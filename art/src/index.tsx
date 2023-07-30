import React from 'react';
import { createRoot } from 'react-dom/client';
import HelloWorld from './components/hello_world';

interface IProps {
}

function Index(props: IProps) {
  return (
    <div>
      <div>
        <HelloWorld />
      </div>

      <div>
        <HelloWorld />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Index />);

import React from 'react';
import ReactDOM from 'react-dom';

import Example from './Example';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Example/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render();

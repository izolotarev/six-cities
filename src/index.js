import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  NUMBER_OF_CARDS: 5,
};

ReactDOM.render(
    <App
      numberOfCards = {Setting.NUMBER_OF_CARDS}
    />,
    document.querySelector(`#root`)
);

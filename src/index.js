import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {reviews} from './mocks/reviews';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducer';


const Setting = {
  NUMBER_OF_CARDS: 5,
};

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
      <App
        numberOfCards = {Setting.NUMBER_OF_CARDS}
        offers = {offers}
        reviews = {reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);

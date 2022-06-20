import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {reviews} from './mocks/reviews';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducer';
import {createAPI} from './services/api';
import {ActionCreator} from './store/action';
import {AuthorizationStatus} from "./const/const";
import {checkAuth} from './store/api-actions';
import {redirect} from "./store/middlewares/redirect";


const api = createAPI(
    () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)), applyMiddleware(redirect)));

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App
        reviews = {reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);

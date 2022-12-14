import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/root-reducer';
import {createAPI} from './services/api';
import {AuthorizationStatus} from "./const/const";
import {checkAuth, fetchFavoriteOffers, fetchOffers} from './store/api-actions';
import {redirect} from "./store/middlewares/redirect";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {requireAuthorization} from './store/action';
import {Router as BrowserRouter} from 'react-router-dom';
import browserHistory from "./browser-history";

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

store.dispatch(checkAuth());
store.dispatch(fetchOffers());
store.dispatch(fetchFavoriteOffers());

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <ToastContainer/>
        <App/>
      </BrowserRouter>
    </Provider>
    ,
    document.querySelector(`#root`)
);

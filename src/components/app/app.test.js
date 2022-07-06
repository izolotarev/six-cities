import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus, AppRoute} from '../../const/const';
import App from './app';
import { makeFakeOffer } from '../../utils/mocks';
import { adaptToClient } from '../../utils/utils';

const mockStore = configureStore({});
describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'MainScreen' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      OFFERS: {
        selectedCity: "Paris",
        offers: [],
        isDataLoaded: true,
      },
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/We could not find any property available at the moment in/i)).toBeInTheDocument();
  });

});

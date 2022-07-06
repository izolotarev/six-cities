import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginScreen from './login';
import { AuthorizationStatus } from '../../const/const';

const mockStore = configureStore({});

it(`Render 'LoginScreen' when user navigate to '/login' url`, () => {
  const store = mockStore({USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }});
  const history = createMemoryHistory();
  history.push(`/login`);

  render(
      <redux.Provider store={store}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </redux.Provider>
  );

  expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
  expect(screen.getByText(/Password/i)).toBeInTheDocument();

  userEvent.type(screen.getByTestId(`email`), `keks`);
  userEvent.type(screen.getByTestId(`password`), `123456`);

  expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
});

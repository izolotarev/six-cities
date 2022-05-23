import React from 'react';
import MainScreen from '../main/main';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from '../login/login';
import FavoritesScreen from '../favorites/favorites';
import PropertyScreenNotLogged from '../property-not-logged/property-not-logged';
import Screen404 from '../not-found-screen/not-found-screen';
// import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const/const';

const App = ({numberOfCards}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Root} exact>
          <MainScreen numberOfCards={numberOfCards} />
        </Route>
        <Route path={AppRoute.Login} exact>
          <LoginScreen />
        </Route>
        <Route path={AppRoute.Offer}>
          <PropertyScreenNotLogged />
        </Route>
        <Route>
          <Screen404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  numberOfCards: PropTypes.number.isRequired,
};

export default App;

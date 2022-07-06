import React from 'react';
import MainScreen from '../main/main';
import {Route, Switch} from 'react-router-dom';
import LoginScreen from '../login/login';
import FavoritesScreen from '../favorites/favorites';
import Screen404 from '../not-found-screen/not-found-screen';
import {AppRoute} from '../../const/const';
import PropertyScreen from '../property/property';
import {useSelector} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../browser-history";
import {getDataLoadedStatus, getOffers} from '../../store/reducers/offers/selectors';

const App = () => {
  const offers = useSelector(getOffers);
  const isDataLoaded = useSelector(getDataLoadedStatus);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Switch>
      <Route path={AppRoute.ROOT} exact>
        <MainScreen offers={offers} />
      </Route>
      <Route path={AppRoute.LOGIN} exact>
        <LoginScreen history={browserHistory} />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.FAVORITE}
        render={()=> <FavoritesScreen/>}>
      </PrivateRoute>
      <Route path={`${AppRoute.OFFER}/:id`}>
        <PropertyScreen />
      </Route>
      <Route path={AppRoute.NOT_FOUND}>
        <Screen404 />
      </Route>
      <Route>
        <Screen404 />
      </Route>
    </Switch>
  );
};

export default App;


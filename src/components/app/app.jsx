import React, {useEffect} from 'react';
import MainScreen from '../main/main';
import {Router as BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginScreen from '../login/login';
import FavoritesScreen from '../favorites/favorites';
import Screen404 from '../not-found-screen/not-found-screen';
import {AppRoute} from '../../const/const';
import PropertyScreen from '../property/property';
import FavoritesScreenEmpty from '../favorites-empty/favorites-empty';
import {useDispatch, useSelector} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchOffers} from '../../store/api-actions';
import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../browser-history";
import {getLoadedDataStatus, getOffers} from '../../store/reducers/offers-data/selectors';

const App = () => {
  const offers = useSelector(getOffers);
  const isDataLoaded = useSelector(getLoadedDataStatus);

  const dispatch = useDispatch();

  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchOffers());
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
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
          render={
            favoriteOffers.length > 0
              ? () => <FavoritesScreen favoriteOffers={favoriteOffers}/>
              : () => <FavoritesScreenEmpty/>
          }>
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
    </BrowserRouter>
  );
};

export default App;


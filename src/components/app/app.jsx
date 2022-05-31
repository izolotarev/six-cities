import React from 'react';
import MainScreen from '../main/main';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginScreen from '../login/login';
import FavoritesScreen from '../favorites/favorites';
import PropertyScreenNotLogged from '../property-not-logged/property-not-logged';
import Screen404 from '../not-found-screen/not-found-screen';
// import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const/const';
import PropertyScreen from '../property/property';
import offerProp from '../../types/offer.prop';
import reviewProp from '../../types/review.prop';
import FavoritesScreenEmpty from '../favorites-empty/favorites-empty';

const App = (props) => {
  const {numberOfCards, offers, reviews} = props;
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.ROOT} exact>
          <MainScreen numberOfCards={numberOfCards} offers={offers} />
        </Route>
        <Route path={AppRoute.LOGIN} exact>
          <LoginScreen />
        </Route>
        <Route path={AppRoute.FAVORITE} exact render={
          favoriteOffers.length > 0
            ? () => <FavoritesScreen favoriteOffers={favoriteOffers}/>
            : () => <FavoritesScreenEmpty/>
        }>
        </Route>
        <Route path={AppRoute.OFFER}>
          <PropertyScreen reviews={reviews}/>
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
  offers: PropTypes.arrayOf(offerProp),
  reviews: PropTypes.arrayOf(reviewProp),
};

export default App;

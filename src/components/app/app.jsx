import React, {useEffect} from 'react';
import MainScreen from '../main/main';
import PropTypes from 'prop-types';
import {Router as BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginScreen from '../login/login';
import FavoritesScreen from '../favorites/favorites';
import PropertyScreenNotLogged from '../property-not-logged/property-not-logged';
import Screen404 from '../not-found-screen/not-found-screen';
// import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../const/const';
import PropertyScreen from '../property/property';
import offerProp from '../../types/offer.prop';
import reviewProp from '../../types/review.prop';
import FavoritesScreenEmpty from '../favorites-empty/favorites-empty';
import {connect} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchOffers} from '../../store/api-actions';
import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../browser-history";

const App = (props) => {
  const {offers, reviews, isDataLoaded, onLoadData} = props;
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
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
        <Route path={AppRoute.OFFER}>
          <PropertyScreen reviews={reviews} offers={offers}/>
        </Route>
        <Route>
          <Screen404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = ({offers, authorizationStatus, isDataLoaded}) => ({
  offers,
  authorizationStatus,
  isDataLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchOffers());
  },
});

App.propTypes = {
  offers: PropTypes.arrayOf(offerProp),
  reviews: PropTypes.arrayOf(reviewProp),
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

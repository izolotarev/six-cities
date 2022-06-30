import React from 'react';
import {cities} from '../../const/const';
import PropTypes from 'prop-types';
import offerProp from '../../types/offer.prop';
import PlaceCard from '../place-card/place-card';
import Header from '../header/header';

const FavoritesScreen = ({favoriteOffers}) => {
  const favoriteCities = {};

  cities.map((city) => {
    const cityFavoriteOffers = favoriteOffers.filter((offer) => offer.city.name === city);
    if (cityFavoriteOffers.length > 0) {
      return favoriteCities[city] = cityFavoriteOffers;
    }
    return null;
  });

  return (
    <div className="page">
      <Header isWithUserNavigation />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                Object.entries(favoriteCities).map((entry) =>
                  <li key={entry[0]} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{entry[0]}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {
                        entry[1].map((favoriteOffer) => <PlaceCard key={favoriteOffer.id} offer={favoriteOffer} isFavoriteScreen/>)
                      }
                    </div>
                  </li>
                )
              }
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

FavoritesScreen.propTypes = {
  favoriteOffers: PropTypes.arrayOf(offerProp),
};

export default FavoritesScreen;

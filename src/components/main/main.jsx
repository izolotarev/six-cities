import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, cities} from '../../const/const';
import OffersList from '../offers-list/offers-list';
import {useDispatch, useSelector} from 'react-redux';
import {getCity} from '../../store/action';
import MainScreenEmpty from '../main-empty/main-empty';
import UserNavigation from '../user-navigation/user-navigation';
import MainCityItem from './main-city-item';
import {getOffers, getSelectedCity} from '../../store/reducers/offers-data/selectors';

const MainScreen = () => {
  const offers = useSelector(getOffers);
  const selectedCity = useSelector(getSelectedCity);

  const dispatch = useDispatch();

  const offersInSelectedCity = offers.filter((offer) => offer.city.name === selectedCity);

  const handleCityClick = (evt) => {
    evt.preventDefault();
    const input = evt.target;
    if (input.textContent) {
      dispatch(getCity(input.textContent));
    }
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.ROOT}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <UserNavigation />
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                cities.map((menuCity) => (
                  <MainCityItem key={menuCity} menuCity={menuCity} selectedCity={selectedCity} onClick={handleCityClick} />
                ))
              }
            </ul>
          </section>
        </div>
        {
          offersInSelectedCity.length === 0
            ? <MainScreenEmpty selectedCity={selectedCity}/>
            : <OffersList selectedCity={selectedCity} offers={offersInSelectedCity} />
        }
      </main>
    </div>
  );
};

export default MainScreen;


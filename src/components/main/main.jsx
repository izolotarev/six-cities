import React from 'react';
import {cities} from '../../const/const';
import OffersList from '../offers-list/offers-list';
import {useDispatch, useSelector} from 'react-redux';
import {getCity} from '../../store/action';
import MainScreenEmpty from '../main-empty/main-empty';
import MainCityItem from './main-city-item';
import {getOffers, getSelectedCity} from '../../store/reducers/offers-data/selectors';
import Header from '../header/header';

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
      <Header isWithUserNavigation />

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


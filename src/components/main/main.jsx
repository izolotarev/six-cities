import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, cities} from '../../const/const';
import OffersList from '../offers-list/offers-list';
import offerProp from '../../types/offer.prop';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import MainScreenEmpty from '../main-empty/main-empty';
import {logout} from '../../store/api-actions';

const MainScreen = ({offers, selectedCity, onCityChange, onLogout, authorizationStatus, userEmail}) => {
  const offersInSelectedCity = offers.filter((offer) => offer.city.name === selectedCity);

  const handleCityClick = (evt) => {
    evt.preventDefault();
    const input = evt.target;
    if (input.textContent) {
      onCityChange(input.textContent);
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
              <ul className="header__nav-list">
                {
                  authorizationStatus === AuthorizationStatus.AUTH
                    ?
                    <>
                      <li className="header__nav-item user">
                        <a className="header__nav-link header__nav-link--profile" href="#">
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                          </div>
                          <span className="header__user-name user__name">{userEmail}</span>
                        </a>
                      </li>
                      <li className="header__nav-item">
                        <a className="header__nav-link" href="/">
                          <span className="header__signout" onClick={onLogout}>Sign out</span>
                        </a>
                      </li>
                    </>
                    :
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="/">
                        <span className="header__signout">Sign in</span>
                      </a>
                    </li>
                }
              </ul>
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
                  <li key={menuCity} className="locations__item">
                    <a
                      className={`locations__item-link tabs__item ${menuCity === selectedCity ? `tabs__item--active` : ``}`}
                      href="#"
                      onClick={handleCityClick}
                    >
                      <span>{menuCity}</span>
                    </a>
                  </li>
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

MainScreen.propTypes = {
  offers: PropTypes.arrayOf(offerProp),
  selectedCity: PropTypes.string.isRequired,
  onCityChange: PropTypes.func,
  onLogout: PropTypes.func,
  authorizationStatus: PropTypes.string.isRequired,
  userEmail: PropTypes.string,
};

const mapStateToProps = ({selectedCity, authorizationStatus, userEmail}) => ({
  selectedCity,
  authorizationStatus,
  userEmail
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(selectedCity) {
    dispatch(ActionCreator.getCity(selectedCity));
  },
  onLogout() {
    console.log('logout');
    dispatch(logout());
  }
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

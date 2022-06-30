import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import UserNavigation from '../user-navigation/user-navigation';
import PropTypes from 'prop-types';

const Header = ({isWithUserNavigation}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.ROOT}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {
            isWithUserNavigation ? <UserNavigation /> : ``
          }
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isWithUserNavigation: PropTypes.bool,
};

export default memo(Header);



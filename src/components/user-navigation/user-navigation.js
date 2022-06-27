import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../const/const';
import {logout} from '../../store/api-actions';
import {Link} from 'react-router-dom';

const UserNavigation = ({authorizationStatus, userEmail, onLogout}) => {

  const handleLogoutClick = (evt) => {
    evt.preventDefault();
    onLogout();
  };

  return (
    <ul className="header__nav-list">
      {
        authorizationStatus === AuthorizationStatus.AUTH
          ?
          <>
            <li className="header__nav-item user">
              <a className="header__nav-link header__nav-link--profile" href="/">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{userEmail}</span>
              </a>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="/">
                <span className="header__signout" onClick={handleLogoutClick}>Sign out</span>
              </a>
            </li>
          </>
          :
          <li className="header__nav-item">
            <Link className="header__nav-link" to="/login">
              <span className="header__signout">Sign in</span>
            </Link>
          </li>
      }
    </ul>
  );
};

const mapStateToProps = ({authorizationStatus, userEmail}) => ({
  authorizationStatus,
  userEmail,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  }
});

UserNavigation.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userEmail: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export {UserNavigation};
export default connect(mapStateToProps, mapDispatchToProps)(UserNavigation);
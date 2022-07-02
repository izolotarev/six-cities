import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {AppRoute, AuthorizationStatus, getRandomCity} from '../../const/const';
import {getCity, redirectToRoute} from '../../store/action';
import {login} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/reducers/user/selectors';
import Header from '../header/header';

const randomCity = getRandomCity();

const LoginScreen = () => {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const loginRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(login({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  const handleRandomCityClick = (evt) => {
    evt.preventDefault();
    dispatch(getCity(randomCity));
    dispatch(redirectToRoute(AppRoute.ROOT));
  };

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return <Redirect to={AppRoute.ROOT} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/" onClick={handleRandomCityClick}>
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginScreen;


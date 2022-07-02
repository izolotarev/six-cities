import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AppRoute, RoomTypes, MAX_RATING, AuthorizationStatus} from '../../const/const';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import PlaceCard from '../place-card/place-card';
import {addToFavorites, fetchNearbyOffers, fetchOfferById, fetchReviews, removeFromFavorites} from '../../store/api-actions';
import {clearOfferById, redirectToRoute} from '../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import UserNavigation from '../user-navigation/user-navigation';
import {getOfferFavoriteStatusById, getNearbyOffers, getOffer} from '../../store/reducers/offers-data/selectors';
import {getReviews} from '../../store/reducers/reviews-data/selectors';
import {getAuthorizationStatus} from '../../store/reducers/user/selectors';

const MAX_NUMBER_OF_REVIEWS = 10;

const PropertyScreen = () => {
  // берем id из параметров
  const params = useParams();
  const id = parseInt(params.id, 10);

  const offer = useSelector(getOffer);
  const nearbyOffers = useSelector(getNearbyOffers);
  const allReviews = useSelector(getReviews);
  const isFavorite = useSelector((state) => getOfferFavoriteStatusById(state, id));
  const authorizationStatus = useSelector(getAuthorizationStatus);

  let reviews = [];
  if (allReviews && allReviews.length < MAX_NUMBER_OF_REVIEWS) {
    reviews = allReviews;
  } else if (allReviews && allReviews.length > MAX_NUMBER_OF_REVIEWS) {
    reviews = allReviews.slice(allReviews.length - MAX_NUMBER_OF_REVIEWS, allReviews.length);
  }

  const dispatch = useDispatch();

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.AUTH) {
      dispatch(redirectToRoute(AppRoute.LOGIN));
    } else if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  useEffect(() => {
    dispatch(fetchOfferById(id));
    dispatch(fetchNearbyOffers(id));
    dispatch(fetchReviews(id));
    window.scrollTo(0, 0);

    return () => {
      dispatch(clearOfferById());
    };
  }, [dispatch, id]);

  if (!offer) {
    return (
      <LoadingScreen/>
    );
  }

  const {images, isPremium, title, rating, type, bedrooms, maxAdults, price, goods, host, description} = offer;

  const {avatarUrl, isPro, name} = host;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.ROOT}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <UserNavigation/>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.map((image) => (
                  <div key={image} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Photo studio"/>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium
                  ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  : ``
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button
                  className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''} button`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${rating / MAX_RATING * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {RoomTypes[type.toUpperCase()]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms === 1 ? `1 Bedroom` : `${bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {maxAdults}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) => (
                    <li key={item} className="property__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  {
                    isPro
                      ?
                      <span className="property__user-status">
                        Pro
                      </span>
                      : ``
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              {
                reviews
                  ? <ReviewsList reviews={reviews}/>
                  : ``
              }
            </div>
          </div>
          <section className="property__map map">
            {
              nearbyOffers
                ? <Map offers={nearbyOffers}/>
                : ``
            }
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                nearbyOffers
                  ? nearbyOffers.map((nearbyOffer) => <PlaceCard key={nearbyOffer.id} offer={nearbyOffer} isPropertyScreen />)
                  : ``
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};


export default PropertyScreen;


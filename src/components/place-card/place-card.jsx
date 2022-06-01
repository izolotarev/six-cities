import React from 'react';
import MouseEvent from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AppRoute, RoomTypes, MAX_RATING} from '../../const/const';
import offerProp from '../../types/offer.prop';
import PropTypes from 'prop-types';

const PlaceCard = ({offer, onHover}) => {
  const {isPremium, previewImage, title, price, isFavorite, rating, type, id} = offer;
  const history = useHistory();

  const handleHover = (evt) => {
    evt.preventDefault();
    onHover(offer.id);
  };

  const handleClick = () => {
    history.push(
        `${AppRoute.OFFER}/${id}`,
        {state: offer},
    );
  };

  return (
    <article className="cities__place-card place-card"
      onMouseOver={handleHover}
      onClick={handleClick}
    >
      {
        isPremium
          ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : ``
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`#`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating / MAX_RATING * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`#`}>{title}</Link>
        </h2>
        <p className="place-card__type">{RoomTypes[type.toUpperCase()]}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: offerProp,
  onHover: PropTypes.func,
};

export default PlaceCard;

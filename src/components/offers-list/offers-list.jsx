import React, {useState} from 'react';
import PlaceCard from '../place-card/place-card';
import PropTypes from 'prop-types';
import offerProp from '../../types/offer.prop';

const OffersList = ({numberOfCards, offers, onListItemHover}) => {
  const listItemHoverHandler = (id) => {
    onListItemHover(id);
  };

  return (
    <>
      {offers.slice(0, numberOfCards).map((offer) =>
        <PlaceCard key={offer.id} offer={offer} onHover={listItemHoverHandler}/>
      )}
    </>
  );
};

OffersList.propTypes = {
  numberOfCards: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerProp),
  onListItemHover: PropTypes.func.isRequired,
};

export default OffersList;

import React, {useState} from 'react';
import PlaceCard from '../place-card/place-card';
import PropTypes from 'prop-types';
import offerProp from '../../types/offer.prop';

const OffersList = ({numberOfCards, offers}) => {
  const [activeCard, setActiveCard] = useState({});

  return (
    <>
      {offers.slice(0, numberOfCards).map((offer) =>
        <PlaceCard key={offer.id} offer={offer} onHover={(data) => setActiveCard(data)}/>
      )}
    </>
  );
};

OffersList.propTypes = {
  numberOfCards: PropTypes.number.isRequired,
  offers: offerProp,
};

export default OffersList;

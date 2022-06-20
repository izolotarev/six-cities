import React, {useEffect, useState} from 'react';
import PlaceCard from '../place-card/place-card';
import PropTypes from 'prop-types';
import offerProp from '../../types/offer.prop';
import Map from '../map/map';
import SortOptions from '../sort-options/sort-options';
import {sortOffers} from '../../const/const';

const OffersList = ({selectedCity, offers}) => {
  const listItemHoverHandler = (id) => {
    onListItemHover(id);
  };

  const [selectedPoint, setSelectedPoint] = useState(undefined);

  const onListItemHover = (id) => {
    setSelectedPoint(id);
  };

  const [sortedOffers, setSortedOffers] = useState(offers);
  const onSortModeChange = (sort) => {
    setSortedOffers(sortOffers(offers, sort));
  };

  useEffect(() => {
    setSortedOffers(offers);
  }, [offers]);

  useEffect(() => {
    setSelectedPoint(undefined);
  }, [selectedCity]);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length === 1 ? `1 place` : `${offers.length} places`} to stay in {selectedCity}</b>
          <SortOptions onSortModeChange={onSortModeChange} selectedCity={selectedCity}/>
          <div className="cities__places-list places__list tabs__content">
            {sortedOffers.slice().map((offer) =>
              <PlaceCard key={offer.id} offer={offer} onHover={listItemHoverHandler} isMainScreen />,
            )}
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map offers={offers} selectedPoint={selectedPoint} />
          </section>
        </div>
      </div>
    </div>
  );
};

OffersList.propTypes = {
  selectedCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerProp),
};

export default OffersList;

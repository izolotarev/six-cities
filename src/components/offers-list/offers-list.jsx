import React, {useState} from 'react';
import PlaceCard from '../place-card/place-card';
import PropTypes from 'prop-types';
import offerProp from '../../types/offer.prop';
import Map from '../map/map';

const OffersList = ({selectedCity, numberOfCards, offers}) => {
  const listItemHoverHandler = (id) => {
    onListItemHover(id);
  };

  const [selectedPoint, setSelectedPoint] = useState(undefined);

  const onListItemHover = (id) => {
    setSelectedPoint(id);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length === 1 ? `1 place` : `${offers.length} places`} to stay in {selectedCity}</b>
          <form className="places__sorting" action="/" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            {offers.slice(0, numberOfCards).map((offer) =>
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
  numberOfCards: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerProp),
};

export default OffersList;

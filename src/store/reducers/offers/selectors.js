import {createSelector} from 'reselect';
import {NameSpace} from '../root-reducer';

export const getSelectedCity = (state) => state[NameSpace.OFFERS].selectedCity;
export const getOffers = (state) => state[NameSpace.OFFERS].offers;
export const getDataLoadedStatus = (state) => state[NameSpace.OFFERS].isDataLoaded;
export const getOffer = (state) => state[NameSpace.OFFERS].offer;
export const getNearbyOffers = (state) => state[NameSpace.OFFERS].nearbyOffers;
export const getOffersInSelectedCity = createSelector(getSelectedCity, getOffers,
    (selectedCity, offers) => {
      return offers.slice().filter((offer) => offer.city.name === selectedCity);
    }
);

// Reselect. Первые два аргумента - зависимости.
// Если они не меняются, то третья функция не запустится
// и фильтрация не применится, т.к. результат функции мемоизирован.

export const getFavoriteOffers = (state) => state[NameSpace.OFFERS].favoriteOffers;

const getOfferId = (_state, id) => id;

export const getOfferFavoriteStatusById = createSelector(getFavoriteOffers, getOfferId,
    (favoriteOffers, id) => {
      return favoriteOffers.filter((item) => item.id === id).length > 0;
    }
);


import {clearOfferById, getCity, getNearbyOffers, getOfferById, getOffers} from '../../action';
import {adaptToClient} from '../../../utils/utils';
import {createReducer} from '@reduxjs/toolkit';

export const initialState = {
  selectedCity: `Paris`,
  offers: [],
  isDataLoaded: false,
  offer: undefined,
  nearbyOffers: undefined,
  favoriteOffers: [],
};

const offersData = createReducer(initialState, (builder) => {
  builder.addCase(getCity, (state, action) => {
    state.selectedCity = action.payload;
  });
  builder.addCase(getOffers, (state, action) => {
    state.offers = action.payload.map((item) => adaptToClient(item));
    state.isDataLoaded = true;
  });
  builder.addCase(getOfferById, (state, action) => {
    state.offer = adaptToClient(action.payload);
  });
  builder.addCase(clearOfferById, (state) => {
    state.offer = initialState.offer;
    state.nearbyOffers = initialState.nearbyOffers;
  });
  builder.addCase(getNearbyOffers, (state, action) => {
    state.nearbyOffers = action.payload.map((item) => adaptToClient(item));
  });
});

export {offersData};

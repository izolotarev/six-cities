
import {addToFavoriteOffers, clearFavoriteOffers, clearOfferById, getCity, getFavoriteOffers, getNearbyOffers, getOfferById, getOffers, removeFromFavoriteOffers} from '../../action';
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
  builder
    .addCase(getCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload.map((item) => adaptToClient(item));
      state.isDataLoaded = true;
    })
    .addCase(getOfferById, (state, action) => {
      state.offer = adaptToClient(action.payload);
    })
    .addCase(clearOfferById, (state) => {
      state.offer = initialState.offer;
      state.nearbyOffers = initialState.nearbyOffers;
    })
    .addCase(getNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload.map((item) => adaptToClient(item));
    })
    .addCase(getFavoriteOffers, (state, action) => {
      if (action.payload.favoriteOffers) {
        state.favoriteOffers = action.payload.favoriteOffers.map((item) => adaptToClient(item));
      }
    })
    .addCase(clearFavoriteOffers, (state) => {
      state.favoriteOffers = initialState.favoriteOffers;
    })
    .addCase(addToFavoriteOffers, (state, action) => {
      const newFavoriteOffer = adaptToClient(action.payload.favoriteOffer);
      state.favoriteOffers.push(newFavoriteOffer);
    })
    .addCase(removeFromFavoriteOffers, (state, action) => {
      state.favoriteOffers = state.favoriteOffers.filter((item) => item.id !== action.payload.favoriteOffer.id);
    });
});

export {offersData};

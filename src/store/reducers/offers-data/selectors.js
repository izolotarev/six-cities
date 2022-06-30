import {NameSpace} from '../root-reducer';

export const getSelectedCity = (state) => state[NameSpace.OFFERS].selectedCity;
export const getOffers = (state) => state[NameSpace.OFFERS].offers;
export const getLoadedDataStatus = (state) => state[NameSpace.OFFERS].isDataLoaded;
export const getOffer = (state) => state[NameSpace.OFFERS].offer;
export const getNearbyOffers = (state) => state[NameSpace.OFFERS].nearbyOffers;

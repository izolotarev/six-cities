import { offersData, initialState } from './offers-reducer';
import { makeFakeOffer } from '../../../utils/mocks';
import { adaptToClient } from '../../../utils/utils';
import { ActionType, addToFavoriteOffers, clearFavoriteOffers, clearOfferById, getFavoriteOffers, getNearbyOffers, getOfferById, getOffers, removeFromFavoriteOffers } from '../../action';
import { createAPI } from '../../../services/api';
import { fetchOffers } from '../../api-actions';
import { APIRoute } from '../../../const/const';
import MockAdapter from 'axios-mock-adapter';

const api = createAPI(() => {});

const offers = [makeFakeOffer()];
const adaptedOffers = offers.map((offer) => adaptToClient(offer));

const offer = makeFakeOffer();
const adaptedOffer = adaptToClient(offer);

describe(`Offers reducer works correctly`, () => {
  it(`without additional parameters should return initial state`, () => {
    expect(offersData(undefined, {}))
        .toEqual(initialState);
  });

  it('should update offers on data load', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: false,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: [],
    };

    expect(offersData(state, getOffers(offers)))
      .toEqual({
        selectedCity: 'Paris',
        offers: adaptedOffers,
        isDataLoaded: true,
        offer: undefined,
        nearbyOffers: undefined,
        favoriteOffers: [],
      });
  });

  it('should get offer, which was fetched by its ID', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: [],
    };
    expect(offersData(state, getOfferById(offer)))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: adaptedOffer,
        nearbyOffers: undefined,
        favoriteOffers: [],
      });
  });

  it('should get near-by offers', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: adaptedOffer,
      nearbyOffers: undefined,
      favoriteOffers: [],
    };
    expect(offersData(state, getNearbyOffers(offers)))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: adaptedOffer,
        nearbyOffers: adaptedOffers,
        favoriteOffers: [],
      });
  });

  it('should clear offer, which was fetched by its ID', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: adaptedOffer,
      nearbyOffers: adaptedOffers,
      favoriteOffers: [],
    };
    expect(offersData(state, clearOfferById()))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: initialState.offer,
        nearbyOffers: initialState.nearbyOffers,
        favoriteOffers: [],
      });
  });

  it('should get favorite offers', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: [],
    };
    expect(offersData(state, getFavoriteOffers(offers)))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: undefined,
        nearbyOffers: undefined,
        favoriteOffers: adaptedOffers,
      });
  });

  it('should clear favorite offers', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: adaptedOffers,
    };
    expect(offersData(state, clearFavoriteOffers()))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: initialState.offer,
        nearbyOffers: initialState.nearbyOffers,
        favoriteOffers: initialState.favoriteOffers,
      });
  });

  it('should add offer to favorite offers', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: [],
    };
    expect(offersData(state, addToFavoriteOffers(offer)))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: undefined,
        nearbyOffers: undefined,
        favoriteOffers: [adaptedOffer],
      });
  });

  it('should remove offer to favorite offers', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: [adaptedOffer],
    };
    expect(offersData(state, removeFromFavoriteOffers(adaptedOffer)))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: undefined,
        nearbyOffers: undefined,
        favoriteOffers: [],
      });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = fetchOffers();

    apiMock
    .onGet(APIRoute.OFFERS)
    .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.GET_OFFERS,
        payload: [{fake: true}],
      });
    });

  });


});

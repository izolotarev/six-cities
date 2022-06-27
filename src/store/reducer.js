import {AuthorizationStatus} from '../const/const';
import {adaptReviewsToClient, adaptToClient} from '../utils/utils';
import {ActionType} from './action';

export const initialState = {
  selectedCity: `Paris`,
  offers: [],
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false,
  userEmail: ``,
  offer: undefined,
  nearbyOffers: undefined,
  reviews: undefined,
  isPostSuccessfull: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CITY:
      return {...state, selectedCity: action.payload};
    case ActionType.GET_OFFERS:
      return {...state, offers: action.payload.map((item) => adaptToClient(item)), isDataLoaded: true};
    case ActionType.GET_OFFER_BY_ID:
      return {...state, offer: adaptToClient(action.payload)};
    case ActionType.CLEAR_OFFER_BY_ID:
      return {...state, offer: undefined, nearbyOffers: undefined, reviews: undefined};
    case ActionType.GET_NEARBY_OFFERS:
      return {...state, nearbyOffers: action.payload.map((item) => adaptToClient(item))};
    case ActionType.GET_REVIEWS:
      return {...state, reviews: action.payload.map((item) => adaptReviewsToClient(item))};
    case ActionType.POST_REVIEW:
      return {...state, isPostSuccessfull: true, reviews: action.payload.map((item) => adaptReviewsToClient(item))};
    case ActionType.CLEAR_POST_REVIEW_STATUS:
      return {...state, isPostSuccessfull: false};
    case ActionType.REQUIRED_AUTHORIZATION:
      return {...state, authorizationStatus: action.payload.status, userEmail: action.payload.email};
    case ActionType.REQUIRE_LOGOUT:
      return {...state, authorizationStatus: AuthorizationStatus.NO_AUTH};
    default:
      return state;
  }
};

export {reducer};

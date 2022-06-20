import {AuthorizationStatus} from '../const/const';
import {adaptToClient} from '../utils/utils';
import {ActionType} from './action';

export const initialState = {
  selectedCity: `Paris`,
  offers: [],
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CITY:
      return {...state, selectedCity: action.payload};
    case ActionType.GET_OFFERS:
      return {...state, offers: adaptToClient(action.payload), isDataLoaded: true};
    case ActionType.REQUIRED_AUTHORIZATION:
      return {...state, authorizationStatus: action.payload};
    case ActionType.REQUIRE_LOGOUT:
      return {...state, authorizationStatus: AuthorizationStatus.NO_AUTH};
    default:
      return state;
  }
};

export {reducer};

import {offers} from '../mocks/offers';
import {ActionType} from './action';


export const initialState = {
  selectedCity: `Paris`,
  offers,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CITY:
      return {...state, selectedCity: action.payload};
    case ActionType.GET_OFFERS:
      return {...state, selectedCity: action.type};
    default:
      return state;
  }
};

export {reducer};

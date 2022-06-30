import {combineReducers} from 'redux';
import {offersData} from './offers-data/offers-data';
import {reviewsData} from './reviews-data/reviews-data';
import {user} from './user/user';

export const NameSpace = {
  OFFERS: `OFFERS`,
  REVIEWS: `REVIEWS`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.OFFERS]: offersData,
  [NameSpace.REVIEWS]: reviewsData,
  [NameSpace.USER]: user,
});

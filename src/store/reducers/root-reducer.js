import {combineReducers} from 'redux';
import {offersData} from './offers/offers-reducer';
import {reviewsData} from './reviews/reviews-reducer';
import {user} from './user/user-reducer';

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

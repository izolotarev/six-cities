import {NameSpace} from '../root-reducer';

export const getReviews = (state) => state[NameSpace.REVIEWS].reviews;
export const getReviewPostStatus = (state) => state[NameSpace.REVIEWS].isPostSuccessfull;

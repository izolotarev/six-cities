import {clearPostReviewStatus, getReviews, addReview} from '../../action';
import {adaptReviewsToClient} from '../../../utils/utils';
import {createReducer} from '@reduxjs/toolkit';

export const initialState = {
  reviews: undefined,
  isPostSuccessfull: false,
};

const reviewsData = createReducer(initialState, (builder) => {
  builder.addCase(getReviews, (state, action) => {
    state.reviews = action.payload.map((item) => adaptReviewsToClient(item));
  });
  builder.addCase(addReview, (state, action) => {
    state.isPostSuccessfull = true;
    state.reviews = action.payload.map((item) => adaptReviewsToClient(item));
  });
  builder.addCase(clearPostReviewStatus, (state) => {
    state.isPostSuccessfull = initialState.isPostSuccessfull;
  });
});

export {reviewsData};

import { makeFakeReviews } from '../../../utils/mocks';
import { adaptReviewsToClient } from '../../../utils/utils';
import { addReview, clearPostReviewStatus, getReviews } from '../../action';
import { initialState, reviewsData } from './reviews-reducer';

const reviews = [makeFakeReviews()];
const adaptedReviews = reviews.map((review) => adaptReviewsToClient(review));

describe('Reviews reducer works correctly', () => {
  it(`without additional parameters should return initial state`, () => {
    expect(reviewsData(undefined, {}))
        .toEqual(initialState);
  });

  it('should update reviews on data load', () => {
    const state = {
      reviews: undefined,
      isPostSuccessfull: false,
    };
    expect(reviewsData(state, getReviews(reviews)))
      .toEqual({
        reviews: adaptedReviews,
        isPostSuccessfull: false,
      });
  });

  it('should update reviews and post status', () => {
    const state = {
      reviews: adaptedReviews,
      isPostSuccessfull: false,
    };
    expect(reviewsData(state, addReview(reviews)))
      .toEqual({
        reviews: adaptedReviews,
        isPostSuccessfull: true,
      });
  });

  it('should clear post status', () => {
    const state = {
      reviews: adaptedReviews,
      isPostSuccessfull: true,
    };
    expect(reviewsData(state, clearPostReviewStatus()))
      .toEqual({
        reviews: adaptedReviews,
        isPostSuccessfull: false,
      });
  });

});

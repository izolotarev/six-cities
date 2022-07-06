import React, {useState, useEffect} from 'react';
import {clearPostReviewStatus} from '../../store/action';
import {postReview} from '../../store/api-actions';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getReviewPostStatus} from '../../store/reducers/reviews/selectors';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

const ReviewForm = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);

  const isPostSuccessfull = useSelector(getReviewPostStatus);

  const dispatch = useDispatch();

  const [review, setReview] = useState({
    comment: ``,
    rating: 0,
  });

  const {comment, rating} = review;
  const isSubmitDisabled = comment.length < MIN_REVIEW_LENGTH || rating === 0;

  const handleStarClick = (evt) => {
    setReview({
      comment,
      rating: parseInt(evt.target.value, 10),
    });
  };

  const handleTextareaChange = (evt) => {
    setReview({
      comment: evt.target.value,
      rating,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(postReview(id, review));
  };

  useEffect(() => {
    if (isPostSuccessfull) {
      setReview({
        comment: ``,
        rating: 0,
      });
      dispatch(clearPostReviewStatus());
    }
  }, [dispatch, isPostSuccessfull]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" >
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleStarClick} checked={review.rating === 5}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={handleStarClick} checked={review.rating === 4}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleStarClick} checked={review.rating === 3}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleStarClick} checked={review.rating === 2}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleStarClick} checked={review.rating === 1}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextareaChange}
        value={comment}
        maxLength={MAX_REVIEW_LENGTH}
      >

      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;

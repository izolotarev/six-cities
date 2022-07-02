import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  GET_CITY: `main/getCity`,
  GET_OFFERS: `main/getOffers`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REQUIRE_LOGOUT: `user/requireLogout`,
  REDIRECT_TO_ROUTE: `user/redirectToRoute`,
  GET_OFFER_BY_ID: `offers/getOfferById`,
  CLEAR_OFFER_BY_ID: `offers/clearOfferById`,
  GET_NEARBY_OFFERS: `offers/getNearbyOffers`,
  GET_REVIEWS: `offers/getReviews`,
  POST_REVIEW: `offers/postReview`,
  CLEAR_POST_REVIEW_STATUS: `offers/clearPostReviewStatus`,
  GET_FAVORITE_OFFERS: `favorite/getFavoriteOffers`,
  CLEAR_FAVORITE_OFFERS: `favorite/clearFavoriteOffers`,
  ADD_TO_FAVORITE_OFFERS: `favorite/addToFavorite`,
  REMOVE_FROM_FAVORITE_OFFERS: `favorite/removeFromFavorite`,
};

export const getCity = createAction(ActionType.GET_CITY, (city) => {
  return {
    payload: city,
  };
});

export const getOffers = createAction(ActionType.GET_OFFERS, (offers) => {
  return {
    payload: offers,
  };
});

export const getOfferById = createAction(ActionType.GET_OFFER_BY_ID, (offer) => {
  return {
    payload: offer,
  };
});

export const clearOfferById = createAction(ActionType.CLEAR_OFFER_BY_ID);

export const getNearbyOffers = createAction(ActionType.GET_NEARBY_OFFERS, (offers) => {
  return {
    payload: offers,
  };
});

export const getReviews = createAction(ActionType.GET_REVIEWS, (reviews) => {
  return {
    payload: reviews,
  };
});

export const addReview = createAction(ActionType.POST_REVIEW, (reviews) => {
  return {
    payload: reviews,
  };
});

export const clearPostReviewStatus = createAction(ActionType.CLEAR_POST_REVIEW_STATUS);

export const getFavoriteOffers = createAction(ActionType.GET_FAVORITE_OFFERS,
    (favoriteOffers) => ({
      payload: {
        favoriteOffers,
      },
    }),
);

export const clearFavoriteOffers = createAction(ActionType.CLEAR_FAVORITE_OFFERS);

export const addToFavoriteOffers = createAction(ActionType.ADD_TO_FAVORITE_OFFERS,
    (favoriteOffer) => ({
      payload: {
        favoriteOffer,
      },
    }),
);

export const removeFromFavoriteOffers = createAction(ActionType.REMOVE_FROM_FAVORITE_OFFERS,
    (favoriteOffer) => ({
      payload: {
        favoriteOffer,
      },
    }),
);

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status, email) => {
  return {
    payload: {status, email}
  };
});

export const requireLogout = createAction(ActionType.REQUIRE_LOGOUT);

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url,
  };
});


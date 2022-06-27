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
};

export const ActionCreator = {
  getCity: (city) => ({
    type: ActionType.GET_CITY,
    payload: city,
  }),
  getOffers: (offers) => ({
    type: ActionType.GET_OFFERS,
    payload: offers,
  }),
  getOfferById: (offer) => ({
    type: ActionType.GET_OFFER_BY_ID,
    payload: offer,
  }),
  clearOfferById: () => ({
    type: ActionType.CLEAR_OFFER_BY_ID,
  }),
  getNearbyOffers: (offers) => ({
    type: ActionType.GET_NEARBY_OFFERS,
    payload: offers,
  }),
  getReviews: (reviews) => ({
    type: ActionType.GET_REVIEWS,
    payload: reviews,
  }),
  postReview: (reviews) => ({
    type: ActionType.POST_REVIEW,
    payload: reviews,
  }),
  clearPostReviewStatus: () => ({
    type: ActionType.CLEAR_POST_REVIEW_STATUS,
  }),
  requireAuthorization: (status, email) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: {status, email},
  }),
  requireLogout: () => ({
    type: ActionType.REQUIRE_LOGOUT,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  })
};

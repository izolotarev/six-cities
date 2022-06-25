export const ActionType = {
  GET_CITY: `main/getCity`,
  GET_OFFERS: `main/getOffers`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REQUIRE_LOGOUT: `user/requireLogout`,
  REDIRECT_TO_ROUTE: `user/redirectToRoute`,
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

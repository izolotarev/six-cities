export const ActionType = {
  GET_CITY: `main/getCity`,
  GET_OFFERS: `main/getOffers`,
};

export const ActionCreator = {
  getCity: (city) => ({
    type: ActionType.GET_CITY,
    payload: city,
  }),
};

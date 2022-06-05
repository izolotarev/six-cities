export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  OFFER: '/offer',
  FAVORITE: '/favorite',
};

export const AuthorizationStatus = {
  Auth:'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
};

export const RoomTypes = {
  APARTMENT: 'Apartment',
  ROOM: 'Private room',
  HOUSE: 'House',
  HOTEL: 'Hotel',
};

export const MAX_RATING = 5;

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

// export const URL_MARKER_DEFAULT =
//   '/public/img/pin.svg';

// export const URL_MARKER_CURRENT =
//   '/public/img/pin-active.svg';

export const Screen = {
  MAIN: 'cities',
  FAVORITE: 'favorites',
  PROPERTY: 'near-places',
};

export const BasicCardImageSize = {
  WIDTH: 260,
  HEIGHT: 200,
};

export const FavoriteCardImageSize = {
  WIDTH: 150,
  HEIGHT: 110,
};

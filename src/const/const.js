export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  OFFER: '/offer',
  FAVORITE: '/favorite',
  NOT_FOUND: '/not-found',
};

export const APIRoute = {
  OFFERS: '/hotels',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REVIEWS: '/comments',
  FAVORITE: '/favorite',
};

export const AuthorizationStatus = {
  AUTH:'AUTH',
  NO_AUTH: 'NO_AUTH',
};

export const RoomTypes = {
  APARTMENT: 'Apartment',
  ROOM: 'Private room',
  HOUSE: 'House',
  HOTEL: 'Hotel',
};

export const MAX_RATING = 5;

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const getRandomIndex = (min, max) => {
  if (min < 0 || max < 0) {
    return 0;
  } else if (min > max) {
    [min, max] = [max, min];
  }
  return Math.round(Math.random() * (max - min) + min);
};

export const getRandomCity = () => {
  const index = getRandomIndex(0, cities.length - 1);
  return cities[index];
};

export const getRandomRoomType = () => {
  const keys = Object.keys(RoomTypes);
  const index = getRandomIndex(0, keys.length - 1);
  return keys[index];
};

export const URL_MARKER_DEFAULT =
  './img/pin.svg';

export const URL_MARKER_CURRENT =
  './img/pin-active.svg';

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

export const SortMode = {
  POPULAR: 'Popular',
  PRICE_UP: 'Price: low to high',
  PRICE_DOWN: 'Price: high to low',
  TOP_RATED: 'Top rated first',
};

export const sortOffers = (data, filter) => {
  switch (filter) {
    case SortMode.PRICE_DOWN:
      return data.slice().sort((prev, next) => (next.price - prev.price));
    case SortMode.PRICE_UP:
      return data.slice().sort((prev, next) => (prev.price - next.price));
    case SortMode.TOP_RATED:
      return data.slice().sort((prev, next) => (next.rating - prev.rating));
    default:
      return data.slice();
  }
};

export const TypeOfFavoriteAction = {
  ADD_TO_FAVORITE: 1,
  REMOVE_FROM_FAVORITE: 0,
};



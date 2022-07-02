import {getOffers, getOfferById, redirectToRoute, getNearbyOffers, getReviews, requireAuthorization, requireLogout, addReview, getFavoriteOffers, addToFavoriteOffers, removeFromFavoriteOffers, clearFavoriteOffers} from "./action";
import {APIRoute, AppRoute, AuthorizationStatus, TypeOfFavoriteAction} from "../const/const";
import {toast} from 'react-toastify';

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => dispatch(getOffers(data)))
    .catch(handleError)
);

export const fetchOfferById = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}`)
    .then(({data}) => dispatch(getOfferById(data)))
    .catch(() => dispatch(redirectToRoute(AppRoute.NOT_FOUND)))
);

export const fetchNearbyOffers = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}/nearby`)
    .then(({data}) => dispatch(getNearbyOffers(data)))
    .catch(handleError)
);

export const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => dispatch(getReviews(data)))
    .catch(handleError)
);

export const postReview = (id, review) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, review)
    .then(({data}) => dispatch(addReview(data)))
    .catch((err) => toast.info(err.response.data.error))
);

export const fetchFavoriteOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE)
  .then(({data}) => {
    if (data) {
      dispatch(getFavoriteOffers(data));
    }
  })
  .catch(() => {})
);

export const addToFavorites = (id) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${id}/${TypeOfFavoriteAction.ADD_TO_FAVORITE}`)
    .then(({data}) => dispatch(addToFavoriteOffers(data)))
    .catch(handleError)
);

export const removeFromFavorites = (id) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${id}/${TypeOfFavoriteAction.REMOVE_FROM_FAVORITE}`)
    .then(({data}) => dispatch(removeFromFavoriteOffers(data)))
    .catch(handleError)
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then((response) => {
      if (response) {
        dispatch(requireAuthorization(AuthorizationStatus.AUTH, response.data.email));
      }
    })
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH, email)))
    .then(() => fetchFavoriteOffers())
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
    .catch(handleError)
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGOUT)
    .then(() => dispatch(requireLogout()))
    .then(() => dispatch(clearFavoriteOffers()))
    .catch(handleError)
);

const handleError = (err) => toast.info(err.response.data.error);

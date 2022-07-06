import {requireAuthorization, requireLogout} from '../../action';
import {AuthorizationStatus} from '../../../const/const';
import {createReducer} from '@reduxjs/toolkit';

export const initialState = {
  userEmail: undefined,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    state.authorizationStatus = action.payload.status;
    state.userEmail = action.payload.email;
  });
  builder.addCase(requireLogout, (state) => {
    state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    state.userEmail = initialState.userEmail;
  });
});

export {user};

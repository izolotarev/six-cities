import { AuthorizationStatus, APIRoute, AppRoute } from '../../../const/const';
import { makeFakeUserEmail } from '../../../utils/mocks';
import { requireAuthorization, requireLogout, ActionType } from '../../action';
import { initialState, user } from './user-reducer';
import MockAdapter from 'axios-mock-adapter';
import { checkAuth, login } from '../../api-actions';
import { createAPI } from '../../../services/api';


const mockUserEmail = makeFakeUserEmail();
const api = createAPI(() => {});

describe('User reducer works correctly', () => {
  it(`without additional parameters should return initial state`, () => {
    expect(user(undefined, {}))
        .toEqual(initialState);
  });

  it('should update status on authorization failure', () => {
    const state = initialState;
    expect(user(state, requireAuthorization(AuthorizationStatus.NO_AUTH)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: initialState.userEmail,
      });
  });

  it('should update status and email on authorization success', () => {
    const state = initialState;
    expect(user(state, requireAuthorization(AuthorizationStatus.AUTH, mockUserEmail)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: mockUserEmail,
      });
  });

  it('should clear status and email on logout', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.AUTH,
      userEmail: mockUserEmail,
    };
    expect(user(state, requireLogout()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: initialState.userEmail,
      });
  });

  it(`Should make a correct API call GET to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, {
        email: mockUserEmail
      }
      );

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: {
            status: AuthorizationStatus.AUTH,
            email: mockUserEmail
          },
        });
      });
  });

  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const mockUser = {login: mockUserEmail, password: `123456`};
    const loginLoader = login(mockUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, [{
        email: mockUserEmail
      }]
      );

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: {
            status: AuthorizationStatus.AUTH,
            email: mockUserEmail
          },
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.ROOT,
        });

      });

  });

});

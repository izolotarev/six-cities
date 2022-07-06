import { AuthorizationStatus } from '../const/const';
import { makeFakeUserEmail } from '../utils/mocks';
import {
  getCity,
  ActionType,
  requireAuthorization
} from './action';


describe(`Action creators work correctly`, () => {
  it(`Action creator getCity returns correct action`, () => {
    const city = `Paris`;

    const expectedAction = {
      type: ActionType.GET_CITY,
      payload: city,
    };

    expect(getCity(city)).toEqual(expectedAction);
  });

  it(`Action creator requireAuthorization returns correct action`, () => {
    const status = AuthorizationStatus.AUTH;
    const email = makeFakeUserEmail();

    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: {status, email},
    };

    expect(requireAuthorization(status, email)).toEqual(expectedAction);
  });

});

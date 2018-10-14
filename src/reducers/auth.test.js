import authReducer from './auth';

describe('auth reducer', () => {
  it('should store user id after login', () => {
    const action = {
      type: 'LOGIN',
      uid: 'uniqUserIdFromFirebaes'
    };
    const store = authReducer({}, action);

    expect(store).toEqual({
      uid: action.uid
    });
  });

  it('should remove user id after login', () => {
    const action = {
      type: 'LOGOUT'
    };
    const store = authReducer({}, action);

    expect(store).toEqual({});
  });
});

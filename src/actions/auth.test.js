import { login, logout } from './auth';

describe('authentication', () => {
  it('should setup login action object', () => {
    const action = login('uniqUserIdFromFirebase');

    expect(action).toEqual({
      type: 'LOGIN',
      uid: action.uid
    });
  });

  it('should setup logout action object', () => {
    const action = logout();

    expect(action).toEqual({
      type: 'LOGOUT'
    });
  });
});

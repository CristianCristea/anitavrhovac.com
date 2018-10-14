import { firebase, emailAuthProvider } from './../firebase/firebase';

// store user id in redux store
export const login = uid => ({
  type: 'LOGIN',
  uid
});

// remove user id from store
export const logout = () => ({
  type: 'LOGOUT'
});

// login user
export const startLogin = (email, password) => {
  return () => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };
};

// logout user
export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

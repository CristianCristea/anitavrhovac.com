import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppRouter, { history } from './routes/AppRouter';
import { startSetAlbums } from './actions/albums';
import { startSetPhotos } from './actions/photos';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

store.dispatch(startSetPhotos()).then(() => {
  store.dispatch(startSetAlbums()).then(() => {
    ReactDOM.render(jsx, document.getElementById('root'));
  });
});

// track auth status
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('logged in');
    // do stuff when logged in
    // store user id in store
    store.dispatch(login(user.uid));
    // redirect if on login page
    if (history.location.pathname === `${process.env.PUBLIC_URL}/anita`) {
      history.push(`${process.env.PUBLIC_URL}/anita/dashboard`);
    }
  } else {
    console.log('logged out');
    // do stuff when logged out
    // remove user id from store
    store.dispatch(logout());
    // PrivateRoute will redirect automatically to homepage after logout
  }
});

registerServiceWorker();

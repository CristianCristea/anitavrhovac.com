import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppRouter, { history } from './routes/AppRouter';
import { startSetAlbums } from './actions/albums';
import { startSetPhotos } from './actions/photos';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/Themes/defaultTheme';
import LoadingPage from './components/common/LoadingPage';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

store.dispatch(startSetAlbums()).then(() => {
  store.dispatch(startSetPhotos()).then(() => {
    ReactDOM.render(jsx, document.getElementById('root'));
  });
});

// track auth status
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // do stuff when logged in
    // store user id in store
    store.dispatch(login(user.uid));
    // redirect if on login page
    if (history.location.pathname === `${process.env.PUBLIC_URL}/anita`) {
      history.push(`${process.env.PUBLIC_URL}/anita/dashboard`);
    }
  } else {
    // do stuff when logged out
    // remove user id from store
    store.dispatch(logout());
    // PrivateRoute will redirect automatically to homepage after logout
  }
});

registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppRouter from './routes/AppRouter';
import { startSetAlbums } from './actions/albums';
import registerServiceWorker from './registerServiceWorker';
import './firebase/firebase';
import './index.css';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

store.dispatch(startSetAlbums()).then(() => {
  ReactDOM.render(jsx, document.getElementById('root'));
});
registerServiceWorker();

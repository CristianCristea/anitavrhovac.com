import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppRouter from './routes/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter store={store} />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();

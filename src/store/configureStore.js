import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { albumsReducer } from './../reducers/albums';
import { photosReducer } from './../reducers/photos';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      collections: albumsReducer,
      photos: photosReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

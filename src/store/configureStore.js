import { createStore, combineReducers } from 'redux';
import { albumsReducer } from './../reducers/albums';
import { photosReducer } from './../reducers/photos';

export default () => {
  const store = createStore(
    combineReducers({
      collections: albumsReducer,
      photos: photosReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};

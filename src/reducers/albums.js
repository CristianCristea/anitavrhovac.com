import { collections } from './../fixtures';
// set to empty array after dev
const initialState = collections;

export const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ALBUM':
      return state.concat(action.album);
    case 'EDIT_ALBUM':
      return state.map(album => {
        if (album.id === action.id) {
          return {
            ...album,
            ...action.updates
          };
        }
        return album;
      });
    case 'DELETE_ALBUM':
      return state.filter(album => album.id !== action.id);
    // can also use editAlbum
    case 'PUBLISH_ALBUM':
      return state.map(album => {
        if (album.id === action.id) {
          return {
            ...album,
            publicAlbum: true
          };
        }
        return album;
      });
    case 'ADD_ALBUM_PHOTO':
      return state.map(album => {
        if (album.id === action.id) {
          return {
            ...album,
            photos: [...album.photos, action.photo]
          };
        }
        return album;
      });
    default:
      return state;
  }
};

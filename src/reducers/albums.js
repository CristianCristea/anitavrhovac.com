import { collections } from './../fixtures';
const initialState = collections;

export const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PUBLIC_ALBUMS':
      return action.collections.filter(collection => collection.publicAlbum);
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
    case 'EDIT_ALBUM_PHOTO':
      return state.map(album => {
        if (album.id === action.albumId) {
          const photos = album.photos.map(photo => {
            if (photo.id === action.photoId) {
              return {
                ...photo,
                ...action.updates
              };
            }
            return photo;
          });
          return {
            ...album,
            photos
          };
        }

        return album;
      });
    case 'DELETE_ALBUM_PHOTO':
      return state.map(album => {
        if (album.id === action.albumId) {
          const photos = album.photos.filter(
            photo => photo.id !== action.photoId
          );
          return {
            ...album,
            photos
          };
        }

        return album;
      });
    case 'SET_ALBUM_COVER':
      return state.map(album => {
        if (album.id === action.albumId) {
          const newCover = album.photos.filter(
            photo => photo.id === action.photoId
          )[0];

          return {
            ...album,
            cover: {
              photo_url: newCover.photo_url,
              photo_public_id: newCover.photo_public_id
            }
          };
        }

        return album;
      });
    default:
      return state;
  }
};

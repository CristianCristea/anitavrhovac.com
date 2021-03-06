const initialState = [];

export default (state = initialState, action) => {
  // TODO: refactor setAlbums and setPhotos in one setData function
  // 2 database requests
  switch (action.type) {
    case 'SET_ALBUMS':
      return action.collections;
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
    case 'ADD_ALBUM_PHOTO':
      return state.map(album => {
        if (album.id === action.id) {
          album.photos = album.photos || [];
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
    default:
      return state;
  }
};

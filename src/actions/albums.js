import database from './../firebase/firebase';
import { deletePhotos } from './photos';

// get the albums from the database
export const setAlbums = collections => ({
  type: 'SET_ALBUMS',
  collections
});
// change to startSetData - set the photos too
export const startSetAlbums = () => {
  return dispatch => {
    return database
      .ref('collections')
      .once('value')
      .then(snapshot => {
        const collections = [];

        snapshot.forEach(childSnapshot => {
          collections.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        // convert album.photos to array
        let albumPhotos = [];
        collections.forEach(collection => {
          if (collection.photos) {
            for (let photo in collection.photos) {
              albumPhotos.push({
                id: photo,
                tags: collection.photos[photo].tags.values(),
                ...collection.photos[photo]
              });
            }
            // assign a copy of albumPhotos
            collection.photos = albumPhotos.slice(0);
          }
          albumPhotos.length = 0;
        });

        dispatch(setAlbums(collections));
      });
  };
};

// add album
export const addAlbum = album => ({
  type: 'ADD_ALBUM',
  album
});

export const startAddAlbum = (albumData = {}) => {
  // function gets called internally by redux with dispatch as arg
  return dispatch => {
    // default album
    const {
      name = '',
      description = '',
      location = '',
      publicAlbum = false,
      created_at = '',
      cover = {
        photo_url:
          'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317221/image-placeholder_bkadyj.jpg',
        photo_public_id: 'image-placeholder_bkadyj'
      }
    } = albumData;
    const album = {
      name,
      description,
      location,
      publicAlbum,
      cover,
      created_at
    };
    // add data to firebase
    // return the promise to be able to chain another in the tests
    return database
      .ref('collections')
      .push(album)
      .then(ref => {
        // dispatch ADD_ALBUM to update redux store
        dispatch(
          addAlbum({
            id: ref.key,
            ...album
          })
        );
      });
  };
};

// edit
export const editAlbum = (id, updates) => ({
  type: 'EDIT_ALBUM',
  id,
  updates
});

export const startEditAlbum = (id, updates) => {
  return dispatch => {
    return database
      .ref(`collections/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editAlbum(id, updates));
      });
  };
};

// delete
export const deleteAlbum = id => ({
  type: 'DELETE_ALBUM',
  id
});

export const startDeleteAlbum = album => {
  return dispatch => {
    return database
      .ref(`collections/${album.id}`)
      .remove()
      .then(() => {
        dispatch(deleteAlbum(album.id));
        dispatch(deletePhotos(album.photos));
      });
  };
};

// add photo to album
export const addAlbumPhoto = (id, photo) => ({
  type: 'ADD_ALBUM_PHOTO',
  id,
  photo
});

// edit photo to album
export const editAlbumPhoto = (albumId, photoId, updates) => ({
  type: 'EDIT_ALBUM_PHOTO',
  albumId,
  photoId,
  updates
});

// delete photo from album
export const deleteAlbumPhoto = (albumId, photoId) => ({
  type: 'DELETE_ALBUM_PHOTO',
  albumId,
  photoId
});

// delete all photos from an album
export const deleteAlbumPhotos = album => ({
  type: 'DELETE_ALBUM_PHOTOS',
  album
});

export const startDeleteAlbumPhotos = album => {
  const photosToDelete = {};
  // delete all album photos from photos
  album.photos.forEach(photo => {
    photosToDelete[`photos/${photo.id}`] = null;
  });
  // delete all photos from collection
  photosToDelete[`collections/${album.id}/photos`] = null;

  return dispatch => {
    return database
      .ref()
      .update(photosToDelete)
      .then(() => {
        dispatch(deleteAlbumPhotos(album));
        dispatch(deletePhotos(album.photos));
      });
  };
};

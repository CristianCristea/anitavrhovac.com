import database from './../firebase/firebase';
import { addAlbumPhoto, deleteAlbumPhoto, editAlbumPhoto } from './albums';

export const setPhotos = photos => ({
  type: 'SET_PHOTOS',
  photos
});

export const startSetPhotos = () => {
  return dispatch => {
    return database
      .ref('photos')
      .once('value')
      .then(snapshot => {
        const photos = [];

        snapshot.forEach(childSnapshot => {
          photos.push({
            id: childSnapshot.key,
            ...childSnapshot
          });
        });
        dispatch(setPhotos(photos));
      });
  };
};

// add photo
export const addPhoto = photo => ({
  type: 'ADD_PHOTO',
  photo
});

export const startAddPhoto = (album = {}, photoData = {}) => {
  const {
    created_at = '',
    description = '',
    location = '',
    tags = [],
    likes = 0,
    liked_by_admin = false,
    photo_url = '',
    photo_public_id = ''
  } = photoData;
  const photo = {
    created_at,
    description,
    location,
    tags,
    likes,
    liked_by_admin,
    photo_url,
    photo_public_id
  };
  const {
    id,
    name,
    description: albumDescription,
    location: albumLocation
  } = album;
  const singlePhoto = Object.assign(
    {},
    {
      ...photo,
      album: {
        id,
        name,
        description: albumDescription,
        location: albumLocation
      }
    }
  );
  let newPhotoKey = database
    .ref()
    .child('photos')
    .push().key;
  let photos = {};

  photos[`photos/${newPhotoKey}`] = singlePhoto;
  photos[`collections/${album.id}/photos/${newPhotoKey}`] = photo;

  return dispatch => {
    return database
      .ref()
      .update(photos)
      .then(() => {
        dispatch(addAlbumPhoto(album.id, { id: newPhotoKey, ...photo }));
        dispatch(addPhoto({ id: newPhotoKey, ...singlePhoto }));
      });
  };
};

// delete photo
export const deletePhoto = id => ({
  type: 'DELETE_PHOTO',
  id
});

export const deletePhotos = photos => ({
  type: 'DELETE_PHOTOS',
  photos
});

// removes only the data from the database and store not from cloudinary
// TODO: delete from cloudinary
export const startDeletePhoto = (albumId, photoId) => {
  let photos = {};

  photos[`photos/${photoId}`] = null;
  photos[`collections/${albumId}/photos/${photoId}`] = null;

  return dispatch => {
    return database
      .ref()
      .update(photos)
      .then(() => {
        dispatch(deleteAlbumPhoto(albumId, photoId));
        dispatch(deletePhoto(photoId));
      });
  };
};

// edit photo
export const editPhoto = (id, updates) => ({
  type: 'EDIT_PHOTO',
  id,
  updates
});

export const startEditPhoto = (photoId, albumId, photoUpdates) => {
  return dispatch => {
    database
      .ref(`photos/${photoId}`)
      .update(photoUpdates)
      .then(() => {
        dispatch(editPhoto(photoId, photoUpdates));
      });

    return database
      .ref(`collections/${albumId}/photos/${photoId}`)
      .update(photoUpdates)
      .then(() => {
        dispatch(editAlbumPhoto(albumId, photoId, photoUpdates));
      });
  };
};

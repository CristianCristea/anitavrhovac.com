import database from './../firebase/firebase';
import { addAlbumPhoto, deleteAlbumPhoto, editAlbumPhoto } from './albums';

export const setPhotos = photos => ({
  type: 'SET_PHOTOS',
  photos
});

export const startSetPhotos = () => {
  const uid = process.env.REACT_APP_FIREBASE_USER_ID;

  return dispatch => {
    return database
      .ref(`${uid}/photos`)
      .once('value')
      .then(snapshot => {
        const photos = [];

        snapshot.forEach(childSnapshot => {
          photos.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
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
    photo_public_id = '',
    isCover = false
  } = photoData;
  const photo = {
    created_at,
    description,
    location,
    tags,
    likes,
    liked_by_admin,
    photo_url,
    photo_public_id,
    isCover
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
  let photos = {};

  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    let newPhotoKey = database
      .ref()
      .child(`${uid}/photos`)
      .push().key;

    photos[`${uid}/collections/${album.id}/photos/${newPhotoKey}`] = photo;
    photos[`${uid}/photos/${newPhotoKey}`] = singlePhoto;

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

export const deletePhotos = (photos = []) => ({
  type: 'DELETE_PHOTOS',
  photos
});

// removes only the data from the database and store not from cloudinary
// TODO: delete from cloudinary
export const startDeletePhoto = (albumId, photoId) => {
  return (dispatch, getState) => {
    let photos = {};
    const uid = getState().auth.uid;

    photos[`${uid}/photos/${photoId}`] = null;
    photos[`${uid}/collections/${albumId}/photos/${photoId}`] = null;

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
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    database
      .ref(`${uid}/photos/${photoId}`)
      .update(photoUpdates)
      .then(() => {
        dispatch(editPhoto(photoId, photoUpdates));
      });

    return database
      .ref(`${uid}/collections/${albumId}/photos/${photoId}`)
      .update(photoUpdates)
      .then(() => {
        dispatch(editAlbumPhoto(albumId, photoId, photoUpdates));
      });
  };
};

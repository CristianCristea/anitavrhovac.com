import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import database from './../firebase/firebase';
import { collections, photos } from './../fixtures';
import { addAlbumPhoto, startDeleteAlbumPhotos } from './albums';
import {
  addPhoto,
  editPhoto,
  deletePhoto,
  deletePhotos,
  startEditPhoto,
  startDeletePhoto,
  startAddPhoto
} from './photos';
// TODO: separate all the test suites - add, edit, delete, fetch

const createMockStore = configureMockStore([thunk]);

// *********** add photo ******************** //
describe('add photo', () => {
  // *********** add photo to photos action object ******************** //
  it('should setup add photo to photos action object', () => {
    const action = addPhoto(photos[0]);

    expect(action).toEqual({
      type: 'ADD_PHOTO',
      photo: photos[0]
    });
  });

  // *********** add photo to photos - database ******************** //
  it('should add photo to firebase - photos', done => {
    const photo = {
      description: '********',
      tags: ['avocado', 'eggs', 'food'],
      likes: 12,
      liked_by_admin: true,
      created_at: moment().unix(),
      location: 'Mexico',
      photo_url:
        'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317204/brooke-lark-229136-unsplash-regular_v2soiw.jpg',
      photo_public_id: 'brooke-lark-229136-unsplash-regular_v2soiw'
    };

    const { id, description, name, location } = collections[2];
    const albumData = { id, description, name, location };
    const store = createMockStore({});

    store.dispatch(startAddPhoto(collections[2], photo)).then(() => {
      const actions = store.getActions();
      expect(actions[1]).toEqual({
        type: 'ADD_PHOTO',
        photo: {
          id: expect.any(String),
          ...photo,
          album: { ...albumData }
        }
      });

      database
        .ref(`photos/${actions[1].photo.id}`)
        .once('value')
        .then(snapshot => {
          expect(snapshot.val()).toEqual({ ...photo, album: { ...albumData } });
        });

      done();
    });
  });
});

// *********** update photo ******************** //
describe('should edit photo', () => {
  it('should setup edit photo in photos action object', () => {
    // no photos in albums - set a photo first
    const id = photos[1].id;
    const photoUpdates = {
      description: 'new description',
      location: 'new location'
    };
    const action = editPhoto(id, photoUpdates);

    expect(action).toEqual({
      type: 'EDIT_PHOTO',
      id,
      updates: photoUpdates
    });
  });

  it('should edit photo from firebase', done => {
    const store = createMockStore({});
    const albumId = collections[0].id;
    const photoId = collections[0].photos[1].id;
    const updates = { description: '***********************' };
    store.dispatch(startEditPhoto(photoId, albumId, updates)).then(() => {
      // edit dispathes 2 actions - edit photo inside albums/photos and photos/
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_PHOTO',
        id: photoId,
        updates
      });
      database
        .ref(`photos/${photoId}`)
        .once('value')
        .then(snapshot => {
          expect(snapshot.val().description).toEqual(updates.description);
          done();
        });
    });
  });
});

// *********** delete one photo from firebase!!! ******************** //
describe('delete one photo', () => {
  it('should setup delete single photo action object', () => {
    const id = photos[2].id;
    const action = deletePhoto(id);

    expect(action).toEqual({
      type: 'DELETE_PHOTO',
      id
    });
  });

  it('should delete the photo from firebase - photos', done => {
    const store = createMockStore({});
    const albumId = collections[0].id;
    const photoId = collections[0].photos[2].id;

    store.dispatch(startDeletePhoto(albumId, photoId)).then(() => {
      const actions = store.getActions();
      expect(actions[1]).toEqual({
        type: 'DELETE_PHOTO',
        id: photoId
      });

      return database
        .ref(`photos/${photoId}`)
        .once('value')
        .then(snapshot => {
          expect(snapshot.val()).toBeFalsy();
          done();
        });
    });
  });
});

// *********** delte photos ******************** //
describe('delete photos', () => {
  it('should setup delete photos action object', () => {
    const photos = collections[0].photos;
    const action = deletePhotos(photos);

    expect(action).toEqual({
      type: 'DELETE_PHOTOS',
      photos
    });
  });

  // *********** delete photos if the album is deleted - database ******************** //
  it('should delete all the photos from photos-firebase belonging to an album', done => {
    const store = createMockStore({});
    const album = collections[0];

    store.dispatch(startDeleteAlbumPhotos(album)).then(() => {
      const actions = store.getActions();

      expect(actions[1]).toEqual({
        type: 'DELETE_PHOTOS',
        photos: album.photos
      });

      database
        .ref('photos')
        .once('value')
        .then(snapshot => {
          expect(Object.keys(snapshot.val())).toEqual(
            expect.not.arrayContaining(actions[1].photos)
          );
          done();
        });
    });
  });
});

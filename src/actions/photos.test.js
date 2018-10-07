import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import database from './../firebase/firebase';
import { collections, photos } from './../fixtures';
import { addAlbumPhoto } from './albums';
import {
  addPhoto,
  editPhoto,
  deletePhoto,
  startEditPhoto,
  startDeletePhoto,
  startAddPhoto
} from './photos';

const createMockStore = configureMockStore([thunk]);
// set test data to firebase - photos
beforeEach(done => {
  const photoData = {};
  const albumPhotos = {};
  photos.forEach(
    ({
      id,
      description,
      created_at,
      location,
      likes,
      liked_by_admin,
      album,
      tags,
      photo_url,
      photo_public_id
    }) => {
      photoData[id] = {
        description,
        created_at,
        location,
        likes,
        tags,
        liked_by_admin,
        album,
        photo_url,
        photo_public_id
      };

      albumPhotos[id] = {
        created_at,
        description,
        liked_by_admin,
        likes,
        location,
        photo_url,
        photo_public_id,
        tags
      };
    }
  );

  database.ref('photos').set(photoData);

  database
    .ref('collections/collection_1/photos')
    .set(albumPhotos)
    .then(() => done());
});

describe('photos', () => {
  // *********** add photo action object ******************** //
  it('should setup add single photo action object', () => {
    const action = addPhoto(photos[0]);

    expect(action).toEqual({
      type: 'ADD_PHOTO',
      photo: photos[0]
    });
  });

  // *********** add photo to album action object ******************** //
  it('should setup add photo to album action object', () => {
    const id = collections[1].id;
    const {
      description,
      photo_url,
      photo_public_id,
      tags,
      likes,
      liked_by_admin,
      created_at,
      location
    } = photos[0];
    const photoData = {
      description,
      photo_url,
      photo_public_id,
      tags,
      likes,
      liked_by_admin,
      created_at,
      location
    };
    const action = addAlbumPhoto(id, photoData);

    expect(action).toEqual({
      type: 'ADD_ALBUM_PHOTO',
      id,
      photo: {
        ...photoData
      }
    });
  });

  // *********** edit photo action object ******************** //
  it('should setup edit single photo action object', () => {
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

  // ***********  edit photo - database ******************** //
  it('should edit photo from firebase - photos', done => {
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

  // *********** edit album photo - database ******************** //
  it('should edit photo from firebase - album/photos', done => {
    const store = createMockStore({});
    const albumId = collections[0].id;
    const photoId = collections[0].photos[1].id;
    const updates = { description: '***********************' };
    store.dispatch(startEditPhoto(photoId, albumId, updates)).then(() => {
      // edit dispathes 2 actions - edit photo inside albums/photos and photos/
      const actions = store.getActions();

      expect(actions[1]).toEqual({
        type: 'EDIT_ALBUM_PHOTO',
        albumId,
        photoId,
        updates
      });

      database
        .ref(`collections/${albumId}/photos/${photoId}`)
        .once('value')
        .then(snapshot => {
          expect(snapshot.val().description).toEqual(updates.description);
          done();
        });
    });
  });

  // *********** delte photo action object ******************** //
  it('should setup delete single photo action object', () => {
    const id = photos[2].id;
    const action = deletePhoto(id);

    expect(action).toEqual({
      type: 'DELETE_PHOTO',
      id
    });
  });

  // *********** delete album photo - database ******************** //
  it('should delete the photo from firebase - album/photos', done => {
    const store = createMockStore({});
    const albumId = collections[0].id;
    const photoId = collections[0].photos[2].id;

    store.dispatch(startDeletePhoto(albumId, photoId)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'DELETE_ALBUM_PHOTO',
        albumId,
        photoId
      });

      return database
        .ref(`collections/${albumId}/photos/${photoId}`)
        .once('value')
        .then(snapshot => {
          expect(snapshot.val()).toBeFalsy();
          done();
        });
    });
  });

  // *********** delete photo - database ******************** //
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

  // *********** add album photo - database ******************** //
  it('should add photo to firebase - album/photos', done => {
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
      expect(actions[0].type).toEqual('ADD_ALBUM_PHOTO');
      expect(actions[0].id).toEqual('collection_3');
      expect(actions[0].photo).toEqual({ id: expect.any(String), ...photo });

      database
        .ref(`collections/${albumData.id}/photos/${actions[0].photo.id}`)
        .once('value')
        .then(snapshot => {
          expect(snapshot.val()).toEqual({ ...photo });
        });

      done();
    });
  });

  // *********** add photo - database ******************** //
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
          console.log(snapshot.val());
          expect(snapshot.val()).toEqual({ ...photo, album: { ...albumData } });
        });

      done();
    });
  });
});

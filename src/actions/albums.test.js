import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from './../firebase/firebase';
import { collections } from './../fixtures';
import {
  setPublicAlbums,
  startSetPublicAlbums,
  addAlbum,
  startAddAlbum,
  editAlbum,
  deleteAlbum,
  publishAlbum,
  addAlbumPhoto,
  editAlbumPhoto,
  deleteAlbumPhoto,
  setAlbumCover
} from './albums';

const createMockStore = configureMockStore([thunk]);
// set test data to firebase
// use done() to run the test after the data is set in firebase
beforeEach(done => {
  const albumsData = {};

  // firebase does not accept arrays
  // structure data for firebase - id: {}
  collections.forEach(
    ({
      id,
      name,
      description,
      created_at,
      location,
      publicAlbum,
      cover,
      photos = []
    }) => {
      albumsData[id] = {
        name,
        description,
        created_at,
        location,
        publicAlbum,
        cover,
        photos
      };
    }
  );
  database
    .ref('collections')
    .set(albumsData)
    .then(() => done());
});

describe('album actions', () => {
  it('should set public albums', () => {
    const action = setPublicAlbums(collections);

    expect(action).toEqual({
      type: 'SET_PUBLIC_ALBUMS',
      collections
    });
  });

  it('should set the albums from the database', done => {
    const store = createMockStore({});

    store.dispatch(startSetPublicAlbums()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_PUBLIC_ALBUMS',
        collections
      });
    });
    done();
  });

  it('should setup add album  action object with passed values', () => {
    const action = addAlbum(collections[2]);

    expect(action).toEqual({
      type: 'ADD_ALBUM',
      album: collections[2]
    });
  });

  // use done() for async tests
  it('should add album to database and store', done => {
    const store = createMockStore({});
    const albumData = {
      name: 'TEst name',
      description: 'Test desc',
      location: 'test loc',
      publicAlbum: 'false',
      cover: {
        photo_url:
          'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317221/image-placeholder_bkadyj.jpg',
        photo_public_id: 'image-placeholder_bkadyj'
      },
      created_at: moment().unix()
    };

    store
      .dispatch(startAddAlbum(albumData))
      .then(() => {
        const actions = store.getActions(); // returns array of actions
        expect(actions[0]).toEqual({
          type: 'ADD_ALBUM',
          album: {
            id: expect.any(String),
            ...albumData
          }
        });

        return database.ref(`collections/${actions[0].album.id}`).once('value');
      })
      .then(snapshot => {
        // firebase does not support arrays and doesnt store empty objects
        // removed photos array
        expect(snapshot.val()).toEqual(albumData);
        done();
      });
  });

  it('should add album with defaults to database and store', done => {
    const store = createMockStore({});
    const albumDefaultData = {
      name: '',
      description: '',
      location: '',
      publicAlbum: false,
      created_at: '',
      cover: {
        photo_url:
          'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317221/image-placeholder_bkadyj.jpg',
        photo_public_id: 'image-placeholder_bkadyj'
      }
    };
    store
      .dispatch(startAddAlbum(albumDefaultData))
      .then(() => {
        const actions = store.getActions(); // returns array of actions
        expect(actions[0]).toEqual({
          type: 'ADD_ALBUM',
          album: {
            id: expect.any(String),
            ...albumDefaultData
          }
        });

        return database.ref(`collections/${actions[0].album.id}`).once('value');
      })
      .then(snapshot => {
        // firebase does not support arrays and doesnt store empty objects
        // removed photos array
        expect(snapshot.val()).toEqual(albumDefaultData);
        done();
      });
  });

  // edit album
  it('should setup edit album action object', () => {
    const action = editAlbum('test_id', {
      name: 'Edited album name',
      location: 'Edited album location'
    });

    expect(action).toEqual({
      type: 'EDIT_ALBUM',
      id: 'test_id',
      updates: {
        name: 'Edited album name',
        location: 'Edited album location'
      }
    });
  });

  // delete album
  it('should setup delete album action object', () => {
    const action = deleteAlbum('test_album_id');

    expect(action).toEqual({
      type: 'DELETE_ALBUM',
      id: 'test_album_id'
    });
  });

  // publish album
  it('should setup publish album action object', () => {
    const action = publishAlbum('test_album_id');

    expect(action).toEqual({
      type: 'PUBLISH_ALBUM',
      id: 'test_album_id'
    });
  });

  // add album photo
  it('should setup add photo to album action object', () => {
    const action = addAlbumPhoto(collections[0].id, collections[0].photos[0]);

    expect(action).toEqual({
      type: 'ADD_ALBUM_PHOTO',
      id: collections[0].id,
      photo: collections[0].photos[0]
    });
  });

  // edit album photo
  it('should setup edit album photo action object', () => {
    const action = editAlbumPhoto('album_id', 'photo_id', {
      location: 'New location',
      tags: ['new tag'],
      description: 'new description'
    });

    expect(action).toEqual({
      type: 'EDIT_ALBUM_PHOTO',
      albumId: 'album_id',
      photoId: 'photo_id',
      updates: {
        location: 'New location',
        tags: ['new tag'],
        description: 'new description'
      }
    });
  });

  // delete photo from album
  it('should setup delete album photo action object', () => {
    const action = deleteAlbumPhoto('album_id', 'photo_id');

    expect(action).toEqual({
      type: 'DELETE_ALBUM_PHOTO',
      albumId: 'album_id',
      photoId: 'photo_id'
    });
  });

  // set album cover
  it('should setup set album cover action object', () => {
    const action = setAlbumCover('album_id', 'photo_id');

    expect(action).toEqual({
      type: 'SET_ALBUM_COVER',
      albumId: 'album_id',
      photoId: 'photo_id'
    });
  });
});

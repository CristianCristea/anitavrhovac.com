import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from './../firebase/firebase';
import { collections } from './../fixtures';
import {
  setAlbums,
  startSetAlbums,
  addAlbum,
  startAddAlbum,
  editAlbum,
  startEditAlbum,
  deleteAlbum,
  startDeleteAlbum,
  addAlbumPhoto,
  editAlbumPhoto,
  deleteAlbumPhoto
} from './albums';

// TODO: tests for cover change and publish album

const createMockStore = configureMockStore([thunk]);
// set test data to firebase
// use done() to run the test after the data is set in firebase
beforeEach(done => {
  const albumsData = {};
  /*-------------------album/photos not added correctly----------------------------*/
  // firebase does not accept arrays
  // structure data for firebase - id: {}
  collections.forEach(
    ({ id, name, description, created_at, location, publicAlbum, cover }) => {
      albumsData[id] = {
        name,
        description,
        created_at,
        location,
        publicAlbum,
        cover
      };
    }
  );
  database
    .ref('collections')
    .set(albumsData)
    .then(() => done());
});

describe('album actions', () => {
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

  it('should updated the album in the database', done => {
    const store = createMockStore({});
    const id = collections[1].id;
    const updates = {
      name: 'Edited name',
      publicAlbum: true,
      cover: {
        photo_url:
          'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317339/food-regular_shipue.jpg',
        photo_public_id: 'food-regular_shipue.jpg'
      }
    };
    const actions = store.getActions();

    store
      .dispatch(startEditAlbum(id, updates))
      .then(() => {
        expect(actions[0]).toEqual({
          type: 'EDIT_ALBUM',
          id,
          updates
        });

        return database.ref(`collections/${id}`).once('value');
      })
      .then(snapshot => {
        expect(snapshot.val().name).toEqual(updates.name);
        expect(snapshot.val().cover).toEqual(updates.cover);
        expect(snapshot.val().publicAlbum).toEqual(updates.publicAlbum);
        done();
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

  it('should remove album from database', done => {
    const store = createMockStore({});
    const id = collections[1].id;
    store
      .dispatch(startDeleteAlbum(id))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'DELETE_ALBUM',
          id
        });

        return database.ref(`collections/${id}`).once('value');
      })
      .then(snapshot => {
        expect(snapshot.val()).toBeFalsy();
        done();
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

  it('should setup set albums action object', () => {
    const action = setAlbums(collections);
    expect(action).toEqual({
      type: 'SET_ALBUMS',
      collections
    });
  });

  it('should fetch the albums from firebase', done => {
    const store = createMockStore({});
    store
      .dispatch(startSetAlbums())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'SET_ALBUMS',
          collections
        });
      })
      .catch(err => console.log(err));
    done();
  });
});

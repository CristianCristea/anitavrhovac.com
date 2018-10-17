import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from './../firebase/firebase';
import { collections, photos } from './../fixtures';
import { startEditPhoto, startAddPhoto, startDeletePhoto } from './photos';
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
  deleteAlbumPhoto,
  deleteAlbumPhotos,
  startDeleteAlbumPhotos
} from './albums';

const createMockStore = configureMockStore([thunk]);
const uid = 'uniqFirebaseUserId';
const defaultAuthState = { auth: { uid } };

// set test data to firebase
beforeEach(done => {
  const albumsData = {};
  /*-------------------album/photos not added correctly----------------------------*/
  // firebase does not accept arrays
  // structure data for firebase - id: {}

  // create collections(albums) object
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

  // updates - to add the data to firebase
  // create photos object - for adding the photos to a project
  const updates = {};
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
      photo_public_id,
      isCover
    }) => {
      // add photos to firebase
      updates[`${uid}/photos/${id}`] = {
        description,
        created_at,
        location,
        likes,
        tags,
        liked_by_admin,
        album,
        photo_url,
        photo_public_id,
        isCover
      };

      albumPhotos[id] = {
        created_at,
        description,
        liked_by_admin,
        likes,
        location,
        photo_url,
        photo_public_id,
        tags,
        isCover
      };
    }
  );

  // add the photos to the first album - album/photos
  albumsData['collection_1'].photos = Object.assign({}, albumPhotos);
  // add albums to update object
  updates[`${uid}/collections`] = Object.assign({}, albumsData);

  // add data(collections and photos) to firebase;
  return database
    .ref()
    .remove()
    .then(() => {
      return database
        .ref()
        .update(updates)
        .then(() => done());
    });
});

// *********** create album ******************** //
describe('create album', () => {
  it('should setup add album  action object with passed values', () => {
    const action = addAlbum(collections[2]);

    expect(action).toEqual({
      type: 'ADD_ALBUM',
      album: collections[2]
    });
  });

  // use done() for async tests
  it('should add album to database and store', done => {
    const store = createMockStore(defaultAuthState);
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

        return database
          .ref(`${uid}/collections/${actions[0].album.id}`)
          .once('value');
      })
      .then(snapshot => {
        // firebase does not support arrays and doesnt store empty objects
        // removed photos array
        expect(snapshot.val()).toEqual(albumData);
        done();
      });
  });
});

// *********** edit album ******************** //
describe('update album', () => {
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

  it('should updated the album in the database and store', done => {
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`${uid}/collections/${id}`).once('value');
      })
      .then(snapshot => {
        expect(snapshot.val().name).toEqual(updates.name);
        expect(snapshot.val().cover).toEqual(updates.cover);
        expect(snapshot.val().publicAlbum).toEqual(updates.publicAlbum);
        done();
      });
  });
});

// *********** add photo to album ******************** //
describe('add photo to album', () => {
  const photo = {
    created_at: moment().unix(),
    description: '********',
    location: 'Mexico',
    tags: ['avocado', 'eggs', 'food'],
    likes: 12,
    liked_by_admin: false,
    photo_url:
      'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317204/brooke-lark-229136-unsplash-regular_v2soiw.jpg',
    photo_public_id: 'brooke-lark-229136-unsplash-regular_v2soiw',
    isCover: false
  };
  it('should setup add photo to album action object', () => {
    const albumId = collections[0].id;
    const action = addAlbumPhoto(albumId, photo);

    expect(action).toEqual({
      type: 'ADD_ALBUM_PHOTO',
      id: albumId,
      photo
    });
  });

  it('should add photo to firebase - album/photos', done => {
    const store = createMockStore(defaultAuthState);
    const album = collections[0];

    store.dispatch(startAddPhoto(album, photo)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_ALBUM_PHOTO',
        id: album.id,
        photo: { id: expect.any(String), ...photo }
      });

      database
        .ref(`${uid}/collections/${album.id}/photos/${actions[0].photo.id}`)
        .once('value')
        .then(snapshot => {
          expect(snapshot.val()).toEqual({ ...photo });
        });

      done();
    });
  });
});

// *********** update album photo ******************** //
describe('update album photo', () => {
  const albumId = 'collection_1';
  const photoId = 'photo_1';
  it('should setup edit album photo action object', () => {
    const updates = {
      location: 'New location',
      description: 'new description'
    };
    const action = editAlbumPhoto(albumId, photoId, updates);

    expect(action).toEqual({
      type: 'EDIT_ALBUM_PHOTO',
      albumId,
      photoId,
      updates
    });
  });

  it('should edit photo from firebase - album/photos', done => {
    const store = createMockStore(defaultAuthState);
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
        .ref(`${uid}/collections/${albumId}/photos/${photoId}`)
        .once('value')
        .then(snapshot => {
          expect(snapshot.val().description).toEqual(updates.description);
          done();
        });
    });
  });
});

// *********** delete one photo from album ******************** //
describe('remove photo from album', () => {
  const albumId = collections[0].id;
  const photoId = collections[0].photos[2].id;

  it('should setup delete album photo action object', () => {
    const action = deleteAlbumPhoto(albumId, photoId);

    expect(action).toEqual({
      type: 'DELETE_ALBUM_PHOTO',
      albumId,
      photoId
    });
  });

  it('should delete the photo from firebase - album/photos', done => {
    const store = createMockStore(defaultAuthState);

    store.dispatch(startDeletePhoto(albumId, photoId)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'DELETE_ALBUM_PHOTO',
        albumId,
        photoId
      });

      return database
        .ref(`${uid}/collections/${albumId}/photos/${photoId}`)
        .once('value')
        .then(snapshot => {
          expect(snapshot.val()).toBeFalsy();
          done();
        });
    });
  });
});

// *********** delete all photos ******************** //
describe('delete all the photos from the album', () => {
  it('should setup delete photos from an album action object', () => {
    const album = collections[0];
    const action = deleteAlbumPhotos(album);

    expect(action).toEqual({
      type: 'DELETE_ALBUM_PHOTOS',
      album
    });
  });

  it('should delete all the album photos from database', done => {
    const store = createMockStore(defaultAuthState);
    const album = collections[0];

    store.dispatch(startDeleteAlbumPhotos(album)).then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'DELETE_ALBUM_PHOTOS',
        album
      });

      return database
        .ref(`${uid}/collections/${album.id}/photos`)
        .once('value')
        .then(snapshot => {
          expect(snapshot.val()).toBeFalsy();
          done();
        });
    });
  });
});

// *********** get albums from database ******************** //
describe('fetch albums from databse', () => {
  it('should setup set albums action object', () => {
    const action = setAlbums(collections);
    expect(action).toEqual({
      type: 'SET_ALBUMS',
      collections
    });
  });

  it('should fetch the albums from firebase', done => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetAlbums()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_ALBUMS',
        collections: actions[0].collections
      });
    });
    // .catch(err => console.log(err));
    done();
  });
});

// *********** delete album ******************** //
describe('remove album', () => {
  it('should setup delete album action object', () => {
    const action = deleteAlbum('test_album_id');

    expect(action).toEqual({
      type: 'DELETE_ALBUM',
      id: 'test_album_id'
    });
  });

  it('should remove album from database', done => {
    const store = createMockStore(defaultAuthState);
    const album = collections[1];
    store
      .dispatch(startDeleteAlbum(album))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'DELETE_ALBUM',
          id: album.id
        });

        return database.ref(`${uid}/collections/${album.id}`).once('value');
      })
      .then(snapshot => {
        expect(snapshot.val()).toBeFalsy();
        done();
      });
  });
});

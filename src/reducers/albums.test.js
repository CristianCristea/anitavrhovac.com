import moment from 'moment';
import uuid from 'uuid';
import { collections } from './../fixtures';
import { albumsReducer } from './albums';

describe('albums reducer', () => {
  it('should initiate state', () => {
    const action = {
      type: '@@INIT'
    };
    const state = albumsReducer(undefined, action);

    expect(state).toEqual([]);
  });

  // add an album
  it('should add an album', () => {
    const album = {
      id: 'test_id',
      name: 'Test album',
      description: 'Test album description',
      created_at: moment().unix(),
      location: 'Mexico City',
      cover: {
        sizes: {
          full: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`
        }
      },
      photos: []
    };
    const action = {
      type: 'ADD_ALBUM',
      album
    };
    const state = albumsReducer(collections, action);

    expect(state).toEqual([...collections, album]);
  });

  // delete an album
  it('should delete an album', () => {
    const id = 'collection_1';
    const action = {
      type: 'DELETE_ALBUM',
      id
    };
    const state = albumsReducer(collections, action);

    expect(state).toEqual([collections[1], collections[2]]);
  });

  // not delete an album with invalid id
  it('should not delete an album with invalid id', () => {
    const id = '-1';
    const action = {
      type: 'DELETE_ALBUM',
      id
    };
    const state = albumsReducer(collections, action);

    expect(state).toEqual(collections);
  });

  // edit an album
  it('should edit an album', () => {
    const updates = {
      name: 'Edited name',
      location: 'Edited location',
      description: 'Edited description'
    };
    const action = {
      type: 'EDIT_ALBUM',
      id: 'collection_1',
      updates
    };
    const state = albumsReducer(collections, action);

    expect(state[0].name).toEqual(updates.name);
    expect(state[0].location).toEqual(updates.location);
    expect(state[0].description).toEqual(updates.description);
  });

  // publish an album
  it('should publish an album', () => {
    const id = collections[0].id;
    const action = {
      type: 'PUBLISH_ALBUM',
      id
    };
    const state = albumsReducer(collections, action);
    expect(state[0].publicAlbum).toBeTruthy();
  });

  // add photo to an album
  it('should add a photo to an album', () => {
    const photo = {
      id: uuid(),
      created_at: moment.unix(),
      description: 'test',
      location: 'test',
      tags: ['sky', 'forest'],
      likes: 0,
      liked_by_admin: false,
      sizes: {
        full: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`,
        regular: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`,
        small: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`,
        thumb: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`
      }
    };
    const action = {
      type: 'ADD_ALBUM_PHOTO',
      id: collections[0].id,
      photo
    };
    const state = albumsReducer(collections, action);
    expect(state[0].photos).toContain(photo);
  });

  // delete photo from an album
  it('should delete photo from an album', () => {
    const photoId = collections[0].photos[0].id;
    const albumId = collections[0].id;
    const action = {
      type: 'DELETE_ALBUM_PHOTO',
      albumId,
      photoId
    };
    const state = albumsReducer(collections, action);

    expect(state[0].photos).toEqual([
      collections[0].photos[1],
      collections[0].photos[2]
    ]);
  });

  // edit photo from an album
  it('should edit photo from an album', () => {
    const albumId = collections[0].id;
    const photoId = collections[0].photos[0].id;
    const updates = {
      description: 'Edited photo description',
      location: 'Edited location',
      tags: ['new tag']
    };
    const action = {
      type: 'EDIT_ALBUM_PHOTO',
      albumId,
      photoId,
      updates
    };
    const state = albumsReducer(collections, action);

    expect(state[0].photos[0].description).toEqual(updates.description);
    expect(state[0].photos[0].location).toEqual(updates.location);
    expect(state[0].photos[0].tags).toEqual(updates.tags);
  });

  // set album cover
  it('should set album cover', () => {
    const albumId = collections[0].id;
    const photoId = collections[0].photos[1].id;
    const action = {
      type: 'SET_ALBUM_COVER',
      albumId,
      photoId
    };
    const state = albumsReducer(collections, action);

    expect(state[0].cover.sizes.full).toEqual(
      collections[0].photos[1].sizes.full
    );
  });
});

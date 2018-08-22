// import moment from 'moment';
import { collections } from './../fixtures';
import {
  addAlbum,
  editAlbum,
  deleteAlbum,
  publishAlbum,
  addAlbumPhoto,
  editAlbumPhoto,
  deleteAlbumPhoto,
  setAlbumCover
} from './albums';

describe('album actions', () => {
  // add album with data
  it('should setup add album with passed values action object', () => {
    const action = addAlbum(collections[2]);

    expect(action).toEqual({
      type: 'ADD_ALBUM',
      album: collections[2]
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

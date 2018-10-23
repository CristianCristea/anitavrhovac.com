import uuid from 'uuid';
import moment from 'moment';
import { photos } from './../fixtures';
import photosReducer from './photos';

describe('photos reducer', () => {
  // add photo
  it('should add a photo', () => {
    const photo = {
      id: uuid(),
      description: 'test description',
      tags: ['clouds', 'sky'],
      likes: 12,
      liked_by_admin: true,
      created_at: moment().unix(),
      location: 'Mexico',
      album: {
        id: 'collection_1',
        name: 'First album',
        description: 'First album description',
        location: 'Mexico'
      },
      sizes: {
        full: `${process.env.PUBLIC_URL}/images/random_photo_id_1/food.jpg`,
        regular: `${
          process.env.PUBLIC_URL
        }/images/random_photo_id_1/food-regular.jpg`,
        small: `${
          process.env.PUBLIC_URL
        }/images/random_photo_id_1/food-small.jpg`,
        thumb: `${
          process.env.PUBLIC_URL
        }/images/random_photo_id_1/food-thumbnail.jpg`
      }
    };
    const action = { type: 'ADD_PHOTO', photo };
    const state = photosReducer(photos, action);

    expect(state).toEqual([...photos, photo]);
  });

  // edit photo
  // it('should edit a photo', () => {
  //   const updates = {
  //     location: 'Edited location',
  //     description: 'Edited description',
  //     tags: ['new tag']
  //   };
  //   const action = {
  //     type: 'EDIT_PHOTO',
  //     id: photos[0].id,
  //     updates
  //   };
  //   const state = photosReducer(photos, action);

  //   expect(state[0].tags).toEqual(updates.tags);
  //   expect(state[0].location).toEqual(updates.location);
  //   expect(state[0].description).toEqual(updates.description);
  // });

  it('should delete a photo', () => {
    const id = photos[0].id;
    const action = {
      type: 'DELETE_PHOTO',
      id
    };
    const state = photosReducer(photos, action);

    expect(state).toEqual([photos[1], photos[2], photos[3]]);
  });
});

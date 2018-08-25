import { photos } from './../fixtures';
import { addPhoto, editPhoto, deletePhoto } from './photos';

describe('photos', () => {
  // add photo
  it('should setup add single photo action object', () => {
    const action = addPhoto(photos[0]);

    expect(action).toEqual({
      type: 'ADD_PHOTO',
      photo: photos[0]
    });
  });

  // edit photo
  it('should setup edit single photo action object', () => {
    const photoUpdates = {
      description: 'new description',
      location: 'new location',
      tags: ['new tag']
    };
    const action = editPhoto(photos[0].id, photoUpdates);

    expect(action).toEqual({
      type: 'EDIT_PHOTO',
      id: photos[0].id,
      updates: photoUpdates
    });
  });

  // delete photo
  it('should setup delete single photo action object', () => {
    const action = deletePhoto(photos[0].id);

    expect(action).toEqual({
      type: 'DELETE_PHOTO',
      id: photos[0].id
    });
  });
});

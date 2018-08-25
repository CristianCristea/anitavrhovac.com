// add photo
export const addPhoto = photo => ({
  type: 'ADD_PHOTO',
  photo
});

// delete photo
export const deletePhoto = id => ({
  type: 'DELETE_PHOTO',
  id
});

// edit photo
export const editPhoto = (id, updates) => ({
  type: 'EDIT_PHOTO',
  id,
  updates
});

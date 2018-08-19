// add album
export const addAlbum = album => ({
  type: 'ADD_ALBUM',
  album
});

// edit
export const editAlbum = (id, updates) => ({
  type: 'EDIT_ALBUM',
  id,
  updates
});

// delete
export const deleteAlbum = id => ({
  type: 'DELETE_ALBUM',
  id
});

// publish
export const publishAlbum = id => ({
  type: 'PUBLISH_ALBUM',
  id
});

// add photo to album
export const addAlbumPhoto = (id, photo) => ({
  type: 'ADD_ALBUM_PHOTO',
  id,
  photo
});

const initialState = [];

export const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PHOTOS':
      return action.photos;
    case 'ADD_PHOTO':
      return state.concat(action.photo);
    case 'DELETE_PHOTO':
      return state.filter(photo => photo.id !== action.id);
    case 'DELETE_PHOTOS':
      const photosToDeleteIds = [];
      action.photos.forEach(photo => photosToDeleteIds.push(photo.id));
      return state.filter(photo => photosToDeleteIds.indexOf(photo.id) === -1);
    case 'EDIT_PHOTO':
      return state.map(photo => {
        if (photo.id === action.id) {
          return {
            ...photo,
            ...action.updates
          };
        }
        return photo;
      });
    default:
      return state;
  }
};

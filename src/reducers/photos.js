const initialState = {};

export const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PHOTO':
      return state.concat(action.photo);
    case 'DELETE_PHOTO':
      return state.filter(photo => photo.id !== action.id);
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

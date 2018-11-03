import React from 'react';
import AlbumForm from './../Form';
import './AddAblum.scss';

// *********** Add album page ******************** //
let AddAlbum = ({ history }) => {
  return (
    <div className="admin__add_album">
      <AlbumForm history={history} />
    </div>
  );
};

export default AddAlbum;

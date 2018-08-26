import React from 'react';
import { Link } from 'react-router-dom';
import AlbumForm from './../Form';

let AddAlbum = ({ history }) => {
  return (
    <div className="admin__add_album">
      <AlbumForm history={history} />
      <Link to={`${process.env.PUBLIC_URL}/anita/dashboard`}>
        Back to dashboard
      </Link>
    </div>
  );
};

export default AddAlbum;
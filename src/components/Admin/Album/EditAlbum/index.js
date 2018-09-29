import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AlbumForm from '../Form';
import AdminPhotos from '../../Photos';

// edit album page
let AdminAlbum = ({ album, history }) => {
  // display each photo with edit, delete, set cover btn
  return (
    <div className="admin__album">
      <img src={`${album.cover.sizes.full}`} alt="" />
      <AlbumForm album={album} edit history={history} />
      <Link to={`${process.env.PUBLIC_URL}/anita/${album.id}/add-photo`}>
        Add Photo
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/anita/dashboard`}>
        Back to dashboard
      </Link>
      <AdminPhotos album={album} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    album: state.collections.filter(
      album => album.id === ownProps.match.params.id
    )[0]
  };
};

AdminAlbum = connect(mapStateToProps)(AdminAlbum);
export default AdminAlbum;

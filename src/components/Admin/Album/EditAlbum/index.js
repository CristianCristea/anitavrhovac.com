import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import AlbumForm from '../Form';
import AdminPhotos from '../../Photos';
import { startDeleteAlbumPhotos } from '../../../../actions/albums';
import './EditAlbum.scss';

// *********** Edit album page ******************** //
let AdminAlbum = ({ album, history, dispatch }) => {
  // display each photo with edit, delete, set cover btn
  return (
    <div className="admin__album">
      <Image
        cloudName="dmz84tdv1"
        publicId={album.cover.photo_public_id}
        crop="scale"
        width="1000"
      />
      <AlbumForm album={album} edit history={history} />
      <Link to={`${process.env.PUBLIC_URL}/anita/${album.id}/add-photo`}>
        Add Photo
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/anita/dashboard`}>
        Back to dashboard
      </Link>
      <button onClick={() => dispatch(startDeleteAlbumPhotos(album))}>
        Delete all photos
      </button>
      <AdminPhotos album={album} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  album: state.collections.filter(
    album => album.id === ownProps.match.params.id
  )[0]
});

AdminAlbum = connect(mapStateToProps)(AdminAlbum);
export default AdminAlbum;

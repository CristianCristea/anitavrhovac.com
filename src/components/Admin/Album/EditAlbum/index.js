import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import AlbumForm from '../Form';
import AdminPhotos from '../../Photos';
import { startEditAlbum } from './../../../../actions/albums';
import './EditAlbum.scss';

// *********** Edit album page ******************** //
let AdminAlbum = ({ album, history, dispatch }) => {
  // display each photo with edit, delete, set cover btn
  let hasPhotos = album.photos.length > 0;
  let isPublic = album.publicAlbum;
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

      {/* render publish btn if the album is not public and has at least one photo*/}
      {!isPublic &&
        hasPhotos && (
          <button
            className="publish"
            onClick={() => {
              dispatch(startEditAlbum(album.id, { publicAlbum: true }));
              isPublic = !isPublic;
            }}
          >
            Publish
          </button>
        )}

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

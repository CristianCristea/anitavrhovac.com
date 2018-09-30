import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { deleteAlbumPhoto, setAlbumCover } from './../../../actions/albums';
import { deletePhoto } from './../../../actions/photos';
// import './AdminAlbums.css';

let AdminPhotos = ({ album, dispatch }) => {
  if (album.photos.length === 0) {
    return (
      <div>
        <p>No photos</p>
      </div>
    );
  }

  return (
    <div className="admin__photos">
      {album.photos.map(photo => {
        return (
          <div key={photo.id}>
            <div className="admin__photo">
              <Image
                cloudName="dmz84tdv1"
                publicId={photo.photo_public_id}
                crop="scale"
                width="300"
              />
              <h3>Likes: {photo.likes}</h3>
              <h3>{photo.description}</h3>
              <h3>{photo.location}</h3>
              <p>{photo.tags}</p>
              <Link
                to={`${process.env.PUBLIC_URL}/anita/${album.id}/edit-photo/${
                  photo.id
                }`}
                className="admin__photo--editBtn"
              >
                Edit
              </Link>
              <button
                disabled={album.cover.photo_public_id === photo.photo_public_id}
                className="admin__photo--setCoverBtn"
                onClick={() => dispatch(setAlbumCover(album.id, photo.id))}
              >
                Set Cover
              </button>
              <button
                className="admin__photo--deleteBtn"
                onClick={() => {
                  dispatch(deleteAlbumPhoto(album.id, photo.id));
                  dispatch(deletePhoto(photo.id));
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  albums: state.collections
});
AdminPhotos = connect(mapStateToProps)(AdminPhotos);

export default AdminPhotos;

AdminPhotos.propTypes = {
  album: PropTypes.object
};

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePhoto } from './../../../actions/photos';
// import './AdminAlbums.css';

let AdminPhotos = ({ album, dispatch }) => {
  if (album.photos.length === 0) {
    return (
      <div>
        <p>No photos</p>>
      </div>
    );
  }

  return (
    <div className="admin__albums">
      ;
      {album.photos.map(photo => {
        return (
          <div key={photo.id}>
            <div className="admin__album">
              <img src={photo.sizes.small} alt="" />
              <h3>Likes: {photo.likes}</h3>
              <h3>{photo.description}</h3>
              <h3>{photo.location}</h3>
              <Link
                to={`${process.env.PUBLIC_URL}/anita/edit-photo/${photo.id}`}
                className="admin__album__edit"
              >
                Edit
              </Link>
              <button
                className="delete"
                onClick={() => dispatch(deletePhoto(photo.id))}
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

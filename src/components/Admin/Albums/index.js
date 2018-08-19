import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAlbum, publishAlbum } from './../../../actions/albums';
import './AdminAlbums.css';

let AdminAlbums = ({ albums, dispatch }) => {
  if (albums.length === 0) {
    return (
      <p>No albums</p>
      // redirect to addAlbum
    );
  }

  return (
    <div className="admin__albums">
      {albums.map(album => {
        return (
          <div key={album.id}>
            <div className="admin__album">
              <img src={album.cover.sizes.full} alt="" />
              <h3>{album.name}</h3>
              <h3>{album.description}</h3>
              <h3>{album.location}</h3>
              <Link
                to={`${process.env.PUBLIC_URL}/anita/edit-album/${album.id}`}
                className="admin__album__edit"
              >
                Edit
              </Link>
              <button
                className="delete"
                onClick={() => dispatch(deleteAlbum(album.id))}
              >
                Delete
              </button>
              {/* render publish btn is not published */}
              {!album.publicAlbum && (
                <button
                  className="publish"
                  onClick={() => dispatch(publishAlbum(album.id))}
                >
                  Publish
                </button>
              )}
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
AdminAlbums = connect(mapStateToProps)(AdminAlbums);

export default AdminAlbums;

AdminAlbums.propTypes = {
  albums: PropTypes.array
};

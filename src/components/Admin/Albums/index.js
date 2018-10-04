import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Image } from 'cloudinary-react';
import { startDeleteAlbum, startEditAlbum } from './../../../actions/albums';
import './AdminAlbums.css';

let AdminAlbums = ({ albums, dispatch }) => {
  if (albums.length === 0) {
    return (
      <p>No albums</p>
      // redirect to addAlbum
    );
  }

  return (
    <Grid container className="admin__albums">
      {albums.map(album => {
        return (
          <div key={album.id}>
            <div className="admin__album">
              <Image
                cloudName="dmz84tdv1"
                publicId={album.cover.photo_public_id}
                crop="scale"
                width="400"
              />
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
                onClick={() => dispatch(startDeleteAlbum(album.id))}
              >
                Delete
              </button>
              {/* render publish btn is not published */}
              {!album.publicAlbum && (
                <button
                  className="publish"
                  onClick={() =>
                    dispatch(startEditAlbum(album.id, { publicAlbum: true }))
                  }
                >
                  Publish
                </button>
              )}
            </div>
          </div>
        );
      })}
    </Grid>
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

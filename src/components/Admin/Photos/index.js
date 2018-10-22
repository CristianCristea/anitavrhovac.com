import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { startEditAlbum } from './../../../actions/albums';
import { startDeletePhoto, startEditPhoto } from './../../../actions/photos';
import './AdminPhotos.scss';

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
        const {
          id,
          photo_public_id,
          photo_url,
          likes,
          description,
          location,
          tags
        } = photo;
        // check if the photo is the album cover
        let isCover = album.cover.photo_public_id === photo_public_id;

        return (
          <div key={id}>
            <div className="admin__photo">
              <Image
                cloudName="dmz84tdv1"
                publicId={photo_public_id}
                crop="scale"
                width="300"
              />
              <h3>Likes: {likes}</h3>
              <h3>{description}</h3>
              <h3>{location}</h3>
              <p>{tags}</p>
              <Link
                to={`${process.env.PUBLIC_URL}/anita/${album.id}/edit-photo/${
                  photo.id
                }`}
                className="admin__photo--editBtn"
              >
                Edit
              </Link>
              <button
                disabled={isCover}
                className="admin__photo--setCoverBtn"
                onClick={() => {
                  const newCover = {
                    cover: { photo_public_id, photo_url }
                  };
                  dispatch(startEditAlbum(album.id, newCover));
                }}
              >
                Set Cover
              </button>
              <button
                className="admin__photo--deleteBtn"
                onClick={() => {
                  !isCover
                    ? dispatch(startDeletePhoto(album.id, photo.id))
                    : alert(
                        "Can't delete photo cover, change the album cover first!"
                      );
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

AdminPhotos = connect()(AdminPhotos);

export default AdminPhotos;

AdminPhotos.propTypes = {
  album: PropTypes.object
};

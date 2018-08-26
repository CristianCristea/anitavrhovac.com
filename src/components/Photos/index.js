import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PhotoThumbnail from './../PhotoThumbnail';
import './Photos.css';

const Photos = ({ photos }) => {
  return (
    <div className="photos">
      {photos.map(photo => {
        const photoLink = `${process.env.PUBLIC_URL}/${photo.album.id}/${
          photo.id
        }`;
        return (
          <div key={photo.id}>
            <Link to={photoLink} className="photo__card">
              <PhotoThumbnail photo={photo} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array
};

import React from 'react';
import PropTypes from 'prop-types';
import './PhotoThumbnail.css';

const PhotoThumbnail = ({ photo }) => {
  const { description, location, sizes, likes } = photo;

  return (
    <figure className="photo">
      <img src={sizes.full} alt={description} />
      <figcaption className="photo__details">
        <p>likes: {likes}</p>
        <p>{location}</p>
      </figcaption>
    </figure>
  );
};

export default PhotoThumbnail;

PhotoThumbnail.propTypes = {
  photo: PropTypes.object.isRequired
};

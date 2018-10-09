import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import './PhotoThumbnail.css';

// *********** Photo thumbnail used in Photos  ******************** //
const PhotoThumbnail = ({ photo }) => {
  const { description, location, photo_public_id, likes } = photo;

  return (
    <figure className="photo">
      <Image
        cloudName="dmz84tdv1"
        publicId={photo_public_id}
        crop="scale"
        width="500"
      />
      <figcaption className="photo__details">
        <p>likes: {likes}</p>
        <p>{description}</p>
        <p>{location}</p>
      </figcaption>
    </figure>
  );
};

export default PhotoThumbnail;

PhotoThumbnail.propTypes = {
  photo: PropTypes.object.isRequired
};

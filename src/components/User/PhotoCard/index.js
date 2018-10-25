import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import './PhotoCard.scss';

// *********** Photo thumbnail used in Photos  ******************** //
const PhotoCard = ({ photo, photoLink }) => {
  const { photo_public_id } = photo;
  return (
    <Link to={photoLink} className="photo__card">
      <div className="photo__card__container">
        <Image
          cloudName="dmz84tdv1"
          publicId={photo_public_id}
          crop="scale"
          width="500"
          className="photo__card__image"
        />
        <div className="photo__card__overlay" />
      </div>
    </Link>
  );
};

export default PhotoCard;

PhotoCard.propTypes = {
  photo: PropTypes.object.isRequired
};

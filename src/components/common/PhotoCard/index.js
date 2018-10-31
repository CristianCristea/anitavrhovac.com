import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import './PhotoCard.scss';

// *********** Photo thumbnail used in Photos  ******************** //
const PhotoCard = ({ photo, photoLink }) => {
  const { photo_public_id } = photo;

  return (
    <div>
      <Link to={photoLink} className="photo__card">
        <div className="photo__card__container">
          <Image
            cloudName={process.env.REACT_APP_CLOUD_NAME}
            publicId={photo_public_id}
            dpr="auto"
            crop="scale"
            width="auto"
            responsive
            className="photo__card__image"
          />
          <div className="photo__card__overlay" />
        </div>
      </Link>
    </div>
  );
};

export default PhotoCard;

PhotoCard.propTypes = {
  photo: PropTypes.object.isRequired
};

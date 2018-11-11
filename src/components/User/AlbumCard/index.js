import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import Typography from '@material-ui/core/Typography';
import './AlbumCard.scss';

// *********** Photo thumbnail used in Photos  ******************** //
const AlbumCard = ({ albumCover, photoLink, albumDetails }) => {
  const { photo_public_id } = albumCover;

  const { name, location } = albumDetails;

  return (
    <div>
      <Link to={photoLink} className="album__card">
        <div className="album__card__container">
          <Image
            cloudName={process.env.REACT_APP_CLOUD_NAME}
            publicId={photo_public_id}
            dpr="auto"
            crop="scale"
            width="auto"
            responsive
            className="album__card__image"
          />
          <div className="album__card__overlay">
            <div className="album__card__details">
              <Typography variant="h3" color="inherit">
                {name}
              </Typography>
              <Typography variant="subtitle2" color="inherit">
                #{location}
              </Typography>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AlbumCard;

AlbumCard.propTypes = {
  albumCover: PropTypes.object.isRequired
};

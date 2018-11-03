import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Image, Transformation } from 'cloudinary-react';
import Tags from './../Tags';
import LocationIcon from './../Icons/LocationIcon';
import './Jumbotron.scss';

export default function Jumbotron({
  imageId,
  details: { name, location, description, tags }
}) {
  return (
    <section className="jumbotron">
      <div className="jumbotron__image">
        <Image
          cloudName={process.env.REACT_APP_CLOUD_NAME}
          publicId={imageId}
          fetchFormat="auto"
          quality="auto"
          crop="fill"
          width="200"
          height="200"
          dpr="auto"
        >
          <Transformation radius="max" />
        </Image>
      </div>
      <div className="jumbotron__details">
        <Typography
          variant="h3"
          color="textPrimary"
          className="jumbotron__title"
        >
          {name}
        </Typography>

        <LocationIcon text={location} className="jumbotron__location" />
        {description && (
          <Typography
            variant="body1"
            gutterBottom
            color="textPrimary"
            className="jumbotron__description"
          >
            {description}
          </Typography>
        )}

        <Tags tags={tags} />
      </div>
    </section>
  );
}

Jumbotron.propTypes = {
  imageId: PropTypes.string.isRequired,
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  })
};

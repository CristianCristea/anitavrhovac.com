import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PhotoThumbnail from './../PhotoThumbnail';
import './Photos.css';

// dispaly a list of photos for users
const Photos = ({ photos }) => {
  return (
    <Grid container justify="flex-start" className="photos">
      {photos.map(photo => {
        const photoLink = `${process.env.PUBLIC_URL}/${photo.album.id}/${
          photo.id
        }`;
        return (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <Link to={photoLink} className="photo__card">
              <PhotoThumbnail photo={photo} />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array
};

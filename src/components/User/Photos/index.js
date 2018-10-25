import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import StackGrid from 'react-stack-grid';
import PhotoCard from './../PhotoCard';
import './Photos.scss';

// *********** User list photos  ******************** //
const Photos = ({ photos }) => {
  return (
    <section className="photos">
      <StackGrid columnWidth={400} gutterHeight={15} gutterWidth={15}>
        {photos.map(photo => {
          return (
            <PhotoCard
              key={photo.id}
              photo={photo}
              photoLink={`${process.env.PUBLIC_URL}/${photo.album.id}/${
                photo.id
              }`}
            />
          );
        })}
      </StackGrid>
    </section>
  );
};

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array
};

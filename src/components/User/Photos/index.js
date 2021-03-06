import React from 'react';
import PropTypes from 'prop-types';
import StackGrid from 'react-stack-grid';
import sizeMe from 'react-sizeme';
import PhotoModal from './../../common/PhotoModal';
import './Photos.scss';

// *********** User list photos  ******************** //
const Photos = ({ photos, size }) => {
  return (
    <section className="photos">
      <StackGrid
        monitorImagesLoaded={true}
        columnWidth={
          size.width <= 768
            ? '100%'
            : size.width > 768 && size.width <= 980
              ? '40%'
              : '33.3%'
        }
        gutterHeight={15}
        gutterWidth={15}
      >
        {photos.map(photo => {
          return (
            <PhotoModal
              key={photo.id}
              photo={photo}
              albumId={photo.album.id}
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

export default sizeMe()(Photos);

Photos.propTypes = {
  photos: PropTypes.array
};

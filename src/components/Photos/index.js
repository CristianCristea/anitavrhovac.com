import React from 'react';
import PropTypes from 'prop-types';
import PhotoModal from './../PhotoModal';
import './Photos.css';

// props { photos, albums, singlePhoto }
class Photos extends React.Component {
  state = {};

  render() {
    const { photos, singlePhoto } = this.props;

    return (
      <div className="photos">
        {photos.map(photo => {
          return (
            <PhotoModal
              key={photo.id}
              photo={photo}
              singlePhoto={singlePhoto}
            />
          );
        })}
      </div>
    );
  }
}

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array,
  albums: PropTypes.array,
  singlePhoto: PropTypes.bool
};

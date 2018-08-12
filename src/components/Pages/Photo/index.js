import React from 'react';
import PropTypes from 'prop-types';
import PhotoModal from './../../PhotoModal';
import './Photo.css';

const Photo = ({ photos, albums, match }) => {
  // with redux-firebase - just request one photo using the photo.id
  // and one album using collection.id
  const photo = photos.filter(photo => photo.id === match.params.id)[0];
  const { sizes, collection, location, description } = photo;
  const album = albums.filter(album => album.id === collection.id)[0];

  return (
    <section className="photo-page">
      <figure className="photo-page__hero">
        <img src={sizes.regular} alt={description} />
        <figcaption className="photo-page__hero-details">
          <p>{collection.name}</p>
          <p>{location}</p>
        </figcaption>
      </figure>

      <div className="photo-album">
        {album.photos.map(photo => {
          return <PhotoModal key={photo.id} photo={photo} album={album} />;
        })}
      </div>
    </section>
  );
};

export default Photo;

Photo.propTypes = {
  photos: PropTypes.array,
  albums: PropTypes.array
};

import React from 'react';
import PropTypes from 'prop-types';
import PhotoModal from './../../../PhotoModal';
import './Album.css';

const Album = ({ albums, match }) => {
  const album = albums.filter(album => album.id === match.params.id)[0];
  const albumCover = album.cover;
  console.log(album);

  return (
    <section className="album-page">
      <h2>{album.name}</h2>
      <figure className="album-page__hero">
        <img src={albumCover.sizes.regular} alt={albumCover.description} />
        <figcaption className="album-page__hero-details">
          <p>{albumCover.location}</p>
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

export default Album;

Album.propTypes = {
  albums: PropTypes.array
};

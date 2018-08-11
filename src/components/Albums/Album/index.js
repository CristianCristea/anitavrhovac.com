import React from 'react';
import Photos from './../../Photos';

const Album = ({ photos, albums, match }) => {
  const album = albums.filter(album => album.id === match.params.name)[0];
  const albumPhotos = photos.filter(
    photo => photo.collection === match.params.name
  );

  return (
    <section className="latest-photos">
      <h2>{album.name}</h2>
      <Photos photos={albumPhotos} />
    </section>
  );
};

export default Album;

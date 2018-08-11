import React from 'react';
import Photos from './../Photos';

const Albums = ({ photos, albums, match }) => {
  const albumCovers = photos.filter(photo => !!photo.cover);

  return (
    <section className="latest-photos">
      <h2>Albums</h2>
      <Photos photos={albumCovers} />
    </section>
  );
};

export default Albums;

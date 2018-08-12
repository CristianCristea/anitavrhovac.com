import React from 'react';
import AlbumCover from './AlbumCover';

const Albums = ({ albums }) => {
  return (
    <section className="latest-photos">
      <h2>Albums</h2>
      {albums.map(album => {
        return <AlbumCover key={album.id} album={album} />;
      })}
    </section>
  );
};

export default Albums;

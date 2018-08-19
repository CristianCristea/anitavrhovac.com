import React from 'react';
import { Link } from 'react-router-dom';
import PhotoThumbnail from './../../../PhotoThumbnail';

const AlbumCover = ({ album }) => {
  return (
    <section className="album-cover">
      <div key={album.id}>
        <Link
          to={`${process.env.PUBLIC_URL}/albums/${album.id}`}
          className="photo__card"
        >
          <PhotoThumbnail photo={album.cover} />
        </Link>
      </div>
    </section>
  );
};

export default AlbumCover;

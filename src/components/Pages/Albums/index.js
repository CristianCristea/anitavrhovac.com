import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AlbumCover from './AlbumCover';
// display only if published
let Albums = ({ albums }) => {
  const noAlbums = (
    <div>
      <h3>No albums added</h3>
      <Link to={`${process.env.PUBLIC_URL}/`}>Back</Link>
    </div>
  );
  const publicAlbums = albums.filter(album => album.publicAlbum);

  return (
    <section className="latest-photos">
      <h2>Albums</h2>
      {publicAlbums.length === 0
        ? noAlbums
        : publicAlbums.map(album => (
            <AlbumCover key={album.id} album={album} />
          ))}
    </section>
  );
};

const mapStateToProps = state => ({
  albums: state.collections
});

Albums = connect(mapStateToProps)(Albums);
export default Albums;

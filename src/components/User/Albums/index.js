import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import sizeMe from 'react-sizeme';
import StackGrid from 'react-stack-grid';
import AlbumCard from './../AlbumCard';
import './Albums.scss';

// display a list of albums - covers
// display only if published and has at least one photo
export let Albums = ({ albums, size }) => {
  const noAlbums = <Typography variant="h4">No albums</Typography>;
  const publicAlbums = albums.filter(album => album.publicAlbum);

  return (
    <section className="container albums">
      <Typography variant="h2" className="albums__heading">
        Albums
      </Typography>
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
        {publicAlbums.length === 0
          ? noAlbums
          : publicAlbums.map(album => (
              <AlbumCard
                key={album.id}
                albumCover={album.cover}
                albumDetails={{ name: album.name, location: album.location }}
                photoLink={`${process.env.PUBLIC_URL}/albums/${album.id}`}
              />
            ))}
      </StackGrid>
    </section>
  );
};

const mapStateToProps = state => ({
  albums: state.collections
});

export default connect(mapStateToProps)(sizeMe()(Albums));

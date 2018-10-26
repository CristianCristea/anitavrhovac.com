import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import sizeMe from 'react-sizeme';
import StackGrid from 'react-stack-grid';
import PhotoCard from './../../common/PhotoCard';
import './Albums.scss';

// display a list of albums - covers
// display only if published and has at least one photo
export let Albums = ({ albums, size }) => {
  const noAlbums = (
    <div>
      <Typography variant="display3">No albums added</Typography>
      <Link to={`${process.env.PUBLIC_URL}/`}>Back</Link>
    </div>
  );
  const publicAlbums = albums.filter(album => album.publicAlbum);

  return (
    <section className="container albums">
      <Typography variant="display2" className="albums__heading">
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
              <PhotoCard
                key={album.id}
                photo={album.cover}
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

import React from 'react';
import { connect } from 'react-redux';
import Photos from './../Photos';
import Typography from '@material-ui/core/Typography';
import './Homepage.scss';

// *********** Homepage - last added photos  ******************** //
let Homepage = ({ latestPhotos, publicAlbums }) => {
  // display only public photos
  const latestPublicPhotos = latestPhotos.filter(photo => {
    for (let i = 0; i < publicAlbums.length; i++) {
      if (photo.album.id === publicAlbums[i].id) {
        return photo;
      }
    }
    return false;
  });

  return (
    <section className="homepage container">
      <Typography variant="display2" className="homepage__headline">
        Recent photos
      </Typography>

      <Photos photos={latestPublicPhotos} />
    </section>
  );
};

const mapStateToProps = state => ({
  // sort all photos desc
  latestPhotos: state.photos.sort((photo, nextPhoto) => {
    return nextPhoto.created_at - photo.created_at;
  }),
  publicAlbums: state.collections.filter(album => album.publicAlbum)
});
Homepage = connect(mapStateToProps)(Homepage);

export default Homepage;

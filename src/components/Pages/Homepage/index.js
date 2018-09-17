import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Photos from './../../Photos';
import Typography from '@material-ui/core/Typography';
import './Homepage.css';

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
    <Grid container spacing={8} className="latest-photos" justify="flex-start">
      <Grid item xs={12}>
        <Typography variant="display2" className="latest-photos__headline">
          Homepage
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Photos photos={latestPublicPhotos} />
      </Grid>
    </Grid>
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

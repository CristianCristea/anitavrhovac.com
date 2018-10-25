import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PhotoCard from './../PhotoCard';
import './Albums.scss';

// display a list of albums - covers
// display only if published and has at least one photo
let Albums = ({ albums }) => {
  const noAlbums = (
    <div>
      <Typography variant="display3">No albums added</Typography>
      <Link to={`${process.env.PUBLIC_URL}/`}>Back</Link>
    </div>
  );
  const publicAlbums = albums.filter(album => album.publicAlbum);

  return (
    <Grid container spacing={8} justify="flex-start">
      <Grid item xs={12}>
        <Typography variant="display2" className="albums__heading">
          Albums
        </Typography>
      </Grid>
      {publicAlbums.length === 0
        ? noAlbums
        : publicAlbums.map(album => (
            <Grid item xs={12} sm={6} md={4} key={album.id}>
              <PhotoCard
                photo={album.cover}
                photoLink={`${process.env.PUBLIC_URL}/albums/${album.id}`}
              />
            </Grid>
          ))}
    </Grid>
  );
};

const mapStateToProps = state => ({
  albums: state.collections
});

Albums = connect(mapStateToProps)(Albums);
export default Albums;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Image } from 'cloudinary-react';
import PhotoCard from './../../PhotoCard';
import './Album.scss';

// display a single album
let Album = class extends Component {
  // scroll to top on update
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { album, photo, isSinglePhoto } = this.props;
    const { name, description, location, cover } = album;
    const albumLikes = album.photos.reduce((likes, photo) => {
      return (likes += photo.likes);
    }, 0);
    const heroPhoto = isSinglePhoto
      ? photo.photo_public_id
      : cover.photo_public_id;
    return (
      <section className="album-page">
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <h2 className="album-page__heading">{name}</h2>
          </Grid>
        </Grid>
        <div className="album-page__hero">
          <Image
            cloudName="dmz84tdv1"
            publicId={heroPhoto}
            crop="scale"
            width="1000"
          />
        </div>
        <Grid container spacing={8} className="album-page">
          <Grid item xs={12}>
            <div className="album-page__hero-details">
              <h2>{name}</h2>
              <h2>{location}</h2>
              <h2>{description}</h2>
              <h2>Likes: {albumLikes}</h2>
            </div>
          </Grid>
          {album.photos.map(photo => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                className="photo-album"
                key={photo.id}
              >
                <PhotoCard
                  photo={photo}
                  photoLink={`${process.env.PUBLIC_URL}/${album.id}/${
                    photo.id
                  }`}
                />
              </Grid>
            );
          })}
        </Grid>
      </section>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const album = state.collections.filter(
    album => album.id === ownProps.match.params.album_id
  )[0];
  album.photos = album.photos || [];
  return {
    album,
    photo: state.photos.filter(
      photo => photo.id === ownProps.match.params.photo_id
    )[0],
    isSinglePhoto: !!ownProps.match.params.photo_id
  };
};

Album = connect(mapStateToProps)(Album);
export default Album;

Album.propTypes = {
  album: PropTypes.object
};

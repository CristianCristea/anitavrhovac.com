import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PhotoThumbnail from './../../../PhotoThumbnail';
import './Album.css';

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
    const heroPhoto = isSinglePhoto ? photo.sizes.full : cover.sizes.full;
    return (
      <section className="album-page">
        <h2>{name}</h2>
        <figure className="album-page__hero">
          <img src={heroPhoto} alt={description} />
          <figcaption className="album-page__hero-details">
            <h2>{name}</h2>
            <h2>{location}</h2>
            <h2>Likes: {albumLikes}</h2>
          </figcaption>
        </figure>
        <div className="photo-album">
          {album.photos.map(photo => {
            return (
              <Link
                key={photo.id}
                to={`${process.env.PUBLIC_URL}/${album.id}/${photo.id}`}
              >
                <PhotoThumbnail photo={photo} />
              </Link>
            );
          })}
        </div>
      </section>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  album: state.collections.filter(
    album => album.id === ownProps.match.params.album_id
  )[0],
  photo: state.photos.filter(
    photo => photo.id === ownProps.match.params.photo_id
  )[0],
  isSinglePhoto: !!ownProps.match.params.photo_id
});

Album = connect(mapStateToProps)(Album);
export default Album;

Album.propTypes = {
  album: PropTypes.object
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import sizeMe from 'react-sizeme';
import StackGrid from 'react-stack-grid';
import PhotoModal from './../../../common/PhotoModal';
import Jumbotron from './../../../common/Jumbotron';

import { getAlbumTags } from './../../../../helpers/album';
import './Album.scss';

// display a single album
export const Album = class extends Component {
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
    const { size, album } = this.props;
    const { id, name, description, location, cover, photos } = album;
    const tags = getAlbumTags(album);

    return (
      <section className="album-page container">
        <div className="album-page__banner">
          <Jumbotron
            imageId={cover.photo_public_id}
            details={{ name, description, location, tags }}
          />
        </div>
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
          className="container"
        >
          {photos.map(photo => {
            return (
              <PhotoModal
                className="photo-album"
                key={photo.id}
                photo={photo}
                photoLink={`${process.env.PUBLIC_URL}/${id}/${photo.id}`}
              />
            );
          })}
        </StackGrid>
      </section>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  album: state.collections.filter(
    album => album.id === ownProps.match.params.album_id
  )[0]
});

export default connect(mapStateToProps)(sizeMe()(Album));

Album.propTypes = {
  album: PropTypes.object
};

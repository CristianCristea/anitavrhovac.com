import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import LocationIcon from './../../../common/Icons/LocationIcon';
import sizeMe from 'react-sizeme';
import StackGrid from 'react-stack-grid';
import Typography from '@material-ui/core/Typography';
import PhotoCard from './../../../common/PhotoCard';
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
    const {
      size,
      album: { id, name, description, location, cover, photos }
    } = this.props;

    return (
      <section className="album-page container">
        <div className="album-page__banner">
          <Image
            cloudName={process.env.REACT_APP_CLOUD_NAME}
            publicId={cover.photo_public_id}
            crop="scale"
            width="auto"
            heigth="600"
            dpr="auto"
            responsive
          />
        </div>
        <div className="album-page__banner-details">
          <Typography
            variant="subheading"
            component="h3"
            color="textPrimary"
            className="album-page__banner-details__name"
          >
            {name}
          </Typography>

          <div className="album-page__banner-details__location">
            <LocationIcon text={location} />
          </div>
          {description && (
            <Typography
              variant="subheading"
              component="h3"
              color="textPrimary"
              className="album-page__banner-details__description"
            >
              {description}
            </Typography>
          )}
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
              <PhotoCard
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

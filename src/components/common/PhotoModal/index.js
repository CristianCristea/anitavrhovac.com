import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CancelIcon from '@material-ui/icons/Cancel';
import Tags from './../Tags';

import LocationIcon from './../../common/Icons/LocationIcon';
import './PhotoModal.scss';

// *********** Photo thumbnail used in Photos, single photo modal  ******************** //

class PhotoModal extends Component {
  state = {
    open: false,
    scroll: 'body'
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { photo, albumId } = this.props;
    // TODO: link to album
    const AlbumLink = props => (
      <Link to={`${process.env.PUBLIC_URL}/albums/${albumId}`} {...props} />
    );
    return (
      <section className="recent__photos">
        <span onClick={this.handleClickOpen('body')} className="photo__card">
          <div className="photo__card__container">
            <Image
              cloudName={process.env.REACT_APP_CLOUD_NAME}
              publicId={photo.photo_public_id}
              dpr="auto"
              crop="scale"
              width="auto"
              responsive
              fetchFormat="auto"
              className="photo__card__image"
            >
              <Transformation flags="progressive:semi" quality="50" />
              <Transformation quality="60" />
            </Image>
            <div className="photo__card__overlay" />
          </div>
        </span>
        <Dialog
          className="photo__modal"
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="photo"
          maxWidth="lg"
        >
          <DialogContent className="photo__modal__content">
            <Image
              cloudName={process.env.REACT_APP_CLOUD_NAME}
              publicId={photo.photo_public_id}
              dpr="auto"
              crop="scale"
              width="auto"
              responsive
              fetchFormat="auto"
              flags="progressive:semi"
              className="single__photo__image"
              onError={() => console.log('image missing')}
            >
              <Transformation flags="progressive:semi" />
              <Transformation quality="auto" />
            </Image>
            <div className="single__photo__details">
              <LocationIcon text={photo.location} />
              {// more btn - link to album only if not on album page
              photo.album && (
                <Button
                  component={AlbumLink}
                  className="single__photo__albumBtn"
                  color="primary"
                >
                  More
                </Button>
              )}

              {photo.description && (
                <Typography variant="body1">{photo.description}</Typography>
              )}
              <Tags tags={photo.tags} />
            </div>
            <IconButton
              onClick={this.handleClose}
              className="single__photo__closeBtn"
            >
              <CancelIcon />
            </IconButton>
          </DialogContent>
        </Dialog>
      </section>
    );
  }
}

export default PhotoModal;

PhotoModal.propTypes = {
  photo: PropTypes.object.isRequired,
  albumId: PropTypes.string.isRequired
};

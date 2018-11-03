import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
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
    const { photo } = this.props;
    // TODO: link to album
    // const AlbumLink =
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
              className="photo__card__image"
            />
            <div className="photo__card__overlay" />
          </div>
        </span>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="photo"
          maxWidth="lg"
        >
          <DialogContent>
            <Image
              cloudName={process.env.REACT_APP_CLOUD_NAME}
              publicId={photo.photo_public_id}
              dpr="auto"
              crop="scale"
              width="auto"
              responsive
              className="single__photo__image"
            />
            <div className="single__photo__details">
              <LocationIcon text={photo.location} />
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
          <Button
            onClick={this.handleClose}
            className="single__photo__albumBtn"
            color="primary"
            variant="contained"
          >
            Album
          </Button>
        </Dialog>
      </section>
    );
  }
}

export default PhotoModal;

PhotoModal.propTypes = {
  photo: PropTypes.object.isRequired
};

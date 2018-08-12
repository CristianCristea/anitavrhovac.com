import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import PhotoThumbnail from './../PhotoThumbnail';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

class PhotoModal extends React.Component {
  state = {
    open: false,
    scrool: 'body',
    currentPhoto: this.props.photo.sizes.regular
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleShowPhoto = (e, photoSrc) => {
    e.preventDefault();
    this.setState({ currentPhoto: photoSrc });
    // scroll to top when changing the photo in modal
    this.modalPhoto.scrollIntoView();
  };

  render() {
    const { photo, album } = this.props;
    const { likes, location, description } = photo;

    return (
      <div>
        <Link
          to={`#`}
          className="photo__card"
          onClick={this.handleClickOpen('body')}
        >
          <PhotoThumbnail photo={photo} />
        </Link>
        <Dialog
          id="modalTop"
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">{album.name}</DialogTitle>
          <Paper>
            <figure
              className="modal-photo"
              ref={modalPhoto => (this.modalPhoto = modalPhoto)}
            >
              <img src={this.state.currentPhoto} alt={description} />
              <figcaption className="modal-photo__details">
                <p>{likes}</p>
                <p>{location}</p>
              </figcaption>
            </figure>

            {album.photos.map(photo => {
              return (
                // eslint-disable-next-line
                <a
                  key={photo.id}
                  href="#"
                  onClick={e => this.handleShowPhoto(e, photo.sizes.regular)}
                >
                  <PhotoThumbnail photo={photo} />;
                </a>
              );
            })}
          </Paper>
        </Dialog>
      </div>
    );
  }
}

export default PhotoModal;

PhotoModal.propTypes = {
  album: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired
};

import React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

class PhotoModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = e => {
    if (this.props.singlePhoto) {
      e.preventDefault();
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      urls,
      collectionName,
      location,
      collection,
      description
    } = this.props.photo;

    return (
      <div>
        <Link
          to={`${process.env.PUBLIC_URL}/albums/${collection}`}
          key={urls.small}
          className="photos__photo-card"
          onClick={this.handleOpen}
        >
          <figure className="photo">
            <img src={urls.small} alt={description} />
            <figcaption className="photos__photo-details">
              <p>{collectionName}</p>
              <p>{location}</p>
            </figcaption>
          </figure>
        </Link>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Paper>
            <figure className="photo">
              <img src={urls.small} alt={description} />
              <figcaption className="photos__photo-details">
                <p>{collectionName}</p>
                <p>{location}</p>
              </figcaption>
            </figure>
          </Paper>
        </Modal>
      </div>
    );
  }
}

export default PhotoModal;

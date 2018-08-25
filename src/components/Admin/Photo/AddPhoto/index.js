import React, { Component } from 'react';
import uuid from 'uuid';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addAlbumPhoto } from './../../../../actions/albums';
import { addPhoto } from './../../../../actions/photos';
import FormErrors from './../../../FormErrors';
import './AddPhoto.css';

/*
add to coresp album
add to photos */

let AddPhoto = class extends Component {
  state = {
    // photo
    description: '',
    tags: '',
    location: this.props.album.location,
    photo: {},
    // form validation
    formErrors: {
      location: ''
    },
    locationValid: false,
    photoValid: false,
    formValid: false
  };

  handleTextInput = e => {
    const fieldName = e.currentTarget.name;
    const filedValue = e.currentTarget.value;

    this.setState({ [fieldName]: filedValue }, () => {
      this.validateField(fieldName, filedValue);
    });
  };

  validateField(fieldName, value) {
    let {
      formErrors: fieldValidationErrors,
      locationValid,
      photoValid
    } = this.state;

    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/pjpeg'];

    switch (fieldName) {
      case 'location':
        locationValid = !!(
          value.match(/^[a-zA-Z\s\d]+$/gi) && value.length > 3
        );
        fieldValidationErrors.location = locationValid ? '' : ' is invalid';
        break;
      case 'photo':
        // check image type and size < 3MB
        photoValid =
          fileTypes.indexOf(value.type) !== -1 &&
          (value.size / 1048576).toFixed(1) < 3;
        fieldValidationErrors['cover photo'] = photoValid ? '' : ' is invalid';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        locationValid: locationValid,
        photoValid: photoValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.locationValid && this.state.photoValid
    });
  }

  fileSelectedHandler = e => {
    // access the files(FileList obj) prop:
    this.setState({ photo: e.target.files[0] }, () =>
      this.validateField('photo', this.state.photo)
    );
  };

  resetForm = () => {
    this.setState({
      description: '',
      location: '',
      tags: '',
      photo: {}
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { description, location, tags } = this.state;
    const album = this.props.album;
    const albumPhoto = {
      id: uuid(),
      created_at: moment().unix(),
      description: description.trim(),
      location: location.trim(),
      tags: tags.split(',').map(tag => tag.trim()),
      likes: 0,
      liked_by_admin: false,
      sizes: {
        full: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`,
        regular: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`,
        small: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`,
        thumb: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`
      }
    };
    const singlePhoto = Object.assign(albumPhoto, {
      album: {
        id: album.id,
        name: album.name,
        description: album.description,
        location: album.location
      }
    });
    console.log(albumPhoto, singlePhoto);
    // update the state
    this.props.dispatch(addAlbumPhoto(album.id, albumPhoto));
    this.props.dispatch(addPhoto(singlePhoto));

    // send the actual photo to server with axios or use firebase sdk
    // set the album to database and redux only on success
    this.resetForm();
  };

  // add has-error css class if the field has an error
  hasError(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  render() {
    return (
      // render form validation errors
      <div className="photo-form">
        <FormErrors formErrors={this.state.formErrors} />
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.handleTextInput}
          />
          <input
            type="text"
            name="tags"
            placeholder="tags"
            value={this.state.tags}
            onChange={this.handleTextInput}
          />
          <input
            type="text"
            name="location"
            placeholder="location"
            required
            value={this.state.location}
            onChange={this.handleTextInput}
          />
          <input
            type="file"
            name="photo"
            accept=".png, .jpg, .jpeg"
            required
            onChange={this.fileSelectedHandler}
          />
          <button type="submit" disabled={!this.state.formValid}>
            Submit
          </button>
        </form>
        <Link to={`${process.env.PUBLIC_URL}/anita/dashboard`}>Dashboard</Link>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  album: state.collections.filter(
    collection => collection.id === ownProps.match.params.album_id
  )[0]
});

AddPhoto = connect(mapStateToProps)(AddPhoto);
export default AddPhoto;

// AddPhoto.defaultProps = {
//   album: {
//     location: ''
//   }
// };

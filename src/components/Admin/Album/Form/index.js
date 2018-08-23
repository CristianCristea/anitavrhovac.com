import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { addAlbum, editAlbum } from './../../../../actions/albums';
import FormErrors from './../../../FormErrors';
import './AlbumForm.css';

let AlbumForm = class extends Component {
  state = {
    // album
    name: this.props.album.name,
    description: this.props.album.description,
    location: this.props.album.location,
    publicAlbum: false,
    cover: {
      sizes: {
        full: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`
      }
    },
    photos: this.props.album.photos,
    // form validation
    formErrors: {
      name: '',
      description: '',
      location: ''
    },
    nameValid: false,
    locationValid: false,
    formValid: false
  };

  componentDidMount() {
    this.editAlbumInitialValidation();
  }

  handleTextInput = e => {
    const fieldName = e.currentTarget.name;
    const filedValue = e.currentTarget.value;

    this.setState({ [fieldName]: filedValue }, () => {
      this.validateField(fieldName, filedValue);
    });
  };

  // on edit album, set album as valid
  editAlbumInitialValidation = () => {
    this.setState(
      {
        nameValid: true,
        locationValid: true
      },
      this.validateForm
    );
  };

  validateField(fieldName, value) {
    let {
      formErrors: fieldValidationErrors,
      nameValid,
      locationValid
    } = this.state;

    switch (fieldName) {
      case 'name':
        nameValid = !!(value.match(/^[a-zA-Z\s\d]+$/gi) && value.length > 3);
        fieldValidationErrors.name = nameValid ? '' : ' is invalid';
        break;
      case 'location':
        locationValid = !!(
          value.match(/^[a-zA-Z\s\d]+$/gi) && value.length > 3
        );
        fieldValidationErrors.location = locationValid ? '' : ' is invalid';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        locationValid: locationValid
      },
      () => this.validateForm()
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.locationValid
    });
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const { edit, album: albumToEdit } = this.props;
    const { name, description, location, cover, publicAlbum } = this.state;
    let editCover = !edit
      ? cover
      : { sizes: { full: albumToEdit.cover.sizes.full } };
    let albumId = !edit ? uuid() : albumToEdit.id;
    let albumPhotos = !edit ? [] : this.state.photos;

    const album = {
      id: albumId,
      created_at: Date.now(),
      cover: editCover,
      name,
      description,
      location,
      photos: albumPhotos,
      publicAlbum
    };

    // update the state
    if (!edit) {
      this.props.dispatch(addAlbum(album));
      // redirect to edit album
      this.props.history.push(
        `${process.env.PUBLIC_URL}/anita/edit-album/${album.id}`
      );
    } else {
      this.props.dispatch(editAlbum(album.id, album));
      // redirect to admin dashboard
      this.props.history.push(`${process.env.PUBLIC_URL}/anita/dashboard`);
    }

    // reset form
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: '',
      description: '',
      location: ''
    });
  };

  // add has-error css class if the field has an error
  hasError(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  render() {
    return (
      // render form validation errors
      <div className="add-album">
        <FormErrors formErrors={this.state.formErrors} />
        <form onSubmit={this.handleFormSubmit}>
          <input
            className={`${this.hasError(this.state.formErrors.name)}`}
            type="text"
            name="name"
            placeholder="name"
            required
            value={this.state.name}
            onChange={this.handleTextInput}
          />
          <input
            type="text"
            name="description"
            placeholder="description"
            value={this.state.description}
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

          <button type="submit" disabled={!this.state.formValid}>
            Submit
          </button>
        </form>
      </div>
    );
  }
};

// connect to store for event dispatch
AlbumForm = connect()(AlbumForm);
export default AlbumForm;

AlbumForm.propTypes = {
  edit: PropTypes.bool
};

AlbumForm.defaultProps = {
  edit: false,
  album: {
    name: '',
    description: '',
    location: '',
    photos: []
  }
};

// user input: name, description, location, cover - photo-file
// generate: id, created_at,

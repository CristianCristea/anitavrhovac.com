import React, { Component } from 'react';
import uuid from 'uuid';
import FormErrors from './../FormErrors';
import './AddAlbum.css';

export default class AddAlbum extends Component {
  state = {
    // album
    name: '',
    description: '',
    location: '',
    selectedCover: {},
    cover: {
      id: 'photo_cover_1',
      photo_description: 'test description',
      tags: [],
      likes: 0,
      liked_by_admin: false,
      created_at: Date.now(),
      location: '',
      sizes: {
        // full: `${process.env.PUBLIC_URL}/images/${uuid()}/${
        //   this.state.selectedCover.name
        // }`
        // regular: `${
        //   process.env.PUBLIC_URL
        // }/images/random_photo_id_1/food-regular.jpg`,
        // small: `${
        //   process.env.PUBLIC_URL
        // }/images/random_photo_id_1/food-small.jpg`,
        // thumb: `${
        //   process.env.PUBLIC_URL
        // }/images/random_photo_id_1/food-thumbnail.jpg`
      }
    },
    // form validation
    formErrors: {
      name: '',
      description: '',
      location: '',
      selectedCover: ''
    },
    nameValid: false,
    descriptionValid: false,
    locationValid: false,
    selectedCoverValid: false,
    formValid: false
  };

  handleTextInput = e => {
    const fieldName = e.currentTarget.name;
    const filedValue = e.currentTarget.value;

    this.setState({ [fieldName]: filedValue }, () => {
      this.validateField(fieldName, filedValue);
    });
  };

  fileSelectedHandler = e => {
    // access the files(FileList obj) prop:
    this.setState({ selectedCover: e.target.files[0] }, () =>
      this.validateField('selectedCover', this.state.selectedCover)
    );
  };

  validateField(fieldName, value) {
    let {
      formErrors: fieldValidationErrors,
      nameValid,
      descriptionValid,
      locationValid,
      selectedCoverValid
    } = this.state;

    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/pjpeg'];

    switch (fieldName) {
      case 'name':
        nameValid = !!(value.match(/[a-z]/gi) && value.length > 3);
        fieldValidationErrors.name = nameValid ? '' : ' is invalid';
        break;
      case 'description':
        descriptionValid = !!(value.match(/[a-z]/gi) && value.length > 3);
        fieldValidationErrors.description = descriptionValid
          ? ''
          : ' is invalid';
        break;
      case 'location':
        locationValid = !!(value.match(/[a-z]/gi) && value.length > 3);
        fieldValidationErrors.location = locationValid ? '' : ' is invalid';
        break;
      case 'selectedCover':
        // check image type and size < 3MB
        selectedCoverValid =
          fileTypes.indexOf(value.type) !== -1 &&
          (value.size / 1048576).toFixed(1) < 3;
        fieldValidationErrors['cover photo'] = selectedCoverValid
          ? ''
          : ' is invalid';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        descriptionValid: descriptionValid,
        locationValid: locationValid,
        selectedCoverValid: selectedCoverValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.descriptionValid &&
        this.state.locationValid &&
        this.state.selectedCoverValid
    });
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, description, location, liked_by_admin, likes } = this.state;
    const album = {
      id: uuid(),
      created_at: Date.now(),
      name,
      description,
      location,
      likes,
      liked_by_admin,
      cover: {
        sizes: {
          full: `${process.env.PUBLIC_URL}/images/${uuid()}`
        }
      }
    };

    // sets the state
    this.props.createAlbum(album);

    // send the actual photo to server with axios or use firebase sdk
    // prob need to set firebase functions on backend
    // this.state.selectedCover is the actual photo
    // this.state.selectedCover.name is the name of the photo
    // set the album to database and redux only on success
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
            required
            value={this.state.name}
            onChange={this.handleTextInput}
          />
          <input
            type="text"
            name="description"
            required
            value={this.state.description}
            onChange={this.handleTextInput}
          />
          <input
            type="text"
            name="location"
            required
            value={this.state.location}
            onChange={this.handleTextInput}
          />
          <input
            type="file"
            name="selectedCover"
            accept=".png, .jpg, .jpeg"
            required
            onChange={this.fileSelectedHandler}
          />
          <button type="submit" disabled={!this.state.formValid}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

// user input: name, description, location, cover - photo-file
// generate: id, created_at,

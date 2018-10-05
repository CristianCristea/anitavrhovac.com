import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { startAddAlbum, startEditAlbum } from './../../../../actions/albums';
import FormErrors from './../../../common/FormErrors';
import './AlbumForm.css';
// TODO: refactor redirect to edit album based on id from firebase
let AlbumForm = class extends Component {
  state = {
    // album
    // cover and photos arrays are undefined for new albums
    // cover default is set in startAddAlbum
    name: this.props.album.name,
    description: this.props.album.description,
    location: this.props.album.location,
    publicAlbum: false,
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
    if (this.props.edit) {
      this.setState(
        {
          nameValid: true,
          locationValid: true
        },
        this.validateForm
      );
    }
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
    const { name, description, location, publicAlbum } = this.state;

    const newAlbum = {
      created_at: moment().unix(),
      name: name.trim(),
      description: description.trim(),
      location: location.trim(),
      publicAlbum
    };

    const albumUpdates = {
      name: name.trim(),
      description: description.trim(),
      location: location.trim()
    };

    // update the state
    if (!edit) {
      // add album and redirect to dashboard
      this.props.dispatch(startAddAlbum(newAlbum));
      this.props.history.push(`${process.env.PUBLIC_URL}/anita/dashboard`);
      // reset form
      this.resetForm();
    } else {
      // redirect to admin dashboard after edit
      this.props.dispatch(startEditAlbum(albumToEdit.id, albumUpdates));
      // display info - album updated
    }
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
    location: ''
  }
};

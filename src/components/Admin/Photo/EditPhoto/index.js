import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editAlbumPhoto } from './../../../../actions/albums';
import FormErrors from './../../../FormErrors';
import './EditPhoto.css';

let EditPhoto = class extends Component {
  state = {
    // photo
    description: this.props.photo.description,
    tags: this.props.photo.tags.toString(),
    location: this.props.photo.location,
    // form validation
    formErrors: {
      location: ''
    },
    locationValid: false,
    formValid: false
  };

  componentDidMount() {
    this.editPhotoInitialValidation();
  }

  handleTextInput = e => {
    const fieldName = e.currentTarget.name;
    const filedValue = e.currentTarget.value;

    this.setState({ [fieldName]: filedValue }, () => {
      this.validateField(fieldName, filedValue);
    });
  };

  validateField(fieldName, value) {
    let { formErrors: fieldValidationErrors, locationValid } = this.state;

    if (fieldName === 'location') {
      locationValid = !!(value.match(/^[a-zA-Z\s\d]+$/gi) && value.length > 3);
      fieldValidationErrors.location = locationValid ? '' : ' is invalid';
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        locationValid: locationValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.locationValid
    });
  }

  // on edit album, set album as valid
  editPhotoInitialValidation = () => {
    this.setState(
      {
        locationValid: true
      },
      this.validateForm
    );
  };

  resetForm = () => {
    this.setState({
      description: '',
      location: '',
      tags: ''
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { description, location, tags } = this.state;
    const photoUpdates = {
      description,
      location,
      tags: tags.split(',')
    };
    // update the state
    this.props.dispatch(
      editAlbumPhoto(this.props.albumId, this.props.photo.id, photoUpdates)
    );

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
  albumId: ownProps.albumId,
  photo: ownProps.photo
});

EditPhoto = connect(mapStateToProps)(EditPhoto);
export default EditPhoto;

EditPhoto.defaultProps = {
  location: '',
  description: '',
  tags: ''
};

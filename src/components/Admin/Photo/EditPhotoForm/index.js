import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { startEditPhoto } from './../../../../actions/photos';
import FormErrors from './../../../common/FormErrors';
import './EditPhotoForm.scss';

// TODO: in validateForm - do not submit form if nothing is changed

let EditPhotoForm = class extends Component {
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

  // *********** on edit album, set album as valid ******************** //
  editPhotoInitialValidation = () => {
    this.setState(
      {
        locationValid: true
      },
      this.validateForm
    );
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { description, location, tags } = this.state;
    const photoUpdates = {
      description: description.trim(),
      location: location.trim(),
      tags: tags.split(',').map(tag => tag.trim())
    };
    // update the state
    this.props
      .dispatch(
        startEditPhoto(this.props.photo.id, this.props.albumId, photoUpdates)
      )
      .then(() => alert('Photo updated'));
  };

  // *********** add has-error css class if the field has an error ******************** //
  hasError(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  render() {
    const { formErrors, description, tags, location, formValid } = this.state;
    const LinkToAlbum = props => (
      <Link
        to={`${process.env.PUBLIC_URL}/anita/edit-album/${this.props.albumId}`}
        {...props}
      >
        Zurück zu Album
      </Link>
    );
    return (
      // render form validation errors
      <section className="edit__photo container">
        <Paper className="edit__photo__form">
          <Typography variant="h4" gutterBottom>
            Photo bearbeiten
          </Typography>
          <FormErrors formErrors={formErrors} />
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-control">
              <TextField
                value={tags}
                onChange={this.handleTextInput}
                required
                type="text"
                id="tags"
                label="Tags"
                name="tags"
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-control">
              <TextField
                value={location}
                onChange={this.handleTextInput}
                required
                type="text"
                id="location"
                label="Ort"
                name="location"
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </div>

            <TextField
              value={description}
              onChange={this.handleTextInput}
              multiline
              type="text"
              id="description"
              label="Beschreibung"
              name="description"
              margin="normal"
              variant="outlined"
              fullWidth
            />

            <Button
              style={{ marginBottom: '1rem' }}
              color="primary"
              type="submit"
              variant="contained"
              disabled={!formValid}
              size="large"
            >
              Speichern
            </Button>
          </form>

          <Button
            component={LinkToAlbum}
            color="secondary"
            variant="contained"
            style={{ color: 'white' }}
          >
            Zurück zu Album
          </Button>
        </Paper>
      </section>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  albumId: ownProps.albumId,
  photo: ownProps.photo
});

EditPhotoForm = connect(mapStateToProps)(EditPhotoForm);
export default EditPhotoForm;

EditPhotoForm.defaultProps = {
  location: '',
  description: '',
  tags: ''
};

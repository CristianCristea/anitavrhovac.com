import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { startAddAlbum, startEditAlbum } from './../../../../actions/albums';
import FormErrors from './../../../common/FormErrors';
import './AlbumForm.scss';

// *********** Album form - use for add and edit album ******************** //
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
      this.resetForm();
    } else {
      this.props.dispatch(startEditAlbum(albumToEdit.id, albumUpdates));
      // TODO: display info - album updated
      alert('Album updated!');
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
    //   <section className="login">
    //   <div className="login__container">
    //     <img src={logo} alt="logo" className="login__logo" />

    //     <div className="login__form__container">
    //       <form onSubmit={loginSubmit} className="login__form">
    //         <div className="login__form__control">
    //           <AccountCircle />
    //           <TextField
    //             required
    //             id="email"
    //             label="Email"
    //             type="email"
    //             name="email"
    //             margin="normal"
    //             variant="outlined"
    //             autoComplete="email"
    //           />
    //         </div>

    //         <div className="login__form__control">
    //           <Lock />
    //           <TextField
    //             required
    //             id="password"
    //             label="Password"
    //             type="password"
    //             margin="normal"
    //             variant="outlined"
    //             autoComplete="current-password"
    //           />
    //         </div>

    //         <Button
    //           type="submit"
    //           variant="contained"
    //           color="primary"
    //           className="login__form__submitBtn"
    //         >
    //           Login
    //         </Button>
    //       </form>
    //     </div>
    //   </div>
    // </section>

    //   <input
    //   className={`${this.hasError(this.state.formErrors.name)}`}
    //   type="text"
    //   name="name"
    //   placeholder="name"
    //   required
    //   value={this.state.name}
    //   onChange={this.handleTextInput}
    // />

    //   <input
    //   type="text"
    //   name="description"
    //   placeholder="description"
    //   value={this.state.description}
    //   onChange={this.handleTextInput}
    // />

    //   <input
    //   type="text"
    //   name="location"
    //   placeholder="location"
    //   required
    //   value={this.state.location}
    //   onChange={this.handleTextInput}
    // />

    return (
      // render form validation errors
      <section className="container">
        <Paper className="album__form">
          <Typography variant="h6" gutterBottom>
            Update Album
          </Typography>
          <FormErrors formErrors={this.state.formErrors} />
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-control">
              <TextField
                className={`${this.hasError(this.state.formErrors.name)}`}
                value={this.state.name}
                onChange={this.handleTextInput}
                required
                type="text"
                id="name"
                label="Name"
                name="name"
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-control">
              <TextField
                className={`${this.hasError(this.state.formErrors.location)}`}
                value={this.state.location}
                onChange={this.handleTextInput}
                required
                type="text"
                id="location"
                label="Location"
                name="location"
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </div>
            <TextField
              className={`${this.hasError(this.state.formErrors.description)}`}
              value={this.state.description}
              onChange={this.handleTextInput}
              required
              multiline
              type="text"
              id="description"
              label="Description"
              name="description"
              margin="normal"
              variant="outlined"
              fullWidth
            />

            <Button
              color="primary"
              type="submit"
              variant="contained"
              disabled={!this.state.formValid}
            >
              Update
            </Button>
          </form>
        </Paper>
      </section>
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

import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { startAddPhoto } from './../../../../actions/photos';
import FormErrors from './../../../common/FormErrors';
import CircularLoaderDeterminate from './../../../common/CircularLoaderDeterminate';
import ConfirmationBox from '../../ConfirmationBox';
import './AddPhoto.scss';

/*
add to coresp album
add to photos */

let AddPhoto = class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // cloudinary config - move to env variables
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      unsignedUploadPreset: process.env.REACT_APP_UNSIGNED_UPLOAD_PRESET,
      // uploaded photo
      public_id: null,
      delete_token: '',
      deletedUpload: false,
      uploadComplete: false,
      percentCompleted: 0,
      photoAdded: false,
      // photo
      description: '',
      tags: `#${this.props.album.name.toLowerCase()}, #${this.props.album.location.toLowerCase()}`,
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

    this.photoInput = null;

    this.setPhotoInputRef = element => {
      this.photoInput = element;
    };
  }

  componentDidMount() {
    this.validateInitialLocation();
  }

  // *********** Upload file to Cloudinary ******************** //
  uploadFile(file) {
    this.validatePhoto(file);

    const fd = new FormData();
    fd.append('upload_preset', this.state.unsignedUploadPreset);
    fd.append('tags', `${(this.props.album.name, this.props.album.location)}`); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);

    const config = {
      method: 'post',
      url: `https://api.cloudinary.com/v1_1/${
        this.state.cloudName
      }/image/upload`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      data: fd,
      onUploadProgress: e => {
        let percentCompleted = Math.round((e.loaded * 100) / e.total);
        this.setState({
          uploadComplete: percentCompleted === 100 ? true : false
        });
        this.setState({
          percentCompleted: percentCompleted >= 100 ? 0 : percentCompleted
        });
      }
    };

    axios(config)
      .then(resp => {
        const { secure_url, public_id, delete_token } = resp.data;
        this.setState({
          secure_url,
          public_id,
          delete_token,
          deletedUpload: false
        });
        this.validateForm();
      })
      .catch(err => console.log(err));
  }

  // *********** Delete Uploaded file from Cloudinary - max 10 min after upload ******************** //
  deleteUploadedFile(token) {
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${
          this.state.cloudName
        }/delete_by_token`,
        { token }
      )
      .then(() => {
        this.setState({ deletedUpload: true, uploadComplete: false });
        this.photoInput.value = null;
        this.validateForm();
      })
      .catch(err => console.log(err));
  }

  // *********** inherit location from album, set location as valid ******************** //
  validateInitialLocation = () => {
    this.setState(
      {
        locationValid: true
      },
      this.validateForm
    );
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
        locationValid = value.length > 2;
        fieldValidationErrors.location = locationValid
          ? ''
          : ' ist invalid, minimum 3 Buchstaben.';
        break;
      case 'photo':
        // check image type and size < 5MB
        photoValid =
          fileTypes.indexOf(value.type) !== -1 &&
          (value.size / 1048576).toFixed(1) < 5;
        fieldValidationErrors['cover photo'] = photoValid
          ? ''
          : ' ist invalid, das Foto muss kleiner als 5MB sein.';
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

  validatePhoto(photo) {
    this.setState({ photo }, () =>
      this.validateField('photo', this.state.photo)
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.locationValid &&
        this.state.photoValid &&
        this.state.uploadComplete
    });
  }

  resetForm = () => {
    const album = this.props.album;

    this.setState({
      description: '',
      location: `${album.location}`,
      tags: `#${this.props.album.name.toLowerCase()}, #${this.props.album.location.toLowerCase()}`,
      photo: {},
      deletedUpload: true,
      uploadComplete: false,
      photoValid: false,
      formValid: false
    });
    this.photoInput.value = null;
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { description, location, tags } = this.state;
    const album = this.props.album;
    const photoData = {
      created_at: moment().unix(),
      description: description.trim(),
      location: location.trim(),
      tags: tags.split(',').map(tag => tag),
      liked_by_admin: false,
      photo_url: this.state.secure_url,
      photo_public_id: this.state.public_id,
      isCover: false
    };

    this.props.dispatch(startAddPhoto(album, photoData));
    this.resetForm();

    this.setState({ photoAdded: true });
  };

  handleCloseConfirmationBox() {
    this.setState({ photoAdded: false });
  }

  // *********** add has-error css class if the field has an error ******************** //
  hasError(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  render() {
    const { album } = this.props;
    const {
      description,
      tags,
      location,
      uploadComplete,
      public_id,
      deletedUpload,
      delete_token,
      formErrors,
      formValid,
      cloudName
    } = this.state;

    const LinkToAlbum = props => (
      <Link
        to={`${process.env.PUBLIC_URL}/anita/edit-album/${album.id}`}
        {...props}
      >
        Album
      </Link>
    );
    return (
      <section className="add__photo__page container">
        {this.state.photoAdded && (
          <ConfirmationBox
            data="Das Foto wurde hinzugefügt."
            handleClose={this.handleCloseConfirmationBox.bind(this)}
          />
        )}

        <Paper className="photo__form" style={{ minHeight: '470px' }}>
          <Typography variant="h4" gutterBottom>
            Neues Foto
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
            {/*********** hide default input ********************/}
            <input
              style={{ display: 'none' }}
              type="file"
              id="fileElem"
              accept="image/*"
              disabled={uploadComplete}
              ref={this.setPhotoInputRef}
              onChange={() => this.uploadFile(this.photoInput.files[0])}
            />
            <Tooltip title="Foto wählen">
              <Button
                style={{ display: 'block' }}
                onClick={() => this.photoInput.click()}
                disabled={uploadComplete}
                color="primary"
                variant="fab"
              >
                +
              </Button>
            </Tooltip>

            <Button
              style={{ marginBottom: '1rem' }}
              color="primary"
              type="submit"
              variant="contained"
              disabled={!formValid}
              size="large"
            >
              Foto hochladen
            </Button>
          </form>

          <Button
            style={{ color: 'white', display: 'block', width: 'fit-content' }}
            component={LinkToAlbum}
            color="secondary"
            variant="contained"
          >
            Album
          </Button>

          <div id="photoPreview" className="add__photo__page__photoPreview">
            <CircularLoaderDeterminate
              uploadProgress={this.state.percentCompleted}
            />
            {public_id && !deletedUpload && (
              <div>
                <Image
                  cloudName={cloudName}
                  publicId={public_id}
                  crop="scale"
                  width="300"
                  quality="auto"
                  fetchFormat="auto"
                />
                <Button
                  style={{
                    display: 'block',
                    background: 'red',
                    color: 'white'
                  }}
                  onClick={() => this.deleteUploadedFile(delete_token)}
                  color="secondary"
                  variant="contained"
                  mini
                >
                  Löschen
                </Button>
              </div>
            )}
          </div>
        </Paper>
      </section>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  album: state.collections.filter(
    collection => collection.id === ownProps.match.params.album_id
  )[0]
});

export default connect(mapStateToProps)(AddPhoto);

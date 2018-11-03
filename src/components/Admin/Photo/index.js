import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import EditPhotoForm from './EditPhotoForm';
import './Photo.scss';

// *********** render edit photo  ******************** //
let AdminPhoto = ({ albumId, photo, history }) => {
  return (
    <div className="admin__photo container">
      <EditPhotoForm photo={photo} edit history={history} albumId={albumId} />
      <div className="admin__photo__imageContainer">
        <Image
          cloudName={process.env.REACT_APP_CLOUD_NAME}
          publicId={photo.photo_public_id}
          crop="scale"
          width="auto"
          responsive
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    albumId: ownProps.match.params.album_id,
    photo: state.collections.reduce((result, album) => {
      if (album.id === ownProps.match.params.album_id) {
        let photo = album.photos.filter(
          p => p.id === ownProps.match.params.photo_id
        )[0];
        result.push(photo);
      }
      return result;
    }, [])[0]
  };
};

AdminPhoto = connect(mapStateToProps)(AdminPhoto);
export default AdminPhoto;

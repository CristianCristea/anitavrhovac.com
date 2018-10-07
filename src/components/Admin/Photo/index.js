import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import EditPhotoForm from './EditPhotoForm';

// *********** render edit photo  ******************** //
let AdminPhoto = ({ albumId, photo, history }) => {
  return (
    <div className="admin__photo">
      <Image
        cloudName="dmz84tdv1"
        publicId={photo.photo_public_id}
        crop="scale"
        width="800"
      />
      <EditPhotoForm photo={photo} edit history={history} albumId={albumId} />
      <Link to={`${process.env.PUBLIC_URL}/anita/edit-album/${albumId}`}>
        Back to album
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/anita/dashboard`}>
        Back to dashboard
      </Link>
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

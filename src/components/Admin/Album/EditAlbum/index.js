import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Jumbotron from './../../../common/Jumbotron';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import AlbumForm from '../Form';
import AdminPhotos from '../../Photos';
import { startEditAlbum } from './../../../../actions/albums';
import { getAlbumTags } from './../../../../helpers/album';
import './EditAlbum.scss';

// *********** Edit album page ******************** //
let AdminAlbum = ({ album, history, dispatch }) => {
  // display each photo with edit, delete, set cover btn
  const { name, description, location, cover, publicAlbum, photos } = album;
  const AddPhotoLink = props => (
    <Link
      to={`${process.env.PUBLIC_URL}/anita/${album.id}/add-photo`}
      {...props}
    />
  );
  const tags = getAlbumTags(album);
  let hasPhotos = photos.length > 0;
  let isPublic = publicAlbum;

  return (
    <section className="albumPage container">
      <div className="albumPage__banner">
        <Jumbotron
          imageId={cover.photo_public_id}
          details={{ name, description, location, tags }}
        />
      </div>

      <AlbumForm album={album} edit history={history} />

      <Tooltip title="Neues Photo" enterDelay={500}>
        <Button
          component={AddPhotoLink}
          color="primary"
          variant="fab"
          className="albumPage__addPhotoBtn"
          aria-label="Add album"
        >
          +
        </Button>
      </Tooltip>

      {/* render publish btn if the album is not public and has at least one photo*/}
      {!isPublic &&
        hasPhotos && (
          <Tooltip title="Album veröffentlichen" enterDelay={500}>
            <Button
              color="primary"
              variant="fab"
              className="albumPage__publishAlbumBtn"
              aria-label="Publish album"
              onClick={() => {
                dispatch(startEditAlbum(album.id, { publicAlbum: true }));
                isPublic = !isPublic;
              }}
            >
              <DoneIcon />
            </Button>
          </Tooltip>
        )}

      <AdminPhotos album={album} />
    </section>
  );
};

const mapStateToProps = (state, ownProps) => ({
  album: state.collections.filter(
    album => album.id === ownProps.match.params.id
  )[0]
});

AdminAlbum = connect(mapStateToProps)(AdminAlbum);
export default AdminAlbum;

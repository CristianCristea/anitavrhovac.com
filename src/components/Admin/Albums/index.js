import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import sizeMe from 'react-sizeme';
import StackGrid from 'react-stack-grid';
import { startDeleteAlbum, startEditAlbum } from './../../../actions/albums';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertBox from './../../common/AlertBox';
import DoneIcon from '@material-ui/icons/Done';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import PhotoCard from './../../common/PhotoCard';
import LocationIcon from './../../common/Icons/LocationIcon';
import './AdminAlbums.scss';

// *********** Album thumbnails  ******************** //
let AdminAlbums = ({ albums, dispatch, size }) => {
  if (albums.length === 0) {
    return (
      <Typography variant="h2" className="admin__albums__heading">
        No Albums
      </Typography>
    );
  }

  return (
    <section className="admin__albums container">
      <Typography variant="h2" className="admin__albums__heading">
        Albums
      </Typography>
      <StackGrid
        monitorImagesLoaded={true}
        columnWidth={
          size.width <= 768
            ? '100%'
            : size.width > 768 && size.width <= 980
              ? '40%'
              : '33.3%'
        }
        gutterHeight={15}
        gutterWidth={15}
      >
        {albums.map(album => {
          let hasPhotos = album.photos.length > 0;
          let isPublic = album.publicAlbum;
          const AddPhotoLink = props => (
            <Link
              to={`${process.env.PUBLIC_URL}/anita/${album.id}/add-photo`}
              {...props}
            />
          );
          const EditAlbumLink = props => (
            <Link
              to={`${process.env.PUBLIC_URL}/anita/edit-album/${album.id}`}
              className="admin__album__edit"
              {...props}
            />
          );

          return (
            <Paper key={album.id} className="admin__album">
              <PhotoCard
                key={album.id}
                photo={album.cover}
                photoLink={`${process.env.PUBLIC_URL}/anita/edit-album/${
                  album.id
                }`}
              />
              <div className="admin__album__details">
                <Typography variant="h5" color="textPrimary">
                  {album.name}
                </Typography>
                <LocationIcon text={album.location} />

                <div className="admin__album__buttons">
                  <Tooltip title="Neues Foto" enterDelay={500}>
                    <Button
                      component={AddPhotoLink}
                      variant="fab"
                      color="primary"
                      aria-label="Add"
                      mini
                      className="admin__album__addPhotoBtn"
                    >
                      <AddIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Album bearbeiten" enterDelay={500}>
                    <Button
                      component={EditAlbumLink}
                      variant="fab"
                      color="secondary"
                      aria-label="Edit"
                      mini
                      className="admin__album__editAlbumBtn"
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>

                  <AlertBox
                    args={[album]}
                    dispatch={dispatch}
                    icon={<DeleteIcon />}
                    actionOnConfirm={startDeleteAlbum}
                    classNames="admin__album__deleteAlbumBtn"
                    title="Bist du sicher dass du das Album löschen willst?"
                    tooltip="Album löschen"
                  />

                  {/* render publish btn if the album is not public and has at least one photo */}
                  {!isPublic &&
                    hasPhotos && (
                      <Tooltip title="Album veröffentlichen" enterDelay={500}>
                        <Button
                          variant="fab"
                          color="primary"
                          aria-label="Publish"
                          mini
                          className="admin__album__publishAlbumBtn"
                          onClick={() => {
                            dispatch(
                              startEditAlbum(album.id, { publicAlbum: true })
                            );
                            isPublic = !isPublic;
                          }}
                        >
                          <DoneIcon />
                        </Button>
                      </Tooltip>
                    )}
                </div>
              </div>
            </Paper>
          );
        })}
      </StackGrid>
    </section>
  );
};

const mapStateToProps = state => ({
  albums: state.collections
});

export default connect(mapStateToProps)(sizeMe()(AdminAlbums));

AdminAlbums.propTypes = {
  albums: PropTypes.array
};

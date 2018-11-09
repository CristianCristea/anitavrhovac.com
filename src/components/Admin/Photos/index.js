import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import sizeMe from 'react-sizeme';
import StackGrid from 'react-stack-grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import PhotoCard from './../../common/PhotoCard';
import LocationIcon from './../../common/Icons/LocationIcon';
import PhotoIcon from '@material-ui/icons/Photo';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertBox from './../../common/AlertBox';
import { startEditAlbum } from './../../../actions/albums';
import { startDeletePhoto } from './../../../actions/photos';
import './AdminPhotos.scss';

let AdminPhotos = ({ album, dispatch, size }) => {
  const { photos, cover } = album;
  let hasPhotos = album.photos.length > 0;

  if (!photos || !hasPhotos) {
    return (
      <section className="admin__photos">
        <Typography variant="h2">You have no photos in this album</Typography>
      </section>
    );
  }

  return (
    <section className="admin__photos container">
      <Typography variant="h2" className="admin__albums__heading">
        Photos
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
        {photos.map(photo => {
          const {
            id,
            photo_public_id,
            photo_url,
            description,
            location,
            tags
          } = photo;
          // check if the photo is the album cover
          let isCover = cover.photo_public_id === photo_public_id;
          const EditPhotoLink = props => (
            <Link
              to={`${process.env.PUBLIC_URL}/anita/${
                album.id
              }/edit-photo/${id}`}
              {...props}
            />
          );

          return (
            <Paper key={id} className="admin__photo">
              <PhotoCard
                photo={photo}
                photoLink={`${process.env.PUBLIC_URL}/anita/${
                  album.id
                }/edit-photo/${id}`}
              />
              <div className="admin__photo__details">
                <LocationIcon text={location} />
                {isCover && (
                  <Tooltip
                    title="The photo is used as album cover"
                    enterDelay={500}
                  >
                    <Typography
                      variant="button"
                      component="span"
                      className="admin__photo__coverTag"
                    >
                      Cover
                    </Typography>
                  </Tooltip>
                )}
                <Typography variant="body1">{description}</Typography>
                <div className="admin__photo__tags">
                  {tags.map(tag => (
                    <Typography
                      variant="subtitle2"
                      className="admin__photo__tag"
                      key={tag}
                    >
                      {tag}
                    </Typography>
                  ))}
                </div>

                <div className="admin__photo__buttons">
                  <Tooltip title="Edit photo" enterDelay={500}>
                    <Button
                      component={EditPhotoLink}
                      variant="fab"
                      color="secondary"
                      aria-label="Edit"
                      mini
                      className="admin__album__editAlbumBtn"
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>

                  {!isCover && (
                    <Tooltip title="Set cover photo" enterDelay={500}>
                      <Button
                        className="admin__photo__setCoverBtn"
                        variant="fab"
                        color="primary"
                        aria-label="Edit"
                        mini
                        onClick={() => {
                          const newCover = {
                            cover: { photo_public_id, photo_url }
                          };
                          dispatch(startEditAlbum(album.id, newCover));
                        }}
                      >
                        <PhotoIcon />
                      </Button>
                    </Tooltip>
                  )}
                  {!isCover && (
                    <AlertBox
                      args={[album.id, photo.id]}
                      dispatch={dispatch}
                      icon={<DeleteIcon />}
                      actionOnConfirm={startDeletePhoto}
                      classNames="admin__photo__deleteBtn"
                      title="Bist du sicher dass du das Foto löschen willst?"
                      tooltip="Foto löschen"
                    />
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

// AdminPhotos = connect()(AdminPhotos);
export default connect()(sizeMe()(AdminPhotos));

// export default AdminPhotos;

AdminPhotos.propTypes = {
  album: PropTypes.object
};

// <Tooltip title="Delete photo" enterDelay={500}>
// <Button
//   variant="fab"
//   aria-label="Delete"
//   mini
//   className="admin__photo__deleteBtn"
//   onClick={() => {
//     dispatch(startDeletePhoto(album.id, photo.id));
//   }}
// >
//   <DeleteIcon />
// </Button>
// </Tooltip>

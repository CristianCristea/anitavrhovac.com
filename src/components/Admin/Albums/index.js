import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sizeMe from 'react-sizeme';
import StackGrid from 'react-stack-grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { startDeleteAlbum, startEditAlbum } from './../../../actions/albums';
import PhotoCard from './../../common/PhotoCard';
import LocationIcon from './../../common/Icons/LocationIcon';
import './AdminAlbums.scss';

// *********** Album thumbnails  ******************** //
let AdminAlbums = ({ albums, dispatch, size }) => {
  if (albums.length === 0) {
    return (
      <Typography variant="display2" className="admin__albums__heading">
        No Albums
      </Typography>
    );
  }

  return (
    <section className="admin__albums container">
      <Typography variant="display2" className="admin__albums__heading">
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

          return (
            <div key={album.id}>
              <div className="admin__album">
                <PhotoCard
                  key={album.id}
                  photo={album.cover}
                  photoLink={`${process.env.PUBLIC_URL}/albums/${album.id}`}
                />
                <Typography
                  variant="subheading"
                  component="h3"
                  color="textPrimary"
                >
                  {album.name}
                </Typography>
                <LocationIcon text={album.location} />

                <Link
                  to={`${process.env.PUBLIC_URL}/anita/edit-album/${album.id}`}
                  className="admin__album__edit"
                >
                  Edit
                </Link>
                <Link
                  to={`${process.env.PUBLIC_URL}/anita/${album.id}/add-photo`}
                >
                  Add Photo
                </Link>
                <button
                  className="delete"
                  onClick={() => dispatch(startDeleteAlbum(album))}
                >
                  Delete
                </button>
                {/* render publish btn if the album is not public and has at least one photo*/}
                {!isPublic &&
                  hasPhotos && (
                    <button
                      className="publish"
                      onClick={() => {
                        dispatch(
                          startEditAlbum(album.id, { publicAlbum: true })
                        );
                        isPublic = !isPublic;
                      }}
                    >
                      Publish
                    </button>
                  )}
              </div>
            </div>
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

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Navbar } from './../components/Layout/';
import Albums from './../components/Pages/Albums';
import Album from './../components/Pages/Albums/Album';
import Homepage from './../components/Pages/Homepage';
import PageNotFound from './../components/Pages/PageNotFound';
import About from './../components/Pages/About';
import AdminAddPhoto from './../components/Admin/Photo/AddPhoto';
import AdminAlbum from './../components/Admin/Album';
import AdminAddAlbum from './../components/Admin/Album/AddAlbum';
import AdminPhoto from './../components/Admin/Photo';
import AdminDashboard from './../components/Admin/Dashboard';

let AppRouter = class extends Component {
  render() {
    // sort all photos desc
    const latestPhotos = this.props.photos.sort((photo, nextPhoto) => {
      return nextPhoto.created_at - photo.created_at;
    });
    const { publicAlbums } = this.props;
    const latestPublicPhotos = latestPhotos.filter(photo => {
      for (let i = 0; i < publicAlbums.length; i++) {
        if (photo.album.id === publicAlbums[i].id) {
          return photo;
        }
      }
      return false;
    });

    return (
      <BrowserRouter>
        <CssBaseline>
          <Navbar />
          <Switch>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              render={() => <Homepage latestPhotos={latestPublicPhotos} />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/albums`}
              component={Albums}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/albums/:album_id`}
              component={Album}
            />
            <Route path={`${process.env.PUBLIC_URL}/about`} component={About} />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/anita/dashboard`}
              component={AdminDashboard}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/anita/edit-album/:id`}
              component={AdminAlbum}
            />
            <Route
              exact
              path={`${
                process.env.PUBLIC_URL
              }/anita/:album_id/edit-photo/:photo_id`}
              component={AdminPhoto}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/anita/add-album`}
              component={AdminAddAlbum}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/anita/:album_id/add-photo`}
              component={AdminAddPhoto}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/:album_id/:photo_id`}
              component={Album}
            />
            <Route component={PageNotFound} />
          </Switch>
        </CssBaseline>
      </BrowserRouter>
    );
  }
};

const mapStateToProps = state => ({
  collections: state.collections,
  publicAlbums: state.collections.filter(album => album.publicAlbum),
  photos: state.photos
});

AppRouter = connect(mapStateToProps)(AppRouter);
export default AppRouter;

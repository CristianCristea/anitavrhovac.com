import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { collections, photos } from './../fixtures';
import { Navbar } from './../components/Layout/';
import Albums from './../components/Pages/Albums';
import Album from './../components/Pages/Albums/Album';
import Homepage from './../components/Pages/Homepage';
import PageNotFound from './../components/Pages/PageNotFound';
import Photo from './../components/Pages/Photo';
import About from './../components/Pages/About';
import AdminAddPhoto from './../components/Admin/Photo/AddPhoto';
import AdminAlbum from './../components/Admin/Album';
import AdminAddAlbum from './../components/Admin/Album/AddAlbum';
import AdminPhoto from './../components/Admin/Photo';
import AdminDashboard from './../components/Admin/Dashboard';

class AppRouter extends Component {
  state = {
    collections,
    photos
  };

  createAlbum = album => {
    this.setState(prevState => {
      return { collections: prevState.collections.concat(album) };
    });
  };

  render() {
    // sort all photos desc
    const latestPhotos = this.state.photos.sort((photo, nextPhoto) => {
      return nextPhoto.created_at - photo.created_at;
    });
    const { collections: albums } = this.state;

    return (
      <BrowserRouter>
        <CssBaseline>
          <Navbar />
          <Switch>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              render={() => <Homepage latestPhotos={latestPhotos} />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/albums`}
              render={props => <Albums albums={albums} {...props} />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/albums/:id`}
              render={params => <Album albums={albums} {...params} />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/photos/:id`}
              render={params => (
                <Photo
                  photos={this.state.photos}
                  albums={this.state.collections}
                  {...params}
                />
              )}
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
            <Route component={PageNotFound} />
          </Switch>
        </CssBaseline>
      </BrowserRouter>
    );
  }
}

export default AppRouter;

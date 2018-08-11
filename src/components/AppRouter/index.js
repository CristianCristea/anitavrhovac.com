import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import uuid from 'uuid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Navbar } from './../Layout/';
import Albums from './../Albums';
import Album from './../Albums/Album';
import Homepage from './../Pages/Homepage';
import PageNotFound from './../Pages/PageNotFound';
import About from './../Pages/About';
import { collections, photos } from './../../fixtures/photos';

class AppRouter extends Component {
  state = {
    collections,
    photos
  };

  render() {
    // sort desc
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
              render={() => (
                <Homepage latestPhotos={latestPhotos} albums={albums} />
              )}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/albums`}
              render={props => (
                <Albums albums={albums} photos={photos} {...props} />
              )}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/albums/:name`}
              render={params => (
                <Album albums={albums} photos={photos} {...params} />
              )}
            />
            <Route path={`${process.env.PUBLIC_URL}/about`} component={About} />
            <Route component={PageNotFound} />
          </Switch>
        </CssBaseline>
      </BrowserRouter>
    );
  }
}

export default AppRouter;

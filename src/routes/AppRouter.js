import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Navbar } from './../components/Layout/';
import Albums from './../components/Pages/Albums';
import Album from './../components/Pages/Albums/Album';
import Homepage from './../components/Pages/Homepage';
import PageNotFound from './../components/Pages/PageNotFound';
import Photo from './../components/Pages/Photo';
import About from './../components/Pages/About';
import { collections, photos } from './../fixtures';
import AddAlbum from '../components/AddAlbum';

class AppRouter extends Component {
  state = {
    collections,
    photos
  };

  createAlbum = album => {
    this.setState(prevState => {
      return prevState.collections.concat(album);
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
              path={`${process.env.PUBLIC_URL}/anita/addAlbum`}
              render={params => (
                <AddAlbum createAlbum={this.createAlbum} {...params} />
              )}
            />
            <Route component={PageNotFound} />
          </Switch>
        </CssBaseline>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
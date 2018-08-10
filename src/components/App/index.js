import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Navbar } from './../Layout/';
import Homepage from './../Pages/Homepage';
import { photos } from './../../fixtures/photos';

class App extends Component {
  state = {
    collections: {
      random_album_id_1: {
        name: 'Test album',
        description: 'test description',
        date: Date.now()
      }
    },
    // dummy data
    photos
  };

  render() {
    // need array from sorted photos
    // find a way to sort the objects after created_at
    const photos = Object.keys(this.state.photos).sort();
    const latestPhotos = photos.map(photoName => this.state.photos[photoName]);
    console.log(latestPhotos);

    return (
      <CssBaseline>
        <Fragment>
          <Navbar />
          <Homepage latestPhotos={latestPhotos} />
        </Fragment>
      </CssBaseline>
    );
  }
}

export default App;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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

const AppRouter = () => (
  <BrowserRouter>
    <CssBaseline>
      <Navbar />
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage} />
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

export default AppRouter;

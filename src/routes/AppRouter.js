import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './../components/common/Navbar';
import Albums from './../components/User/Albums';
import Album from './../components/User/Albums/Album';
import Homepage from './../components/User/Homepage';
import PageNotFound from './../components/common/PageNotFound';
import About from './../components/User/About';
import AdminAddPhoto from './../components/Admin/Photo/AddPhoto';
import AdminAlbum from '../components/Admin/Album/EditAlbum';
import AdminAddAlbum from './../components/Admin/Album/AddAlbum';
import AdminPhoto from './../components/Admin/Photo';
import AdminDashboard from './../components/Admin/Dashboard';
import AdminLogin from './../components/Admin/Login';
import Footer from './../components/common/Footer';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PrivacyPolicy from '../components/User/PrivacyPolicy';
import CookieConset from 'react-cookie-consent';
import ReactGA from 'react-ga';
import './AppRouter.scss';

export const history = createHistory();
ReactGA.initialize('UA-78116734-3');
ReactGA.set({ anonymizeIp: true });
history.listen(location => ReactGA.pageview(location.pathname));

const AppRouter = () => (
  // add history manually
  // to access the history in auth().onAuthStateChanged
  // to use history - use Router not BrowserRouter
  <Router history={history}>
    <CssBaseline>
      <Navbar />
      <main>
        <Switch>
          {/*  admin routes */}
          <PublicRoute
            exact
            path={`${process.env.PUBLIC_URL}/anita`}
            component={AdminLogin}
          />
          <PrivateRoute
            exact
            path={`${process.env.PUBLIC_URL}/anita/dashboard`}
            component={AdminDashboard}
          />
          <PrivateRoute
            exact
            path={`${process.env.PUBLIC_URL}/anita/add-album`}
            component={AdminAddAlbum}
          />
          <PrivateRoute
            exact
            path={`${process.env.PUBLIC_URL}/anita/edit-album/:id`}
            component={AdminAlbum}
          />
          <PrivateRoute
            exact
            path={`${process.env.PUBLIC_URL}/anita/:album_id/add-photo`}
            component={AdminAddPhoto}
          />
          <PrivateRoute
            exact
            path={`${
              process.env.PUBLIC_URL
            }/anita/:album_id/edit-photo/:photo_id`}
            component={AdminPhoto}
          />

          {/*  public routes */}
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            component={Homepage}
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
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/about`}
            component={About}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/:album_id/:photo_id`}
            component={Album}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/datenschutzerklaerung-privacy-policy`}
            component={PrivacyPolicy}
          />
          <Route component={PageNotFound} />
        </Switch>
      </main>

      <Footer />
      <CookieConset
        location="bottom"
        buttonText=" Accept"
        style={{ background: '#fff', color: 'inherit' }}
        buttonStyle={{
          background: '#08a045',
          color: '#fff',
          fontFamily: 'Roboto, sans serif',
          fontSize: '12px',
          fontWeight: '500',
          textTransform: 'uppercase',
          cursor: 'pointer'
        }}
      >
        <div className="cookie__content">
          <Typography variant="caption">
            This website uses cookies. We inform you that this site uses own,
            technical and third parties cookies to make sure our web page is
            user-friendly and to guarantee a high functionality of the webpage.
            By continuing to browse this website, you declare to accept the use
            of cookies.
          </Typography>
          <a
            href={`${
              process.env.PUBLIC_URL
            }/datenschutzerklaerung-privacy-policy`}
          >
            Privacy Policy
          </a>
          <a href={`${process.env.PUBLIC_URL}/about`}>Impressum</a>
        </div>
      </CookieConset>
    </CssBaseline>
  </Router>
);

export default AppRouter;

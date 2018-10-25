import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import { startLogout } from './../../../actions/auth';
import './Navbar.scss';

const Navbar = ({ isAuthenticated }) => {
  const albumsLink = props => (
    <Link to={`${process.env.PUBLIC_URL}/albums`} {...props} />
  );

  const aboutLink = props => (
    <Link to={`${process.env.PUBLIC_URL}/about`} {...props} />
  );

  const dashboardLink = props => (
    <Link to={`${process.env.PUBLIC_URL}/anita/dashboard`} {...props} />
  );

  return (
    <AppBar color="primary" position="fixed" className="Navbar">
      <Toolbar className="Navbar__menu">
        <Link to="/" className="Navbar__logo">
          <IconButton color="inherit" aria-label="Menu">
            <HomeIcon />
          </IconButton>
        </Link>

        <IconButton color="inherit" aria-label="Menu">
          <SearchIcon />
        </IconButton>
        <Button color="inherit" component={albumsLink}>
          Albums
        </Button>
        {isAuthenticated && (
          <Button color="inherit" component={dashboardLink}>
            Dashboard
          </Button>
        )}
        <Button color="inherit" component={aboutLink}>
          About
        </Button>
        {isAuthenticated && (
          <Button color="inherit" onClick={startLogout()}>
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(Navbar);

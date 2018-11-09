import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from './../../../actions/auth';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import logo from './../../../images/av-logo.png';
import './Navbar.scss';

const Navbar = ({ isAuthenticated }) => {
  const AlbumsLink = props => (
    <Link to={`${process.env.PUBLIC_URL}/albums`} {...props} />
  );

  const AboutLink = props => (
    <Link to={`${process.env.PUBLIC_URL}/about`} {...props} />
  );

  const DashboardLink = props => (
    <Link to={`${process.env.PUBLIC_URL}/anita/dashboard`} {...props} />
  );

  return (
    <AppBar color="default" position="fixed" className="navbar">
      <Toolbar className="navbar__menu">
        <div className="navbar__left">
          <Link to={`${process.env.PUBLIC_URL}/`} className="navbar__homeBtn">
            <IconButton color="inherit" aria-label="Menu">
              <HomeIcon />
            </IconButton>
          </Link>
          <img src={logo} alt="logo" className="navbar__logo" />
        </div>

        <div className="navbar__right">
          <Button color="inherit" component={AlbumsLink}>
            Albums
          </Button>
          {isAuthenticated && (
            <Button color="inherit" component={DashboardLink}>
              Dashboard
            </Button>
          )}
          <Button color="inherit" component={AboutLink}>
            About
          </Button>
          {isAuthenticated && (
            <Button color="inherit" onClick={startLogout()}>
              Log out
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(Navbar);

// <IconButton color="inherit" aria-label="Menu">
// <SearchIcon />
// </IconButton>

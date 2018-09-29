import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import SearchIcon from './../Icons/Search';
import './Navbar.css';

export default function Navbar() {
  const albumsLink = props => (
    <Link to={`${process.env.PUBLIC_URL}/albums`} {...props} />
  );
  const aboutLink = props => (
    <Link to={`${process.env.PUBLIC_URL}/about`} {...props} />
  );

  return (
    <nav className="Navbar">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit" className="Navbar__logo">
            <Link to="/">AV</Link>
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Menu"
            className="Navbar__menu-button"
          >
            <SearchIcon />
          </IconButton>
          <Button color="inherit" component={albumsLink}>
            Albums
          </Button>
          <Button color="inherit" component={aboutLink}>
            About
          </Button>
        </Toolbar>
      </AppBar>
    </nav>
  );
}

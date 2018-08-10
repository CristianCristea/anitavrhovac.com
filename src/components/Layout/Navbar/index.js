import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import SearchIcon from './../../Icons/Search';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="Navbar">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit" className="Navbar__logo">
            AV
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Menu"
            className="Navbar__menu-button"
          >
            <SearchIcon />
          </IconButton>
          <Button color="inherit">Albums</Button>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    </nav>
  );
}

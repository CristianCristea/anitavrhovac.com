import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from './../../../actions/auth';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';

// import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import logo from './../../../images/av-logo.png';
import './Navbar.scss';

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
};

class Navbar extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { isAuthenticated, classes } = this.props;
    const HomeLink = props => (
      <Link to={`${process.env.PUBLIC_URL}/`} {...props} />
    );
    const AlbumsLink = props => (
      <Link to={`${process.env.PUBLIC_URL}/albums`} {...props} />
    );

    const AboutLink = props => (
      <Link to={`${process.env.PUBLIC_URL}/about`} {...props} />
    );

    const DashboardLink = props => (
      <Link to={`${process.env.PUBLIC_URL}/anita/dashboard`} {...props} />
    );

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem>
            <Button color="inherit" component={HomeLink}>
              <HomeIcon />
            </Button>
          </ListItem>
          <ListItem>
            <Button color="inherit" component={AlbumsLink}>
              Albums
            </Button>
          </ListItem>
          <ListItem>
            <Button color="inherit" component={AboutLink}>
              About
            </Button>
          </ListItem>
        </List>
        <Divider />

        {isAuthenticated && (
          <List>
            <ListItem>
              <Button color="inherit" component={DashboardLink}>
                Dashboard
              </Button>
            </ListItem>
            <ListItem>
              <Button color="inherit" onClick={startLogout()}>
                Logout
              </Button>
            </ListItem>
          </List>
        )}
      </div>
    );

    return (
      <AppBar color="default" position="fixed" className="navbar">
        <Toolbar className="navbar__menu">
          <div>
            <IconButton onClick={this.toggleDrawer('left', true)}>
              <img src={logo} alt="logo" className="navbar__logo" />
            </IconButton>
            <Drawer
              anchor="left"
              open={this.state.left}
              onClose={this.toggleDrawer('left', false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(Navbar));

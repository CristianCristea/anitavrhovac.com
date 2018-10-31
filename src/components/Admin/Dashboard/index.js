import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AdminAlbums from './../Albums';
import './Dashboard.scss';

// *********** Admin dashboard  ******************** //
const Dashboard = () => {
  const AddAlbumLink = props => (
    <Link to={`${process.env.PUBLIC_URL}/anita/add-album`} {...props} />
  );
  return (
    <section className="dashboard container">
      <Tooltip title="Create album" enterDelay={500}>
        <Button
          component={AddAlbumLink}
          color="primary"
          variant="fab"
          className="dashboard__addAlbum"
          aria-label="Add album"
        >
          +
        </Button>
      </Tooltip>
      <AdminAlbums />
    </section>
  );
};

export default Dashboard;

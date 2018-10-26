import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AdminAlbums from './../Albums';
import './Dashboard.scss';

// *********** Admin dashboard  ******************** //
const Dashboard = () => {
  const AddAlbum = props => (
    <Link to={`${process.env.PUBLIC_URL}/anita/add-album`} {...props} />
  );
  return (
    <section className="dashboard container">
      <Button
        component={AddAlbum}
        color="primary"
        variant="fab"
        className="dashboard__add-album"
        aria-label="Add album"
      >
        +
      </Button>

      <AdminAlbums />
    </section>
  );
};

export default Dashboard;

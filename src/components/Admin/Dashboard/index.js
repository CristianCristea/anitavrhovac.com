import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AdminAlbums from './../Albums';
import './Dashboard.scss';

// *********** Admin dashboard  ******************** //
const Dashboard = () => {
  const AddAlbum = props => (
    <Link to={`${process.env.PUBLIC_URL}/anita/add-album`} {...props} />
  );
  return (
    <Grid container spacing={8} className="dashboard">
      <Grid item xs={12}>
        <Button
          component={AddAlbum}
          color="primary"
          variant="fab"
          className="dashboard__add-album"
          aria-label="Add album"
        >
          +
        </Button>
      </Grid>
      <Grid item xs={12}>
        <AdminAlbums />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import AdminAlbums from './../Albums';

const Dashboard = () => {
  // create admin dashboard, navigation
  return (
    <section className="dashboard">
      <Link to={`${process.env.PUBLIC_URL}/anita/add-album`}>Add album</Link>
      <AdminAlbums />
    </section>
  );
};

export default Dashboard;

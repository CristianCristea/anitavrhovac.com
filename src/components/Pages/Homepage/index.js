import React from 'react';
import Photos from './../../Photos';

const Homepage = ({ latestPhotos }) => {
  return (
    <section className="latest-photos">
      <h2>Homepage</h2>
      <Photos photos={latestPhotos} />
    </section>
  );
};

export default Homepage;

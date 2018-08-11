import React from 'react';
import Photos from './../../Photos';

const Homepage = ({ latestPhotos, albums }) => {
  return (
    <section className="latest-photos">
      <h2>Homepage</h2>
      <Photos photos={latestPhotos} albums={albums} />
    </section>
  );
};

export default Homepage;

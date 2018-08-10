import React from 'react';

const Homepage = ({ latestPhotos }) => {
  return (
    <section className="latest-photos">
      <h2>Homepage</h2>
      {latestPhotos.map((photo, i) => {
        console.log(photo);
        return <img key={photo.urls.small} src={photo.urls.small} />;
      })}
    </section>
  );
};

export default Homepage;

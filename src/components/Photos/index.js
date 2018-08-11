import React from 'react';
import { Link } from 'react-router-dom';
import './Photos.css';

const Photos = ({ photos, albums }) => {
  return (
    <div className="photos">
      {photos.map(photo => {
        const { collectionName, location, urls, collection } = photo;
        return (
          <Link
            to={`${process.env.PUBLIC_URL}/albums/${collection}`}
            key={photo.urls.small}
            className="photos__photo-card"
          >
            <figure className="photo">
              <img src={urls.small} />
              <figcaption className="photos__photo-details">
                <p>{collectionName}</p>
                <p>{location}</p>
              </figcaption>
            </figure>
          </Link>
        );
      })}
    </div>
  );
};

export default Photos;

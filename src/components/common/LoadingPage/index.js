import React from 'react';
import CircularLoaderIndeterminate from './../CircularLoaderIndeterminate';
import './LoadingPage.scss';

const LoadingPage = () => (
  <section className="loading__page">
    <CircularLoaderIndeterminate />
  </section>
);

export default LoadingPage;

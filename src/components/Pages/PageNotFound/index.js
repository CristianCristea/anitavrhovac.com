import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <section className="page-not-found">
    <h2>The page you are looking doesn't exist or has been moved.</h2>
    <Link to={`${process.env.PUBLIC_URL}/`}>Back to first page</Link>
  </section>
);

export default PageNotFound;

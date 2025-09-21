import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <div className="page-not-found-content">
        <h1 className="page-not-found-title">404</h1>
        <p className="page-not-found-subtitle">Route not exits</p>
        <p className="page-not-found-desc">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="page-not-found-link"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
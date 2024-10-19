import React from 'react';
import '../static/page_not_found.css';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>404 Error: Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Please check the URL and try again.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default PageNotFound;
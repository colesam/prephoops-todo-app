import React from 'react';

const BaseLayout = ({ children }) => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;

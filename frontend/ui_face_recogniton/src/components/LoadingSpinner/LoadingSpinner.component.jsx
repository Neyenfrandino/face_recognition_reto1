// LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.style.scss';

const LoadingSpinner = ({ text = "Cargando..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-wrapper">
        <div className="spinner-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span className="loading-text">{text}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
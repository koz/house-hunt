import React from 'react';

const MapPin = ({ isActive, handleClick }) => (
  <button onClick={handleClick}>
    <svg width='18' height='18' viewBox='0 0 362.3 362.3'>
      <path
        d='M181.149 0C104.294 0 41.766 62.528 41.766 139.384c0 72.646 115.691 197.714 128.881 211.753l10.502 11.163 10.502-11.163c13.193-14.027 128.882-139.107 128.882-211.753C320.539 62.528 258.011 0 181.149 0zm0 197.065c-31.801 0-57.676-25.875-57.676-57.676 0-31.802 25.875-57.676 57.676-57.676 31.808 0 57.676 25.875 57.676 57.676 0 31.802-25.868 57.676-57.676 57.676z'
        fill={isActive ? '#2b2d42' : '#8d99ae'}
      />
    </svg>
  </button>
);

export default MapPin;

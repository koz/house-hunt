import React from 'react';

const MapButton = ({ handleClick, className, isActive }) => (
  <button className={className} onClick={handleClick}>
    {isActive ? 'close map' : 'show map'}
  </button>
);

export default MapButton;

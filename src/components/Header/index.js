import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import GoogleMapReact from 'google-map-react';

import useWindowResize from '../../hooks/useWindowResize';

import MapButton from '../MapButton';
import MapPin from '../MapPin';

const Header = ({ apartments = [], apartmentInView }) => {
  const [mapStyle, setMapStyle] = useState({});
  const [showMap, setShowMap] = useState(false);
  const windowSize = useWindowResize();

  useEffect(() => {
    if (!windowSize || !windowSize.width) {
      return;
    }

    const isMobile = windowSize?.width < 768;
    const isTablet = windowSize?.width <= 1024;

    setMapStyle({
      height: isMobile ? '180px' : '350px',
      width: isMobile || isTablet ? '100%' : '38.1%',
      opacity: showMap ? 1 : 0,
      zIndex: showMap ? 1 : -1,
      pointerEvents: showMap ? null : 'none',
    });
  }, [windowSize, showMap]);

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Apartment Hunting</h1>
      <MapButton
        isActive={showMap}
        className={styles.mapButton}
        handleClick={() => setShowMap((state) => !state)}
      />
      <div className={styles.map} style={mapStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          }}
          defaultCenter={{
            lat: 52.3659341,
            lng: 4.8803339,
          }}
          defaultZoom={13}
        >
          {apartments.map((ap, i) => (
            <MapPin
              key={`${ap.lat}-${ap.lng}`}
              lat={ap.lat}
              lng={ap.lng}
              isActive={i === apartmentInView}
              handleClick={() => {
                const element = document.querySelector(
                  `[data-anchor="${ap.url}"]`
                );
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Header;

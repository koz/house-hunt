import { useEffect, useState } from 'react';

const getSize = (window) => ({
  width: window?.innerWidth,
  height: window?.innerHeight,
});

const useWindowResize = () => {
  const isClient = typeof window === 'object';

  const [windowSize, setWindowSize] = useState(
    getSize(isClient ? window : null)
  );

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = () => {
      setWindowSize(getSize(window));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};

export default useWindowResize;

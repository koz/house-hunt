import { useEffect, useRef, useState } from 'react';

const useIsInView = (containerRef) => {
  const [isInView, setIsInView] = useState();
  const [nodeRef, setRef] = useState(null);
  const observer = useRef(null);
  const callbackRef = (node) => {
    if (node !== null) {
      setRef(node);
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        root: containerRef,
      }
    );
  }, []);

  useEffect(() => {
    if (nodeRef && observer.current) {
      observer.current.observe(nodeRef);
    }
  }, [nodeRef, observer]);

  return { isInView, ref: callbackRef };
};

export default useIsInView;

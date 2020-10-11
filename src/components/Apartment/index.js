import React, { useEffect } from 'react';

import useIsInView from '../../hooks/useIsInView';

import styles from './Apartment.module.scss';

import Notes from '../Notes';

const Apartment = ({
  url,
  name,
  price,
  photos,
  likeContent,
  dislikeContent,
  questionsContent,
  onView,
  containerRef,
  ['data-anchor']: anchor,
}) => {
  const { isInView, ref } = useIsInView(containerRef?.current);

  useEffect(() => {
    if (isInView) {
      onView();
    }
  }, [isInView]);

  return (
    <div ref={ref} className={styles.apartment} data-anchor={anchor}>
      <div className={styles.apartmentTitle}>
        <a href={url} className={styles.apartamentName}>
          {name}
        </a>
        <span className={styles.apartmentPrice}>€{price}</span>
      </div>
      <div className={styles.gallery}>
        {photos.map((img) => (
          <img key={img} className={styles.picture} src={img} />
        ))}
      </div>
      <div className={styles.notes}>
        <Notes title={'What we like'} content={likeContent} />
        <Notes title={'What we dislike'} content={dislikeContent} />
        <Notes title={'Questions'} content={questionsContent} />
      </div>
    </div>
  );
};
export default Apartment;

import { useState, useRef } from 'react';
import cx from 'classnames';

import Header from '../components/Header';
import Apartment from '../components/Apartment';

import styles from '../styles/Home.module.scss';
import getProperties from '../utils/getPropertyData';

export default function Home(props) {
  const listRef = useRef(null);
  const [apartmentInView, setApartmentInView] = useState();

  return (
    <div className={styles.container}>
      <Header apartments={props.apartments} apartmentInView={apartmentInView} />
      <div ref={listRef} className={styles.apartmentsList}>
        {props.apartments.map((ap, i) => (
          <Apartment
            data-anchor={ap.url}
            key={ap.url}
            url={ap.url}
            name={ap.name}
            price={ap.price}
            photos={ap.photos}
            likeContent={ap['Like']}
            dislikeContent={ap['Dislike']}
            questionsContent={ap['Questions']}
            containerRef={listRef}
            onView={() => {
              setApartmentInView(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const notionData = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_TABLE_ID}`
  ).then((res) => res.json());

  const apartmentsData = await getProperties(notionData.map((c) => c['URL']));

  const housingWithData = notionData.map((c, i) => ({
    ...c,
    name: apartmentsData[i].name,
    photos: apartmentsData[i].photos,
    price: apartmentsData[i].price,
    url: apartmentsData[i].url,
    lat: apartmentsData[i].lat,
    lng: apartmentsData[i].lng,
  }));

  return {
    props: {
      apartments: housingWithData,
    },
  };
}

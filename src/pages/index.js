import cx from 'classnames';

import Notes from '../components/Notes';

import styles from '../styles/Home.module.scss';
import getProperties from '../utils/getPropertyData';

export default function Home(props) {
  return (
    <div>
      <h1 className={styles.title}>Apartment Hunting</h1>
      <div>
        {props.apartments.map((ap) => (
          <div key={ap.url} className={styles.apartment}>
            <div className={styles.apartmentTitle}>
              <a href={ap.url} className={styles.apartamentName}>
                {ap.name}
              </a>
              <span className={styles.apartmentPrice}>€{ap.price}</span>
            </div>
            <div className={styles.gallery}>
              {ap.photos.map((img) => (
                <img key={img} className={styles.picture} src={img} />
              ))}
            </div>
            <div className={styles.notes}>
              <Notes title={'What we like'} content={ap['Like']} />
              <Notes title={'What we dislike'} content={ap['Dislike']} />
              <Notes title={'Questions'} content={ap['Questions']} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const notionPageID = 'a3ebaa4e7dd14469a5d31147f9e70cc4';
  const notionData = await fetch(
    `https://notion-api.splitbee.io/v1/table/${notionPageID}`
  ).then((res) => res.json());

  const apartmentsData = await getProperties(notionData.map((c) => c['URL']));

  const housingWithPhotos = notionData.map((c, i) => ({
    ...c,
    name: apartmentsData[i].name,
    photos: apartmentsData[i].photos,
    price: apartmentsData[i].price,
    url: apartmentsData[i].url,
  }));

  return {
    props: {
      apartments: housingWithPhotos,
    },
  };
}

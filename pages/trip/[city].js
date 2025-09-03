import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Trip.module.css';

const tripData = {
  belgrade: {
    name: 'Belgrade',
    country: 'Serbia',
    year: 2018,
    participants: ['Max', 'Wilhelm', 'Truls', 'Emil'],
    photo: '/belgrade.png',
    highlights: [
      'Belgrade almost had Max',
    ]
  },
  budapest: {
    name: 'Budapest',
    country: 'Hungary',
    year: 2019,
    participants: ['Emil', 'Max', 'Jens', 'Wilhelm', 'Nils', 'Truls', 'Otto', 'Hampus'],
    photo: '/budapest.png',
    highlights: [
      'Relaxed in the famous Széchenyi Thermal Baths',
    ]
  },
  krakow: {
    name: 'Krakow',
    country: 'Poland',
    year: 2023,
    participants: ['Wilhelm', 'Jens', 'Otto', 'Kullberg', 'Max', 'Emil', 'Truls'],
    photo: '/krakow.jpg',
    highlights: [
      'Nordic Spa',
      'Grisknä'
    ]
  },
  bratislava: {
    name: 'Bratislava',
    country: 'Slovakia',
    year: 2024,
    participants: ['Wilhelm', 'Jens', 'Otto', 'Kullberg', 'Max', 'Emil', 'Micke', 'Hampus', 'Truls'],
    photo: '/bratislava.jpg',
    highlights: [
      'Babyshowers',
      '1 million beers',
      'Laserdome'
    ]
  }
};

export default function TripPage() {
  const router = useRouter();
  const { city } = router.query;
  
  const trip = tripData[city?.toLowerCase()];
  
  if (!trip) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Trip not found</h1>
          <Link href="/" className={styles.backLink}>
            ← Back to map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{trip.name} {trip.year} - Ålander Balkan Tours</title>
      </Head>

      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Back to map
        </Link>
        <h1 className={styles.title}>
          {trip.name}, {trip.country}
        </h1>
        <p className={styles.year}>{trip.year}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img 
            src={trip.photo} 
            alt={`${trip.name} trip ${trip.year}`}
            className={styles.tripImage}
          />
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.participantsSection}>
            <h2>Participants</h2>
            <div className={styles.participantsList}>
              {trip.participants.map((participant, index) => (
                <span key={index} className={styles.participantTag}>
                  {participant}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.highlightsSection}>
            <h2>Trip Highlights</h2>
            <ul className={styles.highlightsList}>
              {trip.highlights.map((highlight, index) => (
                <li key={index} className={styles.highlight}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
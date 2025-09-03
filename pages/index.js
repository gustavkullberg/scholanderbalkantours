import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import dynamic from 'next/dynamic';

const TourMap = dynamic(() => import('../components/TourMap'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ålander Balkan Tours</title>
      </Head>

      <header className={styles.header}>

        <h1 className={styles.title}>
          <Link href="/" className={styles.link}>
            Ålander Balkan Tours
          </Link>
        </h1>
      </header>

      <main className={styles.main}>

        <div className={styles.mapContainer}>
          <h2>Destinations</h2>
          <TourMap />
        </div>

      </main>

      <footer className={styles.footer}>

        <h2>
          Scholanderbalkan.tours ©
        </h2>


      </footer>
    </div>
  )
}

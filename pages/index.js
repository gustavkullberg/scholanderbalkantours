import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scholander Balkan Tours</title>
      </Head>

      <header className={styles.header}>

        <h1 className={styles.title}>
          <Link href="/">
            <a className={styles.link}>Scholander Balkan Tours</a>
          </Link>
        </h1>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Wille is here working on YOUR next adventure.
        </h1>

      </main>

      <footer className={styles.footer}>

        <h2>
          Scholanderbalkan.tours ©
        </h2>


      </footer>
    </div>
  )
}

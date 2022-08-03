import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Toteat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          ¡Bienvenido a <a href="https://www.toteat.com">ToteatApp!</a>
        </h1>

        <div className={styles.grid}>
          <a href="/statistics" className={styles.card}>
            <h2>Estadísticas &rarr;</h2>
          </a>

          <a className={styles.card}>
            <h2>Menú &rarr;</h2>
          </a>

          <a className={styles.card}>
            <h2>Personal &rarr;</h2>
          </a>

          <a className={styles.card}>
            <h2>Pedidos &rarr;</h2>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/TrinidadVargas">
          By Trinidad Vargas
        </a>
      </footer>
    </div>
  )
}

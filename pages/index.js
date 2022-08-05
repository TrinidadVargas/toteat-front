import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Toteat App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          ¡Bienvenido a <a href="https://www.toteat.com">ToteatApp!</a>
        </h1>

        <div className={styles.grid}>
          <a className={styles.card}>
            <Link href="/statistics" >
              <h2>Estadísticas &rarr;</h2>
            </Link>
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

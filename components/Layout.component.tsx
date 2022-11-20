import Head from "next/head"
import Image from "next/image";
import { FC, useEffect } from "react"
import styles from "../styles/Layout.module.css"
import { useDarkModeContext } from '../context/DarkMode.context'
import Link from "next/link";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode
}


const Layout: FC<Props> = ({ title, description, children}) => {
  const { mode, switchMode } = useDarkModeContext();

  useEffect(() => {
    if (mode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [mode])

  return (
    <>

      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta name="description" content={description} />
      </Head>

      <header className={styles.header}>
        <Image src={mode ? "/images/vector_dark.svg" :"/images/vector.svg"} alt="cloud banner" fill />
        <div className={styles.header__container}>
          <Link href="/" className={mode ? `${styles.logo} ${styles.dark}`: styles.logo}>
            Carnet de Rêves
          </Link>
          <div className="toggleWrapper">
            <input type="checkbox" checked={mode} onChange={() => switchMode()} className={styles.dn} id="dn" />
            <label htmlFor="dn" className={styles.toggle}>
              <span className={styles.toggle__handler}>
                <span className={`${styles.crater} ${styles.crater_1}`}></span>
                <span className={`${styles.crater} ${styles.crater_2}`}></span>
                <span className={`${styles.crater} ${styles.crater_3}`}></span>
              </span>
              <span className={`${styles.crater} ${styles.star_1}`}></span>
              <span className={`${styles.crater} ${styles.star_2}`}></span>
              <span className={`${styles.crater} ${styles.star_3}`}></span>
              <span className={`${styles.crater} ${styles.star_4}`}></span>
              <span className={`${styles.crater} ${styles.star_5}`}></span>
              <span className={`${styles.crater} ${styles.star_6}`}></span>
            </label>
          </div>
        </div>
      </header>
      <main className={styles.container}>
      {children}
      </main>
    </>
  )
}

Layout.defaultProps = {
  title: "Carnet de rêves",
  description: "Carnet de rêves - page d'accueil"
} as Partial<Props>

export default Layout
import styles from '../styles/Home.module.css'
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Post } from '../models/Post.type'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Link from "next/link"
import Layout from '../components/Layout.component'
import Image from 'next/image'
import { useDarkModeContext } from '../context/DarkMode.context'

export const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


const Home: NextPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {

  const {mode} = useDarkModeContext()

  return (
    <Layout>
          {posts.map((post: Post, index: number) => (
            <article className={mode ? `${styles.post} ${styles.dark}` : styles.post } key={index}>
              <div className={styles.post__img}>
                <Image className={styles.img} src={post.metaData.cover_image} fill alt="blog image" />
              </div>
              <div className={styles.post__content}>
                <Link href={`/blog/${post.slug}`}>
                <h1 className={styles.title}>{post.metaData.title}</h1>
                </Link>
                <p className={styles.date}>
                  {new Date(post.metaData.date).toLocaleDateString('fr-FR', options)}
                </p>
                <p className={styles.excerpt}>{post.metaData.excerpt}</p>
                <Link href={`/blog/${post.slug}`}>
                  <button className={styles.button}>Lire la suite</button>
                </Link>
              </div>
            </article>
          ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // get files from posts dir
  const files = fs.readdirSync(path.join('posts'))

  // get slug and frontmatter from posts
  let posts = files.map(filename => {
    // create slug
    const slug = filename.replace('.md', '')

    // get article
    const article = fs.readFileSync(path.join('posts', filename), 'utf-8')

    // parse markdown metaData
    const { data: metaData } = matter(article)

    return {
      slug,
      metaData
    }
  })

  // sorting posts by date
  posts = posts.sort((a, b) => {
    return new Date(b.metaData.date).getTime() - new Date(a.metaData.date).getTime()
  })

  return {
    props: {
      posts: posts
    }
  }
}

export default Home;
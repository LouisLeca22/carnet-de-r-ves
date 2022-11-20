import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from "../../components/Layout.component"
import Image from "next/image"
import styles from '../../styles/Blog.module.css'
import { useDarkModeContext } from "../../context/DarkMode.context"
import { options } from "../";
import Link from "next/link"

export default function PostPage({ metaData, content }: InferGetStaticPropsType<typeof getStaticProps>) {
    const { mode } = useDarkModeContext()
    return <Layout title={"Carnet de rêves - " + metaData.title} description={metaData.excerpt}>
        <h1 className={mode ? `${styles.title} ${styles.dark}` : styles.title}>{metaData.title}</h1>
        <div className={styles.wrap}>
            <div className={mode ? `${styles.img__container} ${styles.dark}` : styles.img__container}>
                <Image src={metaData.cover_image} fill className={styles.img} alt={metaData.cover_img + "image"} />
            </div>
            <div className={mode ? `${styles.content} ${styles.content}` : styles.content} dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
            <p className={mode ? `${styles.date} ${styles.dark}` : styles.date}>
                {new Date(metaData.date).toLocaleDateString('fr-FR', options)}
            </p>
        </div>

        <div className={mode ? `${styles.arrow} ${styles.dark}` : styles.arrow}>
            <Link href="/" className={styles.arrow__link}>
                
                <span className={styles.arrow__left}></span>
            </Link>
        </div>

    </Layout>
}


export const getStaticPaths: GetStaticPaths = async () => {
    // get files from posts dir
    const files = fs.readdirSync(path.join("posts"))
    // create paths 
    const paths = files.map(filename => (
        {
            params: {
                slug: filename.replace('.md', '')
            }
        }
    ))

    return {
        paths,
        fallback: false  // redirect to 404 page when accessing a path which does not exist
    }
}


type Params = {
    [param: string]: any;
}

export const getStaticProps: GetStaticProps<Params> = async ({ params: { slug } }: Params) => {
    // get article
    const article = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')
    // parse markdown 
    const { data: metaData, content } = matter(article)

    return {
        props: {
            metaData,
            slug,
            content
        }
    }
}
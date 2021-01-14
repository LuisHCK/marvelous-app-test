import React, { Fragment, useEffect, useState } from 'react'
import loadable from '@loadable/component'
import { getComics } from '../services/comics.service'
import '../assets/scss/pages/home/home.scss'

// Lazy load components
const ComicCard = loadable(() => import('../components/comics/comic-card'))
const Seo = loadable(() => import('../components/seo'))
const Layout = loadable(() => import('../components/layout'))

export default function IndexPage() {
    const [featuredComics, setFeaturedComics] = useState([])

    useEffect(() => {
        getFeaturedComics()
        return () => {}
    }, [])

    const getFeaturedComics = async () => {
        const { data } = await getComics({ limit: 5 })

        setFeaturedComics(data?.data.results)
    }

    const renderComicCards = () =>
        featuredComics.map((comic, index) => (
            <ComicCard
                key={'featured-comic-' + index}
                title={comic.title}
                cover={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`}
            />
        ))

    return (
        <Fragment>
            <Layout useNavBar useFooter>
                <Seo title="Home" />

                <main className="Page HomePage">
                    <h1>Home Page</h1>

                    <div className="HomePage-featuredComics">
                        {renderComicCards()}
                    </div>
                </main>
            </Layout>
        </Fragment>
    )
}

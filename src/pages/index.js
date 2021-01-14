import React, { Fragment, useEffect, useState } from 'react'
import loadable from '@loadable/component'
import { getComics } from '../services/comics.service'
import '../assets/scss/pages/home/home.scss'

// Lazy load components
const ComicCard = loadable(() => import('../components/comics/comic-card'))
const Seo = loadable(() => import('../components/seo'))
const Layout = loadable(() => import('../components/layout'))
const Spinner = loadable(() => import('../components/spinner'))

export default function IndexPage() {
    const [loadingState, setLoadingState] = useState({ featured: true })
    const [featuredComics, setFeaturedComics] = useState([])

    useEffect(() => {
        getFeaturedComics()
        return () => {}
    }, [])

    const getFeaturedComics = async () => {
        const { data } = await getComics({ limit: 5, orderBy: 'focDate' })

        setFeaturedComics(data?.data.results)
        setLoadingState((prev) => {
            return { ...prev, featured: false }
        })
    }

    const renderComicCards = () =>
        featuredComics.map((comic, index) => (
            <ComicCard
                key={'featured-comic-' + index}
                title={comic.title}
                cover={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`}
            />
        ))

    const renderSpinner = () => (loadingState.featured ? <Spinner /> : null)

    return (
        <Fragment>
            <Layout useNavBar useFooter>
                <Seo title="Home" />

                <main className="Page HomePage">
                    <h1>Home Page</h1>

                    <div className="HomePage-featuredComics">
                        {renderSpinner()}
                        {renderComicCards()}
                    </div>

                </main>
            </Layout>
        </Fragment>
    )
}

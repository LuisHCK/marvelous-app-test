import React, { Fragment, useEffect, useState } from 'react'
import Layout from '../components/layout'
import PageCover from '../components/page-cover'
import Seo from '../components/seo'
import ComicsPageCover from '../assets/img/marvel-comic-page-cover.jpg'
import { getComics } from '../services/comics.service'
import ComicCard from '../components/comics/comic-card'
import Filter from '../components/filter'
import '../assets/scss/pages/comics/comics.scss'
import Search from '../components/search'
import Spinner from '../components/spinner'
import { getThumbnailURL } from '../utils/thumbnails'

export default function Comics() {
    const [loadingState, setLoadingState] = useState(true)
    const [comics, setComics] = useState([])
    const [filters, setFilters] = useState({})
    const [search, setSearch] = useState({})
    const [offset, setOffset] = useState(20)

    useEffect(() => {
        getComicsList()
        return () => {}
    }, [filters, search, offset])

    /**
     * Get comics list from API
     */
    const getComicsList = async () => {
        setComics([])
        setLoadingState(true)

        const { data } = await getComics({ ...filters, ...search })

        setComics(data?.data.results)
        setLoadingState(false)
    }

    const handleFilters = ({ field, value }) => {
        if (value && value !== 'all') {
            setFilters({ [field]: value })
        } else {
            setFilters({})
        }
    }

    const handleSearch = (value) => {
        setSearch(value)
    }

    const renderComicCards = () =>
        comics?.map((comic, index) => (
            <ComicCard
                key={'comic-card-' + index}
                id={comic.id}
                title={comic.title}
                thumbnail={getThumbnailURL(comic.thumbnail)}
                creators={comic.creators?.items}
                format={comic.format}
                issueNumber={comic.issueNumber}
            />
        ))

    const renderSpinner = () => (loadingState ? <Spinner /> : null)

    return (
        <Fragment>
            <Layout useNavBar useFooter>
                <Seo title="Comics" />

                <PageCover image={ComicsPageCover}>
                    <h1>Marvel Comics</h1>
                </PageCover>

                <main className="Page ComicsPage">
                    <section>
                        <div className="ComicsPage-header">
                            <h2>Comics List</h2>

                            <div className="ComicsPage-search search">
                                <Search onInput={handleSearch} useSelect />
                            </div>

                            <div className="ComicsPage-controls filters">
                                <Filter
                                    onSelect={handleFilters}
                                    options={sortOptions}
                                    label="Sort by"
                                    field="orderBy"
                                />

                                <Filter
                                    onSelect={handleFilters}
                                    options={formatOptions}
                                    label="Format"
                                    field="format"
                                />
                            </div>
                        </div>

                        <div className="ContentRow">
                            {renderComicCards()}
                            {renderSpinner()}
                        </div>
                    </section>
                </main>
            </Layout>
        </Fragment>
    )
}

const sortOptions = [
    { value: 'title', label: 'Title' },
    { value: 'issueNumber', label: 'Issue number' },
    { value: 'modified', label: 'Modified' },
]

const formatOptions = [
    { label: 'Comic', value: 'comic' },
    { label: 'Magazine', value: 'magazine' },
    { label: 'Trade paperback', value: 'trade paperback' },
    { label: 'Hardcover', value: 'hardcover' },
    { label: 'Digest', value: 'digest' },
    { label: 'Graphic novel', value: 'graphic novel' },
    { label: 'Digital comic', value: 'digital comic' },
    { label: 'Infinite comic', value: 'infinite comic' },
]

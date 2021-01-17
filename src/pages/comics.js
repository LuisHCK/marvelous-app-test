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
import InfiniteScroll from 'react-infinite-scroll-component'
import NoContent from '../components/no-content'

let loadNextTimeout

export default function Comics() {
    const [loadingState, setLoadingState] = useState(true)
    const [comics, setComics] = useState([])
    const [filters, setFilters] = useState({})
    const [search, setSearch] = useState({})
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        /**
         * Get comics list from API
         */
        const getComicsList = async () => {
            setLoadingState(true)
            setHasMore(true)

            try {
                const { data } = await getComics({
                    ...filters,
                    ...search,
                    offset,
                })
                setComics((prev) => [...prev, ...data?.data.results])
            } catch (error) {
                setLoadingState(false)
                setHasMore(false)
                console.error(error)
            }

            setLoadingState(false)
        }

        getComicsList()
        return () => {}
    }, [filters, search, offset])

    const handleFilters = ({ field, value }) => {
        if (value && value !== 'all') {
            setOffset(0)
            setComics([])

            setFilters({ [field]: value })
        } else {
            setFilters({})
        }
    }

    const handleSearch = (value) => {
        setOffset(0)
        setComics([])

        setSearch(value)
    }

    const handleNext = () => {
        setHasMore(false)

        clearTimeout(loadNextTimeout)

        loadNextTimeout = setTimeout(() => {
            setOffset((prev) => prev + 20)
        }, 500)
    }

    const renderComicCards = () => (
        <InfiniteScroll
            dataLength={comics.length}
            next={handleNext}
            hasMore={hasMore}
            loader={<Spinner />}
        >
            <section className="ContentRow">
                {comics?.map((comic, index) => (
                    <ComicCard
                        key={'comic-card-' + index}
                        id={comic.id}
                        title={comic.title}
                        thumbnail={getThumbnailURL(comic.thumbnail)}
                        creators={comic.creators?.items}
                        format={comic.format}
                        issueNumber={comic.issueNumber}
                    />
                ))}
            </section>
        </InfiniteScroll>
    )

    const renderNoContent = () =>
        !comics.length && !loadingState ? <NoContent /> : null

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

                        <div className="Centered">{renderNoContent()}</div>

                        {renderComicCards()}
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

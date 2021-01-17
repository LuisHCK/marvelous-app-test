import React, { Fragment, useEffect, useState } from 'react'
import CharacterCard from '../components/characters/characters-card'
import Filter from '../components/filter'
import Layout from '../components/layout'
import PageCover from '../components/page-cover'
import Search from '../components/search'
import Seo from '../components/seo'
import Spinner from '../components/spinner'
import { getCharacters } from '../services/characters.service'
import '../assets/scss/pages/character/character.scss'
import { getThumbnailURL } from '../utils/thumbnails'
import InfiniteScroll from 'react-infinite-scroll-component'
import NoContent from '../components/no-content'

const coverURL = `https://terrigen-cdn-dev.marvel.com/content/prod/1x/news_articles-mas_dsk_01.jpg`

let loadNextTimeout

function Characters() {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({})
    const [search, setSearch] = useState({})
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        const getCharactersData = async () => {
            setLoading(true)
            setHasMore(true)

            try {
                const { data } = await getCharacters({
                    ...filters,
                    ...search,
                    offset,
                })

                setCharacters((prev) => [...prev, ...data?.data?.results])
            } catch (error) {
                setHasMore(false)
                setLoading(false)
                console.error(error)
            }

            setLoading(false)
        }

        getCharactersData()
    }, [filters, search, offset])

    const handleFilters = ({ field, value }) => {
        setOffset(0)
        setCharacters([])

        if (value && value !== 'all') {
            setFilters({ [field]: value })
        } else {
            setFilters({})
        }
    }

    const handleSearch = (value) => {
        setOffset(0)
        setCharacters([])
        setSearch(value)
    }

    const handleNext = () => {
        setHasMore(false)

        clearTimeout(loadNextTimeout)

        loadNextTimeout = setTimeout(() => {
            setOffset((prev) => prev + 20)
        }, 500)
    }

    const renderCharacterCards = () => (
        <InfiniteScroll
            dataLength={characters.length}
            next={handleNext}
            hasMore={hasMore}
            loader={<Spinner />}
        >
            <section className="ContentRow">
                {characters.map((character, index) => (
                    <CharacterCard
                        key={'popular-character-' + index}
                        id={character.id}
                        name={character.name}
                        thumbnail={getThumbnailURL(character.thumbnail)}
                    />
                ))}
            </section>
        </InfiniteScroll>
    )

    const renderNoContent = () =>
        !loading && !characters.length ? <NoContent /> : null

    return (
        <Fragment>
            <Seo title="Characters" />
            <Layout useNavBar useFooter>
                <PageCover image={coverURL}>
                    <h1>Marvel Characters</h1>
                </PageCover>

                <main className="Page">
                    <section>
                        <div className="CharacterPage-header">
                            <h2>Characters List</h2>

                            <div className="CharacterPage-search search">
                                <Search
                                    onInput={handleSearch}
                                    defaultField="nameStartsWith"
                                />
                            </div>

                            <div className="CharacterPage-controls filters">
                                <Filter
                                    onSelect={handleFilters}
                                    options={sortOptions}
                                    label="Sort by"
                                    field="orderBy"
                                />
                            </div>
                        </div>
                    </section>
                    <div className="Centered">{renderNoContent()}</div>
                    {renderCharacterCards()}
                </main>
            </Layout>
        </Fragment>
    )
}

export default Characters

const sortOptions = [
    { value: 'name', label: 'name' },
    { value: 'modified', label: 'Modified' },
]

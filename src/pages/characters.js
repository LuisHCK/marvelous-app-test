import React, { Fragment, useEffect, useState } from 'react'
import CharacterCard from '../components/characters/characters-card'
import Filter from '../components/filter'
import Layout from '../components/layout'
import PageCover from '../components/page-cover'
import Search from '../components/search'
import Seo from '../components/seo'
import Spinner from '../components/spinner'
import { getCharacters } from '../services/characters.service'

const coverURL = `https://terrigen-cdn-dev.marvel.com/content/prod/1x/news_articles-mas_dsk_01.jpg`

function Characters() {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({})
    const [search, setSearch] = useState({})

    useEffect(() => {
        const getCharactersData = async () => {
            setCharacters([])
            setLoading(true)
            const { data } = await getCharacters({ ...filters, ...search })

            setCharacters(data?.data?.results)
            setLoading(false)
        }

        getCharactersData()
    }, [filters, search])

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

    const renderCharacterCards = () =>
        characters.map((character, index) => (
            <CharacterCard
                key={'popular-character-' + index}
                id={character.id}
                name={character.name}
                thumbnail={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
            />
        ))

    const renderSpinner = () => (loading ? <Spinner /> : null)

    return (
        <Fragment>
            <Seo title="Characters" />
            <Layout useNavBar useFooter>
                <PageCover image={coverURL}>
                    <h1>Marvel Characters</h1>
                </PageCover>

                <main className="Page">
                    <section>
                        <div className="ComicsPage-header">
                            <h2>Characters List</h2>

                            <div className="ComicsPage-search">
                                <Search
                                    onInput={handleSearch}
                                    defaultField="nameStartsWith"
                                />
                            </div>

                            <div className="ComicsPage-controls">
                                <Filter
                                    onSelect={handleFilters}
                                    options={sortOptions}
                                    label="Sort by"
                                    field="orderBy"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="ContentRow">
                        {renderSpinner()}

                        {renderCharacterCards()}
                    </section>
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

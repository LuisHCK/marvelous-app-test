import React, { Fragment, useEffect, useState } from 'react'
import { getComics } from '../services/comics.service'
import { getCharacters } from '../services/characters.service'
import { getStories } from '../services/stories.service'
import ComicCard from '../components/comics/comic-card'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Spinner from '../components/spinner'
import PageCover from '../components/page-cover'
import CharacterCard from '../components/characters/characters-card'
import StoryCard from '../components/stories/story-card'
import '../assets/scss/pages/home/home.scss'
import { getThumbnailURL } from '../utils/thumbnails'
import NoContent from '../components/no-content'

export default function IndexPage() {
    const [loadingState, setLoadingState] = useState({
        featuredComics: true,
        popularCharacters: true,
        newStories: true,
    })
    const [featuredComics, setFeaturedComics] = useState([])
    const [popularCharacters, setPopularCharacters] = useState([])
    const [newStories, setNewStories] = useState([])

    useEffect(() => {
        getFeaturedComics()
        getPopularCharacters()
        getNewStories()
        return () => {}
    }, [])

    // Getters

    /**
     * Get featured comics
     */
    const getFeaturedComics = async () => {
        try {
            const { data } = await getComics({
                limit: 4,
                orderBy: '-focDate',
                format: 'comic',
            })

            setFeaturedComics(data?.data.results)
        } catch (error) {
            console.error(error)
            setLoadingState((prev) => {
                return { ...prev, featuredComics: false }
            })
        }

        setLoadingState((prev) => {
            return { ...prev, featuredComics: false }
        })
    }

    /**
     * Get popular comics
     */
    const getPopularCharacters = async () => {
        try {
            const { data } = await getCharacters({
                limit: 8,
                modifiedSince: '2020-01-14T18:14:49.856Z',
            })

            setPopularCharacters(data?.data.results)
        } catch (error) {
            console.error(error)
            setLoadingState((prev) => {
                return { ...prev, popularCharacters: false }
            })
        }

        setLoadingState((prev) => {
            return { ...prev, popularCharacters: false }
        })
    }

    /**
     * Get new stories
     */
    const getNewStories = async () => {
        try {
            const { data } = await getStories({
                limit: 4,
                orderBy: '-id',
            })

            setNewStories(data?.data.results)
        } catch (error) {
            console.error(error)
            setLoadingState((prev) => {
                return { ...prev, newStories: false }
            })
        }

        setLoadingState((prev) => {
            return { ...prev, newStories: false }
        })
    }

    // Renderers

    /**
     * Render comic cards
     */
    const renderComicCards = () =>
        featuredComics.map((comic, index) => (
            <ComicCard
                key={'featured-comic-' + index}
                id={comic.id}
                title={comic.title}
                thumbnail={getThumbnailURL(comic.thumbnail)}
                creators={comic.creators?.items}
                scrollContainer=""
            />
        ))

    /**
     * Render character cards
     */
    const renderCharacterCards = () =>
        popularCharacters.map((character, index) => (
            <CharacterCard
                key={'popular-character-' + index}
                id={character.id}
                name={character.name}
                thumbnail={getThumbnailURL(character.thumbnail)}
                scrollContainer=""
            />
        ))

    /**
     * Render story cards
     */
    const renderStoryCards = () =>
        newStories.map((story, index) => (
            <StoryCard
                key={'new-story-' + index}
                id={story.id}
                name={story.title}
                thumbnail={getThumbnailURL(story.thumbnail)}
                comics={story.comics?.items}
            />
        ))

    return (
        <Fragment>
            <Layout useNavBar useFooter>
                <Seo title="Home" />

                <PageCover>
                    <h1>Explore the marvel universe</h1>
                </PageCover>

                <main className="Page HomePage">
                    <section>
                        <h2>Featured Comics</h2>

                        <div className="ContentRow">
                            {loadingState.featuredComics ? <Spinner /> : null}

                            {!loadingState.featuredComics &&
                            !featuredComics.length ? (
                                <NoContent />
                            ) : null}

                            {renderComicCards()}
                        </div>
                    </section>

                    <section>
                        <h2>Popular characters</h2>

                        <div className="ContentRow">
                            {loadingState.popularCharacters ? (
                                <Spinner />
                            ) : null}

                            {!loadingState.popularCharacters &&
                            !popularCharacters.length ? (
                                <NoContent />
                            ) : null}

                            {renderCharacterCards()}
                        </div>
                    </section>

                    <section>
                        <h2>New stories</h2>

                        <div className="ContentRow">
                            {loadingState.newStories ? <Spinner /> : null}

                            {!loadingState.newStories && !newStories.length ? (
                                <NoContent />
                            ) : null}

                            {renderStoryCards()}
                        </div>
                    </section>
                </main>
            </Layout>
        </Fragment>
    )
}

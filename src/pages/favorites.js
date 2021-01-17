import React, { Fragment, useEffect, useState } from 'react'
import ComicCard from '../components/comics/comic-card'
import Layout from '../components/layout'
import Seo from '../components/seo'
import PageCover from '../components/page-cover'
import CharacterCard from '../components/characters/characters-card'
import StoryCard from '../components/stories/story-card'
import '../assets/scss/pages/home/home.scss'
import { loadData as loadFavoritesData } from '../services/favorites.service'
import NoContent from '../components/no-content'

export default function Favorites() {
    const [favoriteComics, setFavoriteComics] = useState([])
    const [favoriteCharacters, setFavoriteCharacters] = useState([])
    const [favoriteStories, setFavoriteStories] = useState([])

    useEffect(() => {
        loadFavorites()
    }, [])

    const loadFavorites = () => {
        const favorites = loadFavoritesData()
        setFavoriteComics(favorites.comics)
        setFavoriteCharacters(favorites.characters)
        setFavoriteStories(favorites.stories)
    }

    // Renderers

    /**
     * Render comic cards
     */
    const renderComicCards = () =>
        favoriteComics.map((comic, index) => (
            <ComicCard
                key={'featured-comic-' + index}
                id={comic.id}
                title={comic.title}
                thumbnail={comic.thumbnail}
                creators={comic.creators}
                onFavoriteChange={loadFavorites}
                favorite={true}
            />
        ))

    /**
     * Render character cards
     */
    const renderCharacterCards = () =>
        favoriteCharacters.map((character, index) => (
            <CharacterCard
                key={'popular-character-' + index}
                id={character.id}
                name={character.name}
                thumbnail={character.thumbnail}
                onFavoriteChange={loadFavorites}
            />
        ))

    /**
     * Render story cards
     */
    const renderStoryCards = () =>
        favoriteStories.map((story, index) => (
            <StoryCard
                key={'new-story-' + index}
                id={story.id}
                name={story.title}
                thumbnail={story.thumbnail}
                comics={story.comics}
                onFavoriteChange={loadFavorites}
            />
        ))

    return (
        <Fragment>
            <Layout useNavBar useFooter>
                <Seo title="Home" />

                <PageCover
                    image="https://terrigen-cdn-dev.marvel.com/content/prod/1x/pub0000169_16x9.jpg"
                    backgroundPosition="center"
                >
                    <h1>Your favorite content</h1>
                </PageCover>

                <main className="Page HomePage">
                    <section>
                        <h2>Comics</h2>

                        <div className="ContentRow">
                            {!favoriteComics?.length ? <NoContent /> : null}

                            {renderComicCards()}
                        </div>
                    </section>

                    <section>
                        <h2>Characters</h2>

                        <div className="ContentRow">
                            {!favoriteCharacters?.length ? <NoContent /> : null}

                            {renderCharacterCards()}
                        </div>
                    </section>

                    <section>
                        <h2>Stories</h2>

                        <div className="ContentRow">
                            {!favoriteStories?.length ? <NoContent /> : null}

                            {renderStoryCards()}
                        </div>
                    </section>
                </main>
            </Layout>
        </Fragment>
    )
}

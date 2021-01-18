import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { buildPath } from '../../../services/api.service'
import {
    addStory,
    isStoryFavorite,
    removeStory,
} from '../../../services/favorites.service'
import '../../../assets/scss/components/story-card/story-card.scss'
import FavoriteButton from '../../favorite-button'

function StoryCard(props) {
    const { id, name, comics, onFavoriteChange } = props
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        setFavorite(isStoryFavorite(id))
    }, [id])

    const storyURL = buildPath('/story', `?id=${id}`)

    const renderComicNames = () => comics?.map((comic) => comic.name).join(', ')

    const renderFavoriteButton = () => (
        <FavoriteButton active={favorite} onClick={saveFavorite} />
    )

    const saveFavorite = () => {
        if (favorite) {
            removeStory(id)
            setFavorite(false)
        } else {
            addStory({ id, name, comics })
            setFavorite(true)
        }
        onFavoriteChange()
    }

    return (
        <div className="StoryCard">
            {renderFavoriteButton()}
            <a
                href={storyURL}
                className="StoryCard-imageContainer"
                aria-label={name}
            >
                {name}
            </a>

            <a className="StoryCard-name" href={storyURL}>
                <h3>{name}</h3>

                <span className="StoryCard-comicNames">
                    {renderComicNames()}
                </span>
            </a>
        </div>
    )
}

StoryCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string,
    comics: PropTypes.array,
    onFavoriteChange: PropTypes.func,
}

StoryCard.defaultProps = {
    comics: [],
    onFavoriteChange: () => {},
}

export default StoryCard

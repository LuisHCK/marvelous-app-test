import React from 'react'
import PropTypes from 'prop-types'
import { buildPath } from '../../../services/api.service'
import '../../../assets/scss/components/story-card/story-card.scss'

function StoryCard(props) {
    const { id, name, comics } = props

    const storyURL = buildPath('/character', id)

    const renderComicNames = () => comics?.map((comic) => comic.name).join(', ')

    return (
        <div className="StoryCard">
            <a href={storyURL} className="StoryCard-imageContainer">
                {name}
            </a>

            <a className="StoryCard-name" href={storyURL}>
                <h5>{name}</h5>

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
}

StoryCard.defaultProps = {
    comics: [],
}

export default StoryCard

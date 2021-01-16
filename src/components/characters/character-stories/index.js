import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getCharacterStories } from '../../../services/characters.service'
import NoContent from '../../no-content'
import Spinner from '../../spinner'
import StoryCard from '../../stories/story-card'

export default function CharacterStories(props) {
    const { characterId } = props
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const gerStories = async () => {
            setLoading(true)

            const { data } = await getCharacterStories(characterId)

            setStories(data?.data.results)
            setLoading(false)
        }

        gerStories()
    }, [characterId])

    const renderStoriesCards = () =>
        stories.map((story, index) => (
            <StoryCard
                key={'new-story-' + index}
                id={story.id}
                name={story.title}
                thumbnail={`${story.thumbnail?.path}.${story.thumbnail?.extension}`}
                comics={story.comics?.items}
            />
        ))

    const renderSpinner = () => (loading ? <Spinner /> : null)

    const renderNoContent = () =>
        !loading && !stories?.length ? <NoContent /> : null

    return (
        <div className="ContentRow">
            {renderStoriesCards()}

            {renderSpinner()}

            {renderNoContent()}
        </div>
    )
}

CharacterStories.propTypes = {
    characterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
}

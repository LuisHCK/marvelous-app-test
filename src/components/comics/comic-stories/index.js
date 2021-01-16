import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getComicStories } from '../../../services/comics.service'
import StoryCard from '../../stories/story-card'
import Spinner from '../../spinner'
import NoContent from '../../no-content'

function ComicStories(props) {
    const { comicId } = props
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData()
        return () => {}
    }, [comicId])

    const getData = async () => {
        setLoading(true)
        const { data } = await getComicStories(comicId)

        setStories(data?.data.results)
        setLoading(false)
    }

    const renderStoryCards = () =>
        stories.map((story, index) => (
            <StoryCard
                key={'comic-story-' + index}
                id={story.id}
                name={story.title}
            />
        ))

    const renderSpinner = () => (loading ? <Spinner /> : null)

    const renderNoContent = () =>
        !loading && !stories?.length ? <NoContent /> : null

    return (
        <div className="ContentRow">
            {renderSpinner()}

            {renderStoryCards()}

            {renderNoContent()}
        </div>
    )
}

ComicStories.propTypes = {
    comicId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default ComicStories

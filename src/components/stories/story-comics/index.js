import React, { useEffect, useState } from 'react'
import { getStoryComics } from '../../../services/stories.service'
import { getThumbnailURL } from '../../../utils/thumbnails'
import ComicCard from '../../comics/comic-card'
import NoContent from '../../no-content'
import Spinner from '../../spinner'

export default function StoryComics(props) {
    const { storyId } = props
    const [comics, setComics] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getComics = async () => {
            setLoading(true)

            const { data } = await getStoryComics(storyId)

            setComics((prev) => [...prev, ...data?.data.results])
            setLoading(false)
        }

        getComics()
    }, [storyId])

    const renderComicsCards = () =>
        comics.map((comic, index) => (
            <ComicCard
                key={'story-comic-' + index}
                id={comic.id}
                title={comic.title}
                thumbnail={getThumbnailURL(comic.thumbnail)}
                creators={comic.creators?.items}
                scrollContainer=""
            />
        ))

    const renderSpinner = () => (loading ? <Spinner /> : null)

    const renderNoContent = () =>
        !loading && !comics?.length ? <NoContent /> : null

    return (
        <div className="ContentRow">
            {renderComicsCards()}

            {renderSpinner()}

            {renderNoContent()}
        </div>
    )
}

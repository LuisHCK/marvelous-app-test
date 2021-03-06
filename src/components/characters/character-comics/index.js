import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getCharacterComics } from '../../../services/characters.service'
import ComicCard from '../../comics/comic-card'
import NoContent from '../../no-content'
import Spinner from '../../spinner'
import { getThumbnailURL } from '../../../utils/thumbnails'

export default function CharacterComics(props) {
    const { characterId } = props
    const [comics, setComics] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getComics = async () => {
            setLoading(true)

            const { data } = await getCharacterComics(characterId)

            setComics(data?.data.results)
            setLoading(false)
        }

        getComics()
    }, [characterId])

    const renderComicsCards = () =>
        comics.map((comic, index) => (
            <ComicCard
                key={'featured-comic-' + index}
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

CharacterComics.propTypes = {
    characterId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getStoryCharacters } from '../../../services/stories.service'
import CharacterCard from '../../characters/characters-card'
import Spinner from '../../spinner'
import NoContent from '../../no-content'
import { getThumbnailURL } from '../../../utils/thumbnails'

function StoryCharacters(props) {
    const { storyId } = props
    const [characters, setCharacter] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const { data } = await getStoryCharacters(storyId)

            setCharacter(data?.data.results)
            setLoading(false)
        }

        getData()
    }, [storyId])

    console.log(characters)

    const renderSpinner = () => (loading ? <Spinner /> : null)

    const renderNoContent = () =>
        !loading && !characters?.length ? <NoContent /> : null

    const renderCharacterCards = () =>
        characters.map((character, index) => (
            <CharacterCard
                key={'comic-character-' + index}
                id={character.id}
                name={character.name}
                thumbnail={getThumbnailURL(character.thumbnail)}
            />
        ))

    return (
        <div className="ContentRow">
            {renderSpinner()}

            {renderCharacterCards()}

            {renderNoContent()}
        </div>
    )
}

StoryCharacters.propTypes = {
    storyId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default StoryCharacters

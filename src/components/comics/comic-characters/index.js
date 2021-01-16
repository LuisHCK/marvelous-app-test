import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getComicCharacters } from '../../../services/comics.service'
import CharacterCard from '../../characters/characters-card'
import Spinner from '../../spinner'
import NoContent from '../../no-content'

function ComicCharacters(props) {
    const { comicId } = props
    const [character, setCharacter] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData()
        return () => {}
    }, [comicId])

    const getData = async () => {
        setLoading(true)
        const { data } = await getComicCharacters(comicId)

        setCharacter(data?.data.results)
        setLoading(false)
    }

    const renderSpinner = () => (loading ? <Spinner /> : null)

    const renderNoContent = () =>
        !loading && !character?.length ? <NoContent /> : null

    const renderCharacterCards = () =>
        character.map((character, index) => (
            <CharacterCard
                key={'comic-character-' + index}
                id={character.id}
                name={character.name}
                thumbnail={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
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

ComicCharacters.propTypes = {
    comicId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default ComicCharacters

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { buildPath } from '../../../services/api.service'
import {
    addCharacter,
    isCharacterFavorite,
    removeCharacter,
} from '../../../services/favorites.service'
import FavoriteButton from '../../favorite-button'
import '../../../assets/scss/components/character-card/character-card.scss'

function CharacterCard(props) {
    const { id, thumbnail, name, onFavoriteChange } = props
    const [favorite, setFavorite] = useState(false)

    const characterURL = buildPath('/character', `?id=${id}`)

    useEffect(() => {
        setFavorite(isCharacterFavorite(id))
    }, [id])

    const renderFavoriteButton = () => (
        <FavoriteButton active={favorite} onClick={saveFavorite} />
    )

    const saveFavorite = () => {
        if (favorite) {
            removeCharacter(id)
            setFavorite(false)
        } else {
            addCharacter({ id, thumbnail, name })
            setFavorite(true)
        }
        onFavoriteChange()
    }

    return (
        <div className="CharacterCard">
            {renderFavoriteButton()}
            <a
                href={characterURL}
                className="CharacterCard-imageContainer"
                aria-label={name}
            >
                <LazyLoad classNamePrefix="CharacterCard" once>
                    <img
                        className="CharacterCard-image"
                        src={thumbnail}
                        alt={name}
                        title={name}
                    />
                </LazyLoad>
            </a>

            <a className="CharacterCard-name" href={characterURL}>
                <h3>{name}</h3>
            </a>
        </div>
    )
}

CharacterCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    thumbnail: PropTypes.string,
    name: PropTypes.string.isRequired,
    onFavoriteChange: PropTypes.func,
}

CharacterCard.defaultProps = {
    onFavoriteChange: () => {},
}

export default CharacterCard

import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { buildPath } from '../../../services/api.service'
import '../../../assets/scss/components/character-card/character-card.scss'

function CharacterCard(props) {
    const { id, thumbnail, name } = props

    const characterURL = buildPath('/character', `?id=${id}`)

    return (
        <div className="CharacterCard">
            <a href={characterURL} className="CharacterCard-imageContainer">
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
                <h5>{name}</h5>
            </a>
        </div>
    )
}

CharacterCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    thumbnail: PropTypes.string,
    name: PropTypes.string.isRequired,
}

export default CharacterCard

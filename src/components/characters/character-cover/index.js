import React from 'react'
import PropTypes from 'prop-types'
import '../../../assets/scss/components/character-cover/character-cover.scss'
import { formatDate } from '../../../utils/date'

function CharacterCover(props) {
    const { character } = props

    const thumbnail = `${character.thumbnail?.path}.${character?.thumbnail?.extension}`

    const coverStyles = {
        backgroundImage: `url('${thumbnail}')`,
    }

    return (
        <section className="CharacterCover">
            <div className="CharacterCover-background" style={coverStyles} />

            <div className="CharacterCover-content">
                <div className="CharacterCover-information">
                    <h1 className="name">{character?.name}</h1>

                    <p className="description">{character?.description}</p>

                    <span className="subtitle">Last modification</span>
                    <h2 className="subtitle-text">
                        {formatDate(character?.modified) || 'No date provided'}
                    </h2>
                </div>

                <div className="CharacterCover-thumbnail ImageContainer">
                    <img src={thumbnail} alt={character?.name} />
                </div>
            </div>
        </section>
    )
}

CharacterCover.propTypes = {
    character: PropTypes.object,
}

CharacterCover.defaultProps = {
    character: {},
}

export default CharacterCover
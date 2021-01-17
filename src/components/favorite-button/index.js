import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/scss/components/favorite-button/favorite-button.scss'

function FavoriteButton(props) {
    const { active, onClick } = props

    /**
     * handle click event
     * @param {Event} event
     */
    const handleClick = (event) => {
        event.stopPropagation()
        onClick()
    }

    return (
        <button
            aria-label="Favorite button"
            className="FavoriteButton"
            onClick={handleClick}
        >
            <i className={`${active ? 'fas' : 'far'} fa-heart`} />
        </button>
    )
}

FavoriteButton.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func,
}

FavoriteButton.defaultProps = {
    onClick: () => {},
}

export default FavoriteButton

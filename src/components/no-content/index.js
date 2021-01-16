import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/scss/components/no-content/no-content.scss'

function NoContent(props) {
    const { text } = props

    return (
        <div className="NoContent">
            <p>{text}</p>
            <i className="fas fa-skull" />
        </div>
    )
}

NoContent.propTypes = {
    text: PropTypes.string,
}

NoContent.defaultProps = {
    text: 'No content to display',
}

export default NoContent

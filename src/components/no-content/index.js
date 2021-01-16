import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/scss/components/no-content/no-content.scss'

function NoContent(props) {
    return (
        <div className="NoContent">
            <p>No content to display</p>
            <i class="fas fa-skull" />
        </div>
    )
}

NoContent.propTypes = {}

export default NoContent

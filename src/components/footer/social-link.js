import React from 'react'
import PropTypes from 'prop-types'

export default function SocialLink(props) {
    const { url, title, icon } = props

    return (
        <li className="Footer-linkItem">
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="Footer-SocialLink"
                aria-label={title}
                title={title}
            >
                <i className={`fab fa-${icon}`} />
            </a>
        </li>
    )
}

SocialLink.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}


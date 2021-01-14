import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { buildPath } from '../../../services/api.service'
import ImagePlaceHolder from './image-placeholder'
import '../../../assets/scss/components/comic-card/comic-card.scss'

export default function ComicCard(props) {
    const { id, cover, title } = props

    const comicURL = buildPath('/comic', id)

    return (
        <div className="ComicCard">
            <a href={comicURL} className="ComicCard-coverContainer">
                <LazyLoad
                    placeholder={<ImagePlaceHolder />}
                    classNamePrefix="ComicCard"
                    throttle={300}
                    once
                >
                    <img
                        className="ComicCard-cover"
                        src={cover}
                        alt={title}
                        title={title}
                    />
                </LazyLoad>
            </a>

            <a href={comicURL}>
                <h5 className="ComicCard-title">{title}</h5>
            </a>
        </div>
    )
}

ComicCard.propTypes = {
    id: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    cover: PropTypes.string,
    title: PropTypes.string.isRequired,
    creators: PropTypes.arrayOf(PropTypes.string),
}

import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { buildPath } from '../../../services/api.service'
import ImagePlaceHolder from './image-placeholder'
import '../../../assets/scss/components/comic-card/comic-card.scss'

export default function ComicCard(props) {
    const { id, thumbnail, title, creators } = props

    const comicURL = buildPath('/comic', id)

    const renderCreators = () =>
        creators
            ?.filter((creator) => creator.role === 'writer')
            ?.map((creator) => creator.name)

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
                        src={thumbnail}
                        alt={title}
                        title={title}
                    />
                </LazyLoad>
            </a>

            <div className="ComicCard-titleContainer">
                <a className="ComicCard-title" href={comicURL}>
                    <h5>{title}</h5>
                </a>
                <span className="ComicCard-creators">{renderCreators()}</span>
            </div>
        </div>
    )
}

ComicCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    creators: PropTypes.array,
}

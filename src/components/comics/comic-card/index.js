import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { buildPath } from '../../../services/api.service'
import ImagePlaceHolder from './image-placeholder'
import FavoriteButton from '../../favorite-button'
import { addComic, isComicFavorite, removeComic } from '../../../services/favorites.service'
import '../../../assets/scss/components/comic-card/comic-card.scss'

export default function ComicCard(props) {
    const {
        id,
        thumbnail,
        title,
        creators,
        format,
        issueNumber,
        onFavoriteChange,
    } = props
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        setFavorite(isComicFavorite(id))
    }, [id])

    const comicURL = buildPath('/comic', `?id=${id}`)

    const renderCreators = () =>
        creators
            ?.filter((creator) => creator.role === 'writer')
            ?.map((creator) => creator.name)
            ?.slice(0, 2)
            ?.join(', ')

    const renderFormat = () =>
        format ? <span className="ComicCard-format">{format}</span> : null

    const renderIssueNumber = () => (issueNumber ? `#${issueNumber}` : null)

    const renderFavoriteButton = () => (
        <FavoriteButton active={favorite} onClick={saveFavorite} />
    )

    const saveFavorite = () => {
        if (favorite) {
            removeComic(id)
            setFavorite(false)
        } else {
            addComic({ id, thumbnail, title, creators, format, issueNumber })
            setFavorite(true)
        }

        onFavoriteChange()
    }

    return (
        <div className="ComicCard">
            {renderFormat()}
            {renderFavoriteButton()}

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

                <div className="ComicCard-footer">
                    <span className="ComicCard-creators">
                        {renderCreators()}
                    </span>

                    <span className="ComicCard-issueNumber">
                        {renderIssueNumber()}
                    </span>
                </div>
            </div>
        </div>
    )
}

ComicCard.propTypes = {
    issueNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    creators: PropTypes.array,
    format: PropTypes.string,
    favorite: PropTypes.bool,
    onFavoriteChange: PropTypes.func,
}

ComicCard.defaultProps = {
    onFavoriteChange: () => {},
}

import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../../utils/date'
import '../../../assets/scss/components/comic-page-cover/comic-page-cover.scss'
import { getThumbnailURL } from '../../../utils/thumbnails'

function ComicPageCover(props) {
    const { comic } = props

    const backgroundStyle = {
        backgroundImage: `url('${getThumbnailURL(comic.thumbnail)}')`,
    }

    const getSaleDate = () => {
        const dateString = comic?.dates?.find((item) => item.type === 'focDate')
            ?.date

        return formatDate(dateString) || 'No date provided'
    }

    const getRoles = () => {
        // Get all roles
        const allRoles =
            comic?.creators?.items?.map((creator) => creator.role) || []

        // Clean duplicated
        const availableRoles = [...new Set(allRoles)]

        // Return creators by role
        return availableRoles.map((role) => {
            return {
                name: role,
                creators: comic?.creators?.items
                    ?.filter((creator) => creator.role === role)
                    .map((creator) => creator.name), // Get only name field
            }
        })
    }

    const renderRoles = () => {
        const roles = getRoles()

        return roles.map((role, index) => (
            <div key={'role-' + index} className="ComicPageCover-role">
                <div className="subtitle">{role.name}</div>
                <span className="subtitle-text">
                    {role.creators?.join(', ')}
                </span>
            </div>
        ))
    }

    return (
        <section className="ComicPageCover">
            <div className="ComicPageCover-content">
                <div className="ComicPageCover-thumbnail">
                    <img
                        src={getThumbnailURL(comic.thumbnail)}
                        alt={comic?.title}
                    />
                </div>

                <div className="ComicPageCover-data">
                    <h1 className="title">{comic?.title}</h1>
                    <p className="description">
                        {comic?.description || 'No description provided'}
                    </p>

                    <div>
                        <div className="subtitle">Published:</div>
                        <span className="subtitle-text">{getSaleDate()}</span>
                    </div>

                    <div className="ComicPageCover-roles">{renderRoles()}</div>
                </div>
            </div>

            <div
                className="ComicPageCover-background"
                style={backgroundStyle}
            />
        </section>
    )
}

ComicPageCover.propTypes = {
    comic: PropTypes.object,
}

ComicPageCover.defaultProps = {
    comic: {},
}

export default ComicPageCover

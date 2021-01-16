import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../../utils/date'
import parse from 'html-react-parser'
import '../../../assets/scss/components/story-cover/story-cover.scss'

function StoryCover(props) {
    const { story } = props

    const thumbnail = `${story.thumbnail?.path}.${story?.thumbnail?.extension}`

    const coverStyles = {
        backgroundImage: `url('https://terrigen-cdn-dev.marvel.com/content/prod/1x/wayofx2021001002_col_copy.jpg')`,
    }

    const getRoles = () => {
        // Get all roles
        const allRoles =
            story?.creators?.items?.map((creator) => creator.role) || []

        // Clean duplicated
        const availableRoles = [...new Set(allRoles)]

        // Return creators by role
        return availableRoles.map((role) => {
            return {
                name: role,
                creators: story?.creators?.items
                    ?.filter((creator) => creator.role === role)
                    .map((creator) => creator.name), // Get only name field
            }
        })
    }

    const renderRoles = () => {
        const roles = getRoles()

        return roles.map((role, index) => (
            <div key={'role-' + index} className="StoryCover-role">
                <div className="subtitle">{role.name}</div>
                <span className="subtitle-text">
                    {role.creators?.join(', ')}
                </span>
            </div>
        ))
    }

    return (
        <section className="StoryCover">
            <div className="StoryCover-background" style={coverStyles} />

            <div className="StoryCover-content">
                <div className="StoryCover-information">
                    <h1 className="name">{parse(story?.title || '')}</h1>

                    <p className="description">
                        {parse(story?.description || '')}
                    </p>

                    <span className="subtitle">Last modification</span>
                    <h2 className="subtitle-text">
                        {formatDate(story?.modified) || 'No date provided'}
                    </h2>

                    <div className="StoryCover-roles">
                        {renderRoles()}
                    </div>
                </div>
            </div>
        </section>
    )
}

StoryCover.propTypes = {
    story: PropTypes.object,
}

StoryCover.defaultProps = {
    story: {},
}

export default StoryCover

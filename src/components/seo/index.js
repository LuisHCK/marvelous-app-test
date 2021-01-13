import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

export default function Seo(props) {
    const { title, meta, htmlAttributes, titleTemplate, description } = props

    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `
    )

    const metaDescription = description || site.siteMetadata.description

    return (
        <Helmet
            title={title}
            meta={[
                // Default meta tags
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                // Concat props
                ...meta,
            ]}
            htmlAttributes={{
                lang: 'en',
                ...htmlAttributes,
            }}
            titleTemplate={titleTemplate || `%s | ${site.siteMetadata.title}`}
        />
    )
}

Seo.propTypes = {
    title: PropTypes.string.isRequired,
    meta: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                name: PropTypes.string,
                content: PropTypes.string,
            }),
            PropTypes.shape({
                property: PropTypes.string,
                content: PropTypes.string,
            }),
        ])
    ),
    htmlAttributes: PropTypes.object,
    description: PropTypes.string,
}

Seo.defaultProps = {
    title: '',
    titleTemplate: '',
    meta: [],
    description: '',
}

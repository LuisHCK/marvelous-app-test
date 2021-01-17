import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/scss/components/page-cover/page-cover.scss'

export default function PageCover(props) {
    const { image, children, backgroundPosition } = props

    const style = {
        backgroundImage: `url('${image}')`,
        backgroundPosition,
    }

    return (
        <section className="PageCover" style={style}>
            {children}
        </section>
    )
}

PageCover.propTypes = {
    image: PropTypes.string,
    children: PropTypes.node,
}

PageCover.defaultProps = {
    image:
        'https://i.annihil.us/u/prod/marvel/html_pages_assets/marvel-unlimited-sellpage/prod/masthead-bg-desktop.e85140c2.jpg',
    backgroundPosition: 'top',
}

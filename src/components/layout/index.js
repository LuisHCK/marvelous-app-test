import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
// Base styles
import '../../assets/scss/base/base.scss'

export default function Layout({ children }) {
    return (
        <Fragment>
            <main className="main">{children}</main>
        </Fragment>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

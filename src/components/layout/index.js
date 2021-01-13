import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../navbar'
// Base styles
import '../../assets/scss/base/base.scss'


export default function Layout({ children, withNavBar }) {
    const renderNavBar = () => (withNavBar ? <NavBar /> : null)

    return (
        <Fragment>
            {renderNavBar()}
            {children}
        </Fragment>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    withNavBar: PropTypes.bool,
}

Layout.defaultProps = {
    withNavBar: false,
}

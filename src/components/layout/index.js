import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../navbar'
// Base styles
import '../../assets/scss/base/base.scss'
import Footer from '../footer'

export default function Layout({ children, useNavBar, useFooter }) {
    const renderNavBar = () => (useNavBar ? <NavBar /> : null)

    const renderFooter = () => (useFooter ? <Footer /> : null)

    return (
        <Fragment>
            {renderNavBar()}
            {children}
            {renderFooter()}
        </Fragment>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    useNavBar: PropTypes.bool,
    useFooter: PropTypes.bool,
}

Layout.defaultProps = {
    useNavBar: false,
    useFooter: false,
}

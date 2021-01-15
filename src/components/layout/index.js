import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../navbar'
// Base styles
import '../../assets/scss/base/base.scss'
import Footer from '../footer'
import { Helmet } from 'react-helmet'

export default function Layout({ children, useNavBar, useFooter }) {
    const renderNavBar = () => (useNavBar ? <NavBar /> : null)

    const renderFooter = () => (useFooter ? <Footer /> : null)

    return (
        <Fragment>
            {renderNavBar()}
            {children}
            {renderFooter()}

            <Helmet>
                <script
                    src="https://kit.fontawesome.com/87131fda1b.js"
                    crossorigin="anonymous"
                ></script>
            </Helmet>
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

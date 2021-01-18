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
                    async
                />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                    rel="stylesheet"
                    async
                />

                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&family=Roboto:wght@400;500;700&display=swap"
                    rel="stylesheet"
                    async
                />
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

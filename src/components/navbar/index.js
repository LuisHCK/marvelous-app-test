// Styles
import { Link } from 'gatsby'
import React, { Fragment, useState } from 'react'
import '../../assets/scss/components/navbar/navbar.scss'
import MobileMenu from './mobile-menu'

function NavBar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMobileMenu = () => setIsOpen((prev) => !prev)

    const menu = (
        <ul className="NavBar-menu">
            <li className="NavBar-menuItem">
                <Link className="NavBar-link" to="/">
                    Home
                </Link>
            </li>
            <li className="NavBar-menuItem">
                <Link className="NavBar-link" to="/comics">
                    Comics
                </Link>
            </li>
            <li className="NavBar-menuItem">
                <Link className="NavBar-link" to="/characters">
                    Characters
                </Link>
            </li>
            <li className="NavBar-menuItem">
                <Link className="NavBar-link" to="/stories">
                    Stories
                </Link>
            </li>
            <li className="NavBar-menuItem">
                <Link className="NavBar-link" to="/favorites">
                    Favorites
                </Link>
            </li>
        </ul>
    )

    return (
        <Fragment>
            <nav className="NavBar">
                <div className="NavBar-logoContainer">
                    <Link to="/" className="NavBar-logo">
                        <span aria-label="Navigation bar logo" />
                    </Link>
                </div>

                {menu}

                <button
                    className="NavBar-menuToggle"
                    aria-label="Menu toggle"
                    onClick={toggleMobileMenu}
                >
                    <i className="fas fa-bars" />
                </button>
            </nav>

            <MobileMenu isOpen={isOpen} toggle={toggleMobileMenu}>
                {menu}
            </MobileMenu>
        </Fragment>
    )
}

export default NavBar

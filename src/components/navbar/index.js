// Styles
import React, { Fragment, useState } from 'react'
import '../../assets/scss/components/navbar/navbar.scss'
import MobileMenu from './mobile-menu'

function NavBar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMobileMenu = () => setIsOpen((prev) => !prev)

    const menu = (
        <ul className="NavBar-menu">
            <li className="NavBar-menuItem">
                <a className="NavBar-link" href="/">
                    Home
                </a>
            </li>
            <li className="NavBar-menuItem">
                <a className="NavBar-link" href="/comics">
                    Comics
                </a>
            </li>
            <li className="NavBar-menuItem">
                <a className="NavBar-link" href="/characters">
                    Characters
                </a>
            </li>
            <li className="NavBar-menuItem">
                <a className="NavBar-link" href="/stories">
                    Stories
                </a>
            </li>
            <li className="NavBar-menuItem">
                <a className="NavBar-link" href="/favorites">
                    Favorites
                </a>
            </li>
        </ul>
    )

    return (
        <Fragment>
            <nav className="NavBar">
                <div className="NavBar-logoContainer">
                    <a
                        href="/"
                        className="NavBar-logo"
                        aria-label="Marvelous logo"
                    />
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

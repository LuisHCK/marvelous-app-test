import React from 'react'

// Styles
import '../../assets/scss/components/navbar/navbar.scss'

function NavBar() {
    return (
        <nav className="NavBar">
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
        </nav>
    )
}

export default NavBar

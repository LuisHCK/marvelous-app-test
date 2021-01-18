import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { disableBodyScroll, restoreBodyScroll } from '../../utils/bodyScroll'

function MobileMenu(props) {
    const { children, toggle } = props
    const [isOpen, setIsOpen] = useState(props.isOpen)

    /**
     * Listen to isOpen to enable
     * or disable body scroll
     */
    useEffect(() => {
        setIsOpen(props.isOpen)

        props.isOpen ? disableBodyScroll() : restoreBodyScroll()

        return () => {
            restoreBodyScroll()
        }
    }, [props.isOpen])

    const openClassName = isOpen ? 'open' : ''

    return (
        <div className={`NavBar-mobileMenu ${openClassName}`}>
            <div className="NavBar-mobileMenuToggle">
                <button onClick={toggle}>
                    <i className="fas fa-times" />
                </button>
            </div>

            {children}
        </div>
    )
}

MobileMenu.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    children: PropTypes.node,
}

MobileMenu.defaultProps = {
    toggle: () => {},
}

export default MobileMenu

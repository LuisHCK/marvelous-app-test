import React from 'react'
import PropTypes from 'prop-types'

export default function TabPane(props) {
    const { children } = props

    return <div className="Tabs-tabPane">{children}</div>
}

TabPane.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node,
}

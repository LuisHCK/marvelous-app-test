import React from 'react'

export default function TabPane(props) {
    const {children} = props

    return (
        <div className="Tabs-tabPane">
            {children}
        </div>
    )
}

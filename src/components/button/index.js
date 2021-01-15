import React from 'react'


export default function Button(props) {
    const { content, children } = props

    return (
        <button>
            {children}
            {content}
        </button>
    )
}

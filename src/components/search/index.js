import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../../assets/scss/components/controls/controls.scss'

let timer

export default function Search(props) {
    const [field, setField] = useState('titleStartsWith')
    const { onInput } = props

    const handleInput = ({ target }) => {
        clearTimeout(timer)

        timer = setTimeout(() => {
            const value = target.value

            if (value) {
                onInput({ [field]: target.value })
            } else {
                onInput({})
            }
        }, 500)
    }

    const handleSelect = ({ target }) => {
        setField(target.value)
    }

    return (
        <div className="Controls">
            <div className="Controls-search">
                <select
                    defaultValue="title"
                    name="field"
                    onChange={handleSelect}
                >
                    <option value="titleStartsWith">Title</option>
                    <option value="issueNumber">Issue number</option>
                </select>

                <input
                    type="search"
                    placeholder="Search"
                    onInput={handleInput}
                />
                <i className="fas fa-search" />
            </div>
        </div>
    )
}

Search.propTypes = {
    onInput: PropTypes.func.isRequired,
}

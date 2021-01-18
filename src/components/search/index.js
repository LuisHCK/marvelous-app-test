import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../../assets/scss/components/controls/controls.scss'

let timer

export default function Search(props) {
    const { onInput, useSelect } = props

    const [field, setField] = useState(props.defaultField)

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

    const renderSelect = () =>
        useSelect ? (
            // jsx-a11y/no-onchange is deprecated but eslint still marking as warning
            // eslint-disable-next-line jsx-a11y/no-onchange
            <label aria-label={`Select field`}>
                <select
                    defaultValue="title"
                    name="field"
                    onChange={handleSelect}
                >
                    <option value="titleStartsWith">Title</option>
                    <option value="issueNumber">Issue number</option>
                </select>
            </label>
        ) : null

    return (
        <div className="Controls">
            <div className="Controls-search">
                {renderSelect()}

                <label aria-label="Search input">
                    <input
                        type="search"
                        placeholder="Search"
                        onInput={handleInput}
                    />
                </label>

                <i className="fas fa-search" />
            </div>
        </div>
    )
}

Search.propTypes = {
    onInput: PropTypes.func.isRequired,
    useSelect: PropTypes.bool,
}

Search.defaultProps = {
    defaultField: 'titleStartsWith',
}

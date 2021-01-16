import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/scss/components/controls/controls.scss'

function Filter(props) {
    const { label, onSelect, options, field } = props

    const handleChange = ({ target }) =>
        onSelect({ field, value: target.value })

    const renderOptions = () =>
        options.map((option, index) => (
            <option key={'opt-' + index} value={option.value}>
                {option.label}
            </option>
        ))

    return (
        <div className="Controls">
            {/* jsx-a11y/no-onchange is deprecated but eslint still marking as warning */}
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
                defaultValue="label"
                name="Sort"
                aria-label="Sort"
                onChange={handleChange}
            >
                <option value="label" disabled>
                    {label}
                </option>
                {renderOptions()}
                <option value="all">All</option>
            </select>
        </div>
    )
}

Filter.propTypes = {
    onSelect: PropTypes.func.isRequired,
    label: PropTypes.string,
    options: PropTypes.array,
    field: PropTypes.string,
}

export default Filter

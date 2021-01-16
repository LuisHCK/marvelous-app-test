import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import '../../assets/scss/components/tabs/tabs.scss'

const Tabs = (props) => {
    const { children } = props
    const [currentTab, setCurrentTab] = useState(0)
    const [headers, setHeaders] = useState([])

    useEffect(() => {
        getHeaders()
        return () => {}
    }, [children])

    const getHeaders = () => {
        const newHeaders = React.Children.map(
            children,
            (element) => element.props?.label
        )

        setHeaders(newHeaders)
    }

    const renderHeaders = () =>
        headers.map((header, index) => (
            <div
                key={'tab-header-' + index}
                className={`Tabs-header ${
                    currentTab === index ? 'active' : ''
                }`}
                onClick={() => setCurrentTab(index)}
            >
                {header}
            </div>
        ))

    const renderCurrentTab = () => children[currentTab]

    return (
        <div className="Tabs">
            <div className="Tabs-headers">{renderHeaders()}</div>

            <div className="Tabs-content Container">{renderCurrentTab()}</div>
        </div>
    )
}

Tabs.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Tabs

import React, { Fragment } from 'react'
import Seo from '../components/seo'

export default function IndexPage() {
    return (
        <Fragment>
            <Seo title="Home Page" />

            <div className="home-page">
                <h1>Home Page</h1>
            </div>
        </Fragment>
    )
}

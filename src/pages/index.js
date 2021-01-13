import React, { Fragment } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

export default function IndexPage() {
    return (
        <Fragment>
            <Seo title="Home Page" />

            <Layout>
                <div className="home-page">
                    <h1>Home Page</h1>
                </div>
            </Layout>
        </Fragment>
    )
}
